/**
 * DEMO DATA — every record here is fictional and clearly marked.
 * Never invent real hospitals, real people, or real medical data.
 * Screens import from here so the whole frontend runs without a backend.
 */

export type BloodGroup = 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';

export const BLOOD_GROUPS: BloodGroup[] = [
  'O-',
  'O+',
  'A-',
  'A+',
  'B-',
  'B+',
  'AB-',
  'AB+',
];

/** Who can receive from whom (red-cell compatibility). */
export const CAN_DONATE_TO: Record<BloodGroup, BloodGroup[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export const CAN_RECEIVE_FROM: Record<BloodGroup, BloodGroup[]> = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

export const compatibilityNote: Record<BloodGroup, string> = {
  'O-': 'Universal red-cell donor — every group can receive O−.',
  'O+': 'The most common group; donates to all Rh-positive groups.',
  'A-': 'Donates to A and AB groups, both Rh-negative and positive.',
  'A+': 'Donates to A+ and AB+ — in high demand.',
  'B-': 'Rare group; critical for B−, B+, AB− and AB+ patients.',
  'B+': 'Donates to B+ and AB+.',
  'AB-': 'The rarest group; universal plasma donor.',
  'AB+': 'Universal recipient — can receive from everyone.',
};

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  distanceKm: number;
  available: boolean;
  lastDonation: string;
  donations: number;
  /** 0–100, shown on request match results */
  matchScore?: number;
}

export interface BloodRequest {
  id: string;
  patientCode: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  city: string;
  urgency: 'critical' | 'urgent' | 'scheduled';
  contact: string;
  postedAgo: string;
  status: 'matching' | 'alerted' | 'responding' | 'fulfilled';
  matchedDonors: Donor[];
  notes: string;
}

export interface Drive {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  targetGroups: BloodGroup[];
  registered: number;
  capacity: number;
  description: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  role: 'Donor' | 'Recipient family';
  date: string;
  excerpt: string;
  body: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readMinutes: number;
  excerpt: string;
  body: string[];
}

export const donors: Donor[] = [
  { id: 'd1', name: 'Ayesha K.', bloodGroup: 'O-', city: 'Islamabad', distanceKm: 2.1, available: true, lastDonation: 'Jan 2026', donations: 6 },
  { id: 'd2', name: 'Bilal R.', bloodGroup: 'B+', city: 'Islamabad', distanceKm: 3.4, available: true, lastDonation: 'Nov 2025', donations: 3 },
  { id: 'd3', name: 'Fatima S.', bloodGroup: 'A+', city: 'Rawalpindi', distanceKm: 5.8, available: true, lastDonation: 'Dec 2025', donations: 4 },
  { id: 'd4', name: 'Usman T.', bloodGroup: 'O+', city: 'Islamabad', distanceKm: 6.2, available: false, lastDonation: 'Aug 2026', donations: 9 },
  { id: 'd5', name: 'Hira M.', bloodGroup: 'AB-', city: 'Rawalpindi', distanceKm: 7.9, available: true, lastDonation: 'Mar 2026', donations: 2 },
  { id: 'd6', name: 'Danish A.', bloodGroup: 'B-', city: 'Islamabad', distanceKm: 8.5, available: true, lastDonation: 'Feb 2026', donations: 5 },
  { id: 'd7', name: 'Sana J.', bloodGroup: 'A-', city: 'Islamabad', distanceKm: 9.3, available: true, lastDonation: 'Oct 2025', donations: 7 },
  { id: 'd8', name: 'Kamran H.', bloodGroup: 'AB+', city: 'Rawalpindi', distanceKm: 11.0, available: false, lastDonation: 'Jul 2026', donations: 1 },
];

export const activeRequest: BloodRequest = {
  id: 'req-1042',
  patientCode: 'Patient #1042',
  bloodGroup: 'B-',
  units: 2,
  hospital: 'Demo General Hospital',
  city: 'Islamabad',
  urgency: 'critical',
  contact: '+92 300 0000000',
  postedAgo: '12 min ago',
  status: 'responding',
  notes:
    'Surgery scheduled this evening. Family is with the patient; please call the number above when you arrive at reception.',
  matchedDonors: [
    { ...donors[5], matchScore: 96 },
    { ...donors[0], matchScore: 91 },
    { ...donors[6], matchScore: 84 },
    { ...donors[2], matchScore: 77 },
  ],
};

