const platformData = [
  {
    id: "twitter",
    name: "X (Twitter)",
    color: "#1DA1F2",
    icon: "fa-brands fa-twitter",
    description: "Global microblogging platform acquired by Elon Musk in 2022.",
    firstAppearanceYear: 2006,
    positions: [
      {
        year: 2015,
        x: -0.3,
        y: 0.2,
        description:
          "Platform begins struggling with harassment concerns; introduces 'quality filter' and abuse reporting improvements.",
      },
      {
        year: 2016,
        x: -0.4,
        y: 0.3,
        description:
          "Misinformation surges during U.S. election; Twitter suspends several far-right accounts and launches Information Quality initiative.",
      },
      {
        year: 2017,
        x: -0.5,
        y: 0.4,
        description:
          "Begins labeling state-affiliated media and expands rules against hateful conduct and harassment.",
      },
      {
        year: 2018,
        x: -0.3,
        y: 0.5,
        description:
          "Permanently bans Alex Jones; Dorsey emphasizes platform impartiality amid rising pressure to moderate harmful content.",
      },
      {
        year: 2019,
        x: -0.2,
        y: 0.4,
        description:
          "Enforcement continues with clearer rules, but some moderation remains inconsistent; focus shifts toward policy transparency.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.6,
        description:
          "Implements COVID-19 and election misinformation labels; Trump tweets are flagged for misleading claims.",
      },
      {
        year: 2021,
        x: 0.1,
        y: 0.5,
        description:
          "Following Jan. 6 Capitol riot, Twitter permanently bans Trump; Trust & Safety governance praised by civil society groups.",
      },
      {
        year: 2022,
        x: 0.3,
        y: 0.2,
        description:
          "Elon Musk acquires Twitter in October; fires executives, reinstates banned accounts, and dissolves Trust and Safety Council.",
      },
      {
        year: 2023,
        x: 0.4,
        y: -0.5,
        description:
          "Under Musk, content moderation is significantly reduced; legacy verification removed, state-affiliated labels spark backlash (e.g., NPR).",
      },
      {
        year: 2024,
        x: 0.7,
        y: -0.9,
        description:
          "Platform heavily promotes right-wing content algorithmically; Musk publicly endorses Trump; moderation becomes near-anarchic.",
      },
      {
        year: 2025,
        x: 0.8,
        y: -0.9,
        description:
          "X continues as a minimally moderated, Musk-controlled platform embracing 'free speech absolutism' and algorithmic opacity.",
      },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    icon: "fa-brands fa-facebook-f",
    description: "The largest social network worldwide, owned by Meta.",
    firstAppearanceYear: 2004,
    positions: [
      {
        year: 2015,
        x: 0.0,
        y: -0.2,
        description:
          "Facebook prioritizes engagement-based ranking in the News Feed, unintentionally amplifying viral, emotional, and often partisan content without active intervention.",
      },
      {
        year: 2016,
        x: 0.3,
        y: -0.1,
        description:
          "Following the U.S. election, Facebook faces backlash for spreading misinformation and fake news; Zuckerberg initially denies platform's influence.",
      },
      {
        year: 2017,
        x: 0.2,
        y: 0.1,
        description:
          "Facebook begins addressing coordinated inauthentic behavior and state-sponsored interference, including disclosures to Congress on Russian campaigns.",
      },
      {
        year: 2018,
        x: 0.1,
        y: 0.3,
        description:
          "Cambridge Analytica scandal triggers global outrage; Facebook shifts to promoting 'meaningful interactions' and begins limiting news content.",
      },
      {
        year: 2019,
        x: 0.1,
        y: 0.4,
        description:
          "Facebook expands fact-checking and political ad transparency, while facing criticism from both right and left on perceived bias and inaction.",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.5,
        description:
          "Cracks down on QAnon, COVID misinformation, and election denial content. Labels Trump posts but avoids removal until 2021.",
      },
      {
        year: 2021,
        x: -0.2,
        y: 0.7,
        description:
          "After the Capitol riot, Facebook suspends Trump and relies on its Oversight Board for legitimacy in tough decisions; moderation becomes more proactive.",
      },
      {
        year: 2022,
        x: -0.1,
        y: 0.8,
        description:
          "Whistleblower Frances Haugen reveals Facebook’s internal data on polarization and harms; Meta promises changes but maintains strict content governance.",
      },
      {
        year: 2023,
        x: -0.1,
        y: 0.8,
        description:
          "Moderation practices remain centralized; Meta expands AI-driven content filtering, raising concerns over algorithmic opacity and control.",
      },
      {
        year: 2024,
        x: 0.0,
        y: 0.7,
        description:
          "Meta scales back political content visibility in the feed, citing user preference; some see this as quietly muting left-leaning civic discourse.",
      },
      {
        year: 2025,
        x: 0.0,
        y: 0.6,
        description:
          "Facebook refocuses on creator tools and AI assistants; moderation relaxes slightly, but governance remains highly centralized.",
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
    firstAppearanceYear: 2016,
    positions: [
      {
        year: 2016,
        x: 0.8,
        y: -0.7,
        description:
          "August 2016: Gab launches as a free speech alternative to Twitter, quickly attracting users banned from mainstream platforms, including alt-right figures.",
      },
      {
        year: 2017,
        x: 0.9,
        y: -0.6,
        description:
          "Gab gains notoriety as a haven for far-right influencers and conspiracy theorists. App banned from Apple and Google stores over hate speech concerns.",
      },
      {
        year: 2018,
        x: 1.0,
        y: -0.5,
        description:
          "October 2018: Deplatformed by hosting and payment providers after the Pittsburgh synagogue shooter used Gab to post prior to the attack. Gab recovers using its own infrastructure.",
      },
      {
        year: 2019,
        x: 0.9,
        y: -0.3,
        description:
          "Launches Dissenter browser extension, doubling down on its anti-censorship branding. Still largely unmoderated but focused on decentralization.",
      },
      {
        year: 2020,
        x: 1.0,
        y: -0.2,
        description:
          "Absorbs influx of pro-Trump users as Twitter cracks down on election misinformation. Becomes key platform for election denial communities.",
      },
      {
        year: 2021,
        x: 1.0,
        y: -0.1,
        description:
          "Refuses to remove Trump-related content after Jan. 6. CEO promotes Christian nationalism; platform continues hands-off moderation approach.",
      },
      {
        year: 2022,
        x: 1.0,
        y: 0.0,
        description:
          "Slight increase in moderation to address spam and bots. Still ideologically far-right with extremely limited content governance.",
      },
      {
        year: 2023,
        x: 1.0,
        y: 0.2,
        description:
          "Introduces filtering features and basic UX controls but maintains core libertarian structure. User base becomes more insular.",
      },
      {
        year: 2024,
        x: 1.0,
        y: 0.2,
        description:
          "Platform stagnates in growth as users migrate to X under Musk. Still retains identity as a hardline 'free speech' sanctuary.",
      },
      {
        year: 2025,
        x: 0.9,
        y: 0.2,
        description:
          "Continues to serve niche right-wing audience; minimal moderation, but slightly more structured governance than early years.",
      },
    ],
  },
  {
    id: "mastodon",
    name: "Mastodon",
    color: "#563ACC",
    icon: "fa-brands fa-mastodon",
    description: "Decentralized, open-source social network.",
    firstAppearanceYear: 2016,
    positions: [
      {
        year: 2016,
        x: -0.5,
        y: -0.8,
        description:
          "October 2016: Mastodon is launched by Eugen Rochko as a decentralized alternative to Twitter, emphasizing federation and local control.",
      },
      {
        year: 2018,
        x: -0.5,
        y: -0.7,
        description:
          "Experiences a spike in adoption during the #deletefacebook movement, appealing to users seeking non-corporate, privacy-focused platforms.",
      },
      {
        year: 2019,
        x: -0.5,
        y: -0.7,
        description:
          "20,000 Indian users migrate to Mastodon after alleging Twitter suppressed Dalit voices, reinforcing Mastodon's appeal to activists and marginalized communities.",
      },
      {
        year: 2022,
        x: -0.6,
        y: -0.7,
        description:
          "Post–Musk acquisition of Twitter, Mastodon sees explosive growth. While infrastructure struggles, it becomes a haven for journalists, academics, and left-libertarian users.",
      },
      {
        year: 2023,
        x: -0.6,
        y: -0.6,
        description:
          "Continues growth through fediverse expansion. Some moderation challenges emerge between instances, but governance remains decentralized and community-led.",
      },
      {
        year: 2024,
        x: -0.5,
        y: -0.6,
        description:
          "Conversations about interoperability and moderation tooling dominate discourse. Perceived as ideologically left-libertarian but fractured by instance culture.",
      },
      {
        year: 2025,
        x: -0.5,
        y: -0.6,
        description:
          "Solidifies its niche as a federated, non-algorithmic alternative to centralized platforms. Moderation varies by instance, reinforcing libertarian structure.",
      },
    ],
  },
  {
    id: "truthsocial",
    name: "Truth Social",
    color: "#0074CC",
    icon: "./logos/truth-social-icon-2048x2048-323r6m8b.png",
    description:
      "Social media platform founded by Trump Media & Technology Group as a response to content moderation on mainstream platforms.",
    firstAppearanceYear: 2021,
    positions: [
      {
        year: 2021,
        x: 0.9,
        y: -0.3,
        description:
          "October 2021: Truth Social is announced as part of Trump Media & Technology Group (TMTG), pitched as a free speech alternative to 'Big Tech censorship.'",
      },
      {
        year: 2022,
        x: 0.9,
        y: -0.3,
        description:
          "February 21, 2022: Official launch on Apple's App Store. Platform is ideologically aligned with Trump supporters and bans content that opposes its values (e.g., Jan. 6 Committee posts).",
      },
      {
        year: 2023,
        x: 0.9,
        y: -0.4,
        description:
          "Platform usage remains relatively small but highly politically homogenous. Moderation still minimal but includes selective enforcement against left-leaning users.",
      },
      {
        year: 2024,
        x: 0.9,
        y: -0.5,
        description:
          "Amid 2024 election cycle, Truth Social becomes an echo chamber for MAGA-aligned narratives. Minimal trust & safety infrastructure; engagement driven by grievance content.",
      },
      {
        year: 2025,
        x: 0.9,
        y: -0.5,
        description:
          "Continues as a niche platform for Trump loyalists. Functionally libertarian on speech within ideological bounds, but excludes dissenting voices.",
      },
    ],
  },
  {
    id: "bluesky",
    name: "Bluesky",
    color: "#0285FF",
    icon: "./logos/Bluesky_Logo.png",
    description: "Decentralized social network that emerged from Twitter R&D.",
    firstAppearanceYear: 2021,
    positions: [
      {
        year: 2021,
        x: -0.6,
        y: -0.8,
        description:
          "Bluesky formally spins out from Twitter as an independent public benefit corporation, with funding to build the AT Protocol for decentralized social networking.",
      },
      {
        year: 2023,
        x: -0.4,
        y: -0.7,
        description:
          "Closed beta launches; platform quickly attracts tech critics, journalists, and progressive users. Emphasizes open protocol, composable moderation, and non-algorithmic feeds.",
      },
      {
        year: 2024,
        x: -0.3,
        y: -0.6,
        description:
          "Opens to the public in July 2024. Faces early governance and moderation challenges (e.g., dogpiling, slurs in usernames), but retains decentralized, opt-in tooling philosophy.",
      },
      {
        year: 2025,
        x: -0.2,
        y: -0.5,
        description:
          "Continues refining moderation services (e.g., labeling, anti-harassment tooling). Perceived as left-libertarian, with increased user diversity and pressure for broader governance.",
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
    firstAppearanceYear: 2023,
    positions: [
      {
        year: 2023,
        x: -0.2,
        y: 0.5,
        description:
          "July 2023: Threads launches with heavy moderation and content throttling policies to avoid political controversy. Criticized for lack of reach, especially among news and political voices.",
      },
      {
        year: 2024,
        x: -0.1,
        y: 0.5,
        description:
          "Meta continues to suppress political content visibility across Threads to protect brand safety. Perception grows that Threads is sanitized and non-confrontational.",
      },
      {
        year: 2025,
        x: 0.0,
        y: 0.3,
        description:
          "January 2025: Meta rolls back fact-checking programs and introduces a 'Community Notes'-like system. Platform shifts toward centrist expression with lower central intervention, but retains top-down algorithmic control.",
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#69C9D0",
    icon: "fa-brands fa-tiktok",
    description: "Short-form video platform owned by ByteDance.",
    firstAppearanceYear: 2016,
    positions: [
      {
        year: 2015,
        x: -0.2,
        y: 0.3,
        description:
          "Early Musical.ly era: Primarily entertainment-focused with minimal moderation; user base skews young and creative.",
      },
      {
        year: 2018,
        x: -0.2,
        y: 0.3,
        description:
          "Post–ByteDance merger, TikTok grows rapidly. Moderation policies emerge, with algorithmic suppression of certain political and marginalized voices (e.g., disabled, LGBTQ+).",
      },
      {
        year: 2020,
        x: -0.1,
        y: 0.2,
        description:
          "Amid Trump administration scrutiny, TikTok is accused of censoring pro–Hong Kong and Black Lives Matter content while also becoming a platform for youth activism.",
      },
      {
        year: 2021,
        x: -0.1,
        y: 0.2,
        description:
          "Continues to walk a tightrope between digital activism (e.g., climate justice, Palestine) and Chinese influence concerns. Moderation remains opaque.",
      },
      {
        year: 2023,
        x: -0.1,
        y: 0.2,
        description:
          "Moderation remains moderate, with growing U.S. government scrutiny over data practices and national security risks. Algorithm continues to depoliticize feeds for most users.",
      },
      {
        year: 2024,
        x: 0.3,
        y: 0.7,
        description:
          "During U.S. election year, reports emerge that TikTok’s algorithm subtly favors right-wing influencers and depoliticizes liberal content, raising concerns over covert moderation shifts.",
      },
      {
        year: 2025,
        x: 0.0,
        y: 0.0,
        description:
          "Facing a potential U.S. ban, TikTok's future becomes uncertain. Platform tries to rebrand as neutral and apolitical to avoid regulatory action.",
      },
    ],
  },
  {
    id: "reddit",
    name: "Reddit",
    color: "#FF4500",
    icon: "fa-brands fa-reddit-alien",
    description: "Community-focused discussion platform with subreddits.",
    firstAppearanceYear: 2005,
    positions: [
      {
        year: 2015,
        x: -0.2,
        y: -0.6,
        description:
          "Reddit bans r/fatpeoplehate and faces backlash over the Ellen Pao incident, reinforcing a libertarian free-speech culture with left-leaning moderation.",
      },
      {
        year: 2016,
        x: 0.0,
        y: -0.5,
        description:
          "r/The_Donald rises to prominence, dominating r/all through upvote brigading, balancing Reddit's political tone.",
      },
      {
        year: 2017,
        x: 0.1,
        y: -0.3,
        description:
          "Reddit bans r/altright and introduces quarantines, signaling growing centralized oversight.",
      },
      {
        year: 2018,
        x: -0.1,
        y: -0.2,
        description:
          "Bans on r/Incels and r/Braincels mark a shift toward enforcing anti-hate policies.",
      },
      {
        year: 2019,
        x: -0.1,
        y: -0.1,
        description:
          "Bans on r/watchpeopledie and other toxic subs continue; community moderation norms remain strong.",
      },
      {
        year: 2020,
        x: -0.2,
        y: 0.2,
        description:
          "Reddit bans r/The_Donald and thousands of QAnon-aligned communities amid rising pressure for content accountability.",
      },
      {
        year: 2021,
        x: -0.3,
        y: 0.3,
        description:
          "Post–Capitol riot enforcement and vaccine misinformation takedowns increase centralized moderation.",
      },
      {
        year: 2022,
        x: -0.3,
        y: 0.4,
        description:
          "Expansion of automated moderation tools and anti-hate policies continue trend toward top-down governance.",
      },
      {
        year: 2023,
        x: -0.2,
        y: 0.5,
        description:
          "API pricing protests lead to mass subreddit blackouts; Reddit faces backlash for centralizing control.",
      },
      {
        year: 2024,
        x: -0.1,
        y: 0.6,
        description:
          "Reddit criticized for suppressing transparency around platform-wide AI experiments and ad-centric changes.",
      },
      {
        year: 2025,
        x: 0.0,
        y: 0.5,
        description:
          "Moderation remains centralized, but overt political affiliations soften post-election; Reddit perceived as politically centrist, structurally authoritarian.",
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
