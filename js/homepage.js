/* homepage.js
   Reads stored customization, controls worldmap interactions, and tracks visited regions.
   Uses localStorage keys:
    - vision (electro|pyro|cryo|anemo|geo|hydro)
    - weapon (sword|staff|catalyst)
    - pose (idle|combat|heroic)
    - visitedRegions (JSON array)
*/

(function () {
  // Safe storage helpers
  const Storage = {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) {
        // If non-JSON string, handle simple string fallback
        try {
          const raw = localStorage.getItem(key);
          return raw === null ? fallback : raw;
        } catch (_) { return fallback; }
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        localStorage.setItem(key, value);
      }
    }
  };

  // Default player profile if not set by customization
  const defaults = {
    name: "The Wanderer",
    vision: "electro",
    weapon: "sword",
    pose: "idle",
    level: 1
  };

  // Initialize page
  document.addEventListener("DOMContentLoaded", () => {
    const vision = (Storage.get("vision") || defaults.vision).toString();
    const weapon = (Storage.get("weapon") || defaults.weapon).toString();
    const pose = (Storage.get("pose") || defaults.pose).toString();
    const playerName = Storage.get("playerName") || defaults.name;
    const level = Storage.get("playerLevel") || defaults.level;

    // Render profile
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("player-level").textContent = "Level " + level;

    // Apply vision theme (badge + aura + page tone)
    applyVisionTheme(vision);

    // Render character preview overlays
    const charWeapon = document.getElementById("char-weapon");
    charWeapon.textContent = weaponSymbol(weapon);

    const charAura = document.getElementById("char-aura");
    charAura.style.background = auraGradient(vision);

    // Setup worldmap interactions
    setupIslands();

    // Setup CTA buttons
    document.getElementById("btn-open-custom").addEventListener("click", () => {
      // open customization page
      window.location.href = "Forge-of-Avatars.html" || "character-custom.html";
    });

    document.getElementById("btn-enter-aether").addEventListener("click", () => {
      // check unlock: all islands visited?
      const visited = Storage.get("visitedRegions", []);
      const allIds = [...document.querySelectorAll(".island")].map(el=>el.dataset.id).filter(Boolean);
      const allVisited = allIds.filter(id=>id !== "aethergate").every(id => visited.includes(id));
      if (!allVisited) {
        // brief shake effect to indicate locked
        const btn = document.getElementById("btn-enter-aether");
        btn.classList.add("shake");
        setTimeout(()=>btn.classList.remove("shake"), 650);
        alert("The Aether Gate is sealed. Visit all realms to awaken it.");
        return;
      }
      // unlock transition
      window.location.href = document.getElementById("aether-gate").dataset.target || "Celestial-Relay.html";
    });
  });

  // Helper: mapping weapon to emoji (keeps lightweight)
  function weaponSymbol(weaponId) {
    switch (weaponId) {
      case "staff": return "🔱";
      case "catalyst": return "📿";
      default: return "⚔️";
    }
  }

  // Helper: aura gradient by vision
  function auraGradient(vision) {
    switch (vision) {
      case "pyro": return "radial-gradient(60% 60% at 50% 50%, rgba(255,148,68,0.18), transparent 40%)";
      case "electro": return "radial-gradient(60% 60% at 50% 50%, rgba(182,139,255,0.16), transparent 40%)";
      case "cryo": return "radial-gradient(60% 60% at 50% 50%, rgba(159,224,255,0.14), transparent 40%)";
      case "hydro": return "radial-gradient(60% 60% at 50% 50%, rgba(111,198,255,0.12), transparent 40%)";
      case "anemo": return "radial-gradient(60% 60% at 50% 50%, rgba(186,241,216,0.14), transparent 40%)";
      case "geo": return "radial-gradient(60% 60% at 50% 50%, rgba(255,216,138,0.12), transparent 40%)";
      default: return "transparent";
    }
  }

  // Update the vision badge + document theme color
  function applyVisionTheme(vision) {
    const badge = document.getElementById("vision-badge");
    const body = document.body;
    badge.className = "vision-badge";
    switch (vision) {
      case "pyro":
        badge.style.background = "radial-gradient(#ffb27a,#ff6d4a)";
        body.style.setProperty("--accent", "#ff8a5b");
        break;
      case "electro":
        badge.style.background = "radial-gradient(#c8b7ff,#8d79ff)";
        body.style.setProperty("--accent", "#b68bff");
        break;
      case "cryo":
        badge.style.background = "radial-gradient(#dff5ff,#9fe0ff)";
        body.style.setProperty("--accent", "#9fe0ff");
        break;
      case "hydro":
        badge.style.background = "radial-gradient(#a6e6ff,#6fc6ff)";
        body.style.setProperty("--accent", "#6fc6ff");
        break;
      case "anemo":
        badge.style.background = "radial-gradient(#bdf2dc,#79e7c2)";
        body.style.setProperty("--accent", "#9feadc");
        break;
      case "geo":
        badge.style.background = "radial-gradient(#ffe6a8,#ffd88a)";
        body.style.setProperty("--accent", "#ffd88a");
        break;
      default:
        badge.style.background = "linear-gradient(90deg,#8ad3ff,#ffd88a)";
        body.style.setProperty("--accent", "#8ad3ff");
    }
  }

  // Setup islands: hover, click, visited tracking
  function setupIslands() {
    const islands = Array.from(document.querySelectorAll(".island"));
    const panel = document.getElementById("island-panel");
    const panelTitle = document.getElementById("panel-title");
    const panelDesc = document.getElementById("panel-desc");
    const visitBtn = document.getElementById("visit-btn");
    const exploreBtn = document.getElementById("explore-btn");
    const closeBtn = document.getElementById("panel-close");

    // Ensure visitedRegions array
    const visitedKey = "visitedRegions";
    if (!Array.isArray(Storage.get(visitedKey))) Storage.set(visitedKey, []);

    // Provide short lore for each island id -> description
    const lore = {
      astravelle: "Aetherforge Sanctum — where projects are forged into living systems. Explore projects and quests.",
      nyxoria: "Nyxoria Vale — a hidden vale of code trials and experiments. Find secret demos and mini-games.",
      eldrun: "Eldrun Highlands — mastery of algorithms and systems. View skills and deep-dive writeups.",
      solmira: "Solmira Isles — polished full-stack showcases & interactive apps.",
      khyrden: "Khyrden Abyss — battle-tested challenges, tricky debugging tales, and logs.",
      valorion: "Valorion Citadel — leadership, team projects, and achievements."
    };

    islands.forEach(island => {
      // set visited attribute based on storage
      const id = island.dataset.id;
      const visited = (Storage.get(visitedKey, []) || []).includes(id);
      island.setAttribute("data-visited", visited ? "true" : "false");

      // hover: tiny particle pulse (CSS handled) and preview tint
      island.addEventListener("mouseenter", () => {
        island.style.transform = "translateY(-14px) scale(1.04)";
        const el = island.dataset.element;
        island.style.boxShadow = `0 18px 60px ${elementColorShadow(el)}`;
      });

      island.addEventListener("mouseleave", () => {
        island.style.transform = "";
        island.style.boxShadow = "";
      });

      island.addEventListener("click", () => {
        // open panel with details
        const title = island.querySelector(".island-name").textContent || "Realm";
        panelTitle.textContent = title;
        panelDesc.textContent = lore[island.dataset.id] || "A mysterious domain of hidden wonders.";
        panel.setAttribute("aria-hidden", "false");

        // set visit action
        visitBtn.onclick = () => {
          // mark visited and navigate
          markVisited(island.dataset.id);
          window.location.href = island.dataset.target || island.dataset.id + ".html";
        };

        exploreBtn.onclick = () => {
          // open lore / codex (if exists) else open target
          window.location.href = island.dataset.target || island.dataset.id + ".html";
        };
      });
    });

    closeBtn.addEventListener("click", () => {
      panel.setAttribute("aria-hidden", "true");
    });
  }

  // mark visited in storage; update visuals
  function markVisited(id) {
    if (!id) return;
    const visitedKey = "visitedRegions";
    const arr = Storage.get(visitedKey, []);
    if (!arr.includes(id)) {
      arr.push(id);
      Storage.set(visitedKey, arr);
    }
    // update island DOM attribute
    const el = document.querySelector(`.island[data-id="${id}"]`);
    if (el) el.setAttribute("data-visited", "true");

    // if all visited, trigger aether gate glow
    const all = Array.from(document.querySelectorAll(".island")).map(i=>i.dataset.id).filter(Boolean);
    const visitedNow = Storage.get(visitedKey, []);
    const allVisited = all.filter(id=>id!=="aethergate").every(iid => visitedNow.includes(iid));
    if (allVisited) {
      awakenAetherGate();
    }
  }

  function awakenAetherGate() {
    const gate = document.getElementById("aether-gate");
    if (!gate) return;
    gate.classList.add("awaken");
    // visual effects: pulse and tiny animation
    gate.animate([
      { transform: 'translateY(0) scale(1)', boxShadow: '0 6px 24px rgba(255,255,255,0.06)' },
      { transform: 'translateY(-8px) scale(1.06)', boxShadow: '0 20px 60px rgba(158,240,255,0.12)' },
      { transform: 'translateY(0) scale(1)', boxShadow: '0 6px 24px rgba(255,255,255,0.06)' }
    ], { duration: 1600, iterations: 2 });
  }

  // small helper to tint shadow color
  function elementColorShadow(element) {
    switch (element) {
      case "pyro": return "rgba(255,128,64,0.16)";
      case "electro": return "rgba(150,120,255,0.14)";
      case "cryo": return "rgba(140,220,255,0.12)";
      case "hydro": return "rgba(100,190,255,0.12)";
      case "anemo": return "rgba(130,240,200,0.10)";
      case "geo": return "rgba(255,210,120,0.10)";
      default: return "rgba(140,160,200,0.08)";
    }
  }

})();

// Realm card hover interaction
document.querySelectorAll(".realm-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        const realm = card.dataset.realm;
        console.log("Viewing Realm:", realm);
    });
});


// Character card interactions
document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", () => {
        const name = card.querySelector("h3").textContent;
        console.log("Character Selected:", name);
    });
});

// Combat card interactions
document.querySelectorAll(".combat-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        const title = card.querySelector("h3").textContent;
        console.log("Previewing Combat Feature:", title);
    });
});

// Story slider logic
const storyWrapper = document.querySelector(".story-wrapper");
document.getElementById("story-prev").addEventListener("click", () => {
    storyWrapper.scrollBy({ left: -350, behavior: "smooth" });
});
document.getElementById("story-next").addEventListener("click", () => {
    storyWrapper.scrollBy({ left: 350, behavior: "smooth" });
});

// Realm Navigation Logic
document.querySelectorAll(".realm-node").forEach(node => {
    node.addEventListener("click", () => {
        const page = node.getAttribute("data-link");
        console.log("Traveling to Realm:", page);
        window.location.href = page;
    });
});

// Auto animation for EXP fill (example)
setTimeout(() => {
    document.getElementById("exp-fill").style.width = "68%";
}, 300);

document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");

    layers.forEach(layer => {
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});
