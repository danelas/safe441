import type { Metadata } from "next";
import Hero from "@/components/Hero";
import OfficialRequest from "@/components/OfficialRequest";
import Problem from "@/components/Problem";
import CorridorMap from "@/components/CorridorMap";
import ReportForm from "@/components/ReportForm";
import CoalitionForm from "@/components/CoalitionForm";
import MemorialForm from "@/components/MemorialForm";
import Progress from "@/components/Progress";
import Principles from "@/components/Principles";
import Proposal from "@/components/Proposal";
import FoundingCoalition from "@/components/FoundingCoalition";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "A Safer 441",
  description:
    "A Safer 441 is a Broward Forward project: listening, learning, and exploring practical improvements for one of Broward's most important roads — US 441 / State Road 7.",
};

export default function Safe441Page() {
  return (
    <main>
      <Hero />
      <Problem />
      <OfficialRequest />
      <CorridorMap />
      <ReportForm />
      <CoalitionForm />
      <Progress />
      <Principles />
      <Proposal />
      <MemorialForm />
      <FoundingCoalition />
      <About />
      <Contact />
    </main>
  );
}
