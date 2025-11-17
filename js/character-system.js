// Character Customization System
class CharacterSystem {
constructor() {
this.selectedVision = null;
this.selectedWeapon = null;
this.selectedPose = 'idle';
    this.elements = {
        visionOrbs: document.querySelectorAll('.vision-orb'),
        weaponCards: document.querySelectorAll('.weapon-card'),
        poseBtns: document.querySelectorAll('.pose-btn'),
        confirmBtn: document.getElementById('confirm-btn'),
        characterSprite: document.getElementById('character-sprite'),
        weaponDisplay: document.getElementById('weapon-display'),
        weaponIcon: document.getElementById('weapon-icon'),
        visionGlow: document.getElementById('vision-glow'),
        visionBadge: document.getElementById('vision-badge'),
        visionIcon: document.getElementById('vision-icon'),
        aura: document.getElementById('aura'),
        selectedVisionText: document.getElementById('selected-vision'),
        selectedWeaponText: document.getElementById('selected-weapon'),
        selectedPoseText: document.getElementById('selected-pose')
    };
    
    this.init();
}

init() {
    // Show loading screen
    this.showLoadingScreen();
    
    // Create starfield
    this.createStarfield();
    
    // Load saved data if returning
    const saved = storage.loadCharacter();
    if (saved.vision) this.selectVision(saved.vision, false);
    if (saved.weapon) this.selectWeapon(saved.weapon, false);
    if (saved.pose) this.selectPose(saved.pose, false);
    
    // Vision selection
    this.elements.visionOrbs.forEach(orb => {
        orb.addEventListener('click', (e) => {
            const element = orb.dataset.element;
            this.selectVision(element);
            
            // Trigger attack animation
            visionAttacks.trigger(element, orb);
        });
    });
    
    // Weapon selection
    this.elements.weaponCards.forEach(card => {
        card.addEventListener('click', () => {
            const weapon = card.dataset.weapon;
            this.selectWeapon(weapon);
        });
    });
    
    // Pose selection
    this.elements.poseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pose = btn.dataset.pose;
            this.selectPose(pose);
        });
    });
    
    // Confirm button
    this.elements.confirmBtn.addEventListener('click', () => {
        this.confirmSelection();
    });
    
    this.updateConfirmButton();
}

showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 200);
}

selectVision(element, showAchievement = true) {
    // Remove previous selection
    this.elements.visionOrbs.forEach(orb => orb.classList.remove('selected'));
    
    // Select new
    const selectedOrb = document.querySelector(`.vision-orb[data-element="${element}"]`);
    if (selectedOrb) {
        selectedOrb.classList.add('selected');
    }
    
    this.selectedVision = element;
    
    // Update character preview
    this.updateCharacterPreview();
    this.updateConfirmButton();
    this.updateCharacterInfo();
    
    // Show achievement on first selection
    if (showAchievement && storage.addAchievement({
        id: 'vision_bearer',
        name: 'Vision Bearer',
        description: 'Selected your first Vision',
        tier: 'bronze'
    })) {
        this.showAchievement('Vision Bearer', 'Selected your first Vision');
        storage.addXP(100);
    }
}

