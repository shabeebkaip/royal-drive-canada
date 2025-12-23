/**
 * Cache Revalidation API Route
 * Allows on-demand revalidation of cached data
 * Call this from your admin panel when new content is added
 */

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Optional: Add authentication
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { tag, tags, slug } = body;

    // Support vehicle slug revalidation (matches backend cache key format)
    if (slug) {
      await revalidateTag(`vehicle-${slug}`, 'default');
      return NextResponse.json({ 
        revalidated: true, 
        type: 'vehicle',
        slug,
        tag: `vehicle-${slug}`,
        timestamp: new Date().toISOString()
      });
    }

    if (tag) {
      await revalidateTag(tag, 'default');
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        timestamp: new Date().toISOString()
      });
    }

    if (tags && Array.isArray(tags)) {
      await Promise.all(tags.map((t: string) => revalidateTag(t, 'default')));
      return NextResponse.json({ 
        revalidated: true, 
        tags,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Missing slug, tag, or tags parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

// Example usage from backend when vehicle is updated:
// 
// // Revalidate specific vehicle (recommended)
// fetch('https://royaldrivecanada.com/api/revalidate', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_SECRET_TOKEN'
//   },
//   body: JSON.stringify({ 
//     slug: '2020-mercedes-benz-glc' 
//   })
// });
//
// // Revalidate by tag
// fetch('https://royaldrivecanada.com/api/revalidate', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_SECRET_TOKEN'
//   },
//   body: JSON.stringify({ 
//     tag: 'vehicle-types' 
//     // or multiple tags: tags: ['vehicle-types', 'brands']
//   })
// });
