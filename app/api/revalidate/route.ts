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
    const { tag, tags } = body;

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        timestamp: new Date().toISOString()
      });
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach((t: string) => revalidateTag(t));
      return NextResponse.json({ 
        revalidated: true, 
        tags,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Missing tag or tags parameter' },
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

// Example usage from admin panel:
// 
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
