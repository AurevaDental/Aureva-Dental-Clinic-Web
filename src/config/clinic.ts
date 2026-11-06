/**
 * Centralized Clinic Configuration & Constants
 * Single source of truth for dynamic clinic parameters like review count and ratings.
 */

export const clinicConfig = {
  // Visible review badge label across website UI
  googleReviewsLabel: "40+",

  // Numerical verified Google review count for JSON-LD schema
  googleReviewsCount: 43,

  // Google review rating value
  ratingValue: 5.0,

  // NAP & Operational facts
  clinicName: "Aureva Dental",
  phone: "+91 73497 01002",
  phoneUrl: "tel:+917349701002",
  whatsappUrl: "https://wa.me/917349701002",
  fullAddress: "2nd Floor, No. 11/4, Horamavu Agara Road, Near Nayara Petrol Bunk, Hennur Bande, Hennur Gardens, Bengaluru, Karnataka 560043",
  operatingHours: "Mon 4:00-9:00 PM; Tue-Sun 9:30 AM-9:00 PM (open Sundays)",
};

export const googleReviewsLabel = clinicConfig.googleReviewsLabel;
export const googleReviewsCount = clinicConfig.googleReviewsCount;
export const ratingValue = clinicConfig.ratingValue;
