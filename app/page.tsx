import Nav from "@/components/Nav";
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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
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
      <Footer />
    </>
  );
}
