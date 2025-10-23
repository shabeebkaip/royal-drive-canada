import { Vehicle } from './api'

export interface VehicleCardProps {
  vehicle: Vehicle & { 
    status?: { 
      slug?: string;
      name?: string;
      color?: string;
    } 
  };
  showFeaturedBadge?: boolean;
  onViewDetails?: (vehicleId: string) => void;
  className?: string;
  isHorizontal?: boolean;
}
