// Featured and latest resource content adapted from PBIS reference materials.
// External links point to the original publications on pbis.org.

const PBIS_BASE = "https://www.pbis.org";

export interface FeaturedResource {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  kind: "video" | "resource";
}

export interface LatestResource {
  id: string;
  title: string;
  date: string;
  href: string;
}

export const FEATURED_RESOURCES: FeaturedResource[] = [
  {
    id: "isf-intro",
    title: "An Introduction to The Interconnected Systems Framework",
    description:
      "View the highlights of what will look different when the education and mental health systems are integrated.",
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/636d406851e53a8a33d97714_ISFThumb.avif",
    href: `${PBIS_BASE}/video/an-introduction-to-the-interconnected-systems-framework`,
    kind: "video",
  },
  {
    id: "seb-support",
    title:
      "Enhancing Social Emotional and Behavioral (SEB) Support: A Practical Guide for Selecting and Implementing SEB Programs within a Positive Behavioral Interventions and Support (PBIS) Framework",
    description: "",
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/67a52a6ae916066daae89a9b_SEBThumb.avif",
    href: `${PBIS_BASE}/resource/enhancing-social-emotional-and-behavioral-seb-support-a-practical-guide-for-selecting-and-implementing-seb-programs-within-a-positive-behavioral-interventions-and-support-pbis-framework`,
    kind: "resource",
  },
  {
    id: "ies-mtss-b",
    title: "IES MTSS-B Trial: Key Takeaways for District and State Leaders",
    description:
      "This brief reviews the latest randomized controlled trial (RCT) examining effects of PBIS, on a range of student outcomes. We share findings and key takeaways from this new study, in the context of the broader research literature, to guide local educational agency (LEAs) and state educational agencies (SEAs) in their use of MTSS to improve student outcomes.",
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/63c82bf7e88dc81750719518_mtssbthumb.avif",
    href: `${PBIS_BASE}/resource/ies-mtss-b-trial-key-takeaways-for-district-and-state-leaders`,
    kind: "resource",
  },
  {
    id: "tfi-companion",
    title: "Integrated Tiered Fidelity Inventory Companion Guide",
    description:
      "This guide is intended to support school teams, coaches, and trainers working to focus on cultural responsiveness and support for mental health and wellness within the PBIS framework",
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/636d3f9ed7aa4a958e1b5ae1_ForumCoPThumb.avif",
    href: `${PBIS_BASE}/resource/integrated-tiered-fidelity-inventory-companion-guide`,
    kind: "resource",
  },
  {
    id: "supporting-responding",
    title:
      "Supporting and Responding to Students' Social, Emotional, and Behavioral Needs: Evidence-Based Practices for Educators",
    description:
      '"Supporting and Responding" summarizes evidence-based, positive, and proactive practices that support and respond to students\' social, emotional, and behavioral (SEB) needs in classrooms and similar teaching and learning environments (e.g., small-group activity).',
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/636d3fbd656d676f9c86fa2a_de-escalation-thumb.avif",
    href: `${PBIS_BASE}/resource/supporting-and-responding-to-behavior-evidence-based-classroom-strategies-for-teachers`,
    kind: "resource",
  },
  {
    id: "tier1-disabilities",
    title:
      "Why Implement Tier 1 PBIS for Students with Disabilities? What Does Research Say?",
    description:
      "This brief summarizes empirical research on the effects of Tier 1 PBIS for students with disabilities. In general, when schools implement PBIS with fidelity, students with disabilities experience: (a) improved SEB outcomes and (b) reduced exclusionary discipline (i.e., office discipline referrals, suspensions, restraint, seclusion).",
    image:
      "https://cdn.prod.website-files.com/5d3725188825e071f1670246/6362f3bc466c5a14da786d25_tier1disabilities.avif",
    href: `${PBIS_BASE}/resource/why-implement-tier-1-pbis-for-students-with-disabilities-what-does-research-say`,
    kind: "resource",
  },
];

export const LATEST_RESOURCES: LatestResource[] = [
  {
    id: "teacher-delivered-k5",
    title: "Teacher-Delivered Behavioral Interventions in Grades K-5",
    date: "7/20/2026",
    href: `${PBIS_BASE}/resource/teacher-delivered-behavioral-interventions-in-grades-k-5`,
  },
  {
    id: "tfi-3-manual",
    title: "TFI 3.0 Action Planning Tool Manual",
    date: "6/30/2026",
    href: `${PBIS_BASE}/resource/tfi-3-action-planning-tool-manual`,
  },
  {
    id: "rural-middle-mh",
    title:
      "Enhancing PBIS Implementation to Identify and Deliver Mental Health Supports in a Rural Middle School",
    date: "6/25/2026",
    href: `${PBIS_BASE}/resource/enhancing-pbis-implementation-to-identify-and-deliver-mental-health-supports-in-a-rural-middle-school`,
  },
  {
    id: "regional-pbis",
    title:
      "Using a Regional PBIS Support System to Foster Positive Learning Environments and Reduce Restraint & Seclusion in Schools",
    date: "6/25/2026",
    href: `${PBIS_BASE}/resource/using-a-regional-pbis-support-system-to-foster-positive-learning-environments-and-reduce-restraint-seclusion-in-schools`,
  },
  {
    id: "return-after-crisis",
    title: "Planning for Student Return to School Following a Crisis",
    date: "6/23/2026",
    href: `${PBIS_BASE}/resource/planning-for-student-return-to-school-following-a-crisis`,
  },
];