selectWeapon(weapon, showAchievement = true) {
    // Remove previous selection
    this.elements.weaponCards.forEach(card => card.classList.remove('selected'));
    
    // Select new
    const selectedCard = document.querySelector(`.weapon-card[data-weapon="${weapon}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    this.selectedWeapon = weapon;
    
    // Update character preview
    this.updateCharacterPreview();
    this.updateConfirmButton();
    this.updateCharacterInfo();
    
    if (showAchievement && this.selectedVision && this.selectedWeapon) {
        if (storage.addAchievement({
            id: 'armed_traveler',
            name: 'Armed Traveler',
            description: 'Equipped weapon and vision',
            tier: 'bronze'
        })) {
            this.showAchievement('Armed Traveler', 'Ready for adventure!');
            storage.addXP(50);
        }
    }
}

selectPose(pose, update = true) {
    // Remove previous selection
    this.elements.poseBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Select new
    const selectedBtn = document.querySelector(`.pose-btn[data-pose="${pose}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
    
    this.selectedPose = pose;
    
    if (update) {
        this.updateCharacterPreview();
        this.updateCharacterInfo();
    }
}

updateCharacterPreview() {
    // Update vision glow background
    if (this.selectedVision) {
        this.elements.visionGlow.style.background = `var(--${this.selectedVision})`;
        this.elements.visionGlow.classList.add('active');
        
        // Update vision badge
        const visionIcons = {
            electro: '⚡',
            pyro: '🔥',
            cryo: '❄️',
            anemo: '🌪️',
            geo: '🪨',
            hydro: '💧'
        };
        this.elements.visionIcon.textContent = visionIcons[this.selectedVision];
        this.elements.visionIcon.style.color = `var(--${this.selectedVision})`;
        this.elements.visionBadge.style.borderColor = `var(--${this.selectedVision})`;
        this.elements.visionBadge.classList.add('active');
        
        // Add aura particles
        this.createAuraParticles(this.selectedVision);
    }
    
    // Update weapon
    if (this.selectedWeapon) {
        const weaponIcons = {
            sword: '⚔️',
            axe: '🪓',
            staff: '🔱',
            bow: '🏹'
        };
        this.elements.weaponIcon.textContent = weaponIcons[this.selectedWeapon];
        this.elements.weaponIcon.style.color = this.selectedVision ? `var(--${this.selectedVision})` : '#FFD700';
        this.elements.weaponDisplay.style.opacity = '1';
    }
    
    // Update pose
    this.elements.characterSprite.className = 'character-sprite';
    if (this.selectedPose) {
        this.elements.characterSprite.classList.add(`pose-${this.selectedPose}`);
    }
}

updateCharacterInfo() {
    // Update info display
    if (this.elements.selectedVisionText) {
        this.elements.selectedVisionText.textContent = this.selectedVision 
            ? this.selectedVision.charAt(0).toUpperCase() + this.selectedVision.slice(1)
            : 'Not Selected';
        this.elements.selectedVisionText.style.color = this.selectedVision 
            ? `var(--${this.selectedVision})` 
            : 'var(--text-secondary)';
    }
    
    if (this.elements.selectedWeaponText) {
        this.elements.selectedWeaponText.textContent = this.selectedWeapon 
            ? this.selectedWeapon.charAt(0).toUpperCase() + this.selectedWeapon.slice(1)
            : 'Not Selected';
        this.elements.selectedWeaponText.style.color = this.selectedWeapon 
            ? 'var(--gold)' 
            : 'var(--text-secondary)';
    }
    
    if (this.elements.selectedPoseText) {
        const poseNames = {
            idle: 'Idle',
            combat: 'Combat Ready',
            heroic: 'Heroic'
        };
        this.elements.selectedPoseText.textContent = poseNames[this.selectedPose] || 'Idle';
    }
}

createAuraParticles(element) {
    // Clear existing particles
    this.elements.aura.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `var(--${element})`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '0';
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
        this.elements.aura.appendChild(particle);
    }
}

updateConfirmButton() {
    const isReady = this.selectedVision && this.selectedWeapon;
    this.elements.confirmBtn.disabled = !isReady;
    
    if (isReady) {
        this.elements.confirmBtn.querySelector('.btn-hint').textContent = '✨ Begin Your Journey ✨';
    }
}

confirmSelection() {
    // Save selection
    storage.saveCharacter(this.selectedVision, this.selectedWeapon, this.selectedPose);
    
    // Show confirmation animation
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, var(--${this.selectedVision}) 0%, rgba(0,0,0,0.9) 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.5s ease;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 30px; animation: spin 1s ease-in-out;">${this.elements.visionIcon.textContent}</div>
            <h2 style="font-family: 'Cinzel', serif; font-size: 3rem; color: var(--gold); margin-bottom: 20px; text-shadow: 0 0 20px var(--gold);">
                Character Confirmed!
            </h2>
            <p style="font-size: 1.5rem; color: var(--text-primary);">
                Your journey begins...
            </p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Play confirmation sound
    const confirmSound = new Audio('assets/sounds/confirm.mp3');
    confirmSound.volume = 0.5;
    confirmSound.play().catch(e => {});
    
    // Transition to homepage
    setTimeout(() => {
        overlay.style.transition = 'opacity 0.8s';
        overlay.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 800);
    }, 2000);
}

showAchievement(title, description) {
    const popup = document.getElementById('achievement-notification');
    const titleEl = document.getElementById('achievement-title');
    const text = document.getElementById('achievement-text');
    
    if (!popup || !text) return;
    
    if (titleEl) titleEl.textContent = title;
    text.textContent = description;
    popup.classList.add('show');
    
    // Play achievement sound
    const achievementSound = new Audio('assets/sounds/achievement.mp3');
    achievementSound.volume = 0.5;
    achievementSound.play().catch(e => {});
    
    // Hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        starfield.appendChild(star);
    }
}
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
new CharacterSystem();
});