export const pastRequests: BloodRequest[] = [
  {
    ...activeRequest,
    id: 'req-1039',
    patientCode: 'Patient #1039',
    bloodGroup: 'O+',
    units: 1,
    urgency: 'urgent',
    postedAgo: '2 days ago',
    status: 'fulfilled',
    matchedDonors: [],
    notes: 'Fulfilled in 47 minutes with 3 donor responses.',
  },
  {
    ...activeRequest,
    id: 'req-1031',
    patientCode: 'Patient #1031',
    bloodGroup: 'A+',
    units: 3,
    urgency: 'scheduled',
    postedAgo: '1 week ago',
    status: 'fulfilled',
    matchedDonors: [],
    notes: 'Scheduled transfusion. Fulfilled a day early.',
  },
];

export const drives: Drive[] = [
  {
    id: 'drive-1',
    title: 'University Blood Drive — Autumn',
    organizer: 'Demo University Health Society',
    date: 'Sat, 10 Oct 2026',
    time: '9:00 AM – 3:00 PM',
    venue: 'Main Auditorium Hall',
    city: 'Islamabad',
    targetGroups: ['O-', 'O+', 'B-', 'AB-'],
    registered: 132,
    capacity: 200,
    description:
      'Our flagship semester drive. Walk in with your student card; the whole process takes about 30 minutes including rest and refreshments. First-time donors are guided by volunteers at every step.',
  },
  {
    id: 'drive-2',
    title: 'Community Donation Camp',
    organizer: 'Demo Welfare Trust',
    date: 'Sun, 18 Oct 2026',
    time: '10:00 AM – 4:00 PM',
    venue: 'Community Center, Sector G-9',
    city: 'Islamabad',
    targetGroups: ['A+', 'B+', 'O+'],
    registered: 64,
    capacity: 120,
    description:
      'Open to all residents. Doctors on site for the eligibility check, and a rest area with juices after donation. Bring a friend — most people donate in pairs.',
  },
  {
    id: 'drive-3',
    title: 'Emergency Reserve Drive',
    organizer: 'Demo Blood Bank Network',
    date: 'Sat, 24 Oct 2026',
    time: '9:00 AM – 2:00 PM',
    venue: 'City Hospital Blood Bank',
    city: 'Rawalpindi',
    targetGroups: ['O-', 'AB-', 'B-'],
    registered: 41,
    capacity: 80,
    description:
      'Focused on rare groups for the emergency reserve stock. If you are O−, AB− or B−, this drive is especially for you — your donation covers the patients nobody else can.',
  },
];

export const stories: Story[] = [
  {
    id: 'story-1',
    title: 'The call that came at 2 AM',
    author: 'Ayesha K.',
    role: 'Donor',
    date: 'Sep 2026',
    excerpt:
      'My phone buzzed at 2 AM. A B− patient needed blood across the city. I was at the hospital by 3.',
    body: [
      'My phone buzzed at 2 AM. The alert said a B− patient needed two units across the city, and I was one of the closest matches. I stared at the screen for ten seconds, then got up.',
      'I was at the hospital reception by 3. The family was sitting outside the ward, and the father just kept saying thank you before I had even donated. That part stays with you.',
      'The donation itself took twelve minutes. I was home by five, slept till noon, and honestly it was the most useful I have felt all year.',
    ],
  },
  {
    id: 'story-2',
    title: 'Three donors, forty-seven minutes',
    author: 'The R. family',
    role: 'Recipient family',
    date: 'Aug 2026',
    excerpt:
      'We posted the request from the hospital corridor. Three donors responded before the doctor finished her rounds.',
    body: [
      'We posted the request from the hospital corridor, not expecting much — we had spent the morning calling relatives. Then the responses started coming in.',
      'Three donors responded within forty-seven minutes. One of them stayed to make sure the transfusion started smoothly before leaving for work.',
      'We never learned their full names. That is fine. We think about them every time someone mentions blood donation.',
    ],
  },
  {
    id: 'story-3',
    title: 'My tenth donation',
    author: 'Usman T.',
    role: 'Donor',
    date: 'Aug 2026',
    excerpt:
      'Ten donations in four years. Each one takes less time than a lunch break, and each one mattered to someone.',
    body: [
      'I gave my tenth donation this month. Four years, ten visits, maybe six hours total. Less time than I spend on my phone in a week.',
      'What changed over the years is that it stopped feeling like an event. It is just something I do, like paying a bill — except this one saves a stranger.',
      'If you are eligible and healthy, start. The first one is the only one that feels scary.',
    ],
  },
];

