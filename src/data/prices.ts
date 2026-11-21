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

export function addPriceRanges(rangeA: readonly [number, number], rangeB: readonly [number, number]): string {
  return formatPriceRange(rangeA[0] + rangeB[0], rangeA[1] + rangeB[1]);
}

export function multiplyPriceRange(units: number, range: readonly [number, number]): string {
  return formatPriceRange(units * range[0], units * range[1]);
}

export const PRICE_VALUES = {
  consultation: 600,
  rct_anterior: [4000, 6000] as const,
  rct_premolar: [5000, 8000] as const,
  rct_molar: [6000, 10000] as const,
  rct_re_treatment: [8000, 10000] as const,
  crown_pfm: [4000, 6000] as const,
  crown_ceramic: [6000, 10000] as const,
  crown_zirconia: [10000, 18000] as const,
  crown_emax: [10000, 18000] as const,
  denture_partial_acrylic: [3000, 25000] as const,
  denture_partial_cast_metal: [10000, 40000] as const,
  denture_flexible_partial: [5000, 25000] as const,
  extraction_overall: [1500, 5000] as const,
  extraction_front_loose: [1500, 2000] as const,
  extraction_back_tooth: [3000, 4000] as const,
  extraction_surgical: [3500, 5000] as const,
  wisdom_overall: [4000, 10000] as const,
  wisdom_erupted: [4000, 5000] as const,
  wisdom_soft_tissue: [5000, 7000] as const,
  wisdom_partial_bony: [6000, 8000] as const,
  wisdom_deep_bony: [7000, 10000] as const,
  bone_graft: [15000, 20000] as const,
  sinus_lift: [15000, 20000] as const,
  prp_prf: [3000, 6000] as const,
  cbct_partner_scan: [2500, 4000] as const,
  all_on_4: [180000, 320000] as const,
  all_on_6: [250000, 450000] as const,
  braces_metal: [30000, 45000] as const,
  braces_ceramic: [45000, 80000] as const,
  aligners_mild: [80000, 120000] as const,
  aligners_moderate: [120000, 180000] as const,
  aligners_complex: [180000, 250000] as const,
  bridal_express_glow: [12000, 18000] as const,
  bridal_signature: [35000, 55000] as const,
  bridal_luxury_couture: [120000, 180000] as const,
  bridal_couple_radiance: [180000, 250000] as const,
  airport_cab_fare: [800, 1200] as const,
} as const;

export const CALCULATED_TOTALS = {
  molar_pfm: addPriceRanges(PRICE_VALUES.rct_molar, PRICE_VALUES.crown_pfm),
  molar_zirconia: addPriceRanges(PRICE_VALUES.rct_molar, PRICE_VALUES.crown_zirconia),
  premolar_pfm: addPriceRanges(PRICE_VALUES.rct_premolar, PRICE_VALUES.crown_pfm),
  premolar_emax: addPriceRanges(PRICE_VALUES.rct_premolar, PRICE_VALUES.crown_emax),
  front_ceramic: addPriceRanges(PRICE_VALUES.rct_anterior, PRICE_VALUES.crown_ceramic),
  bridge_3_unit_pfm: multiplyPriceRange(3, PRICE_VALUES.crown_pfm),
  partial_dentures_overall: formatPriceRange(
    Math.min(PRICE_VALUES.denture_partial_acrylic[0], PRICE_VALUES.denture_partial_cast_metal[0], PRICE_VALUES.denture_flexible_partial[0]),
    Math.max(PRICE_VALUES.denture_partial_acrylic[1], PRICE_VALUES.denture_partial_cast_metal[1], PRICE_VALUES.denture_flexible_partial[1])
  )
} as const;

