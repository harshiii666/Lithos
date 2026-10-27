export const IMAGES = {
  lava: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85',
  moss: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85',
} as const;

export const NAV_ITEMS = [
  { label: 'Course', to: '/course' },
  { label: 'Field Guides', to: '/field-guides' },
  { label: 'Geology', to: '/geology' },
  { label: 'Plans', to: '/plans' },
  { label: 'Live Tour', to: '/live-tour' },
  { label: 'About', to: '/about' },
] as const;

export interface Chapter {
  number: string;
  title: string;
  summary: string;
  lessons: number;
  duration: string;
  topics: string[];
}

export const COURSE_CHAPTERS: Chapter[] = [
  {
    number: '01',
    title: 'The field eye',
    summary:
      'Learn how geologists look before they name. We begin with texture, colour, scale, and the quiet discipline of noticing what the landscape is trying to tell you.',
    lessons: 4,
    duration: '38 min',
    topics: ['Field observation', 'Scale & texture', 'Keeping a field notebook'],
  },
  {
    number: '02',
    title: 'The grammar of stone',
    summary:
      'Igneous, sedimentary, metamorphic: three families of rock, one continuous argument. Read the mineral signatures that reveal how a stone was made.',
    lessons: 5,
    duration: '54 min',
    topics: ['Mineral families', 'The rock cycle', 'Hand-lens basics'],
  },
  {
    number: '03',
    title: 'Pages of sediment',
    summary:
      'Beds are sentences and unconformities are the pages torn out. Learn to follow a stratigraphic sequence across a cliff face and into deep time.',
    lessons: 5,
    duration: '49 min',
    topics: ['Bedding & cross-bedding', 'Unconformities', 'Reading a cliff'],
  },
  {
    number: '04',
    title: 'Deep time',
    summary:
      'The hardest idea in geology is not a rock — it is a number. We make the vastness of geologic time legible without losing its wonder.',
    lessons: 5,
    duration: '57 min',
    topics: ['The geologic timescale', 'Radiometric dating', 'Time as a material'],
  },
  {
    number: '05',
    title: 'Fire, drift, collision',
    summary:
      'The ground is always moving. Trace the tectonic forces that fold mountains, open oceans, raise islands, and quietly remake the map beneath us.',
    lessons: 5,
    duration: '52 min',
    topics: ['Plate boundaries', 'Faults & folds', 'Volcanic landscapes'],
  },
  {
    number: '06',
    title: 'Life written in rock',
    summary:
      'A fossil is not a dead thing; it is evidence of a world. We close in the field, reading extinction, recovery, and the strange intimacy of deep time.',
    lessons: 4,
    duration: '41 min',
    topics: ['Fossil preservation', 'Extinction & recovery', 'Biogeology'],
  },
];

export const COURSE_FACTS = [
  { value: '6', label: 'weeks, self-paced' },
  { value: '28', label: 'field lessons' },
  { value: '01', label: 'live field day' },
  { value: '∞', label: 'lifetime access' },
];

export type GuideCategory = 'Stone' | 'Life' | 'Landscape' | 'Time';
export type GuideArt = 'strata' | 'glass' | 'fossil' | 'fault' | 'river' | 'bloom';