export const articles: Article[] = [
  {
    slug: 'why-donate',
    title: 'Why donate blood? The honest answer',
    category: 'Why donate',
    readMinutes: 4,
    excerpt: 'One donation can help up to three patients. Here is what actually happens to your blood after you leave.',
    body: [
      'A single donation is separated into red cells, plasma, and platelets — which is why one visit can help up to three different patients.',
      'Red cells go to surgery and trauma patients. Plasma helps burn and liver patients. Platelets go to cancer patients undergoing treatment.',
      'Your body replaces the donated fluid within 24 hours and the red cells within a few weeks. Most donors feel normal the same day.',
    ],
  },
  {
    slug: 'donation-process',
    title: 'What happens during a donation, step by step',
    category: 'The process',
    readMinutes: 5,
    excerpt: 'Registration, a quick health check, twelve minutes in the chair, then juice. The full walkthrough.',
    body: [
      'Registration takes five minutes: an ID check and a short confidential questionnaire about your health history.',
      'A finger-prick test checks your hemoglobin, and a nurse takes your blood pressure and pulse. This is the eligibility gate — it protects you as much as the recipient.',
      'The donation itself takes 8–12 minutes. Afterwards you rest for 10–15 minutes with juice and snacks while the staff monitors you.',
    ],
  },
  {
    slug: 'myths-vs-facts',
    title: 'Myths vs facts: blood donation edition',
    category: 'Myths vs facts',
    readMinutes: 3,
    excerpt: '"It hurts too much", "I will feel weak for days" — separating fear from fact.',
    body: [
      'Myth: donating hurts a lot. Fact: the needle pinch lasts a second or two; most donors describe it as mild pressure.',
      'Myth: you will feel weak for days. Fact: you rest 15 minutes, drink fluids, and most people resume normal activity the same day.',
      'Myth: you can catch an infection. Fact: every needle is sterile, single-use, and disposed of immediately.',
    ],
  },
  {
    slug: 'eligibility-basics',
    title: 'Can you donate? The basics in two minutes',
    category: 'Eligibility',
    readMinutes: 2,
    excerpt: 'Age, weight, hemoglobin, and timing — the four checks that decide it.',
    body: [
      'You generally need to be 18–65, weigh at least 50 kg, and have hemoglobin above 12.5 g/dL.',
      'Wait at least 3 months between whole-blood donations. Eat a proper meal and drink water beforehand.',
      'Temporary deferrals apply after certain illnesses, tattoos, or medications — the on-site check exists to keep you safe.',
    ],
  },
];

export const homeStats = [
  { value: '2,400+', label: 'Registered donors' },
  { value: '18', label: 'Cities covered' },
  { value: '47 min', label: 'Median match time' },
  { value: '312', label: 'Requests fulfilled' },
];

export const urgencyMeta = {
  critical: { label: 'Critical', bg: 'bg-crimson', text: 'text-white' },
  urgent: { label: 'Urgent', bg: 'bg-amberSoft', text: 'text-amber' },
  scheduled: { label: 'Scheduled', bg: 'bg-leafSoft', text: 'text-leaf' },
} as const;

export const timelineSteps = [
  { key: 'requested', label: 'Requested', detail: 'Request posted and verified' },
  { key: 'matching', label: 'AI matching', detail: 'Scoring nearby compatible donors' },
  { key: 'alerted', label: 'Donors alerted', detail: 'Top matches notified instantly' },
  { key: 'responding', label: 'Donors responding', detail: 'Donors accepting the request' },
  { key: 'fulfilled', label: 'Fulfilled', detail: 'Donation completed' },
] as const;
