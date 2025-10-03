# API Integration Documentation

## Overview

This project uses a clean, server-side API integration approach with Next.js 15 App Router features for optimal performance and automatic data updates.

## Architecture

### File Structure

```
lib/
  api/
    client.ts              # API client with error handling
    index.ts              # Barrel exports
    services/
      vehicle-types.ts    # Vehicle types service
types/
  api.ts                  # API type definitions
```

## Features

### 1. Server-Side Rendering (SSR)
- All API calls happen on the server
- No client-side API exposure
- Better SEO and initial page load

### 2. Incremental Static Regeneration (ISR)
- Data is cached at build time
- Automatically revalidates every 60 seconds
- New vehicle types appear within 1 minute after admin adds them

### 3. On-Demand Revalidation
- Uses Next.js cache tags
- Can trigger immediate updates via revalidation API

### 4. Type Safety
- Full TypeScript support
- Type-safe API responses
- Compile-time error checking

### 5. Error Handling
- Graceful fallbacks
- Console logging for debugging
- Returns empty arrays on failures

## Usage

### Fetching Vehicle Types

```typescript
import { getVehicleTypes } from '@/lib/api';

// In a Server Component
export default async function MyComponent() {
  const vehicleTypes = await getVehicleTypes();
  
  return (
    <div>
      {vehicleTypes.map(type => (
        <div key={type.id}>{type.name}</div>
      ))}
    </div>
  );
}
```

### Fetching Single Vehicle Type

```typescript
import { getVehicleTypeById, getVehicleTypeBySlug } from '@/lib/api';

// By ID
const vehicleType = await getVehicleTypeById(1);

// By Slug
const vehicleType = await getVehicleTypeBySlug('sedan');
```

## Cache Configuration

### Default Settings

- **Revalidation Time**: 60 seconds
- **Cache Tags**: `['vehicle-types']`

### Customizing Cache

To change the revalidation time, update the `revalidate` value in `lib/api/services/vehicle-types.ts`:

```typescript
next: { 
  revalidate: 120, // Revalidate every 2 minutes
  tags: ['vehicle-types']
}
```

### Manual Cache Revalidation

To immediately revalidate cached data when admin adds new content, create an API route:

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  
  if (tag) {
    revalidateTag(tag);
    return Response.json({ revalidated: true, tag });
  }
  
  return Response.json({ revalidated: false });
}
```

Then call from your admin panel:

```typescript
fetch('https://yoursite.com/api/revalidate?tag=vehicle-types', {
  method: 'POST',
});
```

## Environment Variables

Add to your `.env` file:

```env
API_BASE_URL=https://api.royaldrivecanada.com/api/v1
```

## API Client

The API client (`lib/api/client.ts`) provides:

- Centralized configuration
- Automatic JSON parsing
- Error handling
- TypeScript support

### Methods

- `get<T>(endpoint, options)` - GET requests
- `post<T>(endpoint, data, options)` - POST requests

## Adding New API Services

1. Create a new service file in `lib/api/services/`
2. Define types in `types/api.ts`
3. Export from `lib/api/index.ts`

Example:

```typescript
// lib/api/services/brands.ts
import { apiClient } from '../client';
import { Brand } from '@/types/api';

export async function getBrands(): Promise<Brand[]> {
  const response = await apiClient.get<Brand[]>('/brands', {
    next: { 
      revalidate: 60,
      tags: ['brands']
    },
  });
  return response;
}
```

## Performance Optimization

### Benefits

1. **Fast Initial Load**: Server-rendered with cached data
2. **Fresh Data**: Auto-updates every 60 seconds
3. **No Client Overhead**: No API calls from browser
4. **Better SEO**: Content available at request time

### Monitoring

Check Next.js build output to see cache behavior:

```bash
pnpm build
```

Look for:
- ○ Static (SSG)
- ƒ Dynamic (SSR)
- ● Static with revalidation (ISR)

## Best Practices

1. **Always use server components** for data fetching
2. **Pass data as props** to client components
3. **Use cache tags** for on-demand revalidation
4. **Handle errors gracefully** with fallbacks
5. **Keep revalidation time reasonable** (30-300 seconds)

## Troubleshooting

### Data not updating?

1. Check if 60 seconds have passed
2. Verify API endpoint is working
3. Check server logs for errors
4. Try on-demand revalidation

### Build errors?

1. Ensure all async components are properly typed
2. Check TypeScript errors: `pnpm lint`
3. Verify environment variables are set

### Performance issues?

1. Increase revalidation time
2. Add more specific cache tags
3. Use loading states in client components
4. Consider pagination for large datasets

## Future Enhancements

- [ ] Add request debouncing
- [ ] Implement retry logic
- [ ] Add request caching layer
- [ ] Create webhook endpoint for admin panel
- [ ] Add analytics for cache hits/misses
- [ ] Implement optimistic updates
