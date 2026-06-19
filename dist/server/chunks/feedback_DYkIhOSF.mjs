import { c as createComponent } from './astro-component_BgAo1ZKS.mjs';
import 'piccolore';
import { o as createRenderInstruction, m as maybeRenderHead, g as addAttribute, h as renderTemplate, p as defineStyleVars, q as renderSlot, t as renderComponent, v as renderHead } from './server_D1X-c9LY.mjs';
import 'clsx';
import fs from 'node:fs/promises';
import path from 'node:path';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const isHome = Astro2.url.pathname === "/" || Astro2.url.pathname === "";
  const servicesLink = isHome ? "#services" : "/#services";
  const teamLink = isHome ? "#team" : "/#team";
  const locationsLink = isHome ? "#locations" : "/#locations";
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 w-full border-b border-japandi-clay/20 bg-japandi-cream/80 backdrop-blur-md px-6 py-4 lg:px-24"> <div class="max-w-7xl mx-auto flex items-center justify-between"> <!-- Logo and Title --> <a href="/" class="flex items-center gap-2.5 group"> <!-- Minimalist abstract Lotus/Tooth emblem --> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-japandi-moss group-hover:scale-105 transition-transform duration-300"> <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 5.5 3.5 7.5S12 20 12 22c0-2 2.5-4.5 2.5-6.5S18 11.5 18 8c0-3.5-2.5-6-6-6Z"></path> <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path> </svg> <span class="font-serif font-semibold text-lg text-japandi-charcoal tracking-wider">Aureva Dental</span> </a> <!-- Navigation and Toggle --> <nav class="flex items-center gap-8"> <div class="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-japandi-earth"> <a${addAttribute(servicesLink, "href")} class="hover:text-japandi-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-japandi-moss hover:after:w-full after:transition-all after:duration-300">Services</a> <a${addAttribute(teamLink, "href")} class="hover:text-japandi-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-japandi-moss hover:after:w-full after:transition-all after:duration-300">Artisans</a> <a${addAttribute(locationsLink, "href")} class="hover:text-japandi-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-japandi-moss hover:after:w-full after:transition-all after:duration-300">Sanctuaries</a> <a href="/feedback" class="hover:text-japandi-charcoal transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-japandi-moss hover:after:w-full after:transition-all after:duration-300">Feedback Form</a> </div> <div class="flex items-center gap-4"> <!-- Mobile/Compact feedback icon link --> <a href="/feedback" class="md:hidden p-2 text-japandi-moss hover:text-japandi-charcoal hover:bg-japandi-sand/30 rounded-full transition-all" aria-label="Feedback Form"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"> <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path> </svg> </a> <!-- Premium Minimalist Theme Toggle Switch --> <button id="theme-toggle" class="p-2.5 rounded-full border border-japandi-clay/45 bg-japandi-sand/40 hover:bg-japandi-sand/75 text-japandi-moss hover:text-japandi-charcoal transition-all cursor-none focus:outline-none" aria-label="Toggle Dark Mode"> <!-- Sun Icon (Visible in light mode, hidden in dark mode) --> <svg id="theme-toggle-light-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 dark:hidden"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M5.25 5.25l1.5 1.5m10.5 10.5l1.5 1.5M3 12h2.25m13.5 0H21M5.25 18.75l1.5-1.5m10.5-10.5l1.5-1.5M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path> </svg> <!-- Moon Icon (Hidden in light mode, visible in dark mode) --> <svg id="theme-toggle-dark-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 hidden dark:block"> <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path> </svg> </button> </div> </nav> </div> </header> ${renderScript($$result, "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/components/Header.astro", void 0);

const site_meta = {"title":"Aureva Dental | Serene & Modern Japandi Dental Care","description":"Experience premium, stress-free dental care in a space inspired by Japandi aesthetics. Calm environment, holistic treatments, and expert care.","whatsapp_number":"12065550190","whatsapp_default_message":"Hello Aureva Dental, I would like to schedule a dental consultation."};
const theme_colors = {"light":{"bg_primary":"#F5F2EB","bg_secondary":"#EAE4D9","border_color":"#D6CEBF","text_primary":"#2A2C2B","accent_moss":"#4E5E50","accent_earth":"#8D7B68"},"dark":{"bg_primary":"#1C1F1D","bg_secondary":"#242825","border_color":"#383E3A","text_primary":"#ECE7DF","accent_moss":"#7D9082","accent_earth":"#A89A8A"}};
const hero_section = {"headline":"Calm Mind. Healthy Smile.","sub_headline":"Experience dental care re-imagined as a soothing ritual. Minimalist design, warm earth tones, and pain-free treatments for your peace of mind.","cta_text":"Begin Your Journey","video_url":"https://assets.mixkit.co/videos/preview/mixkit-modern-dental-office-interior-41984-large.mp4"};
const services_section = {"title":"Holistic Services","subtitle":"Mindful treatments tailored to your body's natural balance.","services_list":[{"id":"preventive","title":"Holistic Prevention","description":"Biological dental cleanings, biomimetic sealants, and gentle diagnostics centered on preserving your natural tooth structure.","duration":"60 mins","price":"From $150"},{"id":"cosmetic","title":"Minimally Invasive Esthetics","description":"Artisanal porcelain veneers, biological whitening, and composite bonding that enhance your unique, natural smile.","duration":"90 mins","price":"Custom Pricing"},{"id":"restorative","title":"Restorative Harmony","description":"Metal-free zirconia implants, biological crowns, and ceramic restorations designed to integrate seamlessly with your body.","duration":"120 mins","price":"From $850"}]};
const doctors_section = {"title":"Our Artisans","subtitle":"Meet the practitioners who blend clinical excellence with artistic care.","team":[{"id":"takahashi","name":"Dr. Emi Takahashi, DDS","role":"Lead Aesthetic Architect","qualifications":"Harvard School of Dental Medicine / 12 Years Exp.","image_url":"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=800","philosophy":"Dentistry is the quiet harmony of biological health and clean visual art."},{"id":"vance","name":"Dr. Lukas Vance, DMD","role":"Holistic Restorative Specialist","qualifications":"UCSF School of Dentistry / 9 Years Exp.","image_url":"https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=800","philosophy":"Treating the mouth is treating the gateway to the entire body's wellness."}]};
const locations_section = {"title":"Serene Sanctuaries","subtitle":"Find peace in our clinic locations designed with Japandi principles.","locations_list":[{"id":"seattle","name":"Aureva Dental — Seattle","address":"120 Kyoto Way, Suite 400, Seattle, WA 98101","google_maps_url":"https://maps.google.com/?q=Kyoto+Way+Seattle+WA","phone":"(206) 555-0190","hours":"Mon - Fri: 8:00 AM - 5:00 PM"}]};
const social_proof = {"title":"Serene Experiences","subtitle":"Stories of healing, comfort, and radiant smiles from our patients.","testimonials":[{"name":"Aria Montgomery","role":"Creative Director","text":"The most peaceful dental visit I've ever had. The warm wood textures, gentle background music, and Dr. Takahashi's touch made me feel like I was in a high-end spa, not a dental chair.","rating":5},{"name":"Kenji Tanaka","role":"Architect","text":"I highly appreciate the Japandi minimalism of the clinic. But more than the gorgeous layout, Dr. Vance's holistic focus and painless biological approach solved my severe dental anxiety.","rating":5}]};
const rawConfig = {
  site_meta,
  theme_colors,
  hero_section,
  services_section,
  doctors_section,
  locations_section,
  social_proof,
};

function getConfig() {
  return rawConfig;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const config = getConfig();
  const { title, description } = config.site_meta;
  const $$definedVars = defineStyleVars([{
    lightBgPrimary: config.theme_colors.light.bg_primary,
    lightBgSecondary: config.theme_colors.light.bg_secondary,
    lightBorder: config.theme_colors.light.border_color,
    lightText: config.theme_colors.light.text_primary,
    lightMoss: config.theme_colors.light.accent_moss,
    lightEarth: config.theme_colors.light.accent_earth,
    darkBgPrimary: config.theme_colors.dark.bg_primary,
    darkBgSecondary: config.theme_colors.dark.bg_secondary,
    darkBorder: config.theme_colors.dark.border_color,
    darkText: config.theme_colors.dark.text_primary,
    darkMoss: config.theme_colors.dark.accent_moss,
    darkEarth: config.theme_colors.dark.accent_earth
  }]);
  return renderTemplate(_a || (_a = __template(['<html lang="en"', '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- Theme toggle prevention of flash (FOUC) --><script>\n			(function() {\n				const savedTheme = localStorage.getItem('theme');\n				if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {\n					document.documentElement.classList.add('dark');\n				} else {\n					document.documentElement.classList.remove('dark');\n				}\n			})();\n		<\/script><!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"', '><meta property="twitter:description"', `><!-- Asynchronous Google Fonts Loading for zero-render blocking --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" media="print" onload="this.media='all'">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"></noscript>', '</head> <body class="bg-japandi-cream text-japandi-charcoal font-sans antialiased selection:bg-japandi-clay selection:text-japandi-charcoal min-h-screen flex flex-col"', "> <!-- Custom Interactive Cursor Component --> ", " <!-- Sticky Header Component --> ", ' <!-- Main Content Slot --> <main class="flex-grow"', "> ", " </main></body></html>"])), addAttribute($$definedVars, "style"), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), maybeRenderHead(), renderHead(), addAttribute($$definedVars, "style"), renderComponent($$result, "CustomCursor", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/components/CustomCursor", "client:component-export": "default" }), renderComponent($$result, "Header", $$Header, {}), addAttribute($$definedVars, "style"), renderSlot($$result, $$slots["default"]));
}, "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/layouts/Layout.astro", void 0);

const prerender = false;
const $$Feedback = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Feedback;
  let success = false;
  let error = "";
  let formName = "";
  let formRole = "";
  let formText = "";
  let formRating = "5";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      formName = formData.get("name")?.toString().trim() || "";
      formRole = formData.get("role")?.toString().trim() || "";
      formText = formData.get("text")?.toString().trim() || "";
      formRating = formData.get("rating")?.toString() || "5";
      const ratingInt = parseInt(formRating, 10);
      if (!formName || !formRole || !formText) {
        error = "All fields are required. Please fill in all details.";
      } else if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
        error = "Invalid rating value.";
      } else {
        const configPath = path.resolve("./src/data/config.json");
        const rawData = await fs.readFile(configPath, "utf-8");
        const config = JSON.parse(rawData);
        if (!config.social_proof) {
          config.social_proof = { title: "Serene Experiences", subtitle: "", testimonials: [] };
        }
        if (!config.social_proof.testimonials) {
          config.social_proof.testimonials = [];
        }
        config.social_proof.testimonials.push({
          name: formName,
          role: formRole,
          text: formText,
          rating: ratingInt
        });
        await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
        success = true;
      }
    } catch (err) {
      error = "Failed to submit feedback: " + err.message;
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[85vh] flex items-center justify-center px-6 py-16 lg:px-24"> <div class="w-full max-w-xl bg-japandi-sand/35 border border-japandi-clay/40 rounded-[2.5rem] p-8 md:p-12 hover:shadow-xl hover:shadow-japandi-charcoal/5 transition-all duration-500 animate-slow-fade"> ${success ? renderTemplate`<!-- Success State -->
        <div class="text-center space-y-6 py-8"> <div class="w-16 h-16 rounded-full bg-japandi-moss/10 text-japandi-moss flex items-center justify-center mx-auto scale-110 animate-bounce"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8"> <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path> </svg> </div> <h2 class="text-3xl font-serif text-japandi-charcoal font-medium">Thank You</h2> <p class="text-sm text-japandi-earth font-light max-w-sm mx-auto leading-relaxed">
Your serene experience has been successfully recorded. It has been added to our testimonial database and will show on the homepage.
</p> <div class="pt-6"> <a href="/" class="inline-flex items-center justify-center px-8 py-3.5 bg-japandi-moss text-japandi-cream hover:bg-japandi-charcoal font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5">
Return to Sanctuary
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2"> <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path> </svg> </a> </div> </div>` : renderTemplate`<!-- Feedback Form -->
        <div class="space-y-8"> <div class="text-center md:text-left"> <p class="text-xs font-semibold text-japandi-earth uppercase tracking-widest mb-3">Share Your Journey</p> <h2 class="text-3xl sm:text-4xl font-serif text-japandi-charcoal font-medium tracking-tight">Serene Experience</h2> <p class="text-xs text-japandi-earth font-light mt-2 leading-relaxed">
We appreciate you sharing your healing, comfort, and wellness story with us.
</p> </div> ${error && renderTemplate`<div class="p-4 bg-red-500/10 border border-red-500/30 text-red-600 rounded-2xl text-xs font-medium flex items-center gap-3"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 flex-shrink-0"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path> </svg> <span>${error}</span> </div>`} <form method="POST" class="space-y-6"> <!-- Name Input --> <div class="flex flex-col space-y-2"> <label for="name" class="text-xs font-medium uppercase tracking-widest text-japandi-earth">Full Name</label> <input type="text" name="name" id="name"${addAttribute(formName, "value")} placeholder="Aria Montgomery" required class="w-full bg-japandi-sand/35 hover:bg-japandi-sand/60 focus:bg-japandi-cream dark:focus:bg-japandi-sand/10 border border-japandi-clay/45 rounded-2xl px-4 py-3.5 text-sm text-japandi-charcoal focus:outline-none focus:ring-1 focus:ring-japandi-moss/50 focus:border-japandi-moss/50 transition-all cursor-none"> </div> <!-- Role Input --> <div class="flex flex-col space-y-2"> <label for="role" class="text-xs font-medium uppercase tracking-widest text-japandi-earth">Profession / Role</label> <input type="text" name="role" id="role"${addAttribute(formRole, "value")} placeholder="Creative Director" required class="w-full bg-japandi-sand/35 hover:bg-japandi-sand/60 focus:bg-japandi-cream dark:focus:bg-japandi-sand/10 border border-japandi-clay/45 rounded-2xl px-4 py-3.5 text-sm text-japandi-charcoal focus:outline-none focus:ring-1 focus:ring-japandi-moss/50 focus:border-japandi-moss/50 transition-all cursor-none"> </div> <!-- Star Rating Selection --> <div class="flex flex-col space-y-2"> <label class="text-xs font-medium uppercase tracking-widest text-japandi-earth">Rating</label> <div class="flex items-center gap-2"> <div class="flex gap-1.5 py-1"> ${Array.from({ length: 5 }).map((_, i) => {
    const starVal = i + 1;
    return renderTemplate`<button type="button"${addAttribute(starVal, "data-value")} class="star-btn text-3xl transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-none">
★
</button>`;
  })} </div> <span id="rating-label" class="text-xs text-japandi-earth font-light ml-2">Excellent</span> <input type="hidden" name="rating" id="rating-input"${addAttribute(formRating, "value")}> </div> </div> <!-- Testimonial Text Input --> <div class="flex flex-col space-y-2"> <label for="text" class="text-xs font-medium uppercase tracking-widest text-japandi-earth">Your Experience</label> <textarea name="text" id="text" rows="4" placeholder="Share the details of your visit. For example, how our biological treatments or calming environment helped you..." required class="w-full bg-japandi-sand/35 hover:bg-japandi-sand/60 focus:bg-japandi-cream dark:focus:bg-japandi-sand/10 border border-japandi-clay/45 rounded-2xl px-4 py-3.5 text-sm text-japandi-charcoal focus:outline-none focus:ring-1 focus:ring-japandi-moss/50 focus:border-japandi-moss/50 transition-all cursor-none resize-none leading-relaxed">${formText}</textarea> </div> <!-- Submit Button --> <div class="pt-4"> <button type="submit" class="w-full inline-flex items-center justify-center px-8 py-4 bg-japandi-moss text-japandi-cream hover:bg-japandi-charcoal font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-japandi-moss/10 focus:outline-none cursor-none">
Submit Feedback
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"></path> </svg> </button> </div> </form> </div>`} </div> </div> ` })} ${renderScript($$result, "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/pages/feedback.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/pages/feedback.astro", void 0);

const $$file = "C:/Users/sarmi/OneDrive/Documents/Antigravity Projects/src/pages/feedback.astro";
const $$url = "/feedback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Feedback,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
