/**
 * Centralized Clinic Configuration & Constants
 * Single source of truth for dynamic clinic parameters like review count and ratings.
 */

export const clinicConfig = {
  // Visible review badge label across website UI
  googleReviewsLabel: "5.0 (47 Google Reviews)",

  // Numerical verified Google review count for JSON-LD schema
  googleReviewsCount: 47,

  // Google review rating value
  ratingValue: 5.0,

  googleRating: {
    score: "5.0",
    count: 47,
    label: "5.0 (47 Google Reviews)"
  },

  // NAP & Operational facts
  clinicName: "Aureva Dental",
  phone: "+91 73497 01002",
  phoneUrl: "tel:+917349701002",
  whatsappUrl: "https://wa.me/917349701002",
  fullAddress: "2nd floor, No.11, 4, Horamavu Agara Rd, near Nayara Petrol Bunk, Hennur Bande, Hennur Gardens, Bengaluru, Karnataka 560043",
  operatingHours: "Monday 4 PM to 9 PM; Tuesday to Sunday 9:30 AM to 9 PM (open Sundays); walk-ins till 9 PM",
};

export const googleReviewsLabel = clinicConfig.googleReviewsLabel;
export const googleReviewsCount = clinicConfig.googleReviewsCount;
export const ratingValue = clinicConfig.ratingValue;
export const googleRating = clinicConfig.googleRating;
