const platformData = [
  {
    id: "twitter",
    name: "X (Twitter)",
    color: "#1DA1F2",
    icon: "fa-brands fa-twitter",
    description: "Global microblogging platform acquired by Elon Musk in 2022.",
    positions: [
      {
        year: 2016,
        x: -0.4,
        y: 0.4,
        description:
          "Focused on election content, proliferation of 'fake news'; launched Information Quality initiative.",
      },
      {
        year: 2017,
        x: -0.5,
        y: 0.5,
        description:
          "Continued strong content moderation policies, began labeling state-affiliated media.",
      },
      {
        year: 2018,
        x: -0.3,
        y: 0.5,
        description:
          "September 2018: Permanent suspension of Alex Jones; 'Impartiality is our guiding principle.' -Jack Dorsey.",
      },
      {
        year: 2019,
        x: -0.2,
        y: 0.4,
        description:
          "Refinement of content policies, less aggressive enforcement.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.6,
        description:
          "Trump tweets labeled, increased fact-checking, COVID-19 misinformation policies.",
      },
      {
        year: 2021,
        x: 0.2,
        y: 0.3,
        description:
          "January: Trump permanently banned after Capitol riot, signaling major policy shift.",
      },
      {
        year: 2022,
        x: 0.3,
        y: 0,
        description:
          "October 2022: Elon Musk acquires Twitter, policy changes begin.",
      },
      {
        year: 2022,
        x: 0.3,
        y: -0.5,
        description: "December 2022: Dissolution of Trust and Safety Council.",
      },
      {
        year: 2023,
        x: 0.3,
        y: -0.5,
        description:
          "March 2023: High API fees for developers; April 2023: NPR labeled as 'US state-affiliated media'.",
      },
      {
        year: 2024,
        x: 0.7,
        y: -1,
        description:
          "July 2024: Algorithm favors Republican content after Musk endorses Trump.",
      },
      {
        year: 2025,
        x: 0.8,
        y: -0.9,
        description:
          "Near-complete shift to minimal moderation, 'free speech absolutism' under Musk.",
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
        year: 2016,
        x: -0.2,
        y: 0.5,
        description:
          "May 2016: Facebook updates guidelines to address bias concerns; studies show right-wing content often performs well despite left-leaning perception.",
      },
      {
        year: 2018,
        x: -0.1,
        y: 0.6,
        description:
          "Cambridge Analytica scandal leads to increased scrutiny and more content moderation.",
      },
      {
        year: 2019,
        x: 0,
        y: 0.5,
        description:
          "Political ad policies debated, platform attempts neutrality while facing criticism from all sides.",
      },
      {
        year: 2020,
        x: 0.1,
        y: 0.5,
        description:
          "Struggles with election misinformation, implements fact-checking but faces criticism for not going far enough.",
      },
      {
        year: 2021,
        x: 0.2,
        y: 0.4,
        description:
          "Also bans Trump, but creates Oversight Board to externalize difficult content decisions.",
      },
      {
        year: 2022,
        x: 0.3,
        y: 0.3,
        description:
          "Meta cuts back on content moderation staff amid economic downturn.",
      },
      {
        year: 2024,
        x: 0.3,
        y: 0.1,
        description:
          "Platform adjusts algorithms, increasingly viewed as favorable to right-wing content.",
      },
      {
        year: 2025,
        x: 0.3,
        y: -0.2,
        description:
          "January 2025: Nick Clegg departs; Joel Kaplan (Republican) to lead; fact-checking removed, moderation relaxed on controversial topics.",
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
        year: 2016,
        x: 0.8,
        y: 0.5,
        description:
          "August 2016: Gab launches as a 'free speech' platform in response to perceived censorship on mainstream social media.",
      },
      {
        year: 2018,
        x: 0.8,
        y: 0.2,
        description:
          "October 2018: Temporarily taken offline following the Pittsburgh synagogue shooting; faces deplatforming from service providers.",
      },
      {
        year: 2025,
        x: 0.9,
        y: -0.7,
        description:
          "Maintains its position as a right-wing, minimal moderation platform.",
      },
    ],
  },
  {
    id: "mastodon",
    name: "Mastodon",
    color: "#563ACC",
    icon: "fa-brands fa-mastodon",
    description: "Decentralized, open-source social network.",
    positions: [
      {
        year: 2018,
        x: -0.5,
        y: -0.7,
        description:
          "2018: Spike in usership after privacy concerns raised about Facebook (#deletefacebook).",
      },
      {
        year: 2019,
        x: -0.5,
        y: -0.7,
        description:
          "2019: 20,000 users migrated from Twitter in India due to complaints about moderation policies.",
      },
      {
        year: 2025,
        x: -0.5,
        y: -0.7,
        description:
          "Continues to be a decentralized alternative, attracting users seeking alternatives to mainstream platforms.",
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
        year: 2021,
        x: 0.9,
        y: -0.3,
        description:
          "October 2021: Truth Social is announced by Trump Media & Technology Group (TMTG).",
      },
      {
        year: 2022,
        x: 0.9,
        y: -0.3,
        description:
          "February 21, 2022: Official launch of Truth Social on Apple's App Store.",
      },
      {
        year: 2025,
        x: 0.9,
        y: -0.5,
        description:
          "Continues as platform for Trump supporters with minimal content moderation.",
      },
    ],
  },
  {
    id: "bluesky",
    name: "Bluesky",
    color: "#0285FF",
    icon: "./logos/Bluesky_Logo.png",
    description: "Decentralized social network that emerged from Twitter R&D.",
    positions: [
      {
        year: 2023,
        x: -0.5,
        y: -0.8,
        description:
          "2023: Bluesky launches as a decentralized platform; user base develops with a progressive orientation. Bluesky operates on the AT Protocol, promoting decentralization.",
      },
      {
        year: 2025,
        x: -0.5,
        y: -0.8,
        description:
          "Maintains decentralized, user-controlled moderation approach.",
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
        year: 2023,
        x: -0.2,
        y: 0.5,
        description:
          "July 2023: Threads launches as a platform focusing on light, non-political content.",
      },
      {
        year: 2025,
        x: 0,
        y: 0.3,
        description:
          "January 2025: Meta announced a rollback of certain content moderation policies across its platforms, including Threads. Removed fact-checkers and introduced a 'Community Notes' system, aiming to reduce censorship and promote free speech.",
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
          "Early TikTok/Musical.ly era: Focus on creative content with some moderation.",
      },
      {
        year: 2018,
        x: -0.2,
        y: 0.3,
        description:
          "Post-merger: Maintained progressive user base with algorithmic content moderation.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.2,
        description:
          "Faced scrutiny during Trump administration; accused of censoring content critical of China.",
      },
      {
        year: 2021,
        x: -0.1,
        y: 0.2,
        description:
          "Continued content moderation; removed misinformation while supporting digital activism.",
      },
      {
        year: 2023,
        x: -0.1,
        y: 0.2,
        description:
          "Maintained moderate content policies while facing political pressure.",
      },
      {
        year: 2024,
        x: 0.3,
        y: 0.7,
        description:
          "2024: TikTok's recommendations skewed towards Republican content during the 2024 U.S. presidential race.",
      },
      {
        year: 2025,
        x: 0,
        y: 0,
        description:
          "Ban implementation deadline hits; platform in uncertain position.",
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
        year: 2020,
        x: -0.4,
        y: 0.3,
        description:
          "Bans r/The_Donald and other controversial subreddits under new hate speech policies.",
      },
      {
        year: 2023,
        x: -0.3,
        y: 0.4,
        description:
          "API pricing controversy leads to subreddit blackouts, tensions with community moderators.",
      },
      {
        year: 2024,
        x: -0.3,
        y: 0.5,
        description:
          "2024: Reddit slams 'unethical experiment' that deployed secret AI bots in forum.",
      },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    icon: "fa-brands fa-instagram",
    description: "Photo and video sharing social network owned by Meta.",
    positions: [
      {
        year: 2025,
        x: -0.2,
        y: 0.2,
        description:
          "January 2025: Mosseri announces users will see more political content on Instagram and Threads; shift toward 'free expression'. No major leadership change; demographics shape political leanings.",
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: "fa-brands fa-youtube",
    description: "Video sharing platform owned by Google.",
    positions: [
      {
        year: 2025,
        x: -0.3,
        y: 0,
        description:
          "Ongoing through 2025: YouTube algorithm tends toward left-leaning content; no leadership changes.",
      },
    ],
  },
];
const timelineEvents = [
  // 2015 Events
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
    id: "twitter-isis-ban-2015",
    year: 2015,
    title: "Twitter ISIS-Linked Account Bans",
    description:
      "Twitter bans ISIS-linked accounts; strong centralized anti-extremism stance.",
    platforms: ["twitter"],
    category: "policy",
  },

  // 2016 Events
  {
    id: "gab-launch-2016",
    year: 2016,
    title: "Gab Launches",
    description:
      "Gab launches as a 'free speech' platform in response to perceived censorship on mainstream social media.",
    platforms: ["gab"],
    category: "launch",
  },
  {
    id: "facebook-guidelines-2016",
    year: 2016,
    title: "Facebook Updates Bias Guidelines",
    description:
      "Facebook updates guidelines to address bias concerns; studies show right-wing content performs well despite left-leaning perception.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "twitter-fake-news-2016",
    year: 2016,
    title: "Twitter Tackles Fake News",
    description:
      "Twitter focuses on election content and proliferation of 'fake news'; launches Information Quality initiative.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "us-election-2016",
    year: 2016,
    title: "2016 US Presidential Election",
    description:
      "Donald Trump defeats Hillary Clinton, highlighting social media's role in political campaigning and misinformation.",
    platforms: ["twitter", "facebook", "reddit"],
    category: "politics",
  },

  // 2017 Events
  {
    id: "twitter-state-media-2017",
    year: 2017,
    title: "Twitter Labels State Media",
    description:
      "Twitter continues strong content moderation policies, begins labeling state-affiliated media.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-qanon-crackdown-2017",
    year: 2017,
    title: "Twitter QAnon Crackdown Begins",
    description: "Initial crackdown on QAnon begins; still centrally managed.",
    platforms: ["twitter"],
    category: "policy",
  },

  // 2018 Events
  {
    id: "twitter-alex-jones-2018",
    year: 2018,
    title: "Twitter Bans Alex Jones",
    description:
      "Twitter permanently suspends Alex Jones; Jack Dorsey states 'Impartiality is our guiding principle.'",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "facebook-cambridge-2018",
    year: 2018,
    title: "Cambridge Analytica Scandal",
    description:
      "Facebook faces backlash after Cambridge Analytica data misuse scandal, leading to increased content moderation.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "facebook-qanon-removal-2018",
    year: 2018,
    title: "Facebook QAnon Content Removal",
    description:
      "More active moderation after political scandals; removal of QAnon content.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "gab-deplatformed-2018",
    year: 2018,
    title: "Gab Deplatformed",
    description:
      "Gab temporarily taken offline following Pittsburgh synagogue shooting; faces deplatforming from service providers.",
    platforms: ["gab"],
    category: "policy",
  },
  {
    id: "mastodon-growth-2018",
    year: 2018,
    title: "Mastodon User Surge",
    description:
      "Mastodon sees spike in usership after privacy concerns raised about Facebook (#deletefacebook).",
    platforms: ["mastodon"],
    category: "growth",
  },

  // 2019 Events
  {
    id: "mastodon-india-2019",
    year: 2019,
    title: "Indian Users Migrate to Mastodon",
    description:
      "20,000 users migrate from Twitter to Mastodon in India due to complaints about moderation policies.",
    platforms: ["mastodon"],
    category: "growth",
  },
  {
    id: "facebook-political-ads-2019",
    year: 2019,
    title: "Facebook Political Ad Controversy",
    description:
      "Facebook's political ad policies debated; platform attempts neutrality while facing criticism from all sides.",
    platforms: ["facebook"],
    category: "policy",
  },

  // 2020 Events
  {
    id: "twitter-trump-labels-2020",
    year: 2020,
    title: "Twitter Labels Trump Tweets",
    description:
      "Twitter begins labeling Trump's tweets with fact-check notices and implements COVID-19 misinformation policies.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "reddit-donald-ban-2020",
    year: 2020,
    title: "Reddit Bans r/The_Donald",
    description:
      "Reddit bans r/The_Donald and other controversial subreddits under new hate speech policies.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "facebook-election-2020",
    year: 2020,
    title: "Facebook Struggles with Election Misinfo",
    description:
      "Facebook implements fact-checking but faces criticism for not going far enough with election misinformation.",
    platforms: ["facebook"],
    category: "policy",
  },

  // 2021 Events
  {
    id: "trump-ban-2021",
    year: 2021,
    title: "Trump Banned from Major Platforms",
    description:
      "Twitter and Facebook permanently ban President Trump following January 6 Capitol riot.",
    platforms: ["twitter", "facebook", "instagram"],
    category: "policy",
  },
  {
    id: "truth-social-announced-2021",
    year: 2021,
    title: "Truth Social Announced",
    description:
      "Trump announces plans to launch Truth Social, citing need for 'free speech' platform outside Big Tech control.",
    platforms: ["truthsocial"],
    category: "launch",
  },
  {
    id: "facebook-oversight-board-2021",
    year: 2021,
    title: "Facebook Creates Oversight Board",
    description:
      "Facebook creates Oversight Board to externalize difficult content moderation decisions.",
    platforms: ["facebook"],
    category: "policy",
  },

  // 2022 Events
  {
    id: "truth-social-launch-2022",
    year: 2022,
    title: "Truth Social Launches",
    description:
      "Truth Social officially launches on Apple's App Store with Devin Nunes as CEO.",
    platforms: ["truthsocial"],
    category: "launch",
  },
  {
    id: "musk-buys-twitter-2022",
    year: 2022,
    title: "Elon Musk Acquires Twitter",
    description:
      "Elon Musk acquires Twitter for $44 billion and begins implementing policy changes.",
    platforms: ["twitter"],
    category: "leadership",
  },
  {
    id: "twitter-journalist-bans-2022",
    year: 2022,
    title: "Twitter Bans Journalists",
    description:
      "Musk bans journalists under new policy; start of free-speech rhetoric.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-trust-safety-2022",
    year: 2022,
    title: "Twitter Dissolves Trust & Safety Council",
    description:
      "Twitter dissolves its Trust and Safety Council under Musk's leadership.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "meta-layoffs-2022",
    year: 2022,
    title: "Meta Cuts Moderation Staff",
    description:
      "Meta cuts back on content moderation staff amid economic downturn.",
    platforms: ["facebook", "instagram"],
    category: "leadership",
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

  // 2023 Events
  {
    id: "twitter-api-fees-2023",
    year: 2023,
    title: "Twitter Implements High API Fees",
    description:
      "Twitter introduces high API fees for developers, limiting third-party access.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-npr-label-2023",
    year: 2023,
    title: "Twitter Labels NPR State Media",
    description:
      "Twitter labels NPR as 'US state-affiliated media,' leading to NPR leaving the platform.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "twitter-conservative-amplified-2023",
    year: 2023,
    title: "Twitter Amplifies Conservative Voices",
    description:
      "Conservative voices amplified; reduced moderation under Musk's ownership.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "facebook-fake-accounts-2023",
    year: 2023,
    title: "Facebook Removes 1.7B Fake Accounts",
    description: "Facebook reports over 1.7 billion fake accounts removed.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "reddit-api-protest-2023",
    year: 2023,
    title: "Reddit API Pricing Controversy",
    description:
      "API pricing protests cause major subreddit blackouts and tensions with community moderators.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "bluesky-launch-2023",
    year: 2023,
    title: "Bluesky Launches Beta",
    description:
      "Bluesky launches as a decentralized platform with AT Protocol, attracting progressive users dissatisfied with Twitter.",
    platforms: ["bluesky"],
    category: "launch",
  },
  {
    id: "threads-launch-2023",
    year: 2023,
    title: "Threads Launches",
    description:
      "Meta launches Threads as a Twitter competitor, focusing on light, non-political content.",
    platforms: ["threads"],
    category: "launch",
  },

  // 2024 Events
  {
    id: "twitter-algorithm-2024",
    year: 2024,
    title: "Twitter Algorithm Favors Republican Content",
    description:
      "Twitter's algorithm begins favoring Republican content after Musk endorses Trump.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "tiktok-election-2024",
    year: 2024,
    title: "TikTok's Political Shift",
    description:
      "TikTok's recommendations skew toward Republican content during the 2024 U.S. presidential race.",
    platforms: ["tiktok"],
    category: "policy",
  },
  {
    id: "reddit-ai-bots-2024",
    year: 2024,
    title: "Reddit AI Bot Controversy",
    description:
      "Reddit condemns 'unethical experiment' that deployed secret AI bots in forums.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "facebook-algorithm-2024",
    year: 2024,
    title: "Facebook Algorithm Shift",
    description:
      "Facebook adjusts algorithms, increasingly viewed as favorable to right-wing content.",
    platforms: ["facebook"],
    category: "policy",
  },
  {
    id: "us-election-2024",
    year: 2024,
    title: "2024 US Presidential Election",
    description:
      "Donald Trump defeats Kamala Harris, returning to office after his platform bans were reversed.",
    platforms: [
      "twitter",
      "facebook",
      "instagram",
      "tiktok",
      "reddit",
      "truthsocial",
    ],
    category: "politics",
  },

  // 2025 Events
  {
    id: "meta-leadership-change-2025",
    year: 2025,
    title: "Joel Kaplan Leads Meta Policy",
    description:
      "Nick Clegg departs Meta; Joel Kaplan (Republican) takes over policy leadership.",
    platforms: ["facebook", "instagram", "threads"],
    category: "leadership",
  },
  {
    id: "meta-fact-checking-ends-2025",
    year: 2025,
    title: "Meta Ends Fact-Checking Program",
    description:
      "Meta removes third-party fact-checkers and introduces Community Notes system across all platforms.",
    platforms: ["facebook", "instagram", "threads"],
    category: "policy",
  },
  {
    id: "instagram-political-content-2025",
    year: 2025,
    title: "Instagram Allows More Political Content",
    description:
      "Adam Mosseri announces users will see more political content; shift toward 'free expression'.",
    platforms: ["instagram", "threads"],
    category: "policy",
  },
  {
    id: "reddit-nsfw-bans-2025",
    year: 2025,
    title: "Reddit Mass Accidental NSFW Bans",
    description:
      "Mass accidental bans of NSFW subreddits due to technical glitches sparked debates about platform moderation.",
    platforms: ["reddit"],
    category: "policy",
  },
  {
    id: "twitter-free-speech-2025",
    year: 2025,
    title: "Twitter Embraces 'Free Speech Absolutism'",
    description:
      "Twitter completes shift to minimal moderation under Musk's 'free speech absolutism' philosophy.",
    platforms: ["twitter"],
    category: "policy",
  },
  {
    id: "tiktok-ban-deadline-2025",
    year: 2025,
    title: "TikTok Ban Implementation Deadline",
    description:
      "Ban implementation deadline hits; uncertainty about TikTok's future in the US.",
    platforms: ["tiktok"],
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
];
