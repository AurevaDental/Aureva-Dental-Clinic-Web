export interface SiteMeta {
  title: string;
  description: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
}

export interface HeroSection {
  headline: string;
  sub_headline: string;
  cta_text: string;
  video_url: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

export interface ServicesSection {
  title: string;
  subtitle: string;
  services_list: Service[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  image_url: string;
  philosophy: string;
}

export interface DoctorsSection {
  title: string;
  subtitle: string;
  team: TeamMember[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  google_maps_url: string;
  phone: string;
  hours: string;
}

export interface LocationsSection {
  title: string;
  subtitle: string;
  locations_list: Location[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface SocialProof {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export interface ThemeColors {
  bg_primary: string;
  bg_secondary: string;
  border_color: string;
  text_primary: string;
  accent_moss: string;
  accent_earth: string;
}

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

export interface AppConfig {
  site_meta: SiteMeta;
  theme_colors: ThemeConfig;
  hero_section: HeroSection;
  services_section: ServicesSection;
  doctors_section: DoctorsSection;
  locations_section: LocationsSection;
  social_proof: SocialProof;
  show_stats_section?: boolean;
  [key: string]: any;
}
