/**
 * Business Settings Types
 * Types for the public settings API response
 */

export interface BusinessHour {
  day: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface ContactInfo {
  primaryPhone?: string;
  secondaryPhone?: string;
  primaryEmail?: string;
  supportEmail?: string;
  salesEmail?: string;
}

export interface Address {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  facebookMarketplace?: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
}

export interface Features {
  enableTestDrive?: boolean;
  enableFinancing?: boolean;
  enableTradeIn?: boolean;
  enableOnlineBooking?: boolean;
  showPricing?: boolean;
}

export interface MaintenanceMode {
  enabled: boolean;
  message?: string | null;
}

export interface BusinessSettings {
  businessName?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  favicon?: string;
  contactInfo?: ContactInfo;
  address?: Address;
  socialMedia?: SocialMedia;
  businessHours?: BusinessHour[];
  seo?: SEO;
  features?: Features;
  currency?: string;
  timezone?: string;
  language?: string;
  maintenanceMode?: MaintenanceMode;
}

export interface SettingsApiResponse {
  success: boolean;
  message: string;
  data: BusinessSettings;
}