export interface GuideSection {
  title: string;
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  index: string;
  title: string;
  category: GuideCategory;
  readTime: string;
  difficulty: string;
  coordinates: string;
  summary: string;
  lede: string;
  art: GuideArt;
  palette: {
    background: string;
    foreground: string;
    accent: string;
    secondary: string;
  };
  sections: GuideSection[];
  fieldNote: string;
  takeaways: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'reading-strata',
    index: '01',
    title: 'Reading Strata',
    category: 'Stone',
    readTime: '12 min',
    difficulty: 'Foundational',
    coordinates: 'Orakei Basin, Aotearoa',
    summary:
      'Every bed is a sentence. Learn the vocabulary of grain, colour, and contact — and begin to read the pages beneath your feet.',
    lede:
      'Sedimentary rock is an archive written slowly. This guide teaches you how to recognise its grammar before you try to translate it.',
    art: 'strata',
    palette: {
      background: '#d8cbb8',
      foreground: '#171510',
      accent: '#e8702a',
      secondary: '#7e725f',
    },
    sections: [
      {
        title: 'Begin with the bed',
        paragraphs: [
          'A bed is a single layer of sediment, laid down across a definable stretch of time. Its lower and upper contacts are the first things to find: sharp, gradual, wavy, or eroded. Each kind of contact describes a different kind of pause.',
          'Stand back from the cliff. Look for repetition. Even a dozen alternating bands can tell you whether the environment was calm, tidal, wind-blown, or repeatedly disturbed.',
        ],
      },
      {
        title: 'Grain, colour, structure',
        paragraphs: [
          'Grain size tells you how far the material travelled or how much energy moved it. Fine mud settles in still water; rounded pebbles speak of rivers and surf. Colour can hint at oxygen, iron, or organic content, but never read colour alone.',
          'Cross-bedding records currents. Ripples record shallow water. Mud cracks record exposure to air. These small structures are the verbs of the archive.',
        ],
      },
    ],
    fieldNote:
      'Use your thumb as a scale bar in every photograph. A field guide without scale is only a postcard.',
    takeaways: [
      'Identify bedding contacts before naming the rock.',
      'Record grain size, sorting, colour, and structure separately.',
      'A gap in the layers is often the most interesting page.',
    ],
  },
  {
    slug: 'volcanic-glass',
    index: '02',
    title: 'Volcanic Glass',
    category: 'Stone',
    readTime: '9 min',
    difficulty: 'Foundational',
    coordinates: 'Landmannalaugar, Iceland',
    summary:
      'Obsidian is a liquid that forgot how to flow. A short field guide to the sharp, black record of rapid cooling.',
    lede:
      'Glass is what happens when stone is forced to make a decision too quickly. Its edges, bubbles, and fractures preserve the last moments of an eruption.',
    art: 'glass',
    palette: {
      background: '#1a1410',
      foreground: '#f2eadf',
      accent: '#ff8547',
      secondary: '#56463a',
    },
    sections: [
      {
        title: 'A frozen liquid',
        paragraphs: [
          'When lava cools too quickly for minerals to organise themselves, it hardens into a natural glass. Obsidian is the most familiar example: dark, reflective, and often fractured into curving, shell-like surfaces.',
          'The absence of visible crystals is the clue. Under a hand lens the material looks smooth and vitreous rather than granular — a liquid caught mid-thought.',
        ],
      },
      {
        title: 'Read the fracture',
        paragraphs: [
          'Conchoidal fracture leaves arc-shaped ridges where the glass broke. In the field these indicate a brittle material and help distinguish obsidian from dark basalt that can look similar from a distance.',
          'Ridges and spherulites can also reveal later alteration. Glass is unstable over geologic time; finding pristine obsidian is finding a comparatively young surface.',
        ],
      },
    ],
    fieldNote:
      'Obsidian edges are sharper than a surgical blade. Carry it carefully, and leave any archaeological material exactly where it lies.',
    takeaways: [
      'No visible crystals can mean rapid cooling, not absence of minerals.',
      'Curved fracture surfaces are a reliable field signature.',
      'Glass is metastable: deep time slowly turns it into stone.',
    ],
  },
  {
    slug: 'the-fossil-window',
    index: '03',
    title: 'The Fossil Window',
    category: 'Life',
    readTime: '15 min',
    difficulty: 'Intermediate',
    coordinates: 'Solnhofen, Bavaria',
    summary:
      'A fossil is not a thing but an event. Learn how a living world becomes a page of stone — and what disappears along the way.',
    lede:
      'Most creatures vanish without leaving a trace. The fossil record is a narrow window, opened by unusual chemistry and closed again by ordinary decay.',
    art: 'fossil',
    palette: {
      background: '#d9cfba',
      foreground: '#1d1b15',
      accent: '#6d7c58',
      secondary: '#9a8e78',
    },
    sections: [
      {
        title: 'The improbable archive',
        paragraphs: [
          'Fossilisation requires a rare alignment: rapid burial, low oxygen, mineral-rich water, and time. Bone, shell, and wood preserve most readily; soft tissue usually requires extraordinary conditions.',
          'Read a fossil bed as a depositional environment first. Was this a lagoon, a river mouth, a volcanic ash fall? The answer often explains the kind of preservation you are seeing.',
        ],
      },
      {
        title: 'Absence is data',
        paragraphs: [
          'An empty layer is not a failed page. It may record an environment where life could not preserve, or a time when sediment accumulated too slowly. Gaps are part of the story.',
          'Trace fossils — footprints, burrows, feeding marks — preserve behaviour rather than bodies. They are some of the most intimate records in the archive.',
        ],
      },
    ],
    fieldNote:
      'Photograph fossils in place before you touch anything. Context is a larger part of the specimen than the specimen itself.',
    takeaways: [
      'Preservation is the exception, not the rule.',
      'Context and matrix carry as much information as the body.',
      'Trace fossils record behaviour, not anatomy.',
    ],
  },
  {
    slug: 'fault-lines',
    index: '04',
    title: 'Fault Lines',
    category: 'Landscape',
    readTime: '11 min',
    difficulty: 'Intermediate',
    coordinates: 'Ólafsfjörður, Iceland',
    summary:
      'The earth does not tear cleanly. Follow the scars of movement to understand how a coast, ridge, or valley was assembled.',
    lede:
      'Faults are where the crust answers pressure with motion. They are also some of the best places to see that a landscape is not a finished object.',
    art: 'fault',
    palette: {
      background: '#2a1a13',
      foreground: '#f3eadd',
      accent: '#e8702a',
      secondary: '#8b5139',
    },
    sections: [
      {
        title: 'The anatomy of a break',
        paragraphs: [
          'A fault has a plane, a hanging wall, a footwall, and a direction of movement. Slickensides — polished, grooved surfaces — record the passage of rock against rock.',
          'Normal faults pull the crust apart, reverse faults push it together, and strike-slip faults slide past one another. The same landscape can contain several families at once.',
        ],
      },
      {
        title: 'Reading the land around it',
        paragraphs: [
          'Faults rarely announce themselves alone. Look for aligned valleys, springs, scarps, displaced strata, and a river that turns abruptly for no obvious reason. The trace is often a pattern rather than a single line.',
          'In active landscapes, the most important question is not only where the fault is but when it last moved. The human timescale is a very short instrument.',
        ],
      },
    ],
    fieldNote:
      'Do not stand at the base of a fresh rock scar. The most legible geology is never worth a loose block.',
    takeaways: [
      'Find displacement before looking for a fault plane.',
      'Aligned springs and valleys can mark a buried trace.',
      'Active landscapes require a longer attention span than a single visit.',
    ],
  },
  {
    slug: 'rivers-that-remember',
    index: '05',
    title: 'Rivers That Remember',
    category: 'Time',
    readTime: '14 min',
    difficulty: 'Intermediate',
    coordinates: 'The Colorado Plateau, USA',
    summary:
      'A river is a clock, an eraser, and an archive at once. Learn to see erosional history in the shape of a valley.',
    lede:
      'Water writes with subtraction. Following a river backwards through its valley is one of the most direct ways to enter deep time.',
    art: 'river',
    palette: {
      background: '#16221f',
      foreground: '#e9eee1',
      accent: '#9eb88e',
      secondary: '#4e6759',
    },
    sections: [
      {
        title: 'The shape of a valley',
        paragraphs: [
          'A V-shaped valley suggests active incision; a broad floor suggests lateral erosion and later deposition. Terraces record former floodplains stranded above the present channel as the river cut downward.',
          'Meanders are not decorative. They move sediment, sort grain sizes, and leave oxbow lakes and scroll bars like signatures on a page.',
        ],
      },
      {
        title: 'The clock is not linear',
        paragraphs: [
          'Rivers can pause for millennia, then remove a million years of record in a single flood. Erosion is episodic. An unconformity in a cliff is often the work of water that is no longer there.',
          'Follow the sediment downstream. The river deposits traces of the entire catchment, connecting mountain, forest, city, and sea in one moving archive.',
        ],
      },
    ],
    fieldNote:
      'Read a river from the bank, not from the water. Find the highest terrace first, then work your way down to the active channel.',
    takeaways: [
      'Valley shape reveals whether a river is cutting or widening.',
      'River terraces are abandoned floodplains, not random shelves.',
      'Erosion removes evidence unevenly; the gaps are meaningful.',
    ],
  },
  {
    slug: 'moss-and-mineral',
    index: '06',
    title: 'Moss & Mineral',
    category: 'Life',
    readTime: '8 min',
    difficulty: 'Foundational',
    coordinates: 'Vík, Iceland',
    summary:
      'Life is a geologist too. See how moss, lichen, and roots break stone and begin the long work of making soil.',
    lede:
      'The boundary between living and non-living is less absolute than it looks. On a bare lava field, biology is already writing the next layer.',
    art: 'bloom',
    palette: {
      background: '#20291c',
      foreground: '#f1efe2',
      accent: '#b9c7a3',
      secondary: '#5b6e4e',
    },
    sections: [
      {
        title: 'The first colonisers',
        paragraphs: [
          'Lichen grows directly on rock, producing weak acids that etch minerals and begin to break the surface. It is a partnership between fungi and algae, and it makes a living from stone.',
          'Once tiny cracks fill with organic material, mosses can follow. Their root-like rhizoids hold moisture, moderate temperature, and create a seedbed for the next generation of plants.',
        ],
      },
      {
        title: 'Stone remembering life',
        paragraphs: [
          'The soil beneath a moss mat is a geologic product as much as a biological one: mineral grains, humus, water, and air assembled into a new layer. Given enough time, it can become rock.',
          'Look at the edge of a lava field. The future forest is already present in miniature, negotiating with every crack and hollow.',
        ],
      },
    ],
    fieldNote:
      'Do not peel lichen from a boulder. The colony may be older than the trees around it.',
    takeaways: [
      'Lichen is a chemical weathering agent.',
      'Moss creates the conditions for sediment to collect.',
      'Soils are a living, geological layer.',
    ],
  },
];

