import rawConfig from '../data/config.json';
import type { AppConfig } from '../types/config';
import { CANONICAL_PRICES } from '../data/prices';

/**
 * Safely fetches and types the site configuration.
 * Automatically synchronizes prices with src/data/prices.ts (single source of truth).
 */
export function getConfig(): AppConfig {
  const cfg = JSON.parse(JSON.stringify(rawConfig)) as AppConfig;

  // Sync holistic services prices with CANONICAL_PRICES
  if (cfg.holistic_services?.categories) {
    for (const cat of cfg.holistic_services.categories) {
      for (const item of cat.items) {
        if (item.name.includes('Consultation')) {
          item.price = `${CANONICAL_PRICES.consultation} consultation · includes digital X-ray · valid for 6 months`;
        } else if (item.name.includes('Scaling')) {
          item.price = CANONICAL_PRICES.scaling_routine;
        } else if (item.name.includes('Filling')) {
          item.price = CANONICAL_PRICES.tooth_filling;
        } else if (item.name.includes('Extraction')) {
          item.price = `${CANONICAL_PRICES.extraction_simple_front_loose.split(' – ')[0]} – ${CANONICAL_PRICES.extraction_complex_surgical.split(' – ')[1]}`;
        } else if (item.name.includes('Anterior Root')) {
          item.price = CANONICAL_PRICES.rct_anterior;
        } else if (item.name.includes('Premolar')) {
          item.price = CANONICAL_PRICES.rct_premolar;
        } else if (item.name.includes('Molar')) {
          item.price = CANONICAL_PRICES.rct_molar;
        } else if (item.name.includes('Kids Dental Check-up')) {
          item.price = CANONICAL_PRICES.kids_checkup;
        } else if (item.name.includes('Fluoride Application')) {
          item.price = CANONICAL_PRICES.kids_fluoride;
        } else if (item.name.includes('Pit and Fissure Sealant')) {
          item.price = CANONICAL_PRICES.kids_sealant;
        }
      }
    }
  }

  // Sync specialized expertise prices with CANONICAL_PRICES
  if (cfg.specialized_expertise?.categories) {
    for (const cat of cfg.specialized_expertise.categories) {
      for (const item of cat.items) {
        if (item.name.includes('PFM')) {
          item.price = CANONICAL_PRICES.crown_pfm;
        } else if (item.name.includes('Ceramic') && item.name.includes('Aesthetic')) {
          item.price = CANONICAL_PRICES.crown_ceramic;
        } else if (item.name.includes('Monolithic Zirconia')) {
          item.price = CANONICAL_PRICES.crown_zirconia;
        } else if (item.name.includes('Dental Bridge')) {
          item.price = CANONICAL_PRICES.crown_overall;
        } else if (item.name.includes('Titanium Dental Implant')) {
          item.price = CANONICAL_PRICES.implant_single_fixture;
        } else if (item.name.includes('Implant with Custom Zirconia')) {
          item.price = CANONICAL_PRICES.implant_with_crown;
        } else if (item.name.includes('Full Mouth Rehabilitation')) {
          item.price = CANONICAL_PRICES.full_mouth_implants;
        } else if (item.name.includes('Traditional Metal Braces')) {
          item.price = CANONICAL_PRICES.braces_metal_starting;
        } else if (item.name.includes('Aesthetic Ceramic Braces')) {
          item.price = CANONICAL_PRICES.braces_ceramic_starting;
        } else if (item.name.includes('Clear Aligners')) {
          item.price = CANONICAL_PRICES.clear_aligners_overall;
        } else if (item.name.includes('Digital Smile Design Analysis')) {
          item.price = CANONICAL_PRICES.digital_smile_design;
        } else if (item.name.includes('In-Office Laser Teeth Whitening')) {
          item.price = CANONICAL_PRICES.whitening_laser;
        } else if (item.name.includes('Ceramic Veneers')) {
          item.price = CANONICAL_PRICES.veneers_porcelain.replace('per tooth', '').trim();
        } else if (item.name.includes('Full Smile Makeover')) {
          item.price = CANONICAL_PRICES.smile_makeover;
        }
      }
    }
  }

  return cfg;
}
