// Experience, recognition and training. Rendered publicly.

export type Role = {
  title: string;
  org: string;
  period: string;
  place?: string;
  points: string[];
  show: boolean;
};

export const roles: Role[] = [
  {
    title: "AI Intern",
    org: "FlyRank",
    period: "Aug 2026 – present",
    place: "Remote",
    points: [
      "Audited my recurring work and sorted each task into delegate to AI, collaborate with AI, or keep human, then set up the tooling to match.",
    ],
    show: true,
  },
  {
    title: "Software Quality Engineering Intern",
    org: "Big Brains",
    period: "Aug 2026",
    points: [],
    show: true,
  },
  {
    title: "Change Makers Ambassador Intern",
    org: "DataCrumbs",
    period: "May 2026 · six-week internship",
    points: ["Community outreach, AI literacy and student engagement."],
    show: true,
  },
  {
    title: "Transcription Typist",
    org: "TranscribeMe",
    period: "Mar 2023 – Dec 2024",
    place: "Remote",
    points: ["Transcribed and proofread audio and video to client formatting standards."],
    show: true,
  },
  {
    title: "Data Entry Clerk",
    org: "Silver Star Enterprises",
    period: "Jan – Mar 2022",
    place: "Daska",
    points: ["Entered and maintained invoice and customer records."],
    show: true,
  },
];

export type Recognition = {
  title: string;
  detail: string;
  year: string;
  image?: { src: string; width: number; height: number; alt: string; caption: string };
};

export const topRecognition: Recognition[] = [
  {
    title: "3rd Place, All Pakistan Prompt Engineering Competition",
    detail: "National-level competition (APPEC). Score 184.97, representing UMT Sialkot.",
    year: "2026",
    image: {
      src: "/images/appec-leaderboard.webp",
      width: 1600,
      height: 272,
      alt: "Competition leaderboard row: rank 3, Muhammad Shahwaiz, University of Management and Technology Sialkot, score 184.97.",
      caption: "From the competition leaderboard. Other participants' rows removed.",
    },
  },
  {
    title: "Finalist, National Idea Bank IV",
    detail: "Founders Edge / ASPIRE Pakistan pre-incubation programme, with Menzync.",
    year: "2026",
  },
  {
    title: "Top Performer, Generative AI Application Developer",
    detail: "NCEAC-HEC intensive training.",
    year: "2025",
  },
];

export const otherRecognition = [
  "Merit certificate, essay writing, Government of the Punjab (A+)",
  "Merit certificate, calligraphy, Government of the Punjab (A+)",
  "Digital Pakistan Cybersecurity Hackathon, hands-on workshop, University of Sialkot, Aug 2026",
  "Essay writing participation, Chief Minister Punjab Youth Festival",
] as const;

export const training = [
  {
    title: "Start Writing Prompts like a Pro",
    issuer: "Google via Coursera",
    date: "Aug 2026",
    url: "https://www.coursera.org/verify/6MFDCCWTFB3L",
  },
  {
    title: "Positive Psychology Specialization Project: Design Your Life for Well-being",
    issuer: "University of Pennsylvania via Coursera",
    date: "Jun 2025",
    url: "https://www.coursera.org/verify/BDBEE6BPUYSM",
  },
  {
    title: "International Hands-On AI Training for Precision Agriculture, Health & Research Innovation",
    issuer: "VitaNova International Alliance for Sciences, IEEE EMBS MUET and Science Center for Programming Education (Egypt)",
    date: null,
    url: null,
  },
] as const;
