export type StateCodeSlug =
  | 'al' | 'ak' | 'az' | 'ar' | 'ca' | 'co' | 'ct' | 'de' | 'fl' | 'ga'
  | 'hi' | 'id' | 'il' | 'in' | 'ia' | 'ks' | 'ky' | 'la' | 'me' | 'md'
  | 'ma' | 'mi' | 'mn' | 'ms' | 'mo' | 'mt' | 'ne' | 'nv' | 'nh' | 'nj'
  | 'nm' | 'ny' | 'nc' | 'nd' | 'oh' | 'ok' | 'or' | 'pa' | 'ri' | 'sc'
  | 'sd' | 'tn' | 'tx' | 'ut' | 'vt' | 'va' | 'wa' | 'wv' | 'wi' | 'wy' | 'dc';

export type StateSEO = {
  title?: string;        // ~60–70 chars
  description?: string;  // ~155 chars
  keywords?: string;     // 5–7 comma-separated phrases
};

export type StateMetaEntry = {
  name: string;
  seo?: StateSEO;
  available?: boolean; // optional availability flag
};

// Helper to keep keyword phrasing consistent and natural
function kw(parts: string[]): string {
  return parts.join(', ');
}

// Production-grade, concise SEO metadata for all 50 states + DC
export const stateMetadata: Record<StateCodeSlug, StateMetaEntry> = {
  al: {
    name: 'Alabama',
    seo: {
      title: 'Private Health Insurance in Alabama',
      description: 'Compare private health plans in Alabama. Get clear guidance on medically underwritten coverage, PPO options, and costs. Schedule a no-pressure consultation.',
      keywords: kw(['Alabama private health insurance', 'AL health plans', 'PPO coverage', 'medically underwritten plans', 'affordable premiums', 'family health']),
    },
  },
  ak: {
    name: 'Alaska',
    seo: {
      title: 'Private Health Insurance in Alaska',
      description: 'Explore private health coverage in Alaska. Review medically underwritten plan options, eligibility, and savings with trusted guidance tailored to your needs.',
      keywords: kw(['Alaska private health insurance', 'AK PPO plans', 'medically underwritten coverage', 'lower monthly costs', 'individual health plans', 'family insurance']),
    },
  },
  az: {
    name: 'Arizona',
    seo: {
      title: 'Private Health Insurance in Arizona',
      description: 'Find Arizona private health plans with personalized support. Learn how medically underwritten options can reduce costs while maintaining strong benefits.',
      keywords: kw(['Arizona private health insurance', 'AZ health plans', 'PPO options', 'medically underwritten', 'affordable premiums', 'individual and family']),
    },
  },
  ar: {
    name: 'Arkansas',
    seo: {
      title: 'Private Health Insurance in Arkansas',
      description: 'Compare Arkansas private health coverage. Understand medically underwritten plan eligibility, benefits, and potential savings with expert assistance.',
      keywords: kw(['Arkansas private health insurance', 'AR health plans', 'PPO coverage', 'underwritten plans', 'cost savings', 'family healthcare']),
    },
  },
  ca: {
    name: 'California',
    seo: {
      title: 'Private Health Insurance in California',
      description: 'Review California private health plans. Get guidance on medically underwritten coverage, PPO networks, and cost control options for individuals and families.',
      keywords: kw(['California private health insurance', 'CA PPO plans', 'medically underwritten', 'affordable health coverage', 'individual plans', 'family insurance']),
    },
  },
  co: {
    name: 'Colorado',
    seo: {
      title: 'Private Health Insurance in Colorado',
      description: 'Explore Colorado private health insurance options. Understand medically underwritten coverage, eligibility, and ways to optimize benefits and budget.',
      keywords: kw(['Colorado private health insurance', 'CO health plans', 'PPO networks', 'underwritten coverage', 'lower premiums', 'family health']),
    },
  },
  ct: {
    name: 'Connecticut',
    seo: {
      title: 'Private Health Insurance in Connecticut',
      description: 'Find private health plans in Connecticut. Learn how medically underwritten options may provide robust benefits at competitive monthly costs.',
      keywords: kw(['Connecticut private health insurance', 'CT PPO plans', 'medically underwritten', 'affordable coverage', 'individual health plans', 'family plans']),
    },
  },
  de: {
    name: 'Delaware',
    seo: {
      title: 'Private Health Insurance in Delaware',
      description: 'Compare Delaware private health insurance. Get clear guidance on medically underwritten coverage, eligibility, and plan selection.',
      keywords: kw(['Delaware private health insurance', 'DE health plans', 'PPO coverage', 'underwritten options', 'cost-effective plans', 'family coverage']),
    },
  },
  dc: {
    name: 'District of Columbia',
    seo: {
      title: 'Private Health Insurance in Washington, DC',
      description: 'Explore private health coverage in Washington, DC. Review medically underwritten plan options and see if you qualify for lower monthly premiums.',
      keywords: kw(['Washington DC private health insurance', 'DC health plans', 'PPO options', 'medically underwritten', 'affordable premiums', 'individual coverage']),
    },
  },
  fl: {
    name: 'Florida',
    available: true,
    seo: {
      title: 'Private Health Insurance in Florida',
      description: 'Explore medically underwritten plans available in Florida. Compare coverage options and learn how to reduce monthly costs with expert, local guidance.',
      keywords: kw(['Florida private health insurance', 'FL PPO plans', 'medically underwritten coverage', 'affordable premiums', 'individual plans', 'family health']),
    },
  },
  ga: {
    name: 'Georgia',
    seo: {
      title: 'Private Health Insurance in Georgia',
      description: 'Review private health plans in Georgia. Understand medically underwritten coverage, eligibility, and potential savings with personalized support.',
      keywords: kw(['Georgia private health insurance', 'GA health plans', 'PPO coverage', 'underwritten options', 'lower premiums', 'family insurance']),
    },
  },
  hi: {
    name: 'Hawaii',
    seo: {
      title: 'Private Health Insurance in Hawaii',
      description: 'Compare Hawaii private health coverage. Learn about medically underwritten options, PPO networks, and strategies to manage monthly costs.',
      keywords: kw(['Hawaii private health insurance', 'HI PPO plans', 'underwritten plans', 'affordable health coverage', 'individual and family', 'benefits guidance']),
    },
  },
  id: {
    name: 'Idaho',
    seo: {
      title: 'Private Health Insurance in Idaho',
      description: 'Find Idaho private health insurance with clear guidance. Explore medically underwritten plans and see if you qualify for lower monthly premiums.',
      keywords: kw(['Idaho private health insurance', 'ID health plans', 'PPO coverage', 'medically underwritten', 'cost savings', 'family health plans']),
    },
  },
  il: {
    name: 'Illinois',
    seo: {
      title: 'Private Health Insurance in Illinois',
      description: 'Explore private health plans in Illinois. Understand medically underwritten coverage and how to balance benefits, networks, and budget.',
      keywords: kw(['Illinois private health insurance', 'IL PPO plans', 'underwritten options', 'affordable coverage', 'individual plans', 'family insurance']),
    },
  },
  in: {
    name: 'Indiana',
    seo: {
      title: 'Private Health Insurance in Indiana',
      description: 'Compare Indiana private health insurance. Get expert help reviewing medically underwritten coverage, eligibility, and monthly cost options.',
      keywords: kw(['Indiana private health insurance', 'IN health plans', 'PPO networks', 'underwritten coverage', 'budget-friendly plans', 'family healthcare']),
    },
  },
  ia: {
    name: 'Iowa',
    seo: {
      title: 'Private Health Insurance in Iowa',
      description: 'Find Iowa private health plans. Learn about medically underwritten coverage, PPO options, and practical ways to manage healthcare costs.',
      keywords: kw(['Iowa private health insurance', 'IA PPO plans', 'underwritten coverage', 'affordable premiums', 'individual health', 'family plans']),
    },
  },
  ks: {
    name: 'Kansas',
    seo: {
      title: 'Private Health Insurance in Kansas',
      description: 'Review Kansas private health insurance options. See how medically underwritten plans can help optimize benefits and monthly costs.',
      keywords: kw(['Kansas private health insurance', 'KS health plans', 'PPO coverage', 'underwritten options', 'lower premiums', 'family insurance']),
    },
  },
  ky: {
    name: 'Kentucky',
    seo: {
      title: 'Private Health Insurance in Kentucky',
      description: 'Explore private health coverage in Kentucky. Get guidance on medically underwritten plans and choosing benefits that fit your needs.',
      keywords: kw(['Kentucky private health insurance', 'KY health plans', 'PPO networks', 'underwritten coverage', 'affordable plans', 'family healthcare']),
    },
  },
  la: {
    name: 'Louisiana',
    seo: {
      title: 'Private Health Insurance in Louisiana',
      description: 'Compare Louisiana private health plans. Understand medically underwritten coverage and the potential for competitive premiums.',
      keywords: kw(['Louisiana private health insurance', 'LA PPO plans', 'underwritten options', 'affordable premiums', 'individual plans', 'family coverage']),
    },
  },
  me: {
    name: 'Maine',
    seo: {
      title: 'Private Health Insurance in Maine',
      description: 'Find private health insurance in Maine. Review medically underwritten coverage and networks with straightforward, professional guidance.',
      keywords: kw(['Maine private health insurance', 'ME health plans', 'PPO coverage', 'underwritten plans', 'cost-effective options', 'family health']),
    },
  },
  md: {
    name: 'Maryland',
    seo: {
      title: 'Private Health Insurance in Maryland',
      description: 'Explore private health plans in Maryland. Learn how medically underwritten coverage can align benefits, networks, and cost goals.',
      keywords: kw(['Maryland private health insurance', 'MD PPO plans', 'underwritten coverage', 'lower monthly costs', 'individual health', 'family insurance']),
    },
  },
  ma: {
    name: 'Massachusetts',
    seo: {
      title: 'Private Health Insurance in Massachusetts',
      description: 'Review Massachusetts private health insurance. Understand medically underwritten plan options, PPO networks, and cost considerations.',
      keywords: kw(['Massachusetts private health insurance', 'MA health plans', 'PPO coverage', 'underwritten options', 'affordable premiums', 'family health']),
    },
  },
  mi: {
    name: 'Michigan',
    available: true,
    seo: {
      title: 'Private Health Insurance in Michigan',
      description: 'Discover Michigan private health plans. Get guidance on medically underwritten coverage, eligibility, and ways to reduce monthly premiums.',
      keywords: kw(['Michigan private health insurance', 'MI PPO plans', 'underwritten coverage', 'affordable premiums', 'individual plans', 'family insurance']),
    },
  },
  mn: {
    name: 'Minnesota',
    seo: {
      title: 'Private Health Insurance in Minnesota',
      description: 'Compare Minnesota private health insurance. Learn about medically underwritten options, PPO networks, and cost-saving strategies.',
      keywords: kw(['Minnesota private health insurance', 'MN health plans', 'PPO options', 'medically underwritten', 'lower premiums', 'family healthcare']),
    },
  },
  ms: {
    name: 'Mississippi',
    seo: {
      title: 'Private Health Insurance in Mississippi',
      description: 'Find Mississippi private health coverage. Understand medically underwritten plans and how to balance benefits and budget.',
      keywords: kw(['Mississippi private health insurance', 'MS PPO plans', 'underwritten coverage', 'affordable plans', 'individual and family', 'health insurance']),
    },
  },
  mo: {
    name: 'Missouri',
    seo: {
      title: 'Private Health Insurance in Missouri',
      description: 'Explore Missouri private health insurance options. Review medically underwritten coverage and ways to manage monthly costs with confidence.',
      keywords: kw(['Missouri private health insurance', 'MO health plans', 'PPO coverage', 'underwritten options', 'cost savings', 'family plans']),
    },
  },
  mt: {
    name: 'Montana',
    seo: {
      title: 'Private Health Insurance in Montana',
      description: 'Compare private health plans in Montana. Get clear support evaluating medically underwritten coverage and eligibility.',
      keywords: kw(['Montana private health insurance', 'MT PPO plans', 'underwritten plans', 'affordable coverage', 'individual health', 'family insurance']),
    },
  },
  ne: {
    name: 'Nebraska',
    seo: {
      title: 'Private Health Insurance in Nebraska',
      description: 'Find Nebraska private health insurance. Learn how medically underwritten coverage can provide strong benefits at a competitive cost.',
      keywords: kw(['Nebraska private health insurance', 'NE health plans', 'PPO options', 'underwritten coverage', 'lower premiums', 'family health']),
    },
  },
  nv: {
    name: 'Nevada',
    seo: {
      title: 'Private Health Insurance in Nevada',
      description: 'Explore private health plans in Nevada. Understand medically underwritten options, networks, and monthly cost considerations.',
      keywords: kw(['Nevada private health insurance', 'NV PPO plans', 'underwritten options', 'affordable premiums', 'individual plans', 'family coverage']),
    },
  },
  nh: {
    name: 'New Hampshire',
    seo: {
      title: 'Private Health Insurance in New Hampshire',
      description: 'Compare private health coverage in New Hampshire. Get expert guidance on medically underwritten plans and PPO networks.',
      keywords: kw(['New Hampshire private health insurance', 'NH health plans', 'PPO coverage', 'underwritten plans', 'cost-effective', 'family health']),
    },
  },
  nj: {
    name: 'New Jersey',
    seo: {
      title: 'Private Health Insurance in New Jersey',
      description: 'Review private health insurance in New Jersey. Learn about medically underwritten coverage and ways to manage monthly costs.',
      keywords: kw(['New Jersey private health insurance', 'NJ PPO plans', 'underwritten options', 'affordable coverage', 'individual health', 'family plans']),
    },
  },
  nm: {
    name: 'New Mexico',
    seo: {
      title: 'Private Health Insurance in New Mexico',
      description: 'Find New Mexico private health plans. Understand medically underwritten coverage, eligibility, and how to optimize benefits and budget.',
      keywords: kw(['New Mexico private health insurance', 'NM health plans', 'PPO coverage', 'underwritten options', 'lower premiums', 'family insurance']),
    },
  },
  ny: {
    name: 'New York',
    seo: {
      title: 'Private Health Insurance in New York',
      description: 'Explore New York private health insurance. Compare medically underwritten plan options and PPO networks with professional guidance.',
      keywords: kw(['New York private health insurance', 'NY PPO plans', 'underwritten coverage', 'affordable premiums', 'individual plans', 'family health']),
    },
  },
  nc: {
    name: 'North Carolina',
    available: true,
    seo: {
      title: 'Private Health Insurance in North Carolina',
      description: 'Explore North Carolina private health plans. Learn about medically underwritten coverage, eligibility, and ways to reduce costs.',
      keywords: kw(['North Carolina private health insurance', 'NC PPO plans', 'underwritten options', 'affordable coverage', 'individual health', 'family plans']),
    },
  },
  nd: {
    name: 'North Dakota',
    seo: {
      title: 'Private Health Insurance in North Dakota',
      description: 'Compare North Dakota private health coverage. See if medically underwritten options fit your needs and budget.',
      keywords: kw(['North Dakota private health insurance', 'ND health plans', 'PPO coverage', 'underwritten plans', 'lower premiums', 'family insurance']),
    },
  },
  oh: {
    name: 'Ohio',
    seo: {
      title: 'Private Health Insurance in Ohio',
      description: 'Find Ohio private health insurance. Get clear guidance on medically underwritten plans, PPO networks, and monthly cost control.',
      keywords: kw(['Ohio private health insurance', 'OH PPO plans', 'underwritten coverage', 'affordable premiums', 'individual plans', 'family coverage']),
    },
  },
  ok: {
    name: 'Oklahoma',
    seo: {
      title: 'Private Health Insurance in Oklahoma',
      description: 'Explore Oklahoma private health plans. Review medically underwritten coverage, eligibility, and ways to manage healthcare costs.',
      keywords: kw(['Oklahoma private health insurance', 'OK health plans', 'PPO options', 'underwritten plans', 'cost savings', 'family health']),
    },
  },
  or: {
    name: 'Oregon',
    seo: {
      title: 'Private Health Insurance in Oregon',
      description: 'Compare Oregon private health insurance. Learn how medically underwritten coverage can help balance benefits and budget.',
      keywords: kw(['Oregon private health insurance', 'OR PPO plans', 'underwritten options', 'affordable coverage', 'individual and family', 'health insurance']),
    },
  },
  pa: {
    name: 'Pennsylvania',
    seo: {
      title: 'Private Health Insurance in Pennsylvania',
      description: 'Find Pennsylvania private health plans. Get expert support reviewing medically underwritten coverage and PPO networks.',
      keywords: kw(['Pennsylvania private health insurance', 'PA health plans', 'PPO coverage', 'underwritten plans', 'lower premiums', 'family healthcare']),
    },
  },
  ri: {
    name: 'Rhode Island',
    seo: {
      title: 'Private Health Insurance in Rhode Island',
      description: 'Explore Rhode Island private health insurance. Understand medically underwritten coverage and costs with trusted guidance.',
      keywords: kw(['Rhode Island private health insurance', 'RI PPO plans', 'underwritten options', 'affordable premiums', 'individual plans', 'family health']),
    },
  },
  sc: {
    name: 'South Carolina',
    seo: {
      title: 'Private Health Insurance in South Carolina',
      description: 'Compare South Carolina private health plans. Review medically underwritten coverage and see if you qualify for lower monthly costs.',
      keywords: kw(['South Carolina private health insurance', 'SC health plans', 'PPO coverage', 'underwritten plans', 'cost savings', 'family insurance']),
    },
  },
  sd: {
    name: 'South Dakota',
    seo: {
      title: 'Private Health Insurance in South Dakota',
      description: 'Find South Dakota private health insurance. Get guidance on medically underwritten coverage, networks, and affordability.',
      keywords: kw(['South Dakota private health insurance', 'SD PPO plans', 'underwritten options', 'affordable coverage', 'individual health', 'family plans']),
    },
  },
  tn: {
    name: 'Tennessee',
    seo: {
      title: 'Private Health Insurance in Tennessee',
      description: 'Explore Tennessee private health coverage. Learn how medically underwritten plans can align benefits with your budget.',
      keywords: kw(['Tennessee private health insurance', 'TN health plans', 'PPO coverage', 'underwritten plans', 'lower premiums', 'family healthcare']),
    },
  },
  tx: {
    name: 'Texas',
    seo: {
      title: 'Private Health Insurance in Texas',
      description: 'Compare private health plans in Texas. Understand medically underwritten coverage, PPO networks, and options to reduce monthly costs.',
      keywords: kw(['Texas private health insurance', 'TX PPO plans', 'underwritten coverage', 'affordable premiums', 'individual plans', 'family insurance']),
    },
  },
  ut: {
    name: 'Utah',
    seo: {
      title: 'Private Health Insurance in Utah',
      description: 'Find Utah private health insurance. Review medically underwritten plan options and networks with professional, unbiased guidance.',
      keywords: kw(['Utah private health insurance', 'UT health plans', 'PPO options', 'underwritten plans', 'cost-effective coverage', 'family health']),
    },
  },
  vt: {
    name: 'Vermont',
    seo: {
      title: 'Private Health Insurance in Vermont',
      description: 'Explore Vermont private health plans. Learn about medically underwritten coverage, PPO networks, and ways to manage monthly costs.',
      keywords: kw(['Vermont private health insurance', 'VT PPO plans', 'underwritten options', 'affordable coverage', 'individual health', 'family insurance']),
    },
  },
  va: {
    name: 'Virginia',
    seo: {
      title: 'Private Health Insurance in Virginia',
      description: 'Compare Virginia private health insurance. Evaluate medically underwritten coverage and PPO networks with professional support.',
      keywords: kw(['Virginia private health insurance', 'VA health plans', 'PPO coverage', 'underwritten plans', 'lower premiums', 'family coverage']),
    },
  },
  wa: {
    name: 'Washington',
    seo: {
      title: 'Private Health Insurance in Washington',
      description: 'Find private health plans in Washington. Understand medically underwritten coverage and options to optimize benefits and budget.',
      keywords: kw(['Washington private health insurance', 'WA PPO plans', 'underwritten coverage', 'affordable premiums', 'individual plans', 'family health']),
    },
  },
  wv: {
    name: 'West Virginia',
    seo: {
      title: 'Private Health Insurance in West Virginia',
      description: 'Explore West Virginia private health insurance. Get guidance on medically underwritten plans, eligibility, and cost management.',
      keywords: kw(['West Virginia private health insurance', 'WV health plans', 'PPO options', 'underwritten plans', 'cost savings', 'family insurance']),
    },
  },
  wi: {
    name: 'Wisconsin',
    seo: {
      title: 'Private Health Insurance in Wisconsin',
      description: 'Compare Wisconsin private health plans. Learn about medically underwritten coverage and networks with clear, trustworthy support.',
      keywords: kw(['Wisconsin private health insurance', 'WI PPO plans', 'underwritten options', 'affordable coverage', 'individual health', 'family healthcare']),
    },
  },
  wy: {
    name: 'Wyoming',
    seo: {
      title: 'Private Health Insurance in Wyoming',
      description: 'Find Wyoming private health insurance. Review medically underwritten coverage, PPO networks, and ways to control monthly costs.',
      keywords: kw(['Wyoming private health insurance', 'WY health plans', 'PPO coverage', 'underwritten options', 'lower premiums', 'family plans']),
    },
  },
};