export const CANONICAL_PRICES = {
  // Consultation & General
  consultation_home: `${formatExactPrice(600)}, valid for 6 months`,
  consultation: formatExactPrice(600),
  smile_consultation: formatExactPrice(600),
  scaling_routine: formatPriceRange(2000, 5000),
  scaling_deep: formatPriceRange(8000, 15000),
  scaling_pre_whitening: formatPriceRange(2000, 2500),
  tooth_filling: formatPriceRange(1500, 4000),
  temporary_filling: formatPriceRange(500, 1000),
  emergency_temporary_filling: formatPriceRange(500, 1000),
  emergency_pain_dressing: formatPriceRange(1500, 2500),
  incision_drainage: formatPriceRange(2000, 3000),

  // Extraction & Wisdom Tooth
  extraction_simple: formatPriceRange(1500, 4000),
  extraction_complex_surgical: formatPriceRange(4000, 7000),
  extraction_simple_front_loose: formatPriceRange(1500, 2000),
  extraction_front_loose: formatPriceRange(1500, 2000),
  extraction_back_tooth: formatPriceRange(3000, 4000),
  extraction_surgical: formatPriceRange(3500, 5000),
  extraction_firm_posterior_molar: formatPriceRange(1500, 4000),
  extraction_overall: formatPriceRange(1500, 5000),
  wisdom_simple_erupted: formatPriceRange(4000, 5000),
  wisdom_erupted: formatPriceRange(4000, 5000),
  wisdom_soft_tissue: formatPriceRange(5000, 7000),
  wisdom_partial_bony: formatPriceRange(6000, 8000),
  wisdom_full_deep_bony: formatPriceRange(7000, 10000),
  wisdom_deep_bony: formatPriceRange(7000, 10000),
  wisdom_surgical_table: formatPriceRange(5000, 10000),
  wisdom_hennur_faq_overall: formatPriceRange(4000, 10000),
  wisdom_overall: formatPriceRange(4000, 10000),
  wisdom_rvg_consultation: formatExactPrice(600),
  emergency_extraction: formatPriceRange(4000, 10000),

  // Root Canal Treatment
  rct_anterior: formatPriceRange(4000, 6000),
  rct_premolar: formatPriceRange(5000, 8000),
  rct_molar: formatPriceRange(6000, 10000),
  rct_re_treatment: formatPriceRange(8000, 10000),
  rct_overall: formatPriceRange(4000, 10000),
  emergency_single_sitting_rct: formatPriceRange(4000, 10000),

  // Crowns & Bridges
  crown_pfm: formatPriceRange(4000, 6000),
  crown_ceramic: formatPriceRange(6000, 10000),
  crown_pfm_ceramic_combined: formatPriceRange(5000, 10000),
  crown_zirconia: formatPriceRange(10000, 18000),
  crown_emax: formatPriceRange(10000, 18000),
  crown_overall: formatPriceRange(4000, 18000),
  crown_recementation: formatPriceRange(800, 2000),
  crown_bridge_recementation: formatPriceRange(800, 2000),
  bridge_unit: formatPriceRange(4000, 18000, 'per unit'),
  bridge_per_unit: formatPriceRange(4000, 18000, 'per unit'),
  bridge_unit_zirconia: formatPriceRange(10000, 18000, 'per unit'),
  broken_tooth_composite_repair: formatPriceRange(1500, 4000),

  // Dentures
  denture_complete_single_arch: formatPriceRange(15000, 25000),
  denture_complete_both_arches: formatPriceRange(30000, 50000),
  denture_partial_acrylic: formatPriceRange(3000, 25000),
  denture_partial_acrylic_table: `${formatPriceRange(3000, 25000)} (depends on number of teeth)`,
  denture_partial_cast_metal: formatPriceRange(10000, 40000),
  denture_flexible_partial: formatPriceRange(5000, 25000),
  denture_implant_supported_overdenture: formatPriceRange(20000, 50000),
  denture_reline_repair: formatPriceRange(1500, 6000),
  denture_acrylic_complete: formatPriceRange(15000, 25000, 'per arch'),
  denture_bps_complete: formatPriceRange(40000, 75000, 'per arch'),

  // Implants
  implant_single_fixture: formatPriceRange(35000, 60000),
  implant_with_crown: formatPriceRange(45000, 80000),
  hennur_implant_standard: formatPriceRange(35000, 60000),
  hennur_cadcam_zirconia_crown_abutment: formatPriceRange(10000, 18000),
  zirconia_implants: formatPriceRange(60000, 85000),
  implant_pre_surgical_assessment: formatPriceRange(2500, 4000),
  cbct_partner_scan: formatPriceRange(2500, 4000),
  implant_prp_prf: formatPriceRange(3000, 6000),
  prp_prf: formatPriceRange(3000, 6000),
  implant_sinus_lift: formatPriceRange(15000, 20000),
  sinus_lift: formatPriceRange(15000, 20000),
  bone_graft: formatPriceRange(15000, 20000),
  all_on_4: formatPriceRange(180000, 320000, 'per arch'),
  all_on_6: formatPriceRange(250000, 450000, 'per arch'),
  implant_all_on_6: formatPriceRange(250000, 450000),
  full_mouth_implants: "From ₹1,80,000 per arch",
  full_mouth_implants_from: "From ₹1,80,000 per arch",

  // Aligners & Braces
  clear_aligners_overall: formatPriceRange(80000, 250000),
  clear_aligners_mild: formatPriceRange(80000, 120000),
  aligners_mild: formatPriceRange(80000, 120000),
  clear_aligners_moderate: formatPriceRange(120000, 180000),
  aligners_moderate: formatPriceRange(120000, 180000),
  clear_aligners_complex: formatPriceRange(180000, 250000),
  aligners_complex: formatPriceRange(180000, 250000),
  braces_metal: formatPriceRange(30000, 45000),
  braces_metal_starting: formatStartingPrice(30000),
  braces_metal_range: formatPriceRange(30000, 45000),
  braces_ceramic: formatPriceRange(45000, 80000),
  braces_ceramic_starting: formatStartingPrice(45000),
  braces_ceramic_range: formatPriceRange(45000, 80000),
  braces_overall: formatPriceRange(30000, 80000),
  braces_self_ligating: formatPriceRange(60000, 80000),
  aligners_indian_systems: formatPriceRange(80000, 140000),
  invisalign: formatPriceRange(150000, 250000),

  // Cosmetic & Whitening
  whitening_laser: formatPriceRange(8000, 15000),
  whitening_in_clinic: formatPriceRange(8000, 15000),
  whitening_trays: formatPriceRange(5000, 9000),
  whitening_take_home: formatPriceRange(5000, 9000),
  whitening_combo: formatPriceRange(12000, 18000),
  whitening_otc: formatPriceRange(500, 2500),
  digital_smile_design: formatPriceRange(5000, 10000),
  veneers_porcelain: formatPriceRange(8000, 24000, 'per tooth'),
  veneers_direct_composite: formatPriceRange(4500, 8000, 'per tooth'),
  composite_veneers: formatPriceRange(4500, 8000, 'per tooth'),
  composite_edge_bonding: formatPriceRange(1500, 4000, 'per tooth'),
  composite_bonding: formatPriceRange(1500, 4000, 'per tooth'),
  emax_veneers: formatPriceRange(10000, 18000),
  enamel_contouring: formatPriceRange(1000, 2000),
  smile_makeover: formatStartingPrice(80000),

  // Bridal & Membership
  bridal_couple_consultation: "₹1,000 (₹600 individual)",
  bridal_express_glow: formatPriceRange(12000, 18000),
  bridal_signature: formatPriceRange(35000, 55000),
  bridal_luxury_couture: formatPriceRange(120000, 180000),
  luxury_couture_smile: formatPriceRange(120000, 180000),
  bridal_couple_radiance: formatPriceRange(180000, 250000),
  membership_essential: `${formatExactPrice(7000)} per year`,
  membership_privilege: `${formatExactPrice(18000)} per year`,
  membership_royalty: `${formatExactPrice(35000)} per year`,

  // Kids
  kids_checkup: formatExactPrice(600),
  kids_fluoride: formatPriceRange(1500, 2000, 'per arch'),
  kids_sealant: formatPriceRange(1500, 2500, 'per tooth'),
  kids_filling: formatPriceRange(1000, 3000),
  baby_tooth_pulpectomy: formatPriceRange(3500, 6000),
  kids_dentistry_summary: `Check-up ${formatExactPrice(600)} · fillings ${formatPriceRange(1000, 3000)}`,

  // Information only
  airport_cab_fare: formatPriceRange(800, 1200),
} as const;

export default CANONICAL_PRICES;

