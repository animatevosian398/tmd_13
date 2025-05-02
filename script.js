document.addEventListener("DOMContentLoaded", async function () {
  // Load the overall platforms data
  window.overallPlatformsData = await loadOverallPlatformsData();
  console.log("Overall platforms data loaded:", overallPlatformsData);

  // DOM elements
  const yearSlider = document.getElementById("year-slider");
  const currentYearDisplay = document.getElementById("current-year");
  const matrixContainer = document.getElementById("matrix");
  const platformListContainer = document.getElementById("platform-list");
  const eventsContainer = document.getElementById("events-container");
  const platformCardsContainer = document.getElementById("platform-cards");
  const infoButton = document.getElementById("info-button");
  const infoModal = document.getElementById("info-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const toggleFiltersButton = document.getElementById("toggle-filters");
  const filtersContent = document.getElementById("filters-content");
  const selectAllButton = document.getElementById("select-all");
  const clearAllButton = document.getElementById("clear-all");
  const selectedEventDetails = document.getElementById(
    "selected-event-details"
  );
  const selectedEventDescription = document.getElementById(
    "selected-event-description"
  );

  // View selector buttons
  const viewPlatformsBtn = document.getElementById("view-platforms");
  const viewPoliciesBtn = document.getElementById("view-policies");
  const viewLeadershipBtn = document.getElementById("view-leadership");

  // Current view state
  let currentView = "platforms";

  // Add play button functionality
  const playButton = document.getElementById("play-timeline");

  // Auto-scrubbing variables
  let isPlaying = false;
  let playInterval;
  const PLAY_SPEED = 800; // milliseconds between years

  // FIXED: Set min and max years from data properly
  // Get all unique years from all platforms
  const allYears = [];
  platformData.forEach((platform) => {
    platform.positions.forEach((position) => {
      if (!allYears.includes(position.year)) {
        allYears.push(position.year);
      }
    });
  });

  // Sort years to find the min and max
  allYears.sort((a, b) => a - b);
  const minYear = allYears.length > 0 ? allYears[0] : 2015;
  const maxYear = allYears.length > 0 ? allYears[allYears.length - 1] : 2025;

  console.log("Year range:", minYear, "-", maxYear, "All years:", allYears);

  // Set the slider range
  yearSlider.min = minYear;
  yearSlider.max = maxYear;
  yearSlider.value = minYear;
  let currentYear = parseInt(yearSlider.value);

  // Make sure the labels reflect the actual data years
  const sliderLabels = document.querySelector(".slider-labels");
  if (sliderLabels) {
    sliderLabels.innerHTML = `<span>${minYear}</span><span>${maxYear}</span>`;
  }

  if (currentYearDisplay) {
    currentYearDisplay.textContent = currentYear;
  }

  // State
  let selectedPlatforms = platformData.map((platform) => platform.id);
  let selectedEvent = null;

  // Initialize the visualization
  initPlatformFilters();
  updateMatrix();
  updateTimelineEvents();
  updatePlatformCards();

  // Add sub-view selector buttons
  const banActivityBtn = document.createElement("button");
  banActivityBtn.id = "view-ban-activity";
  banActivityBtn.className = "btn btn-outline btn-sm sub-view-btn active";
  banActivityBtn.textContent = "Ban Activity";

  const overallBtn = document.createElement("button");
  overallBtn.id = "view-overall";
  overallBtn.className = "btn btn-outline btn-sm sub-view-btn";
  overallBtn.textContent = "Overall";

  // Create a container for sub-view buttons
  const subViewContainer = document.createElement("div");
  subViewContainer.className = "sub-view-container";
  subViewContainer.appendChild(banActivityBtn);
  subViewContainer.appendChild(overallBtn);

  // Add the sub-view buttons after the platforms button
  if (viewPlatformsBtn) {
    viewPlatformsBtn.parentNode.insertBefore(
      subViewContainer,
      viewPlatformsBtn.nextSibling
    );
    // Initially hide the sub-view container until Platforms is selected
    subViewContainer.style.display = "flex";
  }

  // Add a current sub-view state variable
  let currentSubView = "ban-activity";

  // Add event listeners for sub-view buttons
  banActivityBtn.addEventListener("click", function () {
    setActiveSubView("ban-activity");
  });

  overallBtn.addEventListener("click", function () {
    setActiveSubView("overall");
  });

  // Update the setActiveSubView function for better error handling
  function setActiveSubView(subView) {
    // Update current sub-view
    currentSubView = subView;

    // Safely update elements
    const safelyUpdateElement = (selector, property, value) => {
      let element = document.querySelector(selector);

      // For matrix-disclaimer, create it if it doesn't exist
      if (!element && selector === ".matrix-disclaimer") {
        element = document.createElement("div");
        element.className = "matrix-disclaimer";

        // Add it before the matrix if possible
        const matrix = document.getElementById("matrix");
        if (matrix && matrix.parentNode) {
          matrix.parentNode.insertBefore(element, matrix);
        } else {
          // As a fallback, add to body
          document.body.appendChild(element);
        }
      }

      if (element) {
        // Handle nested properties like style.opacity
        if (property.includes(".")) {
          const [obj, prop] = property.split(".");
          element[obj][prop] = value;
        } else {
          element[property] = value;
        }
      } else {
        console.warn(`Element not found: ${selector}`);
      }
    };

    // Rest of your setActiveSubView function...
    if (subView === "ban-activity") {
      console.log("Switching to Ban Activity view");
      safelyUpdateElement("#year-slider", "disabled", false);
      safelyUpdateElement(".timeline-slider", "style.opacity", "1");
      safelyUpdateElement(
        ".matrix-disclaimer",
        "textContent",
        "Platform positions based on ban activity and content moderation policies"
      );

      // Rest of your ban-activity code...
      // Enable the year slider for time-based view
      safelyUpdateElement("#year-slider", "disabled", false);
      safelyUpdateElement(".timeline-slider", "style.opacity", "1");
      safelyUpdateElement(
        ".matrix-disclaimer",
        "textContent",
        "Platform positions based on ban activity and content moderation policies"
      );

      // Enable play button for time-based view
      if (playButton) {
        playButton.style.display = "flex";
        playButton.disabled = false;
        playButton.classList.remove("disabled");

        // If we were playing when switching away, stop it
        if (isPlaying) {
          stopTimeline();
        }
      }

      // Update the visualization with time-based data
      updateMatrix();
      updateTimelineEvents();
      updatePlatformCards();
    } else {
      console.log("Switching to Overall view");
      safelyUpdateElement("#year-slider", "disabled", true);
      safelyUpdateElement(".timeline-slider", "style.opacity", "0.5");
      safelyUpdateElement(
        ".matrix-disclaimer",
        "textContent",
        "Platform positions based on overall political alignment"
      );

      // Rest of your overall view code...
      // Disable the year slider for static view
      safelyUpdateElement("#year-slider", "disabled", true);
      safelyUpdateElement(".timeline-slider", "style.opacity", "0.5");
      safelyUpdateElement(
        ".matrix-disclaimer",
        "textContent",
        "Platform positions based on overall political alignment"
      );

      // Disable play button for static view
      if (playButton) {
        // Option 1: Hide the play button
        // playButton.style.display = "none";

        // Option 2: Disable but keep visible
        playButton.disabled = true;
        playButton.classList.add("disabled");

        // If we were playing when switching to Overall view, stop it
        if (isPlaying) {
          stopTimeline();
        }
      }

      // Load and show the Overall data
      loadAndShowOverallView();

      // Clear timeline events and platform cards
      safelyUpdateElement(
        "#events-container",
        "innerHTML",
        '<div class="event-empty">Events not applicable in Overall view</div>'
      );
      safelyUpdateElement("#platform-cards", "innerHTML", "");
    }
  }

  // New function to handle loading and showing Overall data
  async function loadAndShowOverallView() {
    // Check if we already have data
    if (
      !window.overallPlatformsData ||
      window.overallPlatformsData.length === 0
    ) {
      console.log("Loading overall platforms data...");
      try {
        window.overallPlatformsData = await loadOverallPlatformsData();
        console.log(
          "Overall data loaded:",
          window.overallPlatformsData.length,
          "platforms"
        );
      } catch (error) {
        console.error("Error loading overall data:", error);
        return;
      }
    }

    // Show the overall view with the loaded data
    showOverallView();
  }

  // Enhanced loading function to better handle CSV parsing
  async function loadOverallPlatformsData() {
    try {
      console.log("Fetching Platforms_Overall.csv...");
      const response = await fetch("Platforms_Overall.csv");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvData = await response.text();
      console.log("CSV data received, length:", csvData.length);

      // Split by lines and skip header
      const lines = csvData.split("\n");
      if (lines.length < 2) {
        console.error("CSV file has insufficient data");
        return [];
      }

      console.log("CSV lines:", lines.length);

      // Parse each platform line
      const platformsData = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        // Parse CSV with respect to quoted fields
        const fields = parseCSVLine(line);
        if (fields.length < 7) {
          console.warn(`Line ${i} has insufficient fields:`, fields);
          continue;
        }

        // Extract position from last field and ensure it's valid
        const positionField = fields[6];
        const position = parsePosition(positionField);

        if (!position) {
          console.warn(
            `Could not parse position for line ${i}:`,
            positionField
          );
          continue;
        }

        // Create platform object
        const platform = {
          name: fields[0],
          bias: fields[1],
          reasoning: fields[2],
          libAuth: fields[3],
          source: fields[4],
          timeline: fields[5],
          position: position,
          // Store the original position string for debugging
          rawPosition: positionField,
        };

        platformsData.push(platform);
        console.log(
          `Added platform: ${platform.name} at (${position.x}, ${position.y})`
        );
      }

      console.log("Parsed", platformsData.length, "platforms from CSV");
      return platformsData;
    } catch (error) {
      console.error("Error loading overall platforms data:", error);
      return [];
    }
  }

  // Helper function to parse CSV line handling quoted fields
  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  }

  // More robust position parser
  function parsePosition(posStr) {
    if (!posStr) return null;

    console.log("Parsing position:", posStr);

    // Remove any quotes and trim whitespace
    posStr = posStr.replace(/"/g, "").trim();

    // Split by comma
    const parts = posStr.split(",");
    if (parts.length !== 2) {
      console.warn("Invalid position format (should be 'X,Y'):", posStr);
      return null;
    }

    // Parse as floats
    const x = parseFloat(parts[0].trim());
    const y = parseFloat(parts[1].trim());

    if (isNaN(x) || isNaN(y)) {
      console.warn(
        `Invalid coordinates (not numbers): x=${parts[0]}, y=${parts[1]}`
      );
      return null;
    }

    console.log("Parsed position:", x, y);
    return { x, y };
  }

  // Update showOverallView to create dots for each platform
  function showOverallView() {
    const matrix = document.getElementById("matrix");
    if (!matrix) {
      console.error("Matrix element not found");
      return;
    }

    // Clear current matrix
    matrix.innerHTML = "";

    if (
      !window.overallPlatformsData ||
      window.overallPlatformsData.length === 0
    ) {
      console.error("No overall platform data available");
      matrix.innerHTML =
        '<div style="text-align:center;padding:20px;">No platform data available</div>';
      return;
    }

    console.log(
      "Showing",
      window.overallPlatformsData.length,
      "platforms in Overall view"
    );

    // Add debugging
    debugPlatformData();

    // For each platform, create a dot
    window.overallPlatformsData.forEach((platform) => {
      console.log(`Processing platform: ${platform.name}`);

      // Special handling for Bluesky
      if (platform.name.toLowerCase().includes("bluesky")) {
        console.log("Found Bluesky in data, ensuring it's displayed");
      }

      // Find matching platform in regular platformData for visuals
      const visualPlatform = findMatchingPlatform(platform.name);
      if (!visualPlatform) {
        console.warn(
          `No visual data found for ${platform.name}, creating fallback`
        );

        // Create a fallback visual representation
        const fallbackVisual = {
          id: platform.name.toLowerCase().replace(/\s+/g, ""),
          name: platform.name,
          color: "#666666", // Default color
          icon: "fa-solid fa-circle", // Default icon
        };

        // Create dot with fallback visuals
        const dot = createDot(platform, fallbackVisual);
        if (dot) {
          matrix.appendChild(dot);
        }
        return;
      }

      // Create dot element
      const dot = createDot(platform, visualPlatform);
      if (dot) {
        matrix.appendChild(dot);
      } else {
        console.error(`Failed to create dot for ${platform.name}`);
      }
    });

    // Check specifically if Bluesky is displayed
    const blueskyDot = document.querySelector('[data-platform-id="bluesky"]');
    console.log("Bluesky dot element:", blueskyDot);
  }

  // Helper to find matching platform for visuals
  function findMatchingPlatform(name) {
    console.log(`Finding match for platform: ${name}`);

    // Special case for Bluesky (handle case differences)
    if (
      name.toLowerCase().includes("bluesky") ||
      name.toLowerCase().includes("blue sky")
    ) {
      const blueskyMatch = platformData.find(
        (p) =>
          p.id === "bluesky" ||
          (p.name && p.name.toLowerCase().includes("bluesky"))
      );

      if (blueskyMatch) {
        console.log(`Found Bluesky match:`, blueskyMatch);
        // Fix the icon path to ensure it's using the correct relative path
        return {
          ...blueskyMatch,
          icon: blueskyMatch.icon.startsWith("/")
            ? `icons${blueskyMatch.icon}`
            : blueskyMatch.icon,
        };
      }
    }

    // Special case for Truth Social
    if (name === "Truth Social") {
      const truthSocialMatch = platformData.find((p) => p.id === "truthsocial");
      if (truthSocialMatch) {
        return {
          ...truthSocialMatch,
          icon: truthSocialMatch.icon.startsWith("/")
            ? `icons${truthSocialMatch.icon}`
            : truthSocialMatch.icon,
        };
      }
    }

    // Special case for Threads
    if (name === "Threads") {
      const threadsMatch = platformData.find((p) => p.id === "threads");
      if (threadsMatch) {
        return {
          ...threadsMatch,
          icon: threadsMatch.icon.startsWith("/")
            ? `icons${threadsMatch.icon}`
            : threadsMatch.icon,
        };
      }
    }

    // Special case for Gab
    if (name === "Gab") {
      const gabMatch = platformData.find((p) => p.id === "gab");
      if (gabMatch) {
        return {
          ...gabMatch,
          icon: gabMatch.icon.startsWith("/")
            ? `icons${gabMatch.icon}`
            : gabMatch.icon,
        };
      }
    }

    // Handle special case for Twitter/X
    if (name === "X (Twitter)") {
      return platformData.find(
        (p) => p.id === "twitter" || p.name === "Twitter"
      );
    }

    // For Instagram, use Facebook's color if not found
    if (name === "Instagram") {
      const instagramMatch = platformData.find(
        (p) => p.id === "instagram" || p.name === "Instagram"
      );
      if (instagramMatch) return instagramMatch;

      // If Instagram is not in platformData, create a fallback
      return {
        id: "instagram",
        name: "Instagram",
        color: "#E1306C", // Instagram color
        icon: "fa-brands fa-instagram",
        description: "Photo sharing social network owned by Meta.",
      };
    }

    // For YouTube, create a fallback
    if (name === "YouTube") {
      return {
        id: "youtube",
        name: "YouTube",
        color: "#FF0000", // YouTube red
        icon: "fa-brands fa-youtube",
        description: "Video sharing platform owned by Google.",
      };
    }

    // For Mastodon, create a fallback
    if (name === "Mastodon") {
      return {
        id: "mastodon",
        name: "Mastodon",
        color: "#563ACC", // Mastodon purple
        icon: "fa-brands fa-mastodon",
        description: "Decentralized, open-source social network.",
      };
    }

    // Try to match by name or ID
    const match = platformData.find(
      (p) => p.name === name || p.id === name.toLowerCase().replace(/\s+/g, "")
    );

    if (match) {
      // Fix icon paths that start with /
      if (match.icon && match.icon.startsWith("/")) {
        return {
          ...match,
          icon: `icons${match.icon}`,
        };
      }
      return match;
    }

    console.warn(`No match found for ${name}`);
    return null;
  }

  // Create a dot element for a platform
  function createDot(platform, visualPlatform) {
    if (
      !platform.position ||
      typeof platform.position.x !== "number" ||
      typeof platform.position.y !== "number"
    ) {
      console.warn(`Invalid position for ${platform.name}:`, platform.position);
      return null;
    }

    // Create platform dot
    const dot = document.createElement("div");
    dot.className = "platform-dot";
    dot.id = `${visualPlatform.id}-dot-overall`;
    dot.setAttribute("data-platform-id", visualPlatform.id);

    // Ensure coordinates are within bounds (-1 to 1)
    const x = Math.max(-1, Math.min(1, platform.position.x));
    const y = Math.max(-1, Math.min(1, platform.position.y));

    // Position the dot (convert to percentage coordinates)
    const xPos = ((x + 1) / 2) * 100;
    const yPos = 100 - ((y + 1) / 2) * 100; // Invert Y for CSS

    dot.style.left = `${xPos}%`;
    dot.style.top = `${yPos}%`;

    // Style the dot using the visual platform data
    dot.style.color = visualPlatform.color;

    // Special styling for Threads
    if (visualPlatform.id === "threads") {
      dot.style.backgroundColor = "white";
    }

    // Add icon
    if (
      visualPlatform.icon.includes(".png") ||
      visualPlatform.icon.includes(".jpg") ||
      visualPlatform.icon.includes(".svg")
    ) {
      const img = document.createElement("img");
      img.src = visualPlatform.icon;
      img.alt = platform.name;
      dot.appendChild(img);
    } else {
      const icon = document.createElement("i");
      icon.className = visualPlatform.icon;
      icon.style.color = visualPlatform.color;
      dot.appendChild(icon);
    }

    // Add tooltip with coordinates
    dot.title = `${platform.name} (${x.toFixed(2)}, ${y.toFixed(2)})`;

    // Add click event to show details
    dot.addEventListener("click", () => {
      showOverallPlatformDetails(platform, visualPlatform);
    });

    return dot;
  }

  // Show details for a platform in the Overall view
  function showOverallPlatformDetails(platform, visualPlatform) {
    console.log("Showing details for:", platform.name);

    // Get or create details panel
    let detailsPanel = document.getElementById("details-panel");
    if (!detailsPanel) {
      detailsPanel = document.createElement("div");
      detailsPanel.id = "details-panel";
      detailsPanel.className = "side-panel";

      const mainContent = document.querySelector(".main-content");
      if (mainContent && mainContent.parentNode) {
        mainContent.parentNode.insertBefore(
          detailsPanel,
          mainContent.nextSibling
        );
      }
    }

    // Create content for the details panel
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Platform Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <h3>${platform.name}</h3>
            <div class="platform-detail-icon">
              ${
                visualPlatform.icon.includes(".png") ||
                visualPlatform.icon.includes(".jpg") ||
                visualPlatform.icon.includes(".svg")
                  ? `<img src="${visualPlatform.icon}" alt="${platform.name}">`
                  : `<i class="${visualPlatform.icon}" style="color: ${visualPlatform.color};"></i>`
              }
            </div>
          </div>
          <div class="platform-detail-content">
            <div class="position-info">
              <div class="position-label">Political Affiliation:</div>
              <div class="position-values">${platform.bias || "N/A"}</div>
            </div>
            <div class="position-info">
              <div class="position-label">Governance Approach:</div>
              <div class="position-values">${platform.libAuth || "N/A"}</div>
            </div>
            <div class="position-info">
              <div class="position-label">Position:</div>
              <div class="position-values">(${platform.position.x.toFixed(
                2
              )}, ${platform.position.y.toFixed(2)})</div>
            </div>
            <div class="detail-description">${
              platform.reasoning || "No reasoning available."
            }</div>
          </div>
          <div class="platform-detail-footer">
            <span>${getQuadrantLabel(
              platform.position.x,
              platform.position.y
            )}</span>
            <span>Source: ${platform.source || "N/A"}</span>
          </div>
        </div>
      </div>
    `;

    // Show the panel
    detailsPanel.style.display = "block";
  }

  // Helper to get quadrant label
  function getQuadrantLabel(x, y) {
    if (y > 0) {
      return x < 0 ? "Authoritarian Left" : "Authoritarian Right";
    } else {
      return x < 0 ? "Libertarian Left" : "Libertarian Right";
    }
  }

  // Event listeners for view selector buttons
  if (viewPlatformsBtn) {
    viewPlatformsBtn.addEventListener("click", function () {
      setActiveView("platforms");
    });
  }

  if (viewPoliciesBtn) {
    viewPoliciesBtn.addEventListener("click", function () {
      setActiveView("policies");
    });
  }

  if (viewLeadershipBtn) {
    viewLeadershipBtn.addEventListener("click", function () {
      setActiveView("leadership");
    });
  }

  // Function to set active view
  function setActiveView(view) {
    // Update current view
    currentView = view;

    // Update button states
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.getElementById(`view-${view}`).classList.add("active");

    // Show/hide sub-view container based on the view
    const subViewContainer = document.querySelector(".sub-view-container");
    if (subViewContainer) {
      subViewContainer.style.display = view === "platforms" ? "flex" : "none";
    }

    // Update visualization based on view
    switch (view) {
      case "platforms":
        // Show platform view
        document.querySelector(".sidebar h2").textContent = "Platforms";

        // If a sub-view was active, show that
        if (currentSubView === "overall") {
          showOverallView();
        } else {
          updateMatrix();
          updateTimelineEvents();
          updatePlatformCards();
        }

        // Enable or disable timeline controls based on sub-view
        const yearSlider = document.getElementById("year-slider");
        const playButton = document.getElementById("play-timeline");

        if (currentSubView === "ban-activity") {
          if (yearSlider) yearSlider.disabled = false;
          if (playButton) {
            playButton.disabled = false;
            playButton.classList.remove("disabled");
          }
        } else {
          if (yearSlider) yearSlider.disabled = true;
          if (playButton) {
            playButton.disabled = true;
            playButton.classList.add("disabled");
          }
        }

        break;

      case "policies":
        // Show policies view (placeholder)
        document.querySelector(".sidebar h2").textContent = "Policies";
        alert("Policies view is under development");
        // Reset to platforms view for now
        setActiveView("platforms");
        break;

      case "leadership":
        // Show leadership view
        document.querySelector(".sidebar h2").textContent = "Leadership";

        // Load leadership data if not already loaded
        if (!window.leadershipData || window.leadershipData.length === 0) {
          loadLeadershipData().then((data) => {
            window.leadershipData = data;
            showLeadershipView();
          });
        } else {
          showLeadershipView();
        }

        // Disable time controls for leadership view
        const leaderYearSlider = document.getElementById("year-slider");
        const leaderPlayButton = document.getElementById("play-timeline");

        if (leaderYearSlider) leaderYearSlider.disabled = true;
        if (leaderPlayButton) {
          leaderPlayButton.disabled = true;
          leaderPlayButton.classList.add("disabled");
        }

        // Clear timeline events for leadership view
        const eventsContainer = document.getElementById("events-container");
        if (eventsContainer) {
          eventsContainer.innerHTML =
            '<div class="event-empty">Events not applicable in Leadership view</div>';
        }

        // Update the disclaimer text
        const disclaimer = document.querySelector(".matrix-disclaimer");
        if (disclaimer) {
          disclaimer.textContent =
            "Leadership positions based on political alignment";
        }

        // Clear platform cards for leadership view
        const platformCardsContainer =
          document.getElementById("platform-cards");
        if (platformCardsContainer) {
          platformCardsContainer.innerHTML = "";
        }

        break;
    }
  }

  // Event listeners
  yearSlider.addEventListener("input", function () {
    currentYear = parseInt(this.value);
    if (currentYearDisplay) {
      currentYearDisplay.textContent = currentYear;
    }

    // If we're playing and manually move the slider, stop the playback
    if (isPlaying && currentYear >= maxYear) {
      stopTimeline();
    }

    updateMatrix();
    updateTimelineEvents();
    updatePlatformCards();
  });

  // Add play button event listener
  if (playButton) {
    playButton.addEventListener("click", function () {
      if (isPlaying) {
        stopTimeline();
      } else {
        playTimeline();
      }
    });
  }

  // Timeline playback functions
  function playTimeline() {
    isPlaying = true;
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';

    // Start from current year and increment
    playInterval = setInterval(() => {
      if (currentYear >= maxYear) {
        stopTimeline();
        return;
      }

      currentYear++;
      yearSlider.value = currentYear;
      currentYearDisplay.textContent = currentYear;

      updateMatrix();
      updateTimelineEvents();
      updatePlatformCards();
    }, PLAY_SPEED);
  }

  function stopTimeline() {
    isPlaying = false;
    playButton.innerHTML = '<i class="fa-solid fa-play"></i> Play';
    clearInterval(playInterval);
  }

  if (infoButton) {
    infoButton.addEventListener("click", function () {
      infoModal.classList.remove("hidden");
    });
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      infoModal.classList.add("hidden");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function () {
      infoModal.classList.add("hidden");
    });
  }

  if (toggleFiltersButton) {
    toggleFiltersButton.addEventListener("click", function () {
      filtersContent.classList.toggle("show");
      const icon = this.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-chevron-up");
        icon.classList.toggle("fa-chevron-down");
      }
    });
  }

  if (selectAllButton) {
    selectAllButton.addEventListener("click", function () {
      selectedPlatforms = platformData.map((platform) => platform.id);
      updatePlatformCheckboxes();
      updateMatrix();
      updatePlatformCards();
    });
  }

  if (clearAllButton) {
    clearAllButton.addEventListener("click", function () {
      selectedPlatforms = [];
      updatePlatformCheckboxes();
      updateMatrix();
      updatePlatformCards();
    });
  }

  // Functions
  function initPlatformFilters() {
    if (!platformListContainer) return;

    platformListContainer.innerHTML = "";

    platformData.forEach((platform) => {
      const platformItem = document.createElement("div");
      platformItem.className = "platform-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `platform-${platform.id}`;
      checkbox.className = "platform-checkbox";
      checkbox.checked = selectedPlatforms.includes(platform.id);
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          selectedPlatforms.push(platform.id);
        } else {
          selectedPlatforms = selectedPlatforms.filter(
            (id) => id !== platform.id
          );
        }
        updateMatrix();
        updatePlatformCards();
      });

      const label = document.createElement("label");
      label.htmlFor = `platform-${platform.id}`;
      label.className = "platform-label";

      // Check if icon is an image path or Font Awesome
      if (
        platform.icon.includes(".png") ||
        platform.icon.includes(".jpg") ||
        platform.icon.includes(".svg")
      ) {
        // It's an image path
        const img = document.createElement("img");
        img.src = platform.icon;
        img.alt = platform.name;
        img.className = "platform-img-icon";
        label.appendChild(img);
      } else {
        // It's a Font Awesome icon
        const icon = document.createElement("i");
        icon.className = platform.icon;
        icon.style.color = platform.color;
        label.appendChild(icon);
      }

      label.appendChild(document.createTextNode(" " + platform.name));

      platformItem.appendChild(checkbox);
      platformItem.appendChild(label);
      platformListContainer.appendChild(platformItem);
    });
  }

  function updatePlatformCheckboxes() {
    platformData.forEach((platform) => {
      const checkbox = document.getElementById(`platform-${platform.id}`);
      if (checkbox) {
        checkbox.checked = selectedPlatforms.includes(platform.id);
      }
    });
  }

  function updateMatrix() {
    if (!matrixContainer) return;

    matrixContainer.innerHTML = "";

    const filteredPlatforms = platformData.filter((platform) =>
      selectedPlatforms.includes(platform.id)
    );

    // Add dots for filtered platforms
    filteredPlatforms.forEach((platform) => {
      // Get the correct position for current year
      const position = getPlatformPosition(platform.id);
      if (!position) return; // Skip if no position data for current year

      // Create platform dot
      const dot = document.createElement("div");
      dot.className = "platform-dot";
      dot.id = `${platform.id}-dot`;
      dot.setAttribute("data-platform-id", platform.id);

      // Position the dot (convert -1,1 scale to percentage)
      const xPos = ((position.x + 1) / 2) * 100;
      const yPos = 100 - ((position.y + 1) / 2) * 100; // Invert Y

      dot.style.left = `${xPos}%`;
      dot.style.top = `${yPos}%`;

      // Set color for the dot (will be used for Font Awesome icons)
      dot.style.color = platform.color;

      // Special handling for Threads
      if (platform.id === "threads") {
        dot.style.backgroundColor = "white";
      } else {
        dot.style.backgroundColor = "transparent";
      }

      // Handle icon - using same approach as in the legend
      if (
        platform.icon.includes(".png") ||
        platform.icon.includes(".jpg") ||
        platform.icon.includes(".svg")
      ) {
        // It's an image path
        const img = document.createElement("img");
        img.src = platform.icon;
        img.alt = platform.name;
        // Don't add filters that would modify the image colors
        img.style.filter = "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))";
        dot.appendChild(img);
      } else {
        // It's a Font Awesome icon
        const icon = document.createElement("i");
        icon.className = platform.icon;
        icon.style.color = platform.color; // Use platform color directly for consistency
        icon.style.filter = "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))";
        dot.appendChild(icon);
      }

      // Add tooltip and click event
      dot.title = platform.name;
      dot.addEventListener("click", () => {
        showPlatformDetails(platform, position);
      });

      // Add to matrix
      matrixContainer.appendChild(dot);
    });
  }

  function updateTimelineEvents() {
    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    // FIXED: Show events for the specific current year, not just nearby years
    const relevantEvents = timelineEvents
      .filter((event) => event.year === currentYear)
      .sort((a, b) => b.year - a.year);

    if (relevantEvents.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "event-empty";
      emptyMessage.textContent = `No significant events in ${currentYear}`;
      eventsContainer.appendChild(emptyMessage);

      // Hide selected event details if no events
      if (selectedEventDetails) {
        selectedEventDetails.classList.add("hidden");
      }
      return;
    }

    relevantEvents.forEach((event) => {
      const eventItem = document.createElement("div");
      eventItem.className = `event-item ${
        selectedEvent === event.id ? "selected" : ""
      }`;
      eventItem.dataset.eventId = event.id;

      const eventHeader = document.createElement("div");
      eventHeader.className = "event-header";

      const eventTitle = document.createElement("div");
      eventTitle.className = "event-title";
      eventTitle.textContent = event.title;

      const eventYear = document.createElement("div");
      eventYear.className = "event-year";
      eventYear.textContent = event.year;

      eventHeader.appendChild(eventTitle);
      eventHeader.appendChild(eventYear);

      const eventDescription = document.createElement("p");
      eventDescription.className = "event-description";
      eventDescription.textContent = event.description;

      eventItem.appendChild(eventHeader);
      eventItem.appendChild(eventDescription);

      if (event.platforms && event.platforms.length > 0) {
        const platformsContainer = document.createElement("div");
        platformsContainer.className = "event-platforms";

        event.platforms.forEach((platform) => {
          const badge = document.createElement("span");
          badge.className = "platform-badge";
          badge.textContent = platform;
          platformsContainer.appendChild(badge);
        });

        eventItem.appendChild(platformsContainer);
      }

      eventItem.addEventListener("click", function () {
        const eventId = this.dataset.eventId;

        if (selectedEvent === eventId) {
          selectedEvent = null;
          if (selectedEventDetails) {
            selectedEventDetails.classList.add("hidden");
          }
        } else {
          selectedEvent = eventId;
          const event = timelineEvents.find((e) => e.id === eventId);
          if (event && selectedEventDetails && selectedEventDescription) {
            selectedEventDescription.textContent = event.description;
            selectedEventDetails.classList.remove("hidden");
          }
        }

        // Update selected state
        document.querySelectorAll(".event-item").forEach((item) => {
          item.classList.toggle(
            "selected",
            item.dataset.eventId === selectedEvent
          );
        });
      });

      eventsContainer.appendChild(eventItem);
    });
  }

  function updatePlatformCards() {
    if (!platformCardsContainer) return;

    platformCardsContainer.innerHTML = "";

    const filteredPlatforms = platformData
      .filter((platform) => selectedPlatforms.includes(platform.id))
      .slice(0, 4); // Show only first 4 platforms

    filteredPlatforms.forEach((platform) => {
      const position = getPlatformPosition(platform.id);
      if (!position) return;

      const card = document.createElement("div");
      card.className = "platform-card";

      // Color bar
      const colorBar = document.createElement("div");
      colorBar.className = "platform-color-bar";
      colorBar.style.backgroundColor = platform.color;

      // Card header
      const cardHeader = document.createElement("div");
      cardHeader.className = "platform-card-header";

      const titleContainer = document.createElement("div");
      titleContainer.className = "platform-card-title";

      const nameContainer = document.createElement("div");
      nameContainer.className = "platform-card-name";

      // Create icon container
      const iconContainer = document.createElement("span");
      iconContainer.style.backgroundColor = platform.color;
      iconContainer.style.width = "75px";
      iconContainer.style.height = "75px";
      iconContainer.style.borderRadius = "70%";
      iconContainer.style.display = "inline-flex";
      iconContainer.style.alignItems = "center";
      iconContainer.style.justifyContent = "center";

      // Handle the icon display correctly
      if (
        platform.icon.includes(".png") ||
        platform.icon.includes(".jpg") ||
        platform.icon.includes(".svg")
      ) {
        // It's an image path
        const img = document.createElement("img");
        img.src = platform.icon;
        img.alt = platform.name;
        img.className = "platform-img-icon";
        img.style.filter = "brightness(0) invert(1)"; // Make icon white
        iconContainer.appendChild(img);
      } else {
        // It's a Font Awesome icon
        const icon = document.createElement("i");
        icon.className = platform.icon;
        icon.style.color = "#FFFFFF"; // White color for visibility
        iconContainer.appendChild(icon);
      }

      nameContainer.appendChild(iconContainer);
      nameContainer.appendChild(document.createTextNode(" " + platform.name));

      const quadrantBadge = document.createElement("span");
      quadrantBadge.className = "platform-card-badge";
      quadrantBadge.textContent = getQuadrant(position.x, position.y);

      titleContainer.appendChild(nameContainer);
      titleContainer.appendChild(quadrantBadge);

      cardHeader.appendChild(titleContainer);

      // Card content
      const cardContent = document.createElement("div");
      cardContent.className = "platform-card-content";

      const description = document.createElement("p");
      description.className = "platform-card-description";
      description.textContent = position.description;

      const footer = document.createElement("div");
      footer.className = "platform-card-footer";

      const positionText = document.createElement("span");
      positionText.textContent = `Position: (${position.x.toFixed(
        1
      )}, ${position.y.toFixed(1)})`;

      const updateText = document.createElement("span");
      updateText.textContent = `Year: ${position.year}`;

      footer.appendChild(positionText);
      footer.appendChild(updateText);

      cardContent.appendChild(description);
      cardContent.appendChild(footer);

      // Assemble card
      card.appendChild(colorBar);
      card.appendChild(cardHeader);
      card.appendChild(cardContent);

      platformCardsContainer.appendChild(card);
    });
  }

  // Replace your getPlatformPosition function with this improved version:
  function getPlatformPosition(platformId) {
    const platform = platformData.find((p) => p.id === platformId);
    if (!platform) return null;

    // IMPROVED: First look for the exact year match
    const exactPosition = platform.positions.find(
      (pos) => pos.year === currentYear
    );
    if (exactPosition) {
      return exactPosition;
    }

    // If no exact match, find the closest previous year's position
    const previousPositions = platform.positions.filter(
      (pos) => pos.year <= currentYear
    );

    if (previousPositions.length > 0) {
      // Sort by year descending to get the most recent position before current year
      return previousPositions.sort((a, b) => b.year - a.year)[0];
    }

    // If there are no positions before the current year, check if there are any future positions
    const futurePositions = platform.positions.filter(
      (pos) => pos.year > currentYear
    );

    if (futurePositions.length > 0) {
      // Sort by year ascending to get the next upcoming position
      return futurePositions.sort((a, b) => a.year - b.year)[0];
    }

    // If there are no positions at all, return null
    return null;
  }

  function getQuadrant(x, y) {
    if (x >= 0 && y < 0) return "Libertarian Right";
    if (x < 0 && y < 0) return "Libertarian Left";
    if (x < 0 && y >= 0) return "Authoritarian Left";
    return "Authoritarian Right";
  }

  // Update this function to show details in the right panel
  function showPlatformDetails(platform, position) {
    console.log("Platform details:", platform.name, position);

    // Get or create the side panel if it doesn't exist
    let detailsPanel = document.getElementById("details-panel");

    if (!detailsPanel) {
      // Create a new details panel and add it to the grid
      detailsPanel = document.createElement("div");
      detailsPanel.id = "details-panel";
      detailsPanel.className = "side-panel";

      // Insert the panel into the grid (after the main content)
      const mainContent = document.querySelector(".main-content");
      if (mainContent && mainContent.parentNode) {
        mainContent.parentNode.insertBefore(
          detailsPanel,
          mainContent.nextSibling
        );
      }
    }

    // Create and populate the details content
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Platform Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <h3>${platform.name}</h3>
            <div class="platform-detail-icon">
              ${
                platform.icon.includes(".png") ||
                platform.icon.includes(".jpg") ||
                platform.icon.includes(".svg")
                  ? `<img src="${platform.icon}" alt="${platform.name}">`
                  : `<i class="${platform.icon}" style="color: ${platform.color};"></i>`
              }
            </div>
          </div>
          <div class="platform-detail-content">
            <div class="position-info">
              <div class="position-label">Position:</div>
              <div class="position-values">
                <span>${position.x.toFixed(2)}</span>,
                <span>${position.y.toFixed(2)}</span>
              </div>
            </div>
            <div class="detail-description">
              ${
                position.description ||
                platform.description ||
                "No description available."
              }
            </div>
          </div>
          <div class="platform-detail-footer">
            <span>${getQuadrant(position.x, position.y)}</span>
            <span>Year: ${position.year}</span>
          </div>
        </div>
      </div>
      
    
    `;

    // Make sure side panel is visible
    detailsPanel.style.display = "block";

    // Function to generate platform-specific events
    function generatePlatformEvents(platformId) {
      // Find events related to this platform
      const relatedEvents = timelineEvents
        .filter(
          (event) =>
            event.platforms &&
            event.platforms.includes(platformId) &&
            event.year <= currentYear
        )
        .sort((a, b) => b.year - a.year);

      if (relatedEvents.length === 0) {
        return `<div class="event-empty">No events found for this platform</div>`;
      }

      return relatedEvents
        .map(
          (event) => `
        <div class="event-item">
          <div class="event-header">
            <div class="event-title">${event.title}</div>
            <div class="event-year">${event.year}</div>
          </div>
          <p class="event-description">${event.description}</p>
        </div>
      `
        )
        .join("");
    }
  }

  // Update your DOM ready function to hide the bottom platform cards on desktop
  const platformCardsSection = document.getElementById("platform-cards");
  if (platformCardsSection) {
    // We'll completely stop rendering to the bottom cards on desktop
    // The mobile view will still use this section
    const updatePlatformCardsOriginal = updatePlatformCards;

    // Override the updatePlatformCards function
    updatePlatformCards = function () {
      const isMobile = window.innerWidth < 1200;

      // Only update the cards in mobile view
      if (isMobile) {
        updatePlatformCardsOriginal();
      } else {
        // On desktop, clear the cards section
        platformCardsSection.innerHTML = "";
      }
    };

    // Initial call to set correct state
    updatePlatformCards();

    // Add resize listener to handle switching between mobile/desktop
    window.addEventListener("resize", updatePlatformCards);
  }

  // Initialize both desktop and mobile detail panels to show empty state
  const initPanels = () => {
    const panels = [
      {
        detail: document.getElementById("platform-detail"),
        empty: document.getElementById("empty-details"),
      },
      {
        detail: document.getElementById("platform-detail-mobile"),
        empty: document.getElementById("empty-details-mobile"),
      },
    ];

    panels.forEach((panel) => {
      if (panel.detail && panel.empty) {
        panel.detail.classList.add("hidden");
        panel.empty.classList.remove("hidden");
      }
    });
  };

  initPanels();

  // Add click event to matrix background to clear the details
  const matrix = document.getElementById("matrix");
  if (matrix) {
    matrix.addEventListener("click", function (e) {
      // Only trigger if clicking directly on the matrix (not on a dot)
      if (e.target === matrix) {
        initPanels();
      }
    });
  }

  // Update the loadOverallPlatformsData function to parse the position coordinates from the CSV
  async function loadOverallPlatformsData() {
    try {
      const response = await fetch("Platforms_Overall.csv");
      const csvData = await response.text();

      // Parse CSV data
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");

      const platformsOverallData = [];

      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue; // Skip empty rows

        // Handle commas inside quotes
        let row = [];
        let insideQuotes = false;
        let currentValue = "";

        for (let char of rows[i]) {
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === "," && !insideQuotes) {
            row.push(currentValue.trim());
            currentValue = "";
          } else {
            currentValue += char;
          }
        }
        row.push(currentValue.trim()); // Add the last value

        // Map CSV data to platform object
        const platform = {
          name: row[0],
          bias: row[1] ? row[1].replace(/"/g, "") : "",
          reasoning: row[2] ? row[2].replace(/"/g, "") : "",
          libAuth: row[3] ? row[3].replace(/"/g, "") : "",
          source: row[4] ? row[4].replace(/"/g, "") : "",
          timeline: row[5] ? row[5].replace(/"/g, "") : "",
          positionXY: row[6] ? row[6].replace(/"/g, "") : null,
        };

        // Use the position directly from CSV if available, otherwise calculate it
        platform.position =
          parsePositionFromCSV(platform.positionXY) ||
          calculatePositionFromOverallData(platform);

        platformsOverallData.push(platform);
      }

      console.log("Parsed Overall Platforms Data:", platformsOverallData);
      return platformsOverallData;
    } catch (error) {
      console.error("Error loading overall platforms data:", error);
      return [];
    }
  }

  // New function to parse position from CSV "X,Y" format
  function parsePositionFromCSV(positionStr) {
    if (!positionStr) return null;

    console.log("Parsing position string:", positionStr);

    // Split by comma, accounting for any whitespace
    const parts = positionStr.split(",");
    if (parts.length !== 2) {
      console.warn("Invalid position format:", positionStr);
      return null;
    }

    const x = parseFloat(parts[0].trim());
    const y = parseFloat(parts[1].trim());

    if (isNaN(x) || isNaN(y)) {
      console.warn("Invalid coordinates:", x, y, "from", positionStr);
      return null;
    }

    console.log("Parsed position:", x, y);
    return { x, y };
  }

  // Keep the existing calculation function as fallback
  function calculatePositionFromOverallData(platform) {
    // Extract bias value (x-axis: left-right)
    let xPosition = 0;

    // Parse the bias scale (1-5) from text
    if (platform.bias.includes("1:")) xPosition = -0.8; // Far left
    else if (platform.bias.includes("2:")) xPosition = -0.4; // Left-leaning
    else if (platform.bias.includes("3:")) xPosition = 0; // Neutral/Centrist
    else if (platform.bias.includes("4:")) xPosition = 0.4; // Right-leaning
    else if (platform.bias.includes("5:")) xPosition = 0.8; // Far right

    // Special case for Twitter/X which has pre/post musk values
    if (platform.name === "X (Twitter)") {
      xPosition = 0.2; // Average between pre-Musk (left) and post-Musk (right)
    }

    // Extract libertarian/authoritarian value (y-axis)
    let yPosition = 0;

    if (platform.libAuth.toLowerCase().includes("authoritarian")) {
      yPosition = 0.7; // More authoritarian
    } else if (platform.libAuth.toLowerCase().includes("libertarian")) {
      yPosition = -0.7; // More libertarian
    } else if (platform.libAuth.toLowerCase().includes("semi-authoritarian")) {
      yPosition = 0.3; // Somewhat authoritarian
    } else if (platform.libAuth.toLowerCase().includes("semi-libertarian")) {
      yPosition = -0.3; // Somewhat libertarian
    }

    return { x: xPosition, y: yPosition };
  }

  // Function to create and display the Overall view
  function showOverallView() {
    if (!matrixContainer) {
      console.error("Matrix container not found");
      return;
    }

    // Clear current matrix
    matrixContainer.innerHTML = "";

    // Ensure we have the data
    if (
      !window.overallPlatformsData ||
      window.overallPlatformsData.length === 0
    ) {
      console.error("No overall platform data available");
      const noDataMsg = document.createElement("div");
      noDataMsg.style.textAlign = "center";
      noDataMsg.style.padding = "20px";
      noDataMsg.textContent = "Error: Could not load overall platform data";
      matrixContainer.appendChild(noDataMsg);
      return;
    }

    // Update the disclaimer text
    const disclaimer = document.querySelector(".matrix-disclaimer");
    if (disclaimer) {
      disclaimer.textContent =
        "Platform positions based on overall political alignment";
    }

    console.log(
      "Showing Overall view with",
      window.overallPlatformsData.length,
      "platforms"
    );

    // Add dots for each platform in the overall dataset
    window.overallPlatformsData.forEach((platform) => {
      // Skip platforms without position data
      if (!platform.position || typeof platform.position.x === "undefined") {
        console.warn(
          `Skipping ${platform.name} - No position data:`,
          platform.position
        );
        return;
      }

      // Find matching platform in our regular platformData for icon and color
      const matchingPlatform = platformData.find(
        (p) =>
          p.name === platform.name ||
          (platform.name === "X (Twitter)" && p.name === "Twitter")
      );

      if (!matchingPlatform) {
        console.warn(`No matching platform found for ${platform.name}`);
        return;
      }

      console.log(
        `Placing ${platform.name} at position (${platform.position.x}, ${platform.position.y})`
      );

      // Create platform dot with enhanced position checking
      createPlatformDot(platform, matchingPlatform, matrixContainer);
    });
  }

  // Helper function to create a platform dot with proper positioning
  function createPlatformDot(overallData, visualData, container) {
    // Validate the position data
    if (
      !overallData.position ||
      typeof overallData.position.x === "undefined" ||
      typeof overallData.position.y === "undefined"
    ) {
      console.warn(
        `Invalid position for ${overallData.name}:`,
        overallData.position
      );
      return;
    }

    // Create platform dot
    const dot = document.createElement("div");
    dot.className = "platform-dot";
    dot.id = `${visualData.id}-dot-overall`;
    dot.setAttribute("data-platform-id", visualData.id);

    // Ensure coordinates are within valid range
    const x = Math.max(-1, Math.min(1, overallData.position.x));
    const y = Math.max(-1, Math.min(1, overallData.position.y));

    // Calculate percentage positions
    const xPos = ((x + 1) / 2) * 100;
    const yPos = 100 - ((y + 1) / 2) * 100; // Invert Y

    dot.style.left = `${xPos}%`;
    dot.style.top = `${yPos}%`;

    // Set color and add icon
    dot.style.color = visualData.color;

    // Special handling for Threads
    if (visualData.id === "threads") {
      dot.style.backgroundColor = "white";
    } else {
      dot.style.backgroundColor = "transparent";
    }

    // Handle icon
    if (
      visualData.icon.includes(".png") ||
      visualData.icon.includes(".jpg") ||
      visualData.icon.includes(".svg")
    ) {
      const img = document.createElement("img");
      img.src = visualData.icon;
      img.alt = overallData.name;
      img.style.filter = "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))";
      dot.appendChild(img);
    } else {
      const icon = document.createElement("i");
      icon.className = visualData.icon;
      icon.style.color = visualData.color;
      icon.style.filter = "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))";
      dot.appendChild(icon);
    }

    // Add tooltip with position information
    dot.title = `${overallData.name} (${x.toFixed(1)}, ${y.toFixed(1)})`;

    // Add click event to show platform details
    dot.addEventListener("click", function () {
      showOverallPlatformDetails(overallData, visualData);
    });

    // Add to container
    container.appendChild(dot);
  }

  // Function to show details when clicking on a platform in the Overall view
  function showOverallPlatformDetails(overallData, platformVisuals) {
    console.log("Overall platform details:", overallData);

    // Get or create the side panel
    let detailsPanel = document.getElementById("details-panel");

    if (!detailsPanel) {
      detailsPanel = document.createElement("div");
      detailsPanel.id = "details-panel";
      detailsPanel.className = "side-panel";

      const mainContent = document.querySelector(".main-content");
      if (mainContent && mainContent.parentNode) {
        mainContent.parentNode.insertBefore(
          detailsPanel,
          mainContent.nextSibling
        );
      }
    }

    // Create and populate the details content
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Platform Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <h3>${overallData.name}</h3>
            <div class="platform-detail-icon">
              ${
                platformVisuals.icon.includes(".png") ||
                platformVisuals.icon.includes(".jpg") ||
                platformVisuals.icon.includes(".svg")
                  ? `<img src="${platformVisuals.icon}" alt="${overallData.name}">`
                  : `<i class="${platformVisuals.icon}" style="color: ${platformVisuals.color};"></i>`
              }
            </div>
          </div>
          <div class="platform-detail-content">
            <div class="position-info">
              <div class="position-label">Political Affiliation:</div>
              <div class="position-values">
                ${overallData.bias}
              </div>
            </div>
            <div class="position-info">
              <div class="position-label">Governance Approach:</div>
              <div class="position-values">
                ${overallData.libAuth}
              </div>
            </div>
            <div class="position-info">
              <div class="position-label">Position:</div>
              <div class="position-values">
                (${overallData.position.x.toFixed(
                  2
                )}, ${overallData.position.y.toFixed(2)})
              </div>
            </div>
            <div class="detail-description">
              ${overallData.reasoning || "No description available."}
            </div>
          </div>
          <div class="platform-detail-footer">
            <span>${getQuadrantFromPosition(
              overallData.position.x,
              overallData.position.y
            )}</span>
            <span>Source: ${overallData.source || "N/A"}</span>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h2>Key Events</h2>
        <div class="timeline-events">
          <div class="events-container">
            ${formatKeyEvents(overallData.timeline)}
          </div>
        </div>
      </div>
    `;

    detailsPanel.style.display = "block";
  }

  // Helper to format key events from the timeline field
  function formatKeyEvents(timelineText) {
    if (!timelineText || timelineText.trim() === "") {
      return '<div class="event-empty">No key events available</div>';
    }

    // Split the timeline by year entries
    const events = timelineText.split(/\d{4}:/).filter((e) => e.trim() !== "");

    if (events.length === 0) {
      return '<div class="event-empty">No key events available</div>';
    }

    return events
      .map((event, index) => {
        // Extract year from the beginning of the timeline text or the current event
        const yearMatch =
          index === 0
            ? timelineText.match(/^(\d{4}):/)
            : timelineText.match(
                new RegExp(
                  `(\\d{4}):${event
                    .substring(0, 20)
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
                  "i"
                )
              );

        const year = yearMatch ? yearMatch[1] : "N/A";

        return `
        <div class="event-item">
          <div class="event-header">
            <div class="event-title">Key Event</div>
            <div class="event-year">${year}</div>
          </div>
          <p class="event-description">${event.trim()}</p>
        </div>
      `;
      })
      .join("");
  }

  // Helper function to determine quadrant
  function getQuadrantFromPosition(x, y) {
    if (y > 0 && x < 0) return "Authoritarian Left";
    if (y > 0 && x > 0) return "Authoritarian Right";
    if (y < 0 && x < 0) return "Libertarian Left";
    if (y < 0 && x > 0) return "Libertarian Right";
    return "Centrist";
  }

  // Add this debug function to log all platform data during loading
  function debugPlatformData() {
    console.log("Overall platforms data:", window.overallPlatformsData);
    console.log("Visual platform data:", platformData);

    // Check for Bluesky specifically
    const blueskyOverall = window.overallPlatformsData.find(
      (p) =>
        p.name.toLowerCase().includes("bluesky") ||
        p.name.toLowerCase().includes("blue sky")
    );

    console.log("Bluesky in overall data:", blueskyOverall);

    const blueskyVisual = platformData.find(
      (p) =>
        p.id === "bluesky" ||
        (p.name && p.name.toLowerCase().includes("bluesky"))
    );

    console.log("Bluesky in visual data:", blueskyVisual);
  }

  // Add these functions to handle the leadership view
  async function loadLeadershipData() {
    try {
      console.log("Fetching leaders.csv...");
      // Remove the leading slash to fix the file path
      const response = await fetch("leaders.csv");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvData = await response.text();
      console.log("Leadership CSV data received, length:", csvData.length);

      // Parse CSV
      const lines = csvData.split("\n");
      if (lines.length < 2) {
        console.error("Leaders CSV file has insufficient data");
        return [];
      }

      // Skip header line
      const leadersData = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        // Parse CSV line
        const fields = parseCSVLine(line);
        if (fields.length < 5) {
          console.warn(
            `Leader data line ${i} has insufficient fields:`,
            fields
          );
          continue;
        }

        // Extract position from fields
        const positionStr = fields[4]; // Assuming Position is the 5th column
        const position = parsePosition(positionStr);

        if (!position) {
          console.warn(
            `Could not parse position for leader line ${i}:`,
            positionStr
          );
          continue;
        }

        // Create leader object
        const leader = {
          name: fields[0],
          company: fields[0],
          notes: fields[3],
          position: position,
        };

        leadersData.push(leader);
        console.log(
          `Added leader: ${leader.name} at position (${position.x}, ${position.y})`
        );
      }

      console.log("Parsed", leadersData.length, "leaders from CSV");
      return leadersData;
    } catch (error) {
      console.error("Error loading leadership data:", error);
      return [];
    }
  }

  // Function to display the leadership view
  function showLeadershipView() {
    const matrix = document.getElementById("matrix");
    if (!matrix) {
      console.error("Matrix element not found");
      return;
    }

    // Clear current matrix
    matrix.innerHTML = "";

    if (!window.leadershipData || window.leadershipData.length === 0) {
      console.error("No leadership data available");
      matrix.innerHTML =
        '<div style="text-align:center;padding:20px;">No leadership data available</div>';
      return;
    }

    console.log(
      "Showing",
      window.leadershipData.length,
      "leaders in Leadership view"
    );

    // For each leader, create a white dot
    window.leadershipData.forEach((leader) => {
      // Create dot element
      const dot = createLeaderDot(leader);
      if (dot) {
        matrix.appendChild(dot);
      } else {
        console.error(`Failed to create dot for ${leader.name}`);
      }
    });
  }

  // Update createLeaderDot function to use lowercase image paths
  function createLeaderDot(leader) {
    if (
      !leader.position ||
      typeof leader.position.x !== "number" ||
      typeof leader.position.y !== "number"
    ) {
      console.warn(`Invalid position for ${leader.name}:`, leader.position);
      return null;
    }

    // Create a container for the dot
    const container = document.createElement("div");
    container.className = "leader-container";
    container.id = `leader-container-${leader.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    // Position the container
    container.style.position = "absolute";
    container.style.zIndex = "50";

    // Position container
    const x = Math.max(-1, Math.min(1, leader.position.x));
    const y = Math.max(-1, Math.min(1, leader.position.y));
    const xPos = ((x + 1) / 2) * 100;
    const yPos = 100 - ((y + 1) / 2) * 100; // Invert Y for CSS
    const yOffset = 0; // Changed to 0 for better centering

    container.style.left = `${xPos}%`;
    container.style.top = `${yPos + yOffset}%`;
    container.style.transform = "translate(-50%, -50%)"; // Center the container

    // IMPORTANT FIX: Use lowercase for image filenames
    // Convert image name to lowercase for GitHub Pages compatibility
    let imageName = leader.name.toLowerCase().replace(/\s+/g, "_");

    // Handle Mark Zuckerberg 2.0 special case
    if (leader.name === "Mark Zuckerberg 2.0") {
      imageName = "mark_zuckerberg"; // Use the base image (lowercase)
    }

    // Create an image element for the leader
    // FIX: Get the repository name for GitHub Pages
    const repoPath = window.location.pathname.split("/")[1];
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Use the correct image path based on hosting environment
    let imagePath;
    if (isGitHubPages && repoPath) {
      // GitHub Pages path with repository name (use lowercase for image filename)
      imagePath = `/${repoPath}/tech_leaders_images/${imageName}.png`;
    } else {
      // Local development path (use lowercase for image filename)
      imagePath = `./tech_leaders_images/${imageName}.png`;
    }

    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = leader.name;
    img.className = "leader-image";

    // Add error handling with multiple fallbacks
    img.onerror = function () {
      console.warn(
        `Failed to load image at ${this.src}, trying fallback paths...`
      );

      // Try alternative paths
      const fallbackPaths = [
        `./tech_leaders_images/${imageName}.png`,
        `/tech_leaders_images/${imageName}.png`,
        `tech_leaders_images/${imageName}.png`,
        `/test_tmd_timeline/tech_leaders_images/${imageName}.png`, // Explicit GitHub Pages path
      ];

      tryNextPath(img, fallbackPaths, 0, leader, container);
    };

    // Make the image much larger and add styling directly to it
    img.style.width = "70px"; // INCREASED from 70px to 120px
    img.style.height = "70px"; // INCREASED from 70px to 120px
    img.style.borderRadius = "50%";
    img.style.border = "4px solid #333"; // Border directly on image
    img.style.objectFit = "cover"; // Switch to cover for better face display
    img.style.backgroundColor = "white"; // Background for transparent images
    img.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)"; // Shadow directly on image
    img.style.display = "block";

    // Add hover effect transition
    img.style.transition =
      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease";

    // Add hover effects with JavaScript
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 8px 16px rgba(0,0,0,0.6)";
      this.style.borderColor = "#000";
      this.style.zIndex = "60";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";
      this.style.borderColor = "#333";
      this.style.zIndex = "50";
    });

    // Add visual distinction for Zuckerberg versions
    if (leader.platform && leader.platform.includes("Meta")) {
      // Original Zuckerberg (2010-2020)
      if (leader.platform.includes("2010-2020")) {
        img.style.filter = "sepia(50%) hue-rotate(190deg)"; // Bluish tint
      }
      // New Zuckerberg (2021-2025)
      else if (leader.platform.includes("2021-2025")) {
        img.style.filter = "sepia(30%) hue-rotate(30deg)"; // Warmer tint
      }
    }

    // Add tooltip with more details
    img.title = `${leader.name} (${leader.platform || ""})`;

    // Add click event to show details
    img.addEventListener("click", () => {
      showLeaderDetails(leader);
    });

    // Add cursor style
    img.style.cursor = "pointer";

    // Add the image directly to the container
    container.appendChild(img);

    return container;
  }

  // Helper function to try loading images from different paths
  function tryNextPath(imgElement, paths, index, leader, container) {
    if (index >= paths.length) {
      console.warn(`All image paths failed for ${leader.name}, using fallback`);
      createFallbackInitial(leader, container, imgElement);
      return;
    }

    // Try the next path
    imgElement.src = paths[index];
    imgElement.onerror = function () {
      tryNextPath(imgElement, paths, index + 1, leader, container);
    };
  }

  // Helper function to create fallback initial
  function createFallbackInitial(leader, container, imgToReplace) {
    // Remove the failed image
    if (imgToReplace && imgToReplace.parentNode === container) {
      imgToReplace.remove();
    }

    // Create a fallback initial circle
    const fallback = document.createElement("div");
    fallback.style.width = "120px"; // Same size as image
    fallback.style.height = "120px"; // Same size as image
    fallback.style.borderRadius = "50%";
    fallback.style.backgroundColor = "white";
    fallback.style.border = "4px solid #333";
    fallback.style.display = "flex";
    fallback.style.alignItems = "center";
    fallback.style.justifyContent = "center";
    fallback.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";
    fallback.style.transition =
      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease";

    // Add hover effects to fallback
    fallback.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 8px 16px rgba(0,0,0,0.6)";
      this.style.borderColor = "#000";
      this.style.zIndex = "60";
    });

    fallback.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";
      this.style.borderColor = "#333";
      this.style.zIndex = "50";
    });

    // Add leader initial
    const initial = document.createElement("span");
    initial.textContent = leader.name.charAt(0);
    initial.style.color = "#333";
    initial.style.fontWeight = "bold";
    initial.style.fontSize = "50px"; // Larger font for initial
    fallback.appendChild(initial);

    // Add click event to show details
    fallback.addEventListener("click", () => {
      showLeaderDetails(leader);
    });

    // Add tooltip
    fallback.title = `${leader.name} (${leader.platform || ""})`;

    // Add cursor style
    fallback.style.cursor = "pointer";

    container.appendChild(fallback);
  }

  // Show leader details in the right panel
  function showLeaderDetails(leader) {
    console.log("Showing details for leader:", leader.name);

    // Get or create details panel
    let detailsPanel = document.getElementById("details-panel");
    if (!detailsPanel) {
      detailsPanel = document.createElement("div");
      detailsPanel.id = "details-panel";
      detailsPanel.className = "side-panel";

      const mainContent = document.querySelector(".main-content");
      if (mainContent && mainContent.parentNode) {
        mainContent.parentNode.insertBefore(
          detailsPanel,
          mainContent.nextSibling
        );
      }
    }

    // Handle special cases for Mark Zuckerberg
    let imageName = leader.name.toLowerCase().replace(/\s+/g, "_");
    let versionLabel = "";
    let imageFilter = "";

    // Special handling for Mark Zuckerberg 2.0 naming
    if (leader.name === "Mark Zuckerberg 2.0") {
      imageName = "mark_zuckerberg"; // Use the same base image
      versionLabel = `<span style="display:inline-block;font-size:14px;padding:2px 6px;border-radius:4px;margin-left:8px;background-color:#FFF0E6;color:#FF5700;">2021-2025</span>`;
    }
    // Handle Meta (2010-2020) for the original Zuckerberg
    else if (
      leader.platform &&
      leader.platform.includes("Meta") &&
      leader.platform.includes("2010-2020")
    ) {
      versionLabel = `<span style="display:inline-block;font-size:14px;padding:2px 6px;border-radius:4px;margin-left:8px;background-color:#E4F2FF;color:#1877F2;">2010-2020</span>`;
      imageFilter = "sepia(50%) hue-rotate(190deg)";
    }

    // Create content for the details panel
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Leadership Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <h3>${leader.name} ${versionLabel}</h3>
            <div class="platform-detail-icon" style="display: flex; justify-content: center; margin: 15px 0;">
              <img src="tech_leaders_images/${imageName}.png" 
                   alt="${leader.name}" 
                   onerror="this.onerror=null; this.style.display='none';"
                   style="width:100px; height:100px; object-fit:cover; border-radius:50%; border:4px solid #333; box-shadow: 0 4px 8px rgba(0,0,0,0.4); ${
                     imageFilter ? `filter: ${imageFilter};` : ""
                   }">
            </div>
          </div>
          <div class="platform-detail-content">
            <div class="position-info">
              <div class="position-label">Platform:</div>
              <div class="position-values">${leader.platform || "N/A"}</div>
            </div>
            <div class="position-info">
              <div class="position-label">Position:</div>
              <div class="position-values">(${leader.position.x.toFixed(
                2
              )}, ${leader.position.y.toFixed(2)})</div>
            </div>
            <div class="detail-description">${
              leader.notes || "No additional information available."
            }</div>
          </div>
          <div class="platform-detail-footer">
            <span>${getQuadrantFromPosition(
              leader.position.x,
              leader.position.y
            )}</span>
          </div>
        </div>
      </div>
    `;

    // Show the panel
    detailsPanel.style.display = "block";
  }

  // Update the loadLeadershipData function to match your CSV structure
  async function loadLeadershipData() {
    try {
      console.log("Fetching leaders.csv...");
      const response = await fetch("leaders.csv");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvData = await response.text();
      console.log("Leadership CSV data received, length:", csvData.length);

      // Parse CSV
      const lines = csvData.split("\n");
      if (lines.length < 2) {
        console.error("Leaders CSV file has insufficient data");
        return [];
      }

      console.log("Raw CSV lines:", lines);

      // Parse header line to find columns
      const header = parseCSVLine(lines[0]);
      console.log("CSV header:", header);

      // Get column indexes - case insensitive matching
      const platformIndex = findColumnIndex(header, "platform");
      const leaderIndex = findColumnIndex(header, "leader");
      const xPosIndex = findColumnIndex(header, "political_position_x");
      const yPosIndex = findColumnIndex(header, "political_position_y");
      const notesIndex = findColumnIndex(header, "notes");

      console.log("Column indexes found:", {
        platformIndex,
        leaderIndex,
        xPosIndex,
        yPosIndex,
        notesIndex,
      });

      if (
        platformIndex === -1 ||
        leaderIndex === -1 ||
        xPosIndex === -1 ||
        yPosIndex === -1
      ) {
        console.error("Required columns missing in leaders.csv");
        return [];
      }

      // Parse each leader line
      const leadersData = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        // Parse CSV line
        const fields = parseCSVLine(line);
        console.log(`Line ${i} fields:`, fields);

        if (
          fields.length <=
          Math.max(platformIndex, leaderIndex, xPosIndex, yPosIndex)
        ) {
          console.warn(
            `Line ${i} has insufficient fields, length: ${fields.length}`
          );
          continue;
        }

        // Extract position coordinates
        const x = parseFloat(fields[xPosIndex]);
        const y = parseFloat(fields[yPosIndex]);

        if (isNaN(x) || isNaN(y)) {
          console.warn(
            `Invalid position coordinates at line ${i}: (${fields[xPosIndex]}, ${fields[yPosIndex]})`
          );
          continue;
        }

        // Create leader object with correct field mapping
        const leader = {
          name: fields[leaderIndex],
          platform: fields[platformIndex], // Use Platform field from CSV
          notes: notesIndex !== -1 ? fields[notesIndex] : "",
          position: { x, y },
        };

        leadersData.push(leader);
        console.log(
          `Added leader: ${leader.name} (${leader.platform}) at position (${x}, ${y})`
        );
      }

      console.log("Parsed", leadersData.length, "leaders from CSV");
      return leadersData;
    } catch (error) {
      console.error("Error loading leadership data:", error);
      return [];
    }
  }

  // Helper function to find column index case-insensitively
  function findColumnIndex(header, columnName) {
    const lowercaseColumnName = columnName.toLowerCase();
    return header.findIndex(
      (col) => col.trim().toLowerCase() === lowercaseColumnName
    );
  }

  // Helper function to parse CSV line handling quoted fields
  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  }
});
