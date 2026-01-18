/**
 * Google Shopping Campagnes - Droomvriendjes.nl
 * 10 campagnes voor kinderproducten webshop
 * 
 * Focus: babyproducten, peuterspeelgoed, duurzame knuffels, kraamcadeaus
 * Doelgroep: jonge ouders, cadeauzoekers, grootouders
 * Tone of voice: vriendelijk, geruststellend, informatief
 */

export const shoppingCampaigns = [
  {
    id: "CAMP_001",
    name: "Shopping - Bestseller Leeuw Slaapknuffel",
    product: "Baby Slaapmaatje Leeuw",
    productId: "KNUF_001",
    status: "ENABLED",
    priority: "HIGH",
    
    // Campagne instellingen
    dailyBudget: 15.00,
    biddingStrategy: "TARGET_ROAS",
    targetRoas: 400, // 400% ROAS doel
    
    // Product informatie voor Shopping feed
    title: "Baby Slaapmaatje Leeuw - Projector Nachtlamp met White Noise | Droomvriendjes",
    description: "Geef je baby een magische nachtrust met onze bestseller slaapknuffel. Sterrenhemel projectie, rustgevende white noise en zachte LED verlichting. Veilig vanaf 0 maanden. ✓ Gratis verzending ✓ 14 dagen retour",
    
    // Targeting
    targetAudience: {
      demographics: ["Ouders 25-44", "Grootouders 55+"],
      interests: ["Babyproducten", "Slaaphulpmiddelen", "Kraamcadeaus"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    // Advertentieteksten
    headlines: [
      "Bestseller Slaapknuffel",
      "Sterrenhemel Projectie",
      "Gratis Verzending NL",
      "White Noise Functie",
      "Vanaf 0 Maanden"
    ],
    
    // Custom labels voor feed
    customLabels: {
      label0: "bestseller",
      label1: "0-12 maanden",
      label2: "slaaphulp",
      label3: "cadeautip",
      label4: "voorraad"
    },
    
    // Seizoensgebonden aanpassingen
    seasonalAdjustments: {
      christmas: { budgetMultiplier: 2.0, priority: "HIGHEST" },
      babyshower: { budgetMultiplier: 1.5 },
      sinterklaas: { budgetMultiplier: 1.8 }
    }
  },
  
  {
    id: "CAMP_002",
    name: "Shopping - Premium Schaap Nachtlamp",
    product: "Baby Nachtlamp Schaap",
    productId: "KNUF_002",
    status: "ENABLED",
    priority: "HIGH",
    
    dailyBudget: 12.00,
    biddingStrategy: "MAXIMIZE_CONVERSIONS",
    targetCpa: 8.00,
    
    title: "Baby Nachtlamp Schaap - Slaapknuffel met Sterrenprojector | Veilig & Zacht",
    description: "Populaire slaapknuffel met projector en white noise. Helpt je kindje rustig in slaap vallen. Dimbare verlichting, CE gecertificeerd. Perfect kraamcadeau! ✓ Gratis verzending ✓ 14 dagen bedenktijd",
    
    targetAudience: {
      demographics: ["Ouders 25-44", "Cadeauzoekers"],
      interests: ["Nachtlampjes baby", "Kraamvisite cadeau", "Slaapproblemen kind"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop", "Tablet"]
    },
    
    headlines: [
      "Populaire Slaapknuffel",
      "Dimbaar Nachtlampje",
      "Perfect Kraamcadeau",
      "CE Gecertificeerd",
      "Nu €59,95"
    ],
    
    customLabels: {
      label0: "populair",
      label1: "0-12 maanden",
      label2: "kraamcadeau",
      label3: "nachtlampje",
      label4: "voorraad"
    }
  },
  
  {
    id: "CAMP_003",
    name: "Shopping - Klassieke Teddy Projector",
    product: "Teddy Projector Knuffel",
    productId: "KNUF_003",
    status: "ENABLED",
    priority: "MEDIUM",
    
    dailyBudget: 10.00,
    biddingStrategy: "TARGET_ROAS",
    targetRoas: 350,
    
    title: "Teddy Projector Knuffel - Bruine Beer met Nachtlicht & Muziek | Droomvriendjes",
    description: "Klassieke teddybeer met moderne functies. Sterrenhemel projectie, kalmerende muziek en super zacht materiaal. Ideaal voor baby's en peuters. ✓ Gratis verzending ✓ Veilig & duurzaam",
    
    targetAudience: {
      demographics: ["Ouders 25-44", "Grootouders 50+"],
      interests: ["Teddyberen", "Nachtlampje kinderkamer", "Duurzaam speelgoed"],
      locations: ["Nederland", "België", "Duitsland"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Klassieke Teddybeer",
      "Met Sterrenprojectie",
      "Kalmerende Muziek",
      "Super Zacht Materiaal",
      "Tijdloos Cadeau"
    ],
    
    customLabels: {
      label0: "nieuw",
      label1: "alle leeftijden",
      label2: "klassiek",
      label3: "muziek",
      label4: "voorraad"
    }
  },
  
  {
    id: "CAMP_004",
    name: "Shopping - Stoere Dino Slaapknuffel",
    product: "Dinosaurus Slaapknuffel",
    productId: "KNUF_005",
    status: "ENABLED",
    priority: "HIGH",
    
    dailyBudget: 12.00,
    biddingStrategy: "MAXIMIZE_CONVERSIONS",
    targetCpa: 7.50,
    
    title: "Dinosaurus Slaapknuffel - Stoere Dino met Nachtlamp & White Noise | Voor Avonturiers",
    description: "De stoerste slaapknuffel voor kleine avonturiers! Projector nachtlamp met sterrenhemel, rustgevende geluiden. Veilig en zacht. Perfect voor jongens én meisjes. ✓ Gratis verzending",
    
    targetAudience: {
      demographics: ["Ouders 25-40", "Cadeauzoekers"],
      interests: ["Dinosaurus speelgoed", "Jongensspeelgoed", "Stoer kinderkamer"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Stoere Dino Knuffel",
      "Voor Avonturiers",
      "Sterrenprojectie",
      "Nieuw Ontwerp",
      "Jongens Favoriet"
    ],
    
    customLabels: {
      label0: "nieuw",
      label1: "1-5 jaar",
      label2: "stoer",
      label3: "jongens",
      label4: "voorraad"
    }
  },
  
  {
    id: "CAMP_005",
    name: "Shopping - Schattige Pinguïn Lamp",
    product: "Pinguïn Nachtlampje",
    productId: "KNUF_004",
    status: "ENABLED",
    priority: "MEDIUM",
    
    dailyBudget: 10.00,
    biddingStrategy: "TARGET_ROAS",
    targetRoas: 380,
    
    title: "Pinguïn Nachtlampje - Schattige Slaapknuffel met Sterrenprojector | Droomvriendjes",
    description: "Schattige pinguïn slaapknuffel met sterrenprojector en white noise. Kalmerend effect voor een rustige nacht. Zachte LED kleuren, gebruiksvriendelijk. ✓ Gratis verzending ✓ 14 dagen retour",
    
    targetAudience: {
      demographics: ["Ouders 25-40"],
      interests: ["Schattig babyspeelgoed", "Winter thema kinderkamer", "Nachtlampjes"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Schattige Pinguïn",
      "Kalmerend Effect",
      "Zachte LED Kleuren",
      "White Noise Functie",
      "Populair Model"
    ],
    
    customLabels: {
      label0: "populair",
      label1: "0-3 jaar",
      label2: "schattig",
      label3: "unisex",
      label4: "voorraad"
    }
  },
  
  {
    id: "CAMP_006",
    name: "Shopping - Duo Set Voordeelpakket",
    product: "Slaapknuffel Duo – Schaap & Teddy",
    productId: "KNUF_006",
    status: "ENABLED",
    priority: "HIGHEST",
    
    dailyBudget: 18.00,
    biddingStrategy: "MAXIMIZE_CONVERSIONS",
    targetCpa: 12.00,
    
    title: "Slaapknuffel Duo Set - Schaap & Teddy Voordeelpakket | Bespaar €10 | Droomvriendjes",
    description: "Twee slaapknuffels voor de prijs van... bijna één! Perfect voor broertjes, zusjes of tweeling. Beide met nachtlampje en rustgevende geluiden. Nu met €10 korting! ✓ Gratis verzending",
    
    targetAudience: {
      demographics: ["Ouders met meerdere kinderen", "Tweeling ouders", "Grootouders"],
      interests: ["Voordeelpakketten baby", "Tweeling producten", "Broer zus cadeau"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Duo Set - Bespaar €10",
      "Perfect voor Tweeling",
      "2 Knuffels = 1 Prijs",
      "Broertjes & Zusjes",
      "Voordeelpakket"
    ],
    
    customLabels: {
      label0: "aanbieding",
      label1: "voordeelset",
      label2: "tweeling",
      label3: "cadeauset",
      label4: "voorraad"
    },
    
    promotions: {
      type: "PRICE_DROP",
      originalPrice: 99.90,
      salePrice: 89.95,
      savings: 10.00
    }
  },
  
  {
    id: "CAMP_007",
    name: "Shopping - Triple Set Familie Pakket",
    product: "Slaapknuffel Triple Pack",
    productId: "KNUF_007",
    status: "ENABLED",
    priority: "HIGH",
    
    dailyBudget: 15.00,
    biddingStrategy: "TARGET_ROAS",
    targetRoas: 450,
    
    title: "Slaapknuffel Triple Pack - 3 Knuffels voor Heel het Gezin | Mega Besparing | Droomvriendjes",
    description: "Het ultieme familiepakket! Leeuw, Schaap én Teddy samen voor een speciale prijs. Ideaal voor gezinnen met meerdere kinderen of als royaal kraamcadeau. Bespaar €25! ✓ Gratis verzending",
    
    targetAudience: {
      demographics: ["Grote gezinnen", "Cadeauzoekers", "Grootouders"],
      interests: ["Familiepakketten", "Royaal cadeau", "Meerdere kinderen"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Triple Pack Aanbieding",
      "Bespaar €25",
      "3 Knuffels = 1 Koop",
      "Familie Favoriet",
      "Royaal Cadeau"
    ],
    
    customLabels: {
      label0: "mega-aanbieding",
      label1: "familiepakket",
      label2: "besparing",
      label3: "cadeau",
      label4: "voorraad"
    },
    
    promotions: {
      type: "BUNDLE_DISCOUNT",
      originalPrice: 149.85,
      salePrice: 124.95,
      savings: 25.00
    }
  },
  
  {
    id: "CAMP_008",
    name: "Shopping - Kraamcadeau Collectie",
    product: "Alle Slaapknuffels",
    productId: "ALL_PRODUCTS",
    status: "ENABLED",
    priority: "MEDIUM",
    
    dailyBudget: 20.00,
    biddingStrategy: "MAXIMIZE_CLICKS",
    maxCpc: 0.80,
    
    title: "Slaapknuffels met Nachtlampje - Het Perfecte Kraamcadeau | Droomvriendjes.nl",
    description: "Op zoek naar een origineel kraamcadeau? Onze slaapknuffels met sterrenprojectie zijn het perfecte cadeau voor pasgeboren baby's. Veilig, zacht en rustgevend. ✓ Gratis verzending ✓ Cadeauverpakking",
    
    targetAudience: {
      demographics: ["Cadeauzoekers 25-55", "Familie en vrienden van jonge ouders"],
      interests: ["Kraamcadeau", "Babyshower cadeau", "Origineel babycadeau"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop", "Tablet"]
    },
    
    headlines: [
      "Perfect Kraamcadeau",
      "Origineel & Praktisch",
      "Gratis Cadeauverpakking",
      "Babyshower Favoriet",
      "Altijd Goed"
    ],
    
    customLabels: {
      label0: "kraamcadeau",
      label1: "giftguide",
      label2: "origineel",
      label3: "babyshower",
      label4: "cadeauverpakking"
    },
    
    // Specifieke targeting voor cadeau-zoekers
    searchTerms: [
      "kraamcadeau origineel",
      "babyshower cadeau",
      "cadeau pasgeboren baby",
      "kraamvisite cadeau",
      "origineel babycadeau"
    ]
  },
  
  {
    id: "CAMP_009",
    name: "Shopping - Slaapproblemen Oplossing",
    product: "Alle Slaapknuffels",
    productId: "ALL_PRODUCTS",
    status: "ENABLED",
    priority: "HIGH",
    
    dailyBudget: 18.00,
    biddingStrategy: "TARGET_CPA",
    targetCpa: 10.00,
    
    title: "Slaapknuffel met White Noise - Hulp bij Slaapproblemen Baby | Droomvriendjes",
    description: "Slaapt je baby slecht? Onze slaapknuffels met white noise en sterrenprojectie helpen baby's rustig in slaap vallen. Aanbevolen door ouders. ✓ Gratis verzending ✓ 14 dagen niet-goed-geld-terug",
    
    targetAudience: {
      demographics: ["Vermoeide ouders", "Ouders met slaapproblemen kind"],
      interests: ["Slaapproblemen baby", "White noise baby", "Baby slaapt niet"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop"]
    },
    
    headlines: [
      "Hulp Bij Slaapproblemen",
      "White Noise Technologie",
      "Aanbevolen Door Ouders",
      "Eindelijk Rust",
      "Bewezen Effectief"
    ],
    
    customLabels: {
      label0: "slaaphulp",
      label1: "white-noise",
      label2: "oplossing",
      label3: "ouder-aanbevolen",
      label4: "voorraad"
    },
    
    // Specifieke targeting voor ouders met slaapproblemen
    searchTerms: [
      "baby slaapt niet door",
      "slaapproblemen peuter",
      "white noise baby",
      "hulp doorslapen baby",
      "baby huilt s nachts"
    ]
  },
  
  {
    id: "CAMP_010",
    name: "Shopping - Seizoen Kerst & Sinterklaas",
    product: "Alle Slaapknuffels",
    productId: "ALL_PRODUCTS",
    status: "PAUSED", // Activeren in november
    priority: "HIGHEST",
    
    dailyBudget: 30.00,
    biddingStrategy: "MAXIMIZE_CONVERSIONS",
    
    title: "Slaapknuffel - Het Perfecte Kerst & Sinterklaas Cadeau | Droomvriendjes",
    description: "Zoek je het ideale cadeau voor Sinterklaas of Kerst? Onze magische slaapknuffels met sterrenprojectie maken elk kind blij! ✓ Gratis verzending ✓ Op tijd bezorgd ✓ Cadeauverpakking",
    
    targetAudience: {
      demographics: ["Ouders", "Grootouders", "Familie"],
      interests: ["Sinterklaas cadeau kind", "Kerst cadeau baby", "Cadeau peuter"],
      locations: ["Nederland", "België"],
      devices: ["Mobile", "Desktop", "Tablet"]
    },
    
    headlines: [
      "Sinterklaas Cadeau Tip",
      "Kerst Favoriet",
      "Op Tijd Bezorgd",
      "Gratis Inpakken",
      "Magisch Cadeau"
    ],
    
    customLabels: {
      label0: "seizoen",
      label1: "sinterklaas",
      label2: "kerst",
      label3: "cadeautip",
      label4: "voorraad"
    },
    
    // Seizoensgebonden instellingen
    seasonalSettings: {
      activePeriod: {
        start: "2026-11-01",
        end: "2026-12-26"
      },
      peakDates: [
        { date: "2026-11-15", event: "Sinterklaas intocht", budgetMultiplier: 1.5 },
        { date: "2026-12-05", event: "Pakjesavond", budgetMultiplier: 2.0 },
        { date: "2026-12-20", event: "Kerst rush", budgetMultiplier: 2.5 }
      ]
    },
    
    searchTerms: [
      "sinterklaas cadeau baby",
      "kerst cadeau peuter",
      "cadeau kind 1 jaar sinterklaas",
      "schoen cadeau baby",
      "kerst speelgoed baby"
    ]
  }
];

// Campagne statistieken structuur
export const campaignMetrics = {
  totalBudget: 160.00, // Per dag
  activeCampaigns: 9,
  pausedCampaigns: 1,
  targetROAS: 400,
  estimatedImpressions: "15.000-25.000/dag",
  estimatedClicks: "300-500/dag",
  conversionRate: "3-5%"
};

// Export functies voor campagne beheer
export const getCampaignById = (id) => {
  return shoppingCampaigns.find(c => c.id === id);
};

export const getActiveCampaigns = () => {
  return shoppingCampaigns.filter(c => c.status === "ENABLED");
};

export const getCampaignsByPriority = (priority) => {
  return shoppingCampaigns.filter(c => c.priority === priority);
};

export const getTotalDailyBudget = () => {
  return shoppingCampaigns
    .filter(c => c.status === "ENABLED")
    .reduce((sum, c) => sum + c.dailyBudget, 0);
};

// Export naar CSV formaat voor Google Ads import
export const exportCampaignsToCSV = () => {
  const headers = [
    "Campaign Name",
    "Product Title",
    "Daily Budget",
    "Bidding Strategy",
    "Target ROAS",
    "Target CPA",
    "Status",
    "Priority"
  ];
  
  const rows = shoppingCampaigns.map(c => [
    c.name,
    c.title,
    c.dailyBudget,
    c.biddingStrategy,
    c.targetRoas || "",
    c.targetCpa || "",
    c.status,
    c.priority
  ]);
  
  return [headers, ...rows].map(row => row.join(",")).join("\n");
};

export default shoppingCampaigns;
