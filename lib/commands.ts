import type { Command } from "@/components/command-palette";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export function buildCommands(): Command[] {
  const pages: Command[] = [
    { id: "home", label: "Home", group: "Pages", href: "/" },
    { id: "work", label: "All work", group: "Pages", href: "/work" },
    { id: "about", label: "About", group: "Pages", href: "/#about" },
    { id: "experience", label: "Experience & recognition", group: "Pages", href: "/#experience" },
    { id: "contact", label: "Contact", group: "Pages", href: "/#contact" },
  ];
  const caseStudies: Command[] = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ id: `cs-${p.slug}`, label: p.name, hint: p.tagline, group: "Case studies", href: `/work/${p.slug}` }));
  const links: Command[] = [
    { id: "nextact-live", label: "Open nextact.tech", group: "Links", hint: "Live product", href: "https://nextact.tech" },
    { id: "github", label: "GitHub", group: "Links", href: profile.github },
    { id: "linkedin", label: "LinkedIn", group: "Links", href: profile.linkedin },
    ...(profile.cvPath ? [{ id: "cv", label: "Download CV (PDF)", group: "Links", href: profile.cvPath }] : []),
  ];
  const actions: Command[] = [
    { id: "copy-email", label: "Copy email address", group: "Actions", hint: profile.email, action: "copy-email" },
    { id: "email", label: "Write an email", group: "Actions", href: `mailto:${profile.email}` },
  ];
  return [...pages, ...caseStudies, ...links, ...actions];
}