export const GUIDE_CATEGORIES: Array<'All' | GuideCategory> = [
  'All',
  'Stone',
  'Life',
  'Landscape',
  'Time',
];

export interface Era {
  id: string;
  name: string;
  range: string;
  title: string;
  body: string;
  marker: string;
  colour: string;
  evidence: string[];
}

export const ERAS: Era[] = [
  {
    id: 'hadean',
    name: 'Hadean',
    range: '4.6 – 4.0 Ga',
    title: 'A world without a surface',
    body:
      'The young Earth was a furnace of impacts and magma. Its crust had not yet become a stable archive; the oldest minerals that survive are tiny zircons, grains that carry the memory of water before the first oceans.',
    marker: 'Jack Hills zircon · 4.4 Ga',
    colour: '#8a3b20',
    evidence: ['Zircon crystals', 'First oceanic crust', 'Late heavy bombardment'],
  },
  {
    id: 'carboniferous',
    name: 'Carboniferous',
    range: '359 – 299 Ma',
    title: 'The age of green coal',
    body:
      'Vast lowland forests grew in warm, humid basins. When their wood fell into stagnant water, it did not fully decay. Compressed over millions of years, those forests became the coal seams that later powered an industrial world.',
    marker: 'Fern forest · 310 Ma',
    colour: '#4e5f3d',
    evidence: ['Coal measures', 'Amphibian trackways', 'Cyclothems'],
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    range: '201 – 145 Ma',
    title: 'A world in drift',
    body:
      'Pangaea pulled apart and shallow seas flooded the widening seams. Warm reefs, ammonites, and the first birds existed in a world that was already recognisably Earth, arranged in a different order.',
    marker: 'Ammonite · 165 Ma',
    colour: '#b2864f',
    evidence: ['Ammonite beds', 'Oolitic limestone', 'Rifting basins'],
  },
  {
    id: 'pleistocene',
    name: 'Pleistocene',
    range: '2.58 Ma – 11.7 ka',
    title: 'The ice remembers',
    body:
      'Repeated glaciers advanced and retreated across the northern continents. Each cycle left a readable signature: scratched bedrock, moraines, kettle lakes, and wind-blown loess that still forms some of the world’s richest soils.',
    marker: 'Glacial erratic · 20 ka',
    colour: '#94a8ad',
    evidence: ['Terminal moraines', 'Varved clays', 'Mammoth bones'],
  },
  {
    id: 'anthropocene',
    name: 'Anthropocene',
    range: '1950 – now',
    title: 'The layer we are writing',
    body:
      'Concrete, plastics, radiogenic isotopes, and altered carbon cycles now appear together in sediments worldwide. Whether formalised or not, the Anthropocene is a stratigraphic question about the kind of trace our species is leaving.',
    marker: 'Fly ash horizon · 1952',
    colour: '#c65c2e',
    evidence: ['Spheroidal carbon', 'Plastic inclusions', 'Nuclear isotopes'],
  },
];

