// Platform policy positions data
// X-axis: Left-Right (-1 to 1 scale)
// Y-axis: Authoritarian-Libertarian (-1 to 1 scale)

const platformData = [
  {
    id: "twitter",
    name: "X (Twitter)",
    color: "#1DA1F2",
    icon: "fa-brands fa-twitter",
    description: "Global microblogging platform acquired by Elon Musk in 2022.",
    positions: [
      {
        year: 2015,
        x: -0.6,
        y: 0.8,
        description:
          "Banned ISIS-linked accounts; strong centralized anti-extremism stance.",
      },
      {
        year: 2016,
        x: -0.5,
        y: 0.7,
        description:
          "Continued counter-terrorism bans; slightly reduced public focus.",
      },
      {
        year: 2017,
        x: -0.4,
        y: 0.6,
        description:
          "Initial crackdown on QAnon begins; still centrally managed.",
      },
      {
        year: 2018,
        x: -0.3,
        y: 0.5,
        description: "Bans of conspiracy influencers continued.",
      },
      {
        year: 2019,
        x: -0.2,
        y: 0.4,
        description: "Further adjustments to content policy, less aggressive.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.5,
        description:
          "Trump's tweets labeled; targeted misinformation moderation.",
      },
      {
        year: 2021,
        x: 0.2,
        y: 0.2,
        description: "Permanent ban of Trump after Capitol riot; major shift.",
      },
      {
        year: 2022,
        x: 0.5,
        y: -0.2,
        description:
          "Musk bans journalists under new policy; start of free-speech rhetoric.",
      },
      {
        year: 2023,
        x: 0.7,
        y: -0.4,
        description: "Conservative voices amplified; reduced moderation.",
      },
      {
        year: 2024,
        x: 0.8,
        y: -0.5,
        description: "Continued Musk-era moderation stance.",
      },
      {
        year: 2025,
        x: 0.8,
        y: -0.5,
        description: "Continued Musk-era moderation stance.",
      },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    icon: "fa-brands fa-facebook-f",
    description: "The largest social network worldwide, owned by Meta.",
    positions: [
      {
        year: 2015,
        x: 0.3,
        y: 0.3,
        description:
          "Focus on ad growth and minimal moderation before Cambridge Analytica.",
      },
      {
        year: 2016,
        x: 0.3,
        y: 0.3,
        description:
          "Focus on ad growth and minimal moderation before Cambridge Analytica.",
      },
      {
        year: 2017,
        x: 0.3,
        y: 0.3,
        description:
          "Focus on ad growth and minimal moderation before Cambridge Analytica.",
      },
      {
        year: 2018,
        x: 0.1,
        y: 0.5,
        description:
          "More active moderation after political scandals; removal of QAnon content.",
      },
      {
        year: 2019,
        x: 0.1,
        y: 0.5,
        description:
          "More active moderation after political scandals; removal of QAnon content.",
      },
      {
        year: 2020,
        x: 0.1,
        y: 0.5,
        description:
          "More active moderation after political scandals; removal of QAnon content.",
      },
      {
        year: 2021,
        x: 0.1,
        y: 0.5,
        description:
          "More active moderation after political scandals; removal of QAnon content.",
      },
      {
        year: 2022,
        x: 0.4,
        y: 0.3,
        description:
          "Balancing business strategy and increasing government scrutiny.",
      },
      {
        year: 2023,
        x: 0.2,
        y: 0.4,
        description: "Reported over 1.7 billion fake accounts removed.",
      },
      {
        year: 2024,
        x: 0.4,
        y: 0.3,
        description:
          "Balancing business strategy and increasing government scrutiny.",
      },
      {
        year: 2025,
        x: 0.4,
        y: 0.3,
        description:
          "Balancing business strategy and increasing government scrutiny.",
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#69C9D0",
    icon: "fa-brands fa-tiktok",
    description: "Short-form video platform owned by ByteDance.",
    positions: [
      {
        year: 2015,
        x: -0.2,
        y: 0.3,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2016,
        x: -0.2,
        y: 0.3,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2017,
        x: -0.2,
        y: 0.3,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2018,
        x: -0.2,
        y: 0.3,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2019,
        x: -0.2,
        y: 0.3,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.2,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2021,
        x: -0.1,
        y: 0.2,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2022,
        x: -0.1,
        y: 0.2,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2023,
        x: -0.1,
        y: 0.2,
        description:
          "Removed misinformation and supported digital activism; under global scrutiny.",
      },
      {
        year: 2024,
        x: -0.1,
        y: 0.1,
        description: "Faced U.S. ban legislation; under increased regulation.",
      },
      {
        year: 2025,
        x: 0,
        y: 0,
        description: "Ban implementation deadline hits; uncertainty.",
      },
    ],
  },
  {
    id: "reddit",
    name: "Reddit",
    color: "#FF4500",
    icon: "fa-brands fa-reddit-alien",
    description: "Community-focused discussion platform with subreddits.",
    positions: [
      {
        year: 2015,
        x: 0,
        y: 0,
        description:
          "Community-led governance; tolerated some controversial subreddits.",
      },
      {
        year: 2016,
        x: 0,
        y: 0,
        description:
          "Community-led governance; tolerated some controversial subreddits.",
      },
      {
        year: 2017,
        x: 0,
        y: 0,
        description:
          "Community-led governance; tolerated some controversial subreddits.",
      },
      {
        year: 2018,
        x: 0,
        y: 0,
        description:
          "Community-led governance; tolerated some controversial subreddits.",
      },
      {
        year: 2019,
        x: 0,
        y: 0,
        description:
          "Community-led governance; tolerated some controversial subreddits.",
      },
      {
        year: 2020,
        x: 0,
        y: 0,
        description:
          "Banned hate-based communities like r/The_Donald under new hate speech rules.",
      },
      {
        year: 2021,
        x: 0,
        y: 0,
        description:
          "Banned hate-based communities like r/The_Donald under new hate speech rules.",
      },
      {
        year: 2022,
        x: 0,
        y: 0,
        description:
          "Banned hate-based communities like r/The_Donald under new hate speech rules.",
      },
      {
        year: 2023,
        x: 0,
        y: 0,
        description:
          "Banned hate-based communities like r/The_Donald under new hate speech rules.",
      },
      {
        year: 2024,
        x: 0,
        y: 0,
        description:
          "Banned hate-based communities like r/The_Donald under new hate speech rules.",
      },
      {
        year: 2025,
        x: -0.4,
        y: 0.6,
        description:
          "Mass accidental bans of NSFW subs; tech glitch questioned moderation.",
      },
    ],
  },
  {
    id: "gab",
    name: "Gab",
    color: "#21CF7A",
    icon: "./logos/gab.png",
    description:
      "Social media platform known for its stance on free speech and minimal content moderation.",
    positions: [
      {
        year: 2015,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2016,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2017,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2018,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2019,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2020,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2021,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2022,
        x: 0.9,
        y: -0.6,
        description:
          "Andrew Torba explicitly brands Gab as a Christian nationalist platform.",
      },
      {
        year: 2023,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2024,
        x: 0.9,
        y: -0.5,
        description:
          "Marketed as a free-speech platform with little to no moderation.",
      },
      {
        year: 2025,
        x: 0.9,
        y: -0.6,
        description:
          "Continues to resist moderation, embraced by fringe political figures.",
      },
    ],
  },
  {
    id: "bluesky",
    name: "BlueSky",
    color: "#0285FF",
    icon: "./logos/Bluesky_Logo.png",
    description: "Decentralized social network that emerged from Twitter R&D.",
    positions: [
      {
        year: 2015,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2016,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2017,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2018,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2019,
        x: 0,
        y: 0,
        description:
          "Twitter announces plans to explore decentralized social media, launches project 'Bluesky'.",
      },
      {
        year: 2020,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2021,
        x: -0.2,
        y: -0.3,
        description:
          "Jack Dorsey steps down from Twitter and deepens support for Bluesky.",
      },
      {
        year: 2022,
        x: 0,
        y: 0,
        description:
          "Decentralized platform with moderation left to community; safe haven post-Twitter policy changes.",
      },
      {
        year: 2023,
        x: -0.3,
        y: -0.6,
        description:
          "Bluesky launches invite-only beta, rapidly gains traction amid dissatisfaction with Musk's Twitter.",
      },
      {
        year: 2024,
        x: -0.4,
        y: -0.7,
        description:
          "Introduces custom moderation services and composable feeds, letting users choose filtering rules.",
      },
      {
        year: 2025,
        x: -0.4,
        y: -0.8,
        description:
          "Develops strong anti-authoritarian stance, refuses to curate content centrally, encourages algorithmic choice.",
      },
    ],
  },
  {
    id: "threads",
    name: "Threads",
    color: "#000000",
    icon: "./logos/threadslogo.png",
    description:
      "Text-based conversation app from Meta, launched as a Twitter competitor.",
    positions: [
      {
        year: 2015,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2016,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2017,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2018,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2019,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2020,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2021,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2022,
        x: 0,
        y: 0,
        description:
          "Started with limited political content; gradually relaxed moderation policies in 2024–2025.",
      },
      {
        year: 2023,
        x: -0.1,
        y: 0.2,
        description:
          "Threads launched as a Twitter competitor, positioned as 'a friendlier space'.",
      },
      {
        year: 2024,
        x: -0.1,
        y: 0.2,
        description:
          "Continues as neutral, lifestyle-focused platform avoiding political content.",
      },
      {
        year: 2025,
        x: 0,
        y: 0,
        description:
          "Begins recommending political content in feed, cautious entry into political conversation space.",
      },
    ],
  },
  {
    id: "truthsocial",
    name: "Truth Social",
    color: "#0074CC",
    icon: "./logos/truth-social-icon-2048x2048-323r6m8b.png",
    description:
      "Social media platform founded by Trump Media & Technology Group.",
    positions: [
      {
        year: 2015,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2016,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2017,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2018,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2019,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2020,
        x: 0,
        y: 0,
        description:
          "Minimal moderation, promotes unrestricted expression aligned with far-right values.",
      },
      {
        year: 2021,
        x: 0.9,
        y: -0.6,
        description:
          "Trump announces plans to launch Truth Social, citing need for 'free speech' platform outside Big Tech control.",
      },
      {
        year: 2022,
        x: 0.9,
        y: -0.6,
        description: "Truth Social platform launches with Devin Nunes as CEO.",
      },
      {
        year: 2023,
        x: 0.9,
        y: -0.6,
        description:
          "Truth Social struggles with technical and financial issues but remains active during 2024 election cycle.",
      },
      {
        year: 2024,
        x: 0.9,
        y: -0.5,
        description:
          "Devin Nunes appointed chair of President's Intelligence Advisory Board.",
      },
      {
        year: 2025,
        x: 0.9,
        y: -0.5,
        description:
          "Continues as an echo chamber for right-wing populism and a megaphone for Trump's campaign and policy agenda.",
      },
    ],
  },
];

// Timeline events for all platforms
const timelineEvents = [
  // Twitter/X Events
  {
    id: "twitter-dorsey-2015",
    year: 2015,
    title: "Jack Dorsey Returns as Twitter CEO",
    description:
      "Jack Dorsey returns as interim CEO of Twitter, later becoming permanent CEO.",
    platforms: ["twitter"],
    category: "leadership",
  },
  {
    id: "twitter-transparency-2015",
    year: 2015,
    title: "Twitter Launches Political Transparency Page",
    description:
      "Twitter launches a political transparency page to help users better engage with policy issues on the platform.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "event-1",
    year: 2015,
    title: "ISIS Social Media Crackdown",
    description:
      "Major platforms like Twitter implemented strong anti-extremism policies, banning ISIS-linked accounts.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "event-2",
    year: 2016,
    title: "US Presidential Election",
    description:
      "The 2016 US election highlighted concerns about misinformation and platform moderation policies.",
    platforms: ["facebook", "twitter"],
    category: "policy",
  },
  {
    id: "event-3",
    year: 2017,
    title: "QAnon Crackdown Begins",
    description:
      "Twitter began initial crackdowns on QAnon-related content while maintaining centralized moderation.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-bluesky-2021",
    year: 2021,
    title: "Twitter Begins Bluesky Research",
    description:
      "Twitter begins the research phase of Bluesky, an open source decentralized social media protocol where users can choose which algorithmic curation they want.",
    platforms: ["twitter", "bluesky"],
    category: "technology",
  },
  {
    id: "event-5",
    year: 2020,
    title: "Trump Tweet Labels",
    description:
      "Twitter began labeling Trump's tweets with fact-check notices and implemented targeted misinformation moderation.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "event-7",
    year: 2021,
    title: "Trump Ban After Capitol Riot",
    description:
      "Twitter permanently banned President Trump following the January 6 Capitol riot, marking a major policy shift.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-musk-acquisition-2022",
    year: 2022,
    title: "Elon Musk Acquires Twitter",
    description:
      "Elon Musk and Twitter board reach a deal for Musk to acquire the company for $44 billion and take it private.",
    platforms: ["twitter"],
    category: "leadership",
  },
  {
    id: "twitter-trump-reinstatement-2022",
    year: 2022,
    title: "Trump Account Reinstated",
    description:
      "Elon Musk reinstates several previously banned accounts, including Donald Trump's.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "event-8",
    year: 2022,
    title: "Musk Twitter Acquisition",
    description:
      "Elon Musk acquired Twitter, banned journalists under new policy, and began promoting free-speech rhetoric.",
    platforms: ["twitter"],
    category: "leadership",
  },
  {
    id: "twitter-yaccarino-2023",
    year: 2023,
    title: "Linda Yaccarino Becomes CEO",
    description: "Linda Yaccarino becomes the CEO of Twitter (now X).",
    platforms: ["twitter"],
    category: "leadership",
  },
  {
    id: "twitter-rebranding-2023",
    year: 2023,
    title: "Twitter Rebrands to X",
    description: "Elon Musk rebrands Twitter to X.",
    platforms: ["twitter"],
    category: "branding",
  },
  {
    id: "event-9",
    year: 2023,
    title: "Platform Polarization",
    description:
      "Social media platforms increasingly defined by political alignment: X amplified conservative voices while BlueSky became a progressive alternative.",
    platforms: ["twitter", "bluesky"],
    category: "policy",
  },

  // Facebook Events
  {
    id: "facebook-misinformation-2016",
    year: 2016,
    title: "Election Misinformation Crisis",
    description:
      "Facebook plays a central role in political misinformation during the U.S. election, followed by the Cambridge Analytica scandal.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "facebook-factchecking-2016",
    year: 2016,
    title: "Facebook Launches Fact-checking",
    description:
      "Facebook starts using fact-checking services after the 2016 election.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "event-4",
    year: 2018,
    title: "Cambridge Analytica Scandal",
    description:
      "Facebook faced backlash after the Cambridge Analytica data misuse scandal, leading to increased content moderation.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "facebook-kaplan-kavanaugh-2018",
    year: 2018,
    title: "Kaplan Controversy",
    description:
      "Joel Kaplan sparks internal outrage by attending Brett Kavanaugh's Supreme Court hearing.",
    platforms: ["facebook"],
    category: "leadership",
  },
  {
    id: "facebook-trump-ban-2021",
    year: 2021,
    title: "Trump Banned From Meta Platforms",
    description:
      "Meta bans Trump from its platforms after January 6 Capitol riot.",
    platforms: ["facebook", "instagram"],
    category: "policy",
  },
  {
    id: "facebook-moderation-scaling-2022",
    year: 2022,
    title: "Meta Scales Back Moderation",
    description:
      "Meta begins scaling back content moderation efforts amid cost-cutting.",
    platforms: ["facebook", "instagram"],
    category: "policy",
  },
  {
    id: "facebook-dei-removal-2024",
    year: 2024,
    title: "Meta Removes DEI Goals",
    description:
      "Meta quietly removes DEI goals from its corporate disclosures.",
    platforms: ["facebook", "instagram", "threads"],
    category: "policy",
  },
  {
    id: "facebook-fact-checking-ends-2025",
    year: 2025,
    title: "Meta Ends Third-Party Fact Checking",
    description:
      "Meta stops using third-party fact checkers and rolls out 'Community Notes' feature for Instagram, Threads, and Facebook.",
    platforms: ["facebook", "instagram", "threads"],
    category: "policy",
  },

  // Instagram Events
  {
    id: "instagram-mosseri-2018",
    year: 2018,
    title: "Adam Mosseri Becomes Head of Instagram",
    description: "Adam Mosseri becomes the head of Instagram.",
    platforms: ["instagram"],
    category: "leadership",
  },
  {
    id: "instagram-reels-2022",
    year: 2022,
    title: "Instagram Focuses on Reels",
    description:
      "Instagram continues to focus on Reels amid TikTok competition; largely avoids political news.",
    platforms: ["instagram"],
    category: "product",
  },
  {
    id: "instagram-political-content-2025",
    year: 2025,
    title: "Instagram Allows More Political Content",
    description:
      "Threads reverses course and begins recommending political content. Mosseri says the platform is experimenting with allowing more political discussion while keeping toxicity in check.",
    platforms: ["instagram", "threads"],
    category: "policy",
  },

  // TikTok Events
  {
    id: "tiktok-trump-2020",
    year: 2020,
    title: "Trump Attempts to Force TikTok Divestiture",
    description:
      "Trump attempts to force ByteDance to divest TikTok's U.S. operations.",
    platforms: ["tiktok"],
    category: "policy",
  },
  {
    id: "tiktok-chew-2021",
    year: 2021,
    title: "Shou Zi Chew Becomes TikTok CEO",
    description: "Shou Zi Chew becomes CEO of TikTok.",
    platforms: ["tiktok"],
    category: "leadership",
  },
  {
    id: "tiktok-trump-ally-2023",
    year: 2023,
    title: "TikTok Hires Trump Ally",
    description: "TikTok hires Donald Trump ally Brian Ballard.",
    platforms: ["tiktok"],
    category: "strategy",
  },
  {
    id: "event-10",
    year: 2024,
    title: "TikTok Ban Legislation",
    description:
      "TikTok faced US ban legislation and increased regulatory pressure.",
    platforms: ["tiktok"],
    category: "policy",
  },
  {
    id: "tiktok-trump-extension-2025",
    year: 2025,
    title: "Trump Extends TikTok Deadline",
    description:
      "Trump extends deadline to keep TikTok running in US; Chew publicly thanks Trump amid renewed legislative threats.",
    platforms: ["tiktok"],
    category: "policy",
  },

  // Reddit Events
  {
    id: "reddit-huffman-2015",
    year: 2015,
    title: "Steve Huffman Returns as CEO",
    description: "Steve Huffman returns as CEO of Reddit.",
    platforms: ["reddit"],
    category: "leadership",
  },
  {
    id: "reddit-the-donald-2020",
    year: 2020,
    title: "Reddit Bans r/The_Donald",
    description: "Reddit bans r/The_Donald for rule violations.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "event-6",
    year: 2020,
    title: "Reddit Hate Speech Policy",
    description:
      "Reddit banned controversial communities like r/The_Donald under new hate speech rules.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "reddit-api-2023",
    year: 2023,
    title: "Reddit API Pricing Controversy",
    description: "API pricing protests cause major subreddit blackouts.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "reddit-ipo-2024",
    year: 2024,
    title: "Reddit IPO",
    description: "Reddit IPOs on NYSE.",
    platforms: ["reddit"],
    category: "business",
  },
  {
    id: "event-11",
    year: 2025,
    title: "Reddit Moderation Controversy",
    description:
      "Mass accidental bans of NSFW subreddits due to technical glitches sparked debates about platform moderation.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "reddit-monetization-2025",
    year: 2025,
    title: "Reddit Announces New Monetization Policies",
    description:
      "Reddit announces new monetization-focused moderation policies.",
    platforms: ["reddit"],
    category: "policy",
  },

  // Gab Events
  {
    id: "gab-launch-2016",
    year: 2016,
    title: "Gab Launches",
    description:
      "Gab launches in response to 'deplatforming' of far-right voices.",
    platforms: ["gab"],
    category: "launch",
  },
  {
    id: "gab-banned-2018",
    year: 2018,
    title: "Gab Banned From App Stores",
    description:
      "Gab is banned from Apple and Google app stores following Pittsburgh synagogue shooting.",
    platforms: ["gab"],
    category: "policy",
  },
  {
    id: "gab-christian-nationalist-2022",
    year: 2022,
    title: "Gab Declares Christian Nationalist Platform",
    description:
      "Andrew Torba explicitly brands Gab as a Christian nationalist platform.",
    platforms: ["gab"],
    category: "policy",
  },
  {
    id: "gab-resistance-2025",
    year: 2025,
    title: "Gab Continues to Resist Moderation",
    description:
      "Gab continues to resist moderation, embraced by fringe political figures.",
    platforms: ["gab"],
    category: "policy",
  },

  // Bluesky Events
  {
    id: "bluesky-announcement-2019",
    year: 2019,
    title: "Twitter Announces Bluesky Project",
    description:
      "Twitter announces plans to explore decentralized social media, launches project 'Bluesky'.",
    platforms: ["bluesky", "twitter"],
    category: "launch",
  },
  {
    id: "bluesky-dorsey-support-2021",
    year: 2021,
    title: "Dorsey Supports Bluesky",
    description:
      "Jack Dorsey steps down from Twitter and deepens support for Bluesky.",
    platforms: ["bluesky", "twitter"],
    category: "leadership",
  },
  {
    id: "bluesky-beta-2023",
    year: 2023,
    title: "Bluesky Beta Launch",
    description:
      "Bluesky launches invite-only beta, rapidly gains traction amid dissatisfaction with Musk's Twitter.",
    platforms: ["bluesky"],
    category: "launch",
  },
  {
    id: "bluesky-custom-moderation-2024",
    year: 2024,
    title: "Bluesky Introduces Custom Moderation",
    description:
      "Bluesky introduces custom moderation services and composable feeds, letting users choose filtering rules and algorithms.",
    platforms: ["bluesky"],
    category: "policy",
  },
  {
    id: "bluesky-verification-2025",
    year: 2025,
    title: "Bluesky Introduces Verification",
    description:
      "Bluesky rolls out blue check verification for 'authentic and notable' accounts, and introduces Trusted Verifier status for organizations like The New York Times.",
    platforms: ["bluesky"],
    category: "policy",
  },

  // Threads Events
  {
    id: "threads-launch-2023",
    year: 2023,
    title: "Threads Launches",
    description:
      "Threads launched as a Twitter competitor, positioned initially as 'a friendlier space'; Threads wants to become a 'friendly' place by downgrading news and politics.",
    platforms: ["threads"],
    category: "launch",
  },
  {
    id: "threads-political-content-2025",
    year: 2025,
    title: "Threads Begins Recommending Political Content",
    description: "Threads begins recommending political content in feed.",
    platforms: ["threads"],
    category: "policy",
  },

  // Truth Social Events
  {
    id: "truthsocial-announcement-2021",
    year: 2021,
    title: "Trump Announces Truth Social",
    description:
      "Trump announces plans to launch Truth Social, citing the need for a 'free speech' platform outside Big Tech control.",
    platforms: ["truthsocial"],
    category: "launch",
  },
  {
    id: "truthsocial-launch-2022",
    year: 2022,
    title: "Truth Social Launches",
    description: "Truth Social platform launches with Devin Nunes as CEO.",
    platforms: ["truthsocial"],
    category: "launch",
  },
  {
    id: "truthsocial-struggles-2023",
    year: 2023,
    title: "Truth Social Faces Challenges",
    description:
      "Truth Social struggles with technical and financial issues but remains active during 2024 election cycle.",
    platforms: ["truthsocial"],
    category: "business",
  },
  {
    id: "truthsocial-nunes-appointment-2024",
    year: 2024,
    title: "Nunes Appointed to Intelligence Advisory Board",
    description:
      "Devin Nunes appointed chair of President's Intelligence Advisory Board.",
    platforms: ["truthsocial"],
    category: "leadership",
  },
  {
    id: "us-election-trump-2016",
    year: 2016,
    title: "Donald Trump Elected President",
    description:
      "Donald Trump defeats Hillary Clinton in the 2016 U.S. Presidential Election, an event that highlighted social media's role in political campaigning and misinformation.",
    platforms: ["twitter", "facebook", "reddit"],
    category: "politics",
  },
  {
    id: "us-election-trump-2024",
    year: 2024,
    title: "Donald Trump Re-elected President",
    description:
      "Donald Trump defeats Kamala Harris in the 2024 U.S. Presidential Election, returning to office after his ban from several platforms had been reversed.",
    platforms: [
      "twitter",
      "facebook",
      "instagram",
      "tiktok",
      "reddit",
      "gab",
      "bluesky",
      "threads",
      "truthsocial",
    ],
    category: "politics",
  },
];
