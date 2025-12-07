import { getFilterOptions } from '@/lib/api';
import SearchCardClient from './SearchCardClient';
import { Brand, VehicleType } from '@/types/api';

/**
 * SearchCard - Server Component Wrapper
 * Fetches filter options server-side for optimal performance
 */
export default async function SearchCard() {
  // Fetch filter options in parallel on the server
  // This data is cached and revalidated every 5 minutes
  const filterOptions = await getFilterOptions();

  // Transform data to match the expected format
  const brands: Brand[] = filterOptions.brands.map((b) => ({
    id: b._id,
    name: b.name,
    logo: b.logo,
    slug: b.slug,
    active: true,
  }));

  const bodyTypes: VehicleType[] = filterOptions.bodyTypes.map((vt) => ({
    id: vt._id,
    name: vt.name,
    image: vt.icon || vt.image || '',
    slug: vt.slug,
  }));

  return (
    <SearchCardClient
      initialBrands={brands}
      initialBodyTypes={bodyTypes}
    />
  );
}
