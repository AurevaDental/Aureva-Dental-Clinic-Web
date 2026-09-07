/**
 * SEO Structured Data (JSON-LD) Generator for Aureva Dental
 * Generates Google Rich Results-compliant schemas for Local SEO, MedicalBusiness/Dentist,
 * FAQPage rich snippets, and BreadcrumbList.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const LOCAL_FAQS: FaqItem[] = [
  {
    question: "Where is Aureva Dental located in Bengaluru?",
    answer: "Aureva Dental is conveniently located at 2nd Floor, No. 11/4, Horamavu Agara Road, Near Nayara Petrol Bunk, Hennur Bande, Bengaluru, Karnataka 560043. We serve patients across Hennur, Horamavu, Babusapalya, Kalyan Nagar, HRBR Layout, Kammanahalli, Banaswadi, and North Bengaluru with dedicated 2-wheeler and 4-wheeler parking."
  },
  {
    question: "What dental treatments and specialities do you provide?",
    answer: "We offer comprehensive holistic and specialized dental care, including painless Root Canal Treatments (RCT), Clear Aligners and Invisible Braces, Dental Implants, Digital Smile Design, Ceramic & Zirconia Crowns, Advanced Teeth Whitening, Kids Dentistry, and preventative Scaling & Polishing in a calm, Japandi-inspired studio environment."
  },
  {
    question: "Are emergency dental appointments available at Aureva Dental?",
    answer: "Yes, we accept same-day emergency appointments for acute toothaches, chipped teeth, dental trauma, and severe sensitivity. We are open 7 days a week: Monday (4:00 PM – 9:00 PM) and Tuesday – Sunday (9:30 AM – 9:00 PM). Call us immediately at +91 73497 01002 for urgent care."
  },
  {
    question: "How much does a Root Canal Treatment (RCT) or Consultation cost?",
    answer: "Our new patient consultation (including digital RVG low-radiation X-ray) is Rs. 600. Single-sitting and specialized Root Canal Treatments start from Rs. 4,000 to Rs. 10,000 depending on tooth location (anterior, premolar, or molar). Transparent pricing is shared upfront before every procedure with no surprise fees."
  },
  {
    question: "Do you offer Clear Aligners and Smile Makeovers?",
    answer: "Yes, we specialize in Digital Smile Design, customized porcelain/ceramic veneers, and Clear Aligners (ranging from Rs. 80,000 to Rs. 2,50,000). We also offer curated Bridal & Groom smile radiance packages for upcoming weddings and events."
  },
  {
    question: "What payment and EMI options are available for treatments?",
    answer: "We accept all major Credit Cards, Debit Cards, UPI, and digital modes. Multi-stage treatments like Dental Implants and Aligners can be seamlessly converted into flexible zero-cost or low-cost monthly EMIs directly via your card-issuing bank at checkout."
  },
  {
    question: "How can I book an appointment at Aureva Dental?",
    answer: "You can book directly via WhatsApp at +91 73497 01002, call our clinic reception desk at +91 73497 01002, or tap the 'Book Appointment' button on our website for prompt slot confirmation."
  }
];

export function generateDentalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "name": "Aureva Dental",
    "image": "https://aurevadental.com/og-image.jpg",
    "@id": "https://aurevadental.com",
    "url": "https://aurevadental.com",
    "telephone": "+917349701002",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, No. 11/4, Horamavu Agara Road, Near Nayara Petrol Bunk, Hennur Bande",
      "addressLocality": "Bengaluru",
      "addressRegion": "KA",
      "postalCode": "560043",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0381741,
      "longitude": 77.6416031
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Monday",
        "opens": "16:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:30",
        "closes": "21:00"
      }
    ],
    "medicalSpecialty": [
      "Dentistry",
      "CosmeticDentistry",
      "Orthodontics",
      "Periodontics",
      "Endodontics"
    ]
  };
}

export function generateDentistSchema(config: any) {
  const socialLinks = config.social_media?.map((s: any) => s.url) || [];

  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "DentalClinic"],
    "@id": "https://aurevadental.com/#dentist",
    "name": "Aureva Dental",
    "legalName": "Aureva Dental Clinic",
    "alternateName": [
      "Aureva Dental",
      "Aureva Dental Hennur",
      "Aureva Dental Horamavu",
      "Aureva Dental Clinic Bengaluru"
    ],
    "url": "https://aurevadental.com/",
    "logo": "https://aurevadental.com/logo.png",
    "image": [
      "https://aurevadental.com/og-image.jpg",
      "https://aurevadental.com/logo.png"
    ],
    "description": "Aureva Dental is a modern dental clinic & smile studio in Hennur Bande, Horamavu Agara Road, Bengaluru. Painless root canal, dental implants, aligners & cosmetic dentistry. Call +91 73497 01002.",
    "telephone": "+917349701002",
    "email": "aurevadentalclinic@gmail.com",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, No. 11/4, Horamavu Agara Road, Near Nayara Petrol Bunk, Hennur Bande",
      "addressLocality": "Bengaluru",
      "addressRegion": "KA",
      "postalCode": "560043",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0381741,
      "longitude": 77.6416031
    },
    "hasMap": "https://maps.app.goo.gl/dhU4UySs9WFkHAzYA",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday"],
        "opens": "16:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:30",
        "closes": "21:00"
      }
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Hennur" },
      { "@type": "AdministrativeArea", "name": "Horamavu" },
      { "@type": "AdministrativeArea", "name": "Hennur Bande" },
      { "@type": "AdministrativeArea", "name": "Babusapalya" },
      { "@type": "AdministrativeArea", "name": "Kalyan Nagar" },
      { "@type": "AdministrativeArea", "name": "HRBR Layout" },
      { "@type": "AdministrativeArea", "name": "Kammanahalli" },
      { "@type": "AdministrativeArea", "name": "Banaswadi" },
      { "@type": "AdministrativeArea", "name": "Ramamurthy Nagar" },
      { "@type": "AdministrativeArea", "name": "North Bengaluru" },
      { "@type": "AdministrativeArea", "name": "Bengaluru" }
    ],
    "medicalSpecialty": [
      "Dentistry",
      "CosmeticDentistry",
      "Orthodontics",
      "Endodontics",
      "PediatricDentistry",
      "Prosthodontics",
      "OralSurgery"
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Root Canal Treatment",
        "description": "Micro-precision cleaning and long-term tooth preservation using multi-sitting specialized protocols and digital imaging."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Clear Aligners and Invisible Braces",
        "description": "Discreet orthodontic smile alignment using advanced clear aligner technology."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Dental Implants",
        "description": "Permanent tooth replacement with biocompatible titanium implants and lifelike crowns."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Digital Smile Design and Veneers",
        "description": "Aesthetic smile makeovers tailored to facial harmony using digital precision."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Teeth Whitening and Polishing",
        "description": "Advanced gentle in-office whitening and stain removal for radiant smiles."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Pediatric / Kids Dentistry",
        "description": "Gentle cavity prevention, fluoride applications, and pit sealants for children."
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Dr. Shweta",
        "jobTitle": "Lead Aesthetic Architect & Founder",
        "alumniOf": "Oxford Dental College",
        "description": "Specialist in cosmetic smile design and aesthetic restorative dentistry with 5+ years experience."
      },
      {
        "@type": "Person",
        "name": "Dr. Agniss Mishra",
        "jobTitle": "Holistic Restorative Specialist",
        "alumniOf": "Oxford Dental College",
        "description": "Specialist in endodontics and holistic restorative dentistry with 4+ years experience."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": config.site_meta?.rating_value?.toString() || "5.0",
      "reviewCount": config.site_meta?.review_count?.toString() || "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": socialLinks
  };
}

export function generateFaqSchema(faqs: FaqItem[] = LOCAL_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateTreatmentServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  medicalSpecialty?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "provider": {
      "@type": "DentalClinic",
      "name": "Aureva Dental",
      "url": "https://aurevadental.com",
      "telephone": "+917349701002",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd Floor, No. 11/4, Horamavu Agara Road, Near Nayara Petrol Bunk, Hennur Bande",
        "addressLocality": "Bengaluru",
        "addressRegion": "KA",
        "postalCode": "560043",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0381741,
        "longitude": 77.6416031
      }
    }
  };
}

export function generateBlogPostSchema(params: {
  headline: string;
  description: string;
  url: string;
  authorName: string;
  authorJobTitle?: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": params.headline,
    "description": params.description,
    "author": {
      "@type": "Person",
      "name": params.authorName,
      "jobTitle": params.authorJobTitle || "Clinical Director & Dental Surgeon"
    },
    "publisher": {
      "@type": "DentalClinic",
      "name": "Aureva Dental",
      "url": "https://aurevadental.com"
    },
    "datePublished": params.datePublished,
    "dateModified": params.dateModified,
    "mainEntityOfPage": params.url
  };
}


