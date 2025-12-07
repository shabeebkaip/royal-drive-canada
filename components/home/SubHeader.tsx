import { getFilterOptions } from '@/lib/api';
import SubHeaderClient from './SubHeaderClient';
import { Brand } from '@/types/api';

/**
 * SubHeader - Server Component Wrapper
 * Fetches brands server-side for optimal performance
 */
export default async function SubHeader() {
  // Fetch filter options in parallel on the server
  // This data is cached and revalidated every 5 minutes
  const filterOptions = await getFilterOptions();

  // Transform brands data to match the expected format
  const brands: Brand[] = filterOptions.brands.map((b) => ({
    id: b._id,
    name: b.name,
    logo: b.logo,
    slug: b.slug,
    active: true,
  }));

  return <SubHeaderClient initialBrands={brands} />;
}
