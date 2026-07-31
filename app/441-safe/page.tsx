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
  title: "441 SAFE Broward",
  description:
    "441 SAFE Broward is a nonpartisan community effort seeking practical, measurable safety improvements along US 441 / State Road 7 in Broward County — the flagship project of Fix Broward.",
};

export default function Safe441Page() {
  return (
    <main>
      <Hero />
      <OfficialRequest />
      <Problem />
      <CorridorMap />
      <ReportForm />
      <CoalitionForm />
      <MemorialForm />
      <Progress />
      <Principles />
      <Proposal />
      <FoundingCoalition />
      <About />
      <Contact />
    </main>
  );
}
