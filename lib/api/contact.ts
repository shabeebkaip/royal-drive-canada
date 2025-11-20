import { ContactFormData, ContactApiResponse } from "@/types/contact";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

/**
 * Submit contact enquiry to the API
 * @param formData - Contact form data
 * @returns API response with success status and message
 */
export async function submitContactEnquiry(
  formData: ContactFormData
): Promise<ContactApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data: ContactApiResponse = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit your enquiry. Please try again.',
        errors: data.errors,
      };
    }

    return data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Validate contact form data on the client side
 * @param formData - Contact form data to validate
 * @returns Object with validation errors, or empty object if valid
 */
export function validateContactForm(formData: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  // First name validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (formData.firstName.trim().length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName)) {
    errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Last name validation
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (formData.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName)) {
    errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (formData.phone.trim().length < 10) {
    errors.phone = 'Phone number must be at least 10 characters';
  } else if (formData.phone.trim().length > 20) {
    errors.phone = 'Phone number must be less than 20 characters';
  } else if (!/^[\d\s\-()+ ]+$/.test(formData.phone)) {
    errors.phone = 'Phone number can only contain digits, spaces, hyphens, parentheses, and plus sign';
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (formData.message.trim().length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }

  return errors;
}
