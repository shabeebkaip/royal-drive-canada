// Contact form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  message: string;
}

export type ContactSubject =
  | "General Inquiry"
  | "Vehicle Information"
  | "Financing Question"
  | "Trade-in Valuation"
  | "Service Question";

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: {
    enquiryId: string;
    status: string;
    createdAt: string;
  };
  errors?: Array<{
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }>;
  error?: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  general?: string;
}
