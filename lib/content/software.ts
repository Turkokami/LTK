/**
 * software.ts — researched guides to pest control business software, checked 2026-10-04 from
 * vendor pages first. These are NOT hands-on reviews: no scores, no winners. Prices are as
 * published on the date checked. Weaker-sourced items to spot-check: ServSuite pest features
 * (directory listings), Pocomos ownership, Briostack's parent company.
 */

export interface SoftwareGuide {
  slug: string;              // kebab-case, e.g. 'pestpac'
  name: string;              // product name
  maker: string;             // company that makes it
  url: string;               // official product URL
  title: string;             // page title, <= 52 characters (site appends " · LTK")
  description: string;       // meta description, 140–160 characters
  summary: string;           // 2–3 sentences: what it is and who it suits
  builtFor: string;          // as the vendor positions it
  pestSpecific: boolean;     // built specifically for pest control (true) or general field service (false)
  features: string[];        // 6–10 core features, short phrases
  pestFeatures: string[];    // pest-control-specific features (may be empty for general tools)
  pricing: string;           // as published, with "as listed on <date>" or "Pricing by quote"
  integrations: string[];    // notable integrations, only if verified
  checkBeforeBuying: string[]; // 4–6 practical questions to ask in a demo
  sources: { name: string; url: string }[]; // pages actually read
  checked: string;           // ISO date checked
}

