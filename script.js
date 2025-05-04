document.addEventListener("DOMContentLoaded", async function () {
  // Load the overall platforms data first
  window.overallPlatformsData = await loadOverallPlatformsData();
  console.log("Overall platforms data loaded:", overallPlatformsData);

  // Add policyData loading at the beginning of your script
  window.policyData = await loadPolicyMappingData();
  console.log("Policy mapping data loaded:", policyData);

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

  // Update setActiveView function to properly handle Policy view checkbox filters
  function setActiveView(view) {
    // Update current view
    currentView = view;

    // Update button states
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.getElementById(`view-${view}`).classList.add("active");

    // Clear the details panel when switching views
    const detailsPanel = document.getElementById("details-panel");
    if (detailsPanel) {
      // Hide or reset the details panel
      detailsPanel.style.display = "none";
      detailsPanel.innerHTML = "";
    }

    // Control visibility of year badge based on view
    const yearBadgeContainer = document.querySelector(".year-badge-container");
    if (yearBadgeContainer) {
      // Show year badge only for platforms view, hide for policies and leadership
      yearBadgeContainer.style.display = view === "platforms" ? "flex" : "none";
    }

    // Update visualization based on view
    switch (view) {
      case "platforms":
        // Show platform view with Ban Activity timeline
        document.querySelector(".sidebar h2").textContent = "Platforms";

        // Reset platform checkboxes to use the platform view handlers
        updatePlatformCheckboxHandlers("platforms");

        // Enable timeline controls
        const yearSlider = document.getElementById("year-slider");
        const playButton = document.getElementById("play-timeline");

        if (yearSlider) {
          yearSlider.disabled = false;
          yearSlider.style.opacity = "1";
        }

        if (playButton) {
          playButton.disabled = false;
          playButton.classList.remove("disabled");
          playButton.style.pointerEvents = "auto";
          playButton.style.opacity = "1";
        }

        // Update the disclaimer text
        const disclaimer = document.querySelector(".matrix-disclaimer");
        if (disclaimer) {
          disclaimer.textContent =
            "Platform positions based on moderation policy over time";
        }

        // Update matrix with timeline data
        updateMatrix();
        updateTimelineEvents();
        updatePlatformCards();
        break;

      case "policies":
        // Show policies view
        document.querySelector(".sidebar h2").textContent =
          "Policies & Features";

        // Update platform checkboxes with policy-specific handlers
        updatePlatformCheckboxHandlers("policies");

        // Disable timeline controls for policies view (static view)
        const policyYearSlider = document.getElementById("year-slider");
        const policyPlayButton = document.getElementById("play-timeline");

        if (policyYearSlider) {
          policyYearSlider.disabled = true;
          policyYearSlider.style.opacity = "0.5";
        }

        if (policyPlayButton) {
          policyPlayButton.disabled = true;
          policyPlayButton.classList.add("disabled");
          policyPlayButton.style.pointerEvents = "none";
          policyPlayButton.style.opacity = "0.5";
        }

        // Update the disclaimer text
        const policyDisclaimer = document.querySelector(".matrix-disclaimer");
        if (policyDisclaimer) {
          policyDisclaimer.textContent =
            "Policy features filtered by selected platforms";
        }

        // Clear timeline events for policy view
        const policyEventsContainer =
          document.getElementById("events-container");
        if (policyEventsContainer) {
          policyEventsContainer.innerHTML =
            '<div class="event-empty">Use platform filters to see relevant policies</div>';
        }

        // Clear platform cards for policy view
        const policyCardsContainer = document.getElementById("platform-cards");
        if (policyCardsContainer) {
          policyCardsContainer.innerHTML = "";
        }

        // Show policies in the matrix
        showPolicyView();
        break;

      case "leadership":
        // Show leadership view (keep this as is)
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

        if (leaderYearSlider) {
          leaderYearSlider.disabled = true;
          leaderYearSlider.style.opacity = "0.5";
        }

        if (leaderPlayButton) {
          leaderPlayButton.disabled = true;
          leaderPlayButton.classList.add("disabled");
          leaderPlayButton.style.pointerEvents = "none";
          leaderPlayButton.style.opacity = "0.5";
        }

        // Explicitly hide the year badge container for leadership view
        const yearBadgeContainer = document.querySelector(
          ".year-badge-container"
        );
        if (yearBadgeContainer) {
          yearBadgeContainer.style.display = "none";
        }

        // Also hide the current year span
        const currentYearSpan = document.getElementById("current-year");
        if (currentYearSpan) {
          currentYearSpan.parentElement.style.display = "none";
        }

        // Clear timeline events for leadership view
        const leaderEventsContainer =
          document.getElementById("events-container");
        if (leaderEventsContainer) {
          leaderEventsContainer.innerHTML =
            '<div class="event-empty">Events not applicable in Leadership view</div>';
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

  // Fix the updatePlatformCheckboxHandlers function for policy view
  function updatePlatformCheckboxHandlers(viewType) {
    console.log(`Updating checkbox handlers for view: ${viewType}`);

    // First remove all event listeners by replacing all checkboxes
    platformData.forEach((platform) => {
      const checkbox = document.getElementById(`platform-${platform.id}`);
      if (!checkbox) return;

      // Clone to remove existing listeners
      const newCheckbox = checkbox.cloneNode(true);
      checkbox.parentNode.replaceChild(newCheckbox, checkbox);

      // Add appropriate handler based on view type
      if (viewType === "policies") {
        // Policy view - filter policies by platform
        newCheckbox.addEventListener("change", function () {
          // Important: Get the current state of the checkbox
          const isChecked = this.checked;

          if (isChecked) {
            // Add platform to selected platforms if not already there
            if (!selectedPlatforms.includes(platform.id)) {
              selectedPlatforms.push(platform.id);
            }
          } else {
            // Remove platform from selected platforms
            selectedPlatforms = selectedPlatforms.filter(
              (id) => id !== platform.id
            );
          }

          console.log(
            `Policy checkbox changed for ${platform.id}, checked: ${isChecked}, selected platforms:`,
            selectedPlatforms
          );

          // Update policy view to show only relevant policies
          showPolicyView();
        });
      } else {
        // Platforms view - standard handler (unchanged)
        newCheckbox.addEventListener("change", function () {
          if (this.checked) {
            if (!selectedPlatforms.includes(platform.id)) {
              selectedPlatforms.push(platform.id);
            }
          } else {
            selectedPlatforms = selectedPlatforms.filter(
              (id) => id !== platform.id
            );
          }
          // Update platforms visualization
          updateMatrix();
          updateTimelineEvents();
          updatePlatformCards();
        });
      }
    });

    // Also update the Select All and Clear All buttons
    updateBulkSelectionHandlers(viewType);
  }

  // Update the bulk selection handlers as well
  function updateBulkSelectionHandlers(viewType) {
    const selectAllButton = document.getElementById("select-all");
    const clearAllButton = document.getElementById("clear-all");

    if (selectAllButton) {
      // Remove existing listeners
      const newSelectAllButton = selectAllButton.cloneNode(true);
      selectAllButton.parentNode.replaceChild(
        newSelectAllButton,
        selectAllButton
      );

      // Add new listener based on view
      newSelectAllButton.addEventListener("click", function () {
        selectedPlatforms = platformData.map((platform) => platform.id);
        updatePlatformCheckboxes();

        if (viewType === "policies") {
          showPolicyView();
        } else {
          updateMatrix();
          updateTimelineEvents();
          updatePlatformCards();
        }
      });
    }

    if (clearAllButton) {
      // Remove existing listeners
      const newClearAllButton = clearAllButton.cloneNode(true);
      clearAllButton.parentNode.replaceChild(newClearAllButton, clearAllButton);

      // Add new listener based on view
      newClearAllButton.addEventListener("click", function () {
        selectedPlatforms = [];
        updatePlatformCheckboxes();

        if (viewType === "policies") {
          // In policy view, when clearing all selections, explicitly show no policies
          const matrix = document.getElementById("matrix");
          if (matrix) {
            matrix.innerHTML =
              '<div class="empty-state-message" style="text-align:center;padding:20px;color:#777;">Select platforms to see their policies</div>';
          }

          console.log("Cleared all platform selections in policy view");
        } else {
          updateMatrix();
          updateTimelineEvents();
          updatePlatformCards();
        }
      });
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
    // If at max year, reset to min year
    if (currentYear >= maxYear) {
      currentYear = minYear;
      yearSlider.value = currentYear;
      currentYearDisplay.textContent = currentYear;
      updateMatrix();
      updateTimelineEvents();
      updatePlatformCards();
    }

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

  // Fix matrix positioning to properly center (0,0) point
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
      // FIXED: Adjust Y-coordinate calculation to properly center (0,0)
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

  // Update the icon container in updatePlatformCards to remove circular backgrounds
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

      // Create icon container - REMOVE circle styling
      const iconContainer = document.createElement("span");
      iconContainer.style.display = "inline-flex";
      iconContainer.style.alignItems = "center";
      iconContainer.style.justifyContent = "center";
      iconContainer.style.width = "75px";
      iconContainer.style.height = "75px";
      // Remove background color and border radius (circular styling)

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
        img.style.width = "75px";
        img.style.height = "75px";
        img.style.objectFit = "contain"; // Show full image without cropping
        // No color filter needed when we're not using a background
        iconContainer.appendChild(img);
      } else {
        // It's a Font Awesome icon
        const icon = document.createElement("i");
        icon.className = platform.icon;
        icon.style.color = platform.color; // Use platform color directly
        icon.style.fontSize = "48px"; // Make icon larger
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
            <div class="event-title">Key Event</div>
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

  // Updated createLeaderDot function to use plain PNG images without backgrounds
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

    container.style.left = `${xPos}%`;
    container.style.top = `${yPos}%`;
    container.style.transform = "translate(-50%, -50%)"; // Center the container

    // Generate different case versions of the filename
    const originalCaseName = leader.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("_");

    const lowerCaseName = leader.name.toLowerCase().replace(/\s+/g, "_");

    // Handle Mark Zuckerberg special cases
    let imageName = originalCaseName;
    if (leader.name === "Mark Zuckerberg 2.0") {
      imageName = "Mark_Zuckerberg";
    }

    // Get the repository name for GitHub Pages
    const repoPath = window.location.pathname.split("/")[1];
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Use the correct image path based on hosting environment
    let imagePath;
    if (isGitHubPages && repoPath) {
      imagePath = `/${repoPath}/tech_leaders_images/${imageName}.png`;
    } else {
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
      const fallbackPaths = [
        `./tech_leaders_images/${imageName}.png`,
        `/tech_leaders_images/${imageName}.png`,
        `tech_leaders_images/${imageName}.png`,
        `/test_tmd_timeline/tech_leaders_images/${imageName}.png`,
        `./tech_leaders_images/${lowerCaseName}.png`,
        `/tech_leaders_images/${lowerCaseName}.png`,
        `tech_leaders_images/${lowerCaseName}.png`,
        `/test_tmd_timeline/tech_leaders_images/${lowerCaseName}.png`,
      ];
      tryNextPath(img, fallbackPaths, 0, leader, container);
    };

    // Style the image - REMOVE ALL circular styling
    img.style.width = "55px";
    img.style.height = "55px";
    img.style.objectFit = "contain"; // Show full image without cropping
    img.style.display = "block";
    img.style.transition = "transform 0.3s ease";

    // Add visual distinction for Zuckerberg versions with proper color tinting
    let baseFilter = "drop-shadow(0 4px 8px rgba(0,0,0,0.5))";

    if (leader.name === "Mark Zuckerberg") {
      // Original Zuckerberg - BLUE TINT
      baseFilter += " sepia(40%) hue-rotate(190deg) saturate(1.5)";
    } else if (leader.name === "Mark Zuckerberg 2.0") {
      // Zuckerberg 2.0 - RED TINT
      baseFilter += " sepia(30%) hue-rotate(320deg) saturate(1.7)";
    }

    img.style.filter = baseFilter;

    // Add hover effects with JavaScript - preserve the tint during hover
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15)";
      // Keep the same filter, just enhance the shadow
      this.style.filter = baseFilter.replace(
        "drop-shadow(0 4px 8px",
        "drop-shadow(0 8px 16px"
      );
      this.style.zIndex = "60";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      // Restore original filter
      this.style.filter = baseFilter;
      this.style.zIndex = "50";
    });

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

  // Helper function to create fallback initial without circle background
  function createFallbackInitial(leader, container, imgToReplace) {
    // Remove the failed image
    if (imgToReplace && imgToReplace.parentNode === container) {
      imgToReplace.remove();
    }

    // Create a text fallback
    const fallback = document.createElement("div");
    fallback.style.width = "75px";
    fallback.style.height = "75px";
    fallback.style.display = "flex";
    fallback.style.alignItems = "center";
    fallback.style.justifyContent = "center";
    fallback.style.filter = "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))";
    fallback.style.transition = "transform 0.3s ease";

    // Add hover effects to fallback
    fallback.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15)";
      this.style.filter = "drop-shadow(3px 3px 6px rgba(0,0,0,0.7))";
      this.style.zIndex = "60";
    });

    fallback.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.filter = "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))";
      this.style.zIndex = "50";
    });

    // Add leader initial with styling but no circle background
    const initial = document.createElement("span");
    initial.textContent = leader.name.charAt(0).toUpperCase();
    initial.style.color = "#000";
    initial.style.fontWeight = "bold";
    initial.style.fontSize = "45px";
    initial.style.textShadow = "0 2px 4px rgba(0,0,0,0.5)";
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

  // Fix showLeaderDetails function to properly display leader images
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
    // 1. Original case preserving uppercase first letters
    const originalCaseName = leader.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("_");

    // 2. All lowercase
    const lowerCaseName = leader.name.toLowerCase().replace(/\s+/g, "_");

    // Decide which name format to use
    let imageName = originalCaseName;
    let versionLabel = "";
    let imageFilter = "";

    // Special handling for Mark Zuckerberg 2.0 naming
    if (leader.name === "Mark Zuckerberg 2.0") {
      imageName = "Mark_Zuckerberg"; // Use the same base image
      versionLabel = `<span style="display:inline-block;font-size:14px;padding:2px 6px;border-radius:4px;margin-left:8px;background-color:#FFF0E6;color:#FF5700;">2025-Present</span>`;
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

    // FIX: Get the repository name for GitHub Pages
    const repoPath = window.location.pathname.split("/")[1];
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Use the correct image path based on hosting environment
    let imagePath;
    if (isGitHubPages && repoPath) {
      // GitHub Pages path with repository name
      imagePath = `/${repoPath}/tech_leaders_images/${imageName}.png`;
    } else {
      // Local development path
      imagePath = `./tech_leaders_images/${imageName}.png`;
    }

    // Create content for the details panel with reduced image size
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <h3>${leader.name} ${versionLabel}</h3>
            <div class="platform-detail-icon" style="display: flex; justify-content: center; margin: 15px 0;">
              <img src="${imagePath}" 
                   alt="${leader.name}" 
                   onerror="this.onerror=null; this.src='./tech_leaders_images/${imageName}.png'; this.onerror=function(){this.onerror=null; this.src='./tech_leaders_images/${lowerCaseName}.png'; this.onerror=function(){this.onerror=null; this.src='tech_leaders_images/${imageName}.png'; this.onerror=function(){this.onerror=null; this.src='tech_leaders_images/${lowerCaseName}.png'; this.onerror=function(){this.style.display='none';}}}}"
                   style="width:80px; height:80px; object-fit:cover; border-radius:50%; border:3px solid #333; box-shadow: 0 4px 8px rgba(0,0,0,0.4); ${
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

  // Add a function to load policy mapping data with platform associations
  async function loadPolicyMappingData() {
    try {
      const response = await fetch("Policy_Mapping.csv");
      const csvData = await response.text();

      // Parse CSV data
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");

      const policyMappings = [];

      // Start from row 1 to skip headers
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue; // Skip empty rows

        // Handle quoted cells containing commas
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

        if (row.length >= 4) {
          // Convert position values to numbers and check for valid float values
          const x = parseFloat(row[1]);
          const y = parseFloat(row[2]);

          // Log any issues with position parsing
          if (isNaN(x) || isNaN(y)) {
            console.warn(
              `Invalid position values for policy '${row[0]}': x=${row[1]}, y=${row[2]}`
            );
          }

          // Parse the platforms list from the CSV
          let platformsList = [];
          if (row[3]) {
            // Remove quotes and split by commas
            const platformsStr = row[3].replace(/"/g, "");
            platformsList = platformsStr.split(",").map((p) => p.trim());
          }

          const policy = {
            name: row[0].trim(),
            x: x,
            y: y,
            platforms: platformsList,
            quadrant: getQuadrant(x, y),
          };

          policyMappings.push(policy);
        }
      }

      // Log a summary of policies with invalid positions
      const invalidPolicies = policyMappings.filter(
        (p) =>
          isNaN(p.x) || isNaN(p.y) || p.x === undefined || p.y === undefined
      );

      if (invalidPolicies.length > 0) {
        console.warn(
          `Found ${invalidPolicies.length} policies with invalid positions:`,
          invalidPolicies.map((p) => p.name)
        );
      }

      return policyMappings;
    } catch (error) {
      console.error("Error loading policy mapping data:", error);
      return [];
    }
  }

  // Update the showPolicyView function to correctly handle empty selections
  function showPolicyView() {
    if (!window.policyData || policyData.length === 0) {
      console.error("No policy data available");
      return;
    }

    const matrix = document.getElementById("matrix");
    if (!matrix) {
      console.error("Matrix element not found");
      return;
    }

    // Clear existing dots
    matrix.innerHTML = "";

    // Debug log to see what we're working with
    console.log("Selected platform IDs:", selectedPlatforms);
    console.log("First few policy entries:", policyData.slice(0, 3));

    // Create a more comprehensive mapping between platform names and IDs
    const platformNameMap = {};

    // First, build the standard mapping from platform data
    platformData.forEach((platform) => {
      // Add the main platform name (lowercase for case-insensitive matching)
      platformNameMap[platform.name.toLowerCase()] = platform.id;

      // Special case for Twitter/X
      if (platform.id === "twitter") {
        platformNameMap["x"] = "twitter";
        platformNameMap["x (twitter)"] = "twitter";
      }

      // Add the platform ID itself as a key
      platformNameMap[platform.id.toLowerCase()] = platform.id;
    });

    console.log("Platform name mapping:", platformNameMap);

    // If no platforms are selected, show empty state instead of all policies
    if (selectedPlatforms.length === 0) {
      matrix.innerHTML =
        '<div class="empty-state-message" style="text-align:center;padding:20px;color:#777;">Select platforms to see their policies</div>';
      return;
    }

    // Filter policies based on selected platforms
    const filteredPolicies = policyData.filter((policy) => {
      // If policy has no platforms defined, don't show it when filtering
      if (!policy.platforms || policy.platforms.length === 0) return false;

      // Check if any of the policy's platforms match our selected platforms
      return policy.platforms.some((platformName) => {
        // Normalize the platform name
        const normalizedName = platformName.toLowerCase().trim();

        // Try finding the matching platform ID
        const platformId = platformNameMap[normalizedName];

        if (platformId && selectedPlatforms.includes(platformId)) {
          console.log(
            `Policy platform '${platformName}' matched to platform ID '${platformId}'`
          );
          return true;
        }

        // If we couldn't find a matching ID through the mapping,
        // check if the raw platform name is in our selected IDs (fallback)
        if (selectedPlatforms.includes(normalizedName)) {
          console.log(
            `Policy platform '${platformName}' directly matched as ID`
          );
          return true;
        }

        return false;
      });
    });

    console.log(
      `Showing ${filteredPolicies.length} of ${policyData.length} policies based on selected platforms:`,
      filteredPolicies.map((p) => p.name)
    );

    // Create policy dots for filtered policies
    filteredPolicies.forEach((policy) => {
      const dot = createPolicyDot(policy);
      if (dot) {
        matrix.appendChild(dot);
      }
    });
  }

  // Function to create a policy dot with rectangular bubble for the label
  function createPolicyDot(policy) {
    // More robust check for valid position data
    if (
      (!policy.x && policy.x !== 0) ||
      (!policy.y && policy.y !== 0) ||
      isNaN(policy.x) ||
      isNaN(policy.y)
    ) {
      console.warn(
        `Invalid position for ${policy.name}: x=${policy.x}, y=${policy.y}`
      );
      return null;
    }

    // Create container for the policy
    const container = document.createElement("div");
    container.className = "policy-container";
    container.id = `policy-container-${policy.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    // Position the container
    container.style.position = "absolute";

    // Convert policy position from -1,1 to percentage coordinates
    const x = Math.max(-1, Math.min(1, policy.x));
    const y = Math.max(-1, Math.min(1, policy.y));
    const xPos = ((x + 1) / 2) * 100;
    const yPos = 100 - ((y + 1) / 2) * 100;

    container.style.left = `${xPos}%`;
    container.style.top = `${yPos}%`;
    container.style.transform = "translate(-50%, -50%)";
    container.style.zIndex = "10";

    // Get quadrant color
    let bubbleColor;
    switch (policy.quadrant) {
      case "Authoritarian Left":
        bubbleColor = "#6366F1"; // Indigo
        break;
      case "Authoritarian Right":
        bubbleColor = "#F43F5E"; // Rose
        break;
      case "Libertarian Left":
        bubbleColor = "#10B981"; // Emerald
        break;
      case "Libertarian Right":
        bubbleColor = "#F59E0B"; // Amber
        break;
      default:
        bubbleColor = "#6B7280"; // Gray
    }

    // Create the rectangular bubble with the label inside
    const bubble = document.createElement("div");
    bubble.className = "policy-bubble";

    // Style the bubble
    bubble.style.backgroundColor = bubbleColor;
    bubble.style.color = "white";
    bubble.style.padding = "4px 8px";
    bubble.style.borderRadius = "6px";
    bubble.style.fontSize = "12px";
    bubble.style.fontWeight = "500";
    bubble.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    bubble.style.whiteSpace = "nowrap";
    bubble.style.maxWidth = "150px";
    bubble.style.overflow = "hidden";
    bubble.style.textOverflow = "ellipsis";
    bubble.style.textAlign = "center";
    bubble.style.cursor = "pointer";
    bubble.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
    bubble.style.textShadow = "0 1px 2px rgba(0, 0, 0, 0.4)";
    bubble.style.border = "1px solid rgba(255, 255, 255, 0.3)";

    // Set the label text
    bubble.textContent = policy.name;

    // Add hover effects
    bubble.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
      this.style.zIndex = "100";
    });

    bubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
      this.style.zIndex = "10";
    });

    // Add click event to show details
    bubble.addEventListener("click", function () {
      showPolicyDetails(policy);
    });

    // Add tooltip for longer names that might be truncated
    bubble.title = policy.name;

    // Add to container
    container.appendChild(bubble);

    return container;
  }

  // Add a function to show policy details
  function showPolicyDetails(policy) {
    console.log("Policy details:", policy.name);

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

    // Get quadrant background color
    let quadrantColor;
    switch (policy.quadrant) {
      case "Authoritarian Left":
        quadrantColor = "#6366F1";
        break;
      case "Authoritarian Right":
        quadrantColor = "#F43F5E";
        break;
      case "Libertarian Left":
        quadrantColor = "#10B981";
        break;
      case "Libertarian Right":
        quadrantColor = "#F59E0B";
        break;
      default:
        quadrantColor = "#6B7280";
    }

    // Format the associated platforms as badges
    let platformBadges =
      '<div class="no-platforms">No platforms associated</div>';

    if (policy.platforms && policy.platforms.length > 0) {
      const badges = policy.platforms
        .map((platformName) => {
          // Find matching platform for color
          const platformMatch = platformData.find(
            (p) =>
              p.name.toLowerCase() === platformName.toLowerCase() ||
              (platformName.toLowerCase() === "x (twitter)" &&
                p.id === "twitter")
          );

          const color = platformMatch ? platformMatch.color : "#6B7280";

          return `<span class="platform-badge" style="background-color: ${color}">${platformName}</span>`;
        })
        .join("");

      platformBadges = `<div class="platform-badges">${badges}</div>`;
    }

    // Create and populate the details content with fixed icon size
    detailsPanel.innerHTML = `
      <div class="card">
        <h2>Policy Details</h2>
        <div class="platform-detail">
          <div class="platform-detail-header">
            <div style="flex: 1;">
              <h3>${policy.name}</h3>
            </div>
            <div class="platform-detail-icon" style="flex: 0 0 30px; width: 30px; height: 30px; min-width: 30px; border-radius: 50%; background-color: ${quadrantColor}; margin-left: 10px;"></div>
          </div>
          <div class="platform-detail-content">
            <div class="position-info">
              <div class="position-label">Position:</div>
              <div class="position-values">
                (${policy.x.toFixed(2)}, ${policy.y.toFixed(2)})
              </div>
            </div>
            <div class="position-info">
              <div class="position-label">Quadrant:</div>
              <div class="position-values">
                ${policy.quadrant}
              </div>
            </div>
            <div class="position-info">
              <div class="position-label">Platforms:</div>
              <div class="position-values platforms-list">
                ${platformBadges}
              </div>
            </div>
            <div class="detail-description">
              <p>This policy feature is positioned in the ${
                policy.quadrant
              } quadrant of the political compass.</p>
              
              <p>Features in this quadrant tend to ${getQuadrantDescription(
                policy.quadrant
              )}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    detailsPanel.style.display = "block";
  }

  // Helper function to get quadrant descriptions
  function getQuadrantDescription(quadrant) {
    switch (quadrant) {
      case "Authoritarian Left":
        return "support strong centralized control with progressive policy goals. These features typically prioritize harm reduction and collective wellbeing over individual expression.";
      case "Authoritarian Right":
        return "combine centralized control with conservative or corporate interests. These features typically prioritize control, monetization, and traditional values.";
      case "Libertarian Left":
        return "emphasize user autonomy while supporting progressive community values. These features typically promote decentralization, privacy, and user empowerment with social responsibility.";
      case "Libertarian Right":
        return "maximize individual freedom with minimal platform intervention. These features typically prioritize free expression, privacy, and user choice above platform-led governance.";
      default:
        return "have varied political implications depending on implementation.";
    }
  }

  // New function to update the checkbox handlers for policy view
  function updateCheckboxesForPolicyView() {
    if (currentView !== "policies") return;

    platformData.forEach((platform) => {
      const checkbox = document.getElementById(`platform-${platform.id}`);
      if (checkbox) {
        // Replace the existing event listener with one that calls showPolicyView
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);

        newCheckbox.addEventListener("change", function () {
          if (this.checked) {
            selectedPlatforms.push(platform.id);
          } else {
            selectedPlatforms = selectedPlatforms.filter(
              (id) => id !== platform.id
            );
          }
          // Update policy view instead of matrix
          showPolicyView();
        });
      }
    });
  }

  // Add some CSS styles for the platform badges in policy details
  const style = document.createElement("style");
  style.textContent = `
    .platforms-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 5px;
    }
    
    .platform-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
      color: white;
      font-weight: 500;
    }
    
    .no-platforms {
      font-style: italic;
      color:rgb(255, 255, 255);
    }
  `;
  document.head.appendChild(style);
});
