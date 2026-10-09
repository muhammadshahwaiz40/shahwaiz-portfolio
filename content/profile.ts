// Public profile content. Everything here is rendered on the site.
// Edit guide: docs/content-editing.md

export const profile = {
  name: "Muhammad Shahwaiz",
  positioning: "AI Systems & Backend Engineering",
  status: "Final-year BS Software Engineering student",
  menzyncRole: "Co-founder & FYP developer",
  location: "Daska, Sialkot, Pakistan",
  timeZone: "PKT · UTC+5",
  email: "shahwaizarts@gmail.com",
  // Fill in locally and set showPhone: true to display it. Kept empty in the repo.
  phone: "",
  showPhone: false,
  github: "https://github.com/muhammadshahwaiz40",
  linkedin: "https://www.linkedin.com/in/muhammad-shahwaiz-591b60285/",
  // Set to a file in /public (e.g. "/Muhammad-Shahwaiz-CV.pdf") to show a CV button.
  cvPath: "/Muhammad-Shahwaiz-CV.pdf" as string | null,
  // Set to an image in /public to replace the monogram.
  headshotPath: "/images/headshot.webp" as string | null,
  headline: "AI systems. Clear evidence. Human judgment.",
  shortBio:
    "I'm a final-year Software Engineering student and co-founder of Menzync. I build Python and TypeScript backends, AI integrations and automated tests, with a particular interest in systems that make their evidence and limitations clear.",
  longBio: [
    "I'm from Daska and study Software Engineering at the University of Management and Technology in Sialkot. My route here wasn't direct: pre-medical studies first, then data-entry work, then software.",
    "That early work was about getting messy information exactly right, and the habit carried over. The work I care about most now is AI software that shows where its answers came from, says what it couldn't check, and leaves the important decisions to a person.",
  ],
  aiAssistedNote:
    "I use AI coding tools heavily. I scope the problem, direct the build, review the code, and test it.",
  showAiAssistedNote: true,
  languages: ["Urdu", "Punjabi", "English"],
} as const;

export const education = [
  {
    title: "BS Software Engineering",
    place: "University of Management and Technology, Sialkot",
    period: "Sep 2023 – present",
    note: "Final year",
  },
  {
    title: "Intermediate, Pre-Medical",
    place: "Superior College, Daska",
    period: "2019 – 2021",
    note: "Grade A+",
  },
  {
    title: "Matriculation, Science",
    place: "Govt. High School, Daska",
    period: "2016 – 2018",
    note: "Grade A+",
  },
] as const;

export const coursework = [
  "Deep Learning",
  "Natural Language Processing",
  "Information Security",
  "Software Quality Engineering",
  "Databases",
] as const;

// Semester GPAs, not CGPA. Kept off the page unless showSemesterGpa is true.
export const semesterGpa = {
  show: false,
  // Add entries here, e.g. { term: "Fall 2025", gpa: "x.xx" }, then set show: true.
  entries: [] as { term: string; gpa: string }[],
};

export const beyondCode = [
  {
    title: "Calligraphy",
    text: "Nastaleeq, Thuluth, Dewani and Suls. It earned a Punjab Government merit certificate, and it is the reason this site is built around a single pen line.",
  },
  {
    title: "Chess",
    text: "I study classic games. It's a useful habit for designing systems too: always look for the reply you didn't expect.",
  },
  {
    title: "Reading",
    text: "Whatever I can get through between coursework and building.",
  },
] as const;