export const SOFTWARE_GUIDES: SoftwareGuide[] = [
  {
    slug: 'pestpac',
    name: 'PestPac',
    maker: 'WorkWave',
    url: 'https://www.pestpac.com/',
    title: 'PestPac: pest control software guide',
    description:
      'Researched guide to PestPac by WorkWave: termite and WDO forms, chemical tracking with state exports, commercial tools, integrations and what to ask in a demo.',
    summary:
      'PestPac is WorkWave’s pest control business platform, covering scheduling, routing, CRM, billing, a technician mobile app and reporting. Its feature pages lean heavily into compliance paperwork — state WDO forms, chemical reporting exports and commercial audit records — which makes it most relevant to operators who run termite or commercial accounts alongside residential routes.',
    builtFor:
      'Pest control operators from small family businesses to large national companies; pricing page lists Small Business, Professional and Enterprise tiers',
    pestSpecific: true,
    features: [
      'Scheduling and route optimization',
      'Pest control CRM',
      'Technician mobile app for iOS and Android',
      'Accounting and billing tools',
      'Customer portal and customer communication tools',
      'Custom digital forms',
      'Reporting, plus the Wavelytics analytics product',
      'Website builder and marketing services',
      'Door-to-door sales tools',
      'API and partner integrations',
    ],
    pestFeatures: [
      'Chemical records carry EPA registration number, concentration and undiluted quantity',
      'State compliance exports, including California material and Cal-Ag reports and Arizona TARF reports',
      'Chemical inventory tracked from distributor to warehouse to truck, with usage projections from scheduled jobs',
      'State WDI/WDO forms preloaded (including California WDO), plus NPMA-33',
      'Graph and sketch tools on grids or aerial images, with a polygon tool for square and linear footage',
      'Bait station barcode scanning using the device camera',
      'Sentricon report submission and Dow AgroSciences monthly / product stewardship reports',
      'Commercial digital logbook, trend logs, floor-plan device maps and auditor-only access',
      'Smart trap scanning over Bluetooth or Wi-Fi for rodent monitoring',
    ],
    pricing:
      'Pricing by quote. The pricing page (checked 2026-10-04) names Small Business, Professional and Enterprise packages but publishes no dollar amounts and directs buyers to a consultant.',
    integrations: [
      'QuickBooks',
      'Avalara',
      'Azuga',
      'Verizon Connect',
      'Linxup',
      'Holman',
      'Bell IQ Smart Traps',
      'CallTrackingMetrics',
      'Voice for Pest',
      'Target Specialty Products',
    ],
    checkBeforeBuying: [
      'Which package (Small Business, Professional or Enterprise) includes chemical tracking, termite forms and commercial tools, and which are paid modules?',
      'Are the state forms and chemical reporting exports we need for our state already built, and who maintains them when the state changes a form?',
      'What does implementation, data migration and training cost, and how long does a typical cutover take for a company our size?',
      'What are the payment-processing rates if we use WorkWave’s integrated payments, and are we required to use them?',
      'Does the mobile app work offline in crawlspaces and rural areas, and which devices are officially supported?',
      'What is the contract length, and how do we export all customer, service and chemical history if we leave?',
    ],
    sources: [
      { name: 'PestPac home page', url: 'https://www.pestpac.com/' },
      { name: 'PestPac pricing', url: 'https://www.pestpac.com/pricing' },
      { name: 'PestPac termite inspection software', url: 'https://www.pestpac.com/features/termite-inspection-software' },
      { name: 'PestPac chemical tracking software', url: 'https://www.pestpac.com/features/chemical-tracking-software' },
      { name: 'PestPac commercial pest control software', url: 'https://www.pestpac.com/features/commercial-pest-control-software' },
      { name: 'PestPac API and integrations', url: 'https://www.pestpac.com/api-integrations' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'fieldroutes',
    name: 'FieldRoutes',
    maker: 'FieldRoutes, a ServiceTitan company',
    url: 'https://www.fieldroutes.com/',
    title: 'FieldRoutes: pest control software guide',
    description:
      'A researched guide to FieldRoutes, the ServiceTitan-owned pest control platform: routing, WDO and Sentricon tools, customer-count pricing, and questions to ask.',
    summary:
      'FieldRoutes is a field service platform owned by ServiceTitan whose marketing, case studies and feature pages center on pest control. It bundles routing, scheduling, payments, dashboards and a technician app, with add-ons for marketing and fleet. It is positioned for companies from small business through enterprise, with an emphasis on route density and multi-route operations.',
    builtFor:
      'Pest control and other field service companies, small business through mid-market and enterprise',
    pestSpecific: true,
    features: [
      'Route optimization using real-time data',
      'Drag-and-drop scheduling with automated reminders',
      'Real-time dashboards and reporting',
      'Technician mobile app with on-site contract signing and payments',
      'Online payments, AutoPay and customer portal',
      'Lead management and mobile sales tools',
      'Marketing Pro add-on for email and direct mail',
      'Fleet Pro add-on for fleet management',
      'Open API',
    ],
    pestFeatures: [
      'WDO inspection tracking with NPMA-33 access',
      'Integrated Sentricon system',
      'California Branch 3 WDO reporting',
      'Chemical and pesticide inventory management',
      'Bait station tracking',
      'Commercial trend reporting',
    ],
    pricing:
      'Pricing by quote. As listed on 2026-10-04, FieldRoutes prices by number of active customers rather than users, offers Growth and Corporate packages without published dollar amounts, and does not offer a free trial (demos only).',
    integrations: [
      'QuickBooks Online',
      'FieldRoutes Payments',
      'Sentricon',
      'ServiceTitan Marketing Pro',
      'ServiceTitan Fleet Pro',
    ],
    checkBeforeBuying: [
      'How is "active customer" counted for billing, and what happens to our bill when seasonal or one-time customers spike?',
      'What separates the Growth and Corporate packages in practice, and what do Marketing Pro and Fleet Pro add to the monthly cost?',
      'Are WDO, Branch 3 and chemical reports available for our state, and can we see a finished report from a real account in the demo?',
      'What are the processing rates for FieldRoutes Payments, and can we keep our current processor?',
      'With no free trial, can we get a sandbox or reference calls with companies our size?',
      'What is the onboarding timeline and fee, and what data can we export if we cancel?',
    ],
    sources: [
      { name: 'FieldRoutes home page', url: 'https://www.fieldroutes.com/' },
      { name: 'FieldRoutes pest control software', url: 'https://www.fieldroutes.com/solutions/pest-control-software' },
      { name: 'FieldRoutes pricing', url: 'https://www.fieldroutes.com/pricing' },
      { name: 'FieldRoutes API integrations', url: 'https://www.fieldroutes.com/operations-suite/api-integrations' },
      { name: 'FieldRoutes vs PestPac (vendor comparison page)', url: 'https://www.fieldroutes.com/comparison/fieldroutes-vs-pestpac' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'gorilladesk',
    name: 'GorillaDesk',
    maker: 'GorillaDesk',
    url: 'https://gorilladesk.com/',
    title: 'GorillaDesk: pest control software guide',
    description:
      'Researched guide to GorillaDesk: published plan prices, chemical and material tracking, device barcode scanning, QuickBooks sync and what to check first.',
    summary:
      'GorillaDesk is field service software sold to many trades, with pest, wildlife, mosquito and termite control listed first among its industries. It covers scheduling, routing, invoicing, a customer portal and a mobile app, and publishes flat monthly plan prices. It suits solo operators and small-to-mid teams that want posted pricing and basic pest compliance tools.',
    builtFor:
      'Field service businesses from solo operators to multi-location teams; pest and wildlife control is one of its headline industries',
    pestSpecific: false,
    features: [
      'Drag-and-drop scheduling calendar',
      'Route optimization (stop limits vary by plan)',
      'GPS technician tracking',
      'Technician mobile app',
      'Invoicing, estimates and subscription billing',
      'Customer portal and online booking',
      'Automated email and SMS, plus review generation',
      'Built-in reports and dashboards',
      'E-signature digital documents',
    ],
    pestFeatures: [
      'Chemical and material tracking at job, client or property level',
      'One-click download of full chemical application history',
      'Barcode scanning of traps and devices from the mobile app',
      'Device reports aimed at state compliance requirements',
      'Multi-dwelling unit support (Pro plan and up)',
    ],
    pricing:
      'As listed on 2026-10-04: Basic $49/month ($539/year), Pro $99/month ($1,089/year), Growth $149/month ($1,639/year). SMS is extra: $5/month plus message credit packs. Free trial, no setup fee, month-to-month.',
    integrations: [
      'QuickBooks Online (Pro plan and up)',
      'Stripe',
      'Square',
      'Google Maps',
      'Zapier (Pro plan and up)',
    ],
    checkBeforeBuying: [
      'The Basic plan’s routing is capped at 25 stops — how many stops do our techs run per day, and which plan do we really need?',
      'Does the chemical report include every field our state agency requires (EPA reg. number, rate, target pest, site)?',
      'Can the device and barcode reports be formatted for our commercial clients’ audits?',
      'Does GorillaDesk handle WDO/termite inspection forms for our state, or would we need a separate tool?',
      'What will SMS credits cost at our message volume?',
      'How is our existing customer and service history imported, and is there a charge?',
    ],
    sources: [
      { name: 'GorillaDesk home page', url: 'https://gorilladesk.com/' },
      { name: 'GorillaDesk pricing', url: 'https://gorilladesk.com/pricing/' },
      { name: 'GorillaDesk pest control software', url: 'https://gorilladesk.com/pest-control-software/' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'briostack',
    name: 'Briostack',
    maker: 'Briostack (an EverCommerce company)',
    url: 'https://www.briostack.com/',
    title: 'Briostack: pest control software guide',
    description:
      'A researched guide to Briostack, pest and lawn software built by a pest control company: CRM, routing, bids and diagramming, chemical tracking, and what to ask.',
    summary:
      'Briostack is a business management platform for pest control and lawn care companies, which the vendor says was created by a pest control company. It combines CRM, sales and lead management, scheduling and routing, satellite-image diagramming for bids, and a technician app. It is aimed at pest and lawn operators who want one system for office, sales and field work.',
    builtFor: 'Pest control and lawn care companies',
    pestSpecific: true,
    features: [
      'Pest control CRM with customer dashboards',
      'Sales and lead management',
      'Scheduling with seasonal templates and bulk rescheduling',
      'Route optimization with GPS tracking',
      'Brio Tech mobile app for iOS and Android, with offline use',
      'Billing and invoicing',
      'Automated text, call and email reminders',
      'Marketing automation (Playbooks add-on)',
      'Public API',
    ],
    pestFeatures: [
      'Chemical usage tracking and reporting dashboards',
      'Bids and diagramming on high-resolution satellite images',
      'Warranty dates with automated expiration notices',
      'CalAg reporting for California operators',
      'Barcode scanning and job forms',
      'Commercial account handling',
    ],
    pricing: 'Pricing by quote. No prices were published on the vendor site as checked on 2026-10-04.',
    integrations: [
      'QuickBooks Online',
      'Sentricon',
      'CardConnect',
      'Azuga',
      'Voice for Pest',
      'Baton',
    ],
    checkBeforeBuying: [
      'How is pricing calculated (users, customers, branches), and what do add-ons like Playbooks cost?',
      'Which state chemical reports besides California CalAg are built in?',
      'How does the Sentricon integration work day to day, and does it cover other termite bait systems we use?',
      'Does the diagramming tool produce inspection graphs we can attach to termite or WDO reports?',
      'Which payment processors can we use, and what are the rates?',
      'What does migration from our current system include, and how long is the contract?',
    ],
    sources: [
      { name: 'Briostack home page', url: 'https://www.briostack.com/' },
      { name: 'Briostack pest control software', url: 'https://www.briostack.com/pest-control-software' },
      { name: 'Briostack scheduling and routing', url: 'https://www.briostack.com/pest-control-software/scheduling-routing-software' },
      { name: 'Briostack partners', url: 'https://www.briostack.com/partners' },
      { name: 'Briostack about us', url: 'https://www.briostack.com/about-us' },
      { name: 'EverCommerce home page (lists Briostack among acquisitions)', url: 'https://www.evercommerce.com/' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'servsuite',
    name: 'ServSuite',
    maker: 'FieldRoutes, a ServiceTitan company',
    url: 'https://www.fieldroutes.com/servsuite-by-fieldroutes',
    title: 'ServSuite: pest control software guide',
    description:
      'A researched guide to ServSuite, now ServSuite by FieldRoutes: renewals, collections, termite drawing, bait station scanning and what to ask before signing.',
    summary:
      'ServSuite is a long-running pest control business system that now carries the name ServSuite by FieldRoutes after ServiceTitan’s acquisition; FieldRoutes says existing customers see no change to the software or service. Directory listings describe it as cloud software for pest, lawn and tree care companies with strong back-office tools such as renewals, commissions and collections.',
    builtFor:
      'Pest control companies (directory listings also cite lawn and tree care), small business through enterprise',
    pestSpecific: true,
    features: [
      'Scheduling and routing',
      'Billing, invoicing and credit card processing',
      'Contract renewals with automated notices',
      'Commissions and collections',
      'Mobile app with signature capture',
      'GPS vehicle tracking',
      'Voice and text notifications',
      'Print-to-mail services',
      'Customer portal',
    ],
    pestFeatures: [
      'Pesticide usage tracking',
      'Drawing tools in the mobile app for termite inspection findings',
      'Barcoded bait station scanning by phone camera or Bluetooth scanner',
      'Service audit records (inspection point status, target pest, observations, materials)',
    ],
    pricing:
      'Pricing by quote. The vendor page (checked 2026-10-04) publishes no prices. Third-party directories list a starting price per user per month, but this is not confirmed by the vendor — ask for a written quote.',
    integrations: ['QuickBooks', 'Open API'],
    checkBeforeBuying: [
      'With ServSuite now under FieldRoutes, what is the product roadmap — will ServSuite keep getting updates, or will we be asked to migrate to FieldRoutes, and on what terms?',
      'Is pricing per user or per customer, and what is the total monthly cost for our office and field headcount?',
      'Which state chemical usage and termite/WDO reports are built in for our state?',
      'Can we see the current mobile app working on our devices, including bait station scanning and inspection drawings?',
      'What support response times are committed in the contract?',
      'How do we export all data if we leave?',
    ],
    sources: [
      { name: 'ServSuite by FieldRoutes (vendor page)', url: 'https://www.fieldroutes.com/servsuite-by-fieldroutes' },
      { name: 'Software Advice: ServSuite profile', url: 'https://www.softwareadvice.com/field-service/servsuite-profile' },
      { name: 'Capterra: ServSuite', url: 'https://www.capterra.com/p/25008/ServSuite/' },
      { name: 'PMP: Software solutions to boost profits from termite services (2021)', url: 'https://professionalpestmanager.com/pest-control-software/software-solutions-to-boost-profits-from-termite-services/' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'pocomos',
    name: 'Pocomos',
    maker: 'Pocomos',
    url: 'https://pocomos.com/',
    title: 'Pocomos: pest control software guide',
    description:
      'A researched guide to Pocomos pest control software: published active-customer pricing, routing, door-to-door sales tools, chemical logging and what to ask.',
    summary:
      'Pocomos is a cloud platform for pest control companies covering routing, scheduling and dispatch, CRM, invoicing and a technician app. It publishes tiered pricing based on active customers with unlimited users, and has a dedicated door-to-door sales module. It suits small and growing pest companies, including D2D sales-driven operations.',
    builtFor:
      'Pest control companies from independent operators to multi-crew, multi-state companies; also door-to-door sales organizations',
    pestSpecific: true,
    features: [
      'Map-based routing and drag-and-drop dispatch',
      'Route density tools and real-time ETAs',
      'CRM and customer communications',
      'Invoicing, payments, auto reminders and accounting exports',
      'Digital contracts with e-signature',
      'Technician mobile app with photos, signatures and on-site payments',
      'Unlimited users with role-based access',
      'Door-to-door sales: territories, leaderboards, lead tracking',
      'Integrations and API',
    ],
    pestFeatures: [
      'Product and chemical usage logging tied to each job',
      'Chemical usage tracking and compliance reporting',
      'QR code location tracking',
      'Inspection documentation tools',
    ],
    pricing:
      'As listed on 2026-10-04: $99/month (0–20 active customers), $159/month (21–50), $209/month (50–300), $275/month (300–500); Enterprise (500+) and D2D plans priced by quote. Unlimited users. 14-day free trial, no credit card, no contract.',
    integrations: ['SendJim', 'ProNexis', 'Opiniion', 'Aura AI'],
    checkBeforeBuying: [
      'How is an "active customer" defined for the pricing tiers, and how quickly does the bill change when we cross a tier?',
      'Do the chemical usage reports match what our state lead agency requires?',
      'Does Pocomos support termite/WDO inspection forms, or would we need another tool for that work?',
      'Does it sync with QuickBooks or our accounting system directly, or only through exports?',
      'What are the payment-processing rates?',
      'Who handles migration from our current software, and is there a fee?',
    ],
    sources: [
      { name: 'Pocomos home page', url: 'https://www.pocomos.com/' },
      { name: 'Pocomos pricing', url: 'https://www.pocomos.com/pricing' },
      { name: 'Pocomos features', url: 'https://pocomos.com/features/' },
      { name: 'Pocomos free trial', url: 'https://pocomos.com/free-trial/' },
      { name: 'Pocomos door-to-door sales management', url: 'https://pocomos.com/door-to-door-sales-management/' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'jobber',
    name: 'Jobber',
    maker: 'Jobber',
    url: 'https://www.getjobber.com/',
    title: 'Jobber for pest control: software guide',
    description:
      'A researched guide to Jobber for pest control: a general home service platform with chemical logging, published plan prices, QuickBooks sync and demo questions.',
    summary:
      'Jobber is general home service software used across many trades, not a pest-only product. It covers quoting, scheduling, invoicing, payments and client communication, and its pest control page adds chemical logging with registration numbers. It fits small pest companies that want posted pricing and strong quoting and invoicing, and can live without deep termite or commercial compliance tools.',
    builtFor: 'Home service businesses across many trades, from one-person shops to multi-user teams',
    pestSpecific: false,
    features: [
      'Quotes with optional line items and automated follow-ups',
      'Drag-and-drop scheduling and technician reassignment',
      'Route optimization',
      'Invoicing, batch invoicing and online payments',
      'Automated client reminders and on-my-way texts',
      'Online booking and client hub',
      'Custom job forms and checklists',
      'Time tracking and job costing (higher plans)',
      'Two-way SMS and workflow automations (higher plans)',
    ],
    pestFeatures: [
      'Chemical and pesticide logging with product registration numbers',
      'Pest and treatment details stored in the CRM',
      'Recurring preventative maintenance packages',
    ],
    pricing:
      'As listed on 2026-10-04 (monthly, no commitment / annual prepaid per month): Core $49 / $29 (1 user); Connect $139 / $99 (5 users, extra users $29/month); Grow $199–$499 / $149–$399 depending on users; Plus $499–$699 / $399–$529. 14-day free trial.',
    integrations: ['QuickBooks Online', 'Mailchimp', 'Zapier', 'FleetSharp'],
    checkBeforeBuying: [
      'Can the chemical log produce the report format our state requires, or will we be exporting and reformatting it?',
      'How would we handle termite/WDO inspection reports and commercial device audits, which are not listed features?',
      'Which plan includes the routing, automations and QuickBooks sync we need, and what does each extra user cost?',
      'How well does recurring service billing handle quarterly pest plans and mid-term cancellations?',
      'What are the card and ACH processing rates?',
      'What happens to our data and history if we downgrade or leave?',
    ],
    sources: [
      { name: 'Jobber pricing', url: 'https://www.getjobber.com/pricing/' },
      { name: 'Jobber pest control software', url: 'https://www.getjobber.com/industries/pest-control-software/' },
    ],
    checked: '2026-10-04',
  },
  {
    slug: 'housecall-pro',
    name: 'Housecall Pro',
    maker: 'Housecall Pro',
    url: 'https://www.housecallpro.com/',
    title: 'Housecall Pro for pest control: guide',
    description:
      'A researched guide to Housecall Pro for pest control: a general home service app with scheduling, recurring plans, published prices and gaps to check in a demo.',
    summary:
      'Housecall Pro is general home service software that lists pest control among the industries it serves. It handles scheduling and dispatch, estimates, invoicing, recurring service plans and marketing, with a mobile app for techs. Its pest page did not list chemical tracking, termite reports or bait station tools when checked, so it suits small residential-focused companies that handle compliance records elsewhere.',
    builtFor: 'Home service businesses, from one user to scaling teams; pest control is one listed industry',
    pestSpecific: false,
    features: [
      'Scheduling and dispatch with drag-and-drop calendar',
      'Real-time GPS tracking',
      'Estimates, price book and flat-rate pricing',
      'Invoicing and payments',
      'Recurring service plans',
      'Custom checklists and photo reports',
      'Route optimization (top plan)',
      'Email and SMS marketing automation',
      'Online booking and review management',
      'Employee time tracking and commissions',
    ],
    pestFeatures: [],
    pricing:
      'As listed on 2026-10-04: Basic $79/month or $59/month billed annually (1 user); Essentials $189/month or $149/month annually (5 users); Max $329/month or $299/month annually (8 users, extra users $35/month). Introductory discounts were shown. 14-day free trial.',
    integrations: ['QuickBooks'],
    checkBeforeBuying: [
      'Where would we record chemical applications (EPA number, rate, target pest) to meet our state’s record-keeping rules?',
      'How would we produce termite/WDO inspection reports or commercial service logs?',
      'Which plan includes route optimization and recurring service plans, and what happens to price after the introductory discount ends?',
      'How are recurring quarterly pest plans billed, renewed and cancelled?',
      'What are the payment-processing rates?',
      'Can we export all customer and service history if we leave?',
    ],
    sources: [
      { name: 'Housecall Pro pricing', url: 'https://www.housecallpro.com/pricing/' },
      { name: 'Housecall Pro pest control software', url: 'https://www.housecallpro.com/industries/pest-control-software/' },
    ],
    checked: '2026-10-04',
  },
];
