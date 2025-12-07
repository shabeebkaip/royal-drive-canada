import { getFilterOptions } from '@/lib/api';
import HeaderWithMegaMenuClient from './HeaderWithMegaMenuClient';
import { Brand } from '@/types/api';

interface HeaderWithMegaMenuProps {
  showMegaMenu?: boolean;
}

/**
 * HeaderWithMegaMenu - Server Component Wrapper
 * Fetches brands server-side for optimal performance
 */
export default async function HeaderWithMegaMenu({ showMegaMenu = false }: HeaderWithMegaMenuProps) {
  let brands: Brand[] = [];

  // Only fetch brands if mega menu is enabled
  if (showMegaMenu) {
    const filterOptions = await getFilterOptions();
    
    // Transform brands data to match the expected format
    brands = filterOptions.brands.map((b) => ({
      id: b._id,
      name: b.name,
      logo: b.logo,
      slug: b.slug,
      active: true,
    }));
  }

  return (
    <HeaderWithMegaMenuClient
      showMegaMenu={showMegaMenu}
      initialBrands={brands}
    />
  );
}
