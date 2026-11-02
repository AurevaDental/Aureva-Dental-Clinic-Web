/**
 * Canonical Pricing Data Source & Formatter for Aureva Dental
 * All prices across page templates, components, JSON-LD schemas, and blog posts
 * must derive from this single source of truth.
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatPriceRange(min: number, max: number, suffix?: string): string {
  const range = `₹${formatINR(min)} – ₹${formatINR(max)}`;
  return suffix ? `${range} ${suffix}` : range;
}

export function formatStartingPrice(amount: number, suffix?: string): string {
  const price = `₹${formatINR(amount)} onwards`;
  return suffix ? `${price} ${suffix}` : price;
}

export function formatExactPrice(amount: number, suffix?: string): string {
  const price = `₹${formatINR(amount)}`;
  return suffix ? `${price} ${suffix}` : price;
}

export const CANONICAL_PRICES = {
  // Consultation & General
  consultation_home: `${formatExactPrice(600)}, valid for 6 months`,
  consultation: formatExactPrice(600),
  smile_consultation: formatExactPrice(600),
  scaling_routine: formatPriceRange(2000, 5000),
  scaling_pre_whitening: formatPriceRange(2000, 2500),
  tooth_filling: formatPriceRange(1500, 4000),
  emergency_temporary_filling: formatPriceRange(500, 1000),

  // Extraction & Wisdom Tooth
  extraction_simple: formatPriceRange(1500, 4000),
  extraction_complex_surgical: formatPriceRange(4000, 7000),
  extraction_simple_front_loose: formatPriceRange(1500, 2000),
  extraction_firm_posterior_molar: formatPriceRange(1500, 4000),
  extraction_overall: formatPriceRange(1500, 10000),
  wisdom_simple_erupted: formatPriceRange(4000, 5000),
  wisdom_soft_tissue: formatPriceRange(5000, 7000),
  wisdom_partial_bony: formatPriceRange(6000, 8000),
  wisdom_full_deep_bony: formatPriceRange(7000, 10000),
  wisdom_surgical_table: formatPriceRange(5000, 10000),
  wisdom_hennur_faq_overall: formatPriceRange(4000, 10000),
  wisdom_rvg_consultation: formatExactPrice(600),
  emergency_extraction: formatPriceRange(4000, 10000),

  // Root Canal Treatment
  rct_anterior: formatPriceRange(4000, 6000),
  rct_premolar: formatPriceRange(5000, 8000),
  rct_molar: formatPriceRange(6000, 10000),
  rct_overall: formatPriceRange(4000, 10000),
  emergency_single_sitting_rct: formatPriceRange(4000, 10000),

  // Crowns & Bridges
  crown_metal: formatPriceRange(3000, 5000),
  crown_pfm: formatPriceRange(5000, 8000),
  crown_ceramic: formatPriceRange(6000, 10000),
  crown_pfm_ceramic_combined: formatPriceRange(5000, 10000),
  crown_zirconia: formatPriceRange(10000, 18000),
  crown_emax: formatPriceRange(12000, 18000),
  bridge_unit_zirconia: formatPriceRange(10000, 18000, 'per unit'),
  crown_bridge_recementation: formatPriceRange(800, 2000),
  broken_tooth_composite_repair: formatPriceRange(1500, 4000),

  // Dentures
  denture_acrylic_complete: formatPriceRange(20000, 35000, 'per arch'),
  denture_bps_complete: formatPriceRange(40000, 75000, 'per arch'),

  // Implants
  implant_single_fixture: formatPriceRange(35000, 60000),
  implant_with_crown: formatPriceRange(45000, 80000),
  hennur_implant_standard: formatPriceRange(35000, 60000),
  hennur_cadcam_zirconia_crown_abutment: formatPriceRange(10000, 18000),
  zirconia_implants: formatPriceRange(60000, 85000),
  implant_pre_surgical_assessment: formatPriceRange(2500, 4000),
  implant_prp_prf: formatPriceRange(3000, 6000),
  implant_sinus_lift: formatPriceRange(15000, 20000),
  implant_all_on_6: formatPriceRange(250000, 450000),
  full_mouth_implants: formatStartingPrice(250000),

  // Aligners & Braces
  clear_aligners_overall: formatPriceRange(80000, 250000),
  clear_aligners_mild: formatPriceRange(80000, 120000),
  clear_aligners_moderate: formatPriceRange(120000, 180000),
  clear_aligners_complex: formatPriceRange(180000, 250000),
  braces_metal_starting: formatStartingPrice(30000),
  braces_metal_range: formatPriceRange(30000, 45000),
  braces_ceramic_starting: formatStartingPrice(45000),
  braces_ceramic_range: formatPriceRange(45000, 80000),
  braces_overall: formatPriceRange(30000, 80000),
  braces_self_ligating: formatPriceRange(60000, 80000),
  aligners_indian_systems: formatPriceRange(80000, 140000),
  invisalign: `₹${formatINR(150000)} – ₹${formatINR(250000)}+`,

  // Cosmetic & Whitening
  whitening_laser: formatPriceRange(8000, 15000),
  whitening_trays: formatPriceRange(5000, 9000),
  whitening_combo: formatPriceRange(12000, 18000),
  whitening_otc: formatPriceRange(500, 2500),
  digital_smile_design: formatPriceRange(5000, 10000),
  veneers_porcelain: formatPriceRange(8000, 25000, 'per tooth'),
  veneers_direct_composite: formatPriceRange(4500, 8000, 'per tooth'),
  composite_edge_bonding: formatPriceRange(1500, 4000, 'per tooth'),
  emax_veneers: formatPriceRange(10000, 18000),
  enamel_contouring: formatPriceRange(1000, 2000),
  smile_makeover: formatStartingPrice(80000),

  // Bridal & Membership
  bridal_checkup: formatExactPrice(1000),
  luxury_couture_smile: formatPriceRange(120000, 180000),
  membership_essential: `${formatExactPrice(7000)} per year`,
  membership_privilege: `${formatExactPrice(18000)} per year`,
  membership_royalty: `${formatExactPrice(35000)} per year`,

  // Kids
  kids_checkup: formatExactPrice(600),
  kids_fluoride: formatPriceRange(1500, 2000, 'per arch'),
  kids_sealant: formatPriceRange(1500, 2500, 'per tooth'),
  kids_filling: formatPriceRange(1500, 3500),
  baby_tooth_pulpectomy: formatPriceRange(3500, 6000)
} as const;

export default CANONICAL_PRICES;

