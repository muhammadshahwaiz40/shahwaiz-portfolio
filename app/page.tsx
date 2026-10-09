import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured";
import { Approach } from "@/components/home/approach";
import { Experience } from "@/components/home/experience";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Approach />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