export const GEOLOGY_STORIES = [
  {
    eyebrow: 'Field dispatch / 08',
    title: 'The hills that arrive by sea',
    summary:
      'On the east coast of Aotearoa, entire marine terraces are being lifted into pasture. The shoreline is rewriting itself faster than the map can follow.',
    tag: 'Tectonics',
    readTime: '7 min',
  },
  {
    eyebrow: 'Mineral notes / 12',
    title: 'Why the mountains are red',
    summary:
      'Iron, oxygen, and a very long conversation between water and stone. A brief biography of the colour that runs through the Atlas.',
    tag: 'Mineralogy',
    readTime: '5 min',
  },
  {
    eyebrow: 'Deep field / 03',
    title: 'A core sample is a letter',
    summary:
      'Beneath the Greenland ice, sediment cores hold particles of dust that have travelled across continents and through time to reach us.',
    tag: 'Glaciology',
    readTime: '9 min',
  },
];

export interface Plan {
  name: string;
  label: string;
  monthly: number;
  annual: number;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    name: 'Field Notes',
    label: 'For the curious',
    monthly: 0,
    annual: 0,
    description:
      'A quiet introduction to the geology beneath everything. Begin with our monthly notebook and selected guides.',
    features: [
      'Monthly field letter',
      'Three field guides each month',
      'Access to the public archive',
      'Community reading room',
    ],
    cta: 'Start with the letter',
  },
  {
    name: 'Prospector',
    label: 'Full field access',
    monthly: 24,
    annual: 19,
    description:
      'The full Lithos education: the flagship course, the complete field library, and a place in our live fieldcasts.',
    features: [
      'Everything in Field Notes',
      'The complete six-week course',
      'All 40+ field guides',
      'Live fieldcasts & recordings',
      'Field-day workbooks',
    ],
    featured: true,
    cta: 'Become a prospector',
  },
  {
    name: 'Expedition',
    label: 'For the devoted',
    monthly: 58,
    annual: 46,
    description:
      'For those who want the ground under their feet. Join small-group field days and bring your own sites to the table.',
    features: [
      'Everything in Prospector',
      'Quarterly small-group field days',
      'Personal field notebook reviews',
      'Guest lectures & reading circles',
      'One guest pass per season',
    ],
    cta: 'Join the expedition',
  },
];

