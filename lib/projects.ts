export type ProjectStatus = "active" | "launching" | "planned";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  phase: string;
  summary: string;
  mission: string;
  whyItMatters: string;
  focusAreas: string[];
  cta: { label: string; href: string };
  /** Internal pages live at /projects/[slug] unless an override is set. */
  href?: string;
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Active",
  launching: "Launching",
  planned: "Planned",
};

export const projects: Project[] = [
  {
    slug: "what-would-make-broward-better",
    name: "What Would Make Broward Better?",
    tagline: "One question, asked all over Broward.",
    status: "active",
    phase: "Collecting answers around the county",
    summary:
      "Going around Broward asking one question: \"What is one realistic improvement that would make life in Broward better?\" The strongest answers become the projects we explore next.",
    mission:
      "Ask residents across Broward one question — what is one realistic improvement that would make life here better? — then select the strongest ideas and explore them in public.",
    whyItMatters:
      "Broward residents already know what is working and what could be better. Asking first — before arriving with a list of complaints — builds a project pipeline out of what people actually want.",
    focusAreas: [
      "Street interviews across Broward cities",
      "Traffic, housing, parks, nightlife, safety, and more",
      "Selecting the strongest ideas to explore",
      "Following each idea from question to outcome",
    ],
    cta: { label: "Add Your Answer", href: "/report" },
  },
  {
    slug: "a-safer-441",
    name: "A Safer 441",
    tagline:
      "Listening, learning, and exploring practical improvements for one of Broward's most important roads.",
    status: "active",
    phase: "Listening & learning how the corridor works",
    summary:
      "Speaking with drivers, pedestrians, businesses, police, planners, and transit users along US 441 / State Road 7 — learning why the road operates as it does and exploring what improvements are feasible.",
    mission:
      "Listen to the people who use US 441 and State Road 7 every day, understand why the corridor operates as it does, highlight improvements already underway, and explore practical changes with the agencies responsible.",
    whyItMatters:
      "US 441 connects thousands of Broward residents to work, school, and transit every day. Understanding how the corridor works — and what has worked on similar roads elsewhere — is the first step toward practical improvement.",
    focusAreas: [
      "Improvements already underway",
      "Conversations with drivers, riders, businesses, and planners",
      "Road-safety ideas that worked elsewhere",
      "Visual concepts for specific locations, checked for feasibility",
    ],
    cta: { label: "Explore A Safer 441", href: "/441-safe" },
    href: "/441-safe",
  },
  {
    slug: "project-tracker",
    name: "Project Tracker",
    tagline: "Every idea gets honest follow-through.",
    status: "launching",
    phase: "Preparing the first public projects",
    summary:
      "The public record behind every Broward Forward project: what is happening, what is already working, what could improve, what was proposed, and what happened next.",
    mission:
      "Give every idea and concern a public timeline — from first conversation to outcome — so progress is visible and follow-through is honest.",
    whyItMatters:
      "Good ideas disappear when nobody follows up. A public timeline keeps the next step visible — and shows honestly whether anything moved forward.",
    focusAreas: [
      "Ideas and concerns shared by residents",
      "Research into who understands each issue",
      "Public status timelines for every project",
      "Outcomes reported honestly, including setbacks",
    ],
    cta: { label: "Share an Idea or Concern", href: "/report" },
  },
  {
    slug: "business-rescue",
    name: "Ten Businesses in Thirty Days",
    tagline: "Real help for real Broward businesses — documented publicly.",
    status: "launching",
    phase: "Accepting applications",
    summary:
      "A business-rescue project that helps Broward businesses improve their visibility, marketing, websites, and customer presentation — while documenting measurable before-and-after results.",
    mission:
      "Help ten Broward businesses in thirty days with practical marketing, web, and presentation improvements, and publish the measurable results.",
    whyItMatters:
      "Small businesses hold neighborhoods together, and most of what they need — a working website, accurate listings, a short promo video — is fixable in days, not months.",
    focusAreas: [
      "Short promotional videos and photography",
      "Website and landing-page refreshes",
      "Google Business Profile cleanup",
      "Before-and-after results, published",
    ],
    cta: { label: "Apply for Business Rescue", href: "/business-rescue" },
  },
  {
    slug: "response-lab",
    name: "Broward Response Lab",
    tagline: "What slows down the people who respond?",
    status: "planned",
    phase: "Research questions",
    summary:
      "An evidence-based look at the barriers that keep police, fire rescue, dispatchers, and behavioral-health responders from operating as effectively as possible — focused on systems, not blame.",
    mission:
      "Investigate barriers that prevent public responders from operating efficiently — dispatch, repeat calls, interagency communication, technology, and non-emergency load — and propose practical pilots.",
    whyItMatters:
      "Response systems fail quietly: hospital wait times, towing delays, repeat calls, and paperwork all consume hours that never make the news. Understanding the bottlenecks is the first step to fixing them.",
    focusAreas: [
      "Dispatch and repeat-call patterns",
      "Mental-health and substance-use response",
      "Interagency communication and data sharing",
      "Technology and civilian response roles",
    ],
    cta: { label: "Get involved", href: "/get-involved" },
  },
  {
    slug: "flood-heat-watch",
    name: "Flood & Heat Watch",
    tagline: "Documenting the water and the heat, block by block.",
    status: "planned",
    phase: "Planned",
    summary:
      "Documenting repeated flooding and extreme-heat hazards in Broward — flooded streets, failed drainage, shadeless bus stops — and tracking practical improvements.",
    mission:
      "Document repeated flooding and extreme-heat hazards in Broward County and track practical improvements over time.",
    whyItMatters:
      "The same streets flood every rainy season and the same bus stops bake every summer. Recording where and how often turns anecdotes into evidence agencies can act on.",
    focusAreas: [
      "Flooded streets and drainage failures",
      "Unsafe, shadeless bus stops",
      "Tree-canopy gaps and pavement heat",
      "Emergency-access problems",
    ],
    cta: { label: "Report a flood or heat hazard", href: "/report" },
  },
  {
    slug: "youth-creator-lab",
    name: "Youth Creator Lab",
    tagline: "Real skills through real community projects.",
    status: "planned",
    phase: "Planned",
    summary:
      "Teaching Broward youth practical media, technology, business, and civic-storytelling skills by putting them to work on real community projects.",
    mission:
      "Teach Broward youth practical media, technology, business, and civic storytelling skills through real community projects.",
    whyItMatters:
      "Video, design, AI tools, and local journalism are learnable skills — and the projects on this site are real-world practice that benefits the whole county.",
    focusAreas: [
      "Video, photography, and design",
      "AI tools and web design",
      "Interviewing and local journalism",
      "Public speaking and project management",
    ],
    cta: { label: "Get involved", href: "/get-involved" },
  },
  {
    slug: "street-cat-network",
    name: "Street Cat Network",
    tagline: "Responsible support for Broward's community cats.",
    status: "planned",
    phase: "Planned",
    summary:
      "Coordinating responsible support for Broward community cats — trap-neuter-return, fosters, low-cost clinics, and volunteer trappers — without publishing exact colony locations.",
    mission:
      "Coordinate responsible support for Broward community cats: TNR requests, injured-cat reports, fosters, and volunteer trappers.",
    whyItMatters:
      "Community cats are a county-wide reality. Coordinated TNR and care is more humane and more effective than scattered individual efforts.",
    focusAreas: [
      "Colony and sighting submissions",
      "Trap-neuter-return coordination",
      "Foster and volunteer-trapper network",
      "Low-cost clinic resources",
    ],
    cta: { label: "Get involved", href: "/get-involved" },
  },
  {
    slug: "home-rescue",
    name: "Home Rescue Broward",
    tagline: "Find the housing help that already exists.",
    status: "planned",
    phase: "Planned",
    summary:
      "Helping residents understand housing, utility, repair, and eviction-prevention resources — what exists, who qualifies, and how to actually apply.",
    mission:
      "Help residents navigate rental assistance, eviction prevention, utility help, home repair, and related stability resources — without promising eligibility or outcomes.",
    whyItMatters:
      "Assistance programs exist, but finding them — and surviving the paperwork — is its own full-time job. Clear guides and honest expectations help people before a crisis becomes permanent.",
    focusAreas: [
      "Rental, utility, and repair assistance guides",
      "Eviction- and foreclosure-prevention resources",
      "Document checklists and application tips",
      "Tracking systemic barriers residents hit",
    ],
    cta: { label: "Get involved", href: "/get-involved" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