export const COMPARISON_ROWS: Array<{
  feature: string;
  field: string | boolean;
  prospector: string | boolean;
  expedition: string | boolean;
}> = [
  { feature: 'Field letter', field: true, prospector: true, expedition: true },
  { feature: 'Field guide archive', field: 'Selected', prospector: 'Complete', expedition: 'Complete' },
  { feature: 'Flagship course', field: false, prospector: true, expedition: true },
  { feature: 'Live fieldcasts', field: false, prospector: true, expedition: true },
  { feature: 'Small-group field days', field: false, prospector: false, expedition: 'Quarterly' },
  { feature: 'Personal notebook review', field: false, prospector: false, expedition: true },
];

export const PLAN_FAQS = [
  {
    question: 'Can I change plans later?',
    answer:
      'Yes. Once you are signed in, choose a new plan above and it takes effect immediately — no need to register again. Move up or down whenever your fieldwork changes.',
  },
  {
    question: 'Is the course live?',
    answer:
      'The six chapters are self-paced and available immediately. One live field day is scheduled each season; if you cannot attend, the recording and workbook remain available.',
  },
  {
    question: 'I am a complete beginner. Is this for me?',
    answer:
      'Absolutely. Lithos is built for the curious, not the credentialed. We start with the simple act of looking, and every technical term is introduced in the field.',
  },
  {
    question: 'Do I keep access to the material?',
    answer:
      'Course material and workbooks remain available for as long as your plan is active, with a lifetime download of the field notes you have completed.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Try any paid plan for 14 days. If it is not the right fit, write to us and we will return your first payment in full.',
  },
];

export interface Tour {
  id: string;
  date: string;
  time: string;
  title: string;
  place: string;
  format: string;
  host: string;
  seats: number;
  summary: string;
}

export const TOURS: Tour[] = [
  {
    id: 'basalt-coast',
    date: '2026-11-12T18:00:00Z',
    time: '18:00 GMT',
    title: 'The basalt coast',
    place: 'Vík, Iceland',
    format: 'Fieldcast + live Q&A',
    host: 'Dr. Imani Vale',
    seats: 42,
    summary:
      'Follow a black-sand shore where the Atlantic is actively dismantling a volcanic landscape. We will read columns, sea stacks, and the direction of erosion.',
  },
  {
    id: 'painted-desert',
    date: '2026-12-03T17:00:00Z',
    time: '17:00 MST',
    title: 'The painted desert',
    place: 'Petrified Forest, Arizona',
    format: 'Fieldcast + live Q&A',
    host: 'Mara Okonkwo',
    seats: 28,
    summary:
      'A walk through Triassic river deposits and the mineral colours that record ancient floodplains. Bring a notebook; the section is full of small horizons.',
  },
  {
    id: 'folded-alps',
    date: '2027-01-21T09:00:00Z',
    time: '09:00 CET',
    title: 'The folded Alps',
    place: 'Valais, Switzerland',
    format: 'Fieldcast + guided mapping',
    host: 'Dr. Imani Vale',
    seats: 18,
    summary:
      'A close reading of a mountain belt in motion. We trace a folded limestone sequence and the tectonic pressure that lifted it above the snow line.',
  },
];

export const PAST_TOURS = [
  {
    title: 'Ash & orchids',
    place: 'Landmannalaugar, Iceland',
    date: 'September 2026',
    summary:
      'A young lava field, old moss, and the surprising tenderness of a landscape still cooling.',
    image: IMAGES.moss,
  },
  {
    title: 'The salt road',
    place: 'Atacama, Chile',
    date: 'July 2026',
    summary:
      'Evaporite basins, nitrate horizons, and the mineral economy of a desert that remembers water.',
    image: IMAGES.lava,
  },
];

export const FIELD_FACULTY = [
  {
    initials: 'IV',
    name: 'Dr. Imani Vale',
    role: 'Founder & field geologist',
    bio: 'A structural geologist who has spent two decades mapping volcanic margins from Iceland to the Pacific. Imani founded Lithos to make deep time feel less like a number and more like a place you can visit.',
  },
  {
    initials: 'MO',
    name: 'Mara Okonkwo',
    role: 'Sedimentologist & guide',
    bio: 'Mara reads rivers, deltas, and the histories they leave behind. She leads our sedimentology fieldcasts and writes the Field Notes letter.',
  },
  {
    initials: 'JS',
    name: 'Jonas Sørvik',
    role: 'Mineralogist & educator',
    bio: 'Jonas turns the cabinet of minerals into a family album. His hand-lens sessions are a Lithos ritual: patient, precise, and quietly revelatory.',
  },
];
