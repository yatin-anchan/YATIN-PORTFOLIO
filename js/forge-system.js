// The Forge - Blacksmith System
class ForgeSystem {
    constructor() {
        this.dialogues = [
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "Welcome to my forge, young smith! The fires burn bright today."
            },
            {
                speaker: "You",
                text: "Who are you? This place... it's incredible!"
            },
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "I am Hephaestus, god of the forge and master of creation. Here, ideas are transformed into reality through fire and steel."
            },
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "Each weapon you see on these racks represents a battle fought—a project forged with developer of web-sight's own hands, tempered through challenges."
            },
            {
                speaker: "You",
                text: "These are his projects? They look like legendary weapons!"
            },
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "Indeed! Every line of code is a strike of the hammer. Every bug fixed, a spark flying from the anvil."
            },
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "Click on any weapon to claim it and reveal its true power. Each has been forged in the fires of creativity and persistence!"
            },
            {
                speaker: "Hephaestus, Master of the Forge",
                text: "Now go, examine the arsenal. May your forge never grow cold! 🔥⚒️"
            }
        ];
        
        this.currentDialogue = 0;
        this.hasVisited = localStorage.getItem('forge_visited') === 'true';
        
        this.elements = {
            loadingScreen: document.getElementById('loading-screen'),
            loadingProgress: document.getElementById('loading-progress'),
            dialogueOverlay: document.getElementById('dialogue-overlay'),
            dialogueText: document.getElementById('dialogue-text'),
            dialogueNext: document.getElementById('dialogue-next'),
            forgeFlames: document.getElementById('forge-flames'),
            emberParticles: document.getElementById('ember-particles'),
            starfield: document.getElementById('starfield'),
            hammerStrike: document.getElementById('hammer-strike'),
            weaponsForged: document.getElementById('weapons-forged'),
            totalPower: document.getElementById('total-power')
        };
        
        this.init();
    }
    
    init() {
        // Show loading screen
        this.showLoadingScreen();
        
        // Create effects
        this.createStarfield();
        this.createEmberParticles();
        
        // Update forge stats
        this.updateForgeStats();
        
        // Check completed quests
        this.markCompletedQuests();
        
        // Setup dialogue if first visit
        if (!this.hasVisited) {
            setTimeout(() => {
                this.startDialogue();
            }, 3000);
        }
        
        // Unlock lore
        setTimeout(() => {
            loreSystem.unlock('pyos_origin');
        }, 1000);
    }
    
    showLoadingScreen() {
        const progress = this.elements.loadingProgress;
        if (!progress) return;
        
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 25;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    this.elements.loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        this.elements.loadingScreen.style.display = 'none';
                    }, 800);
                }, 300);
            }
            progress.style.width = `${currentProgress}%`;
        }, 200);
    }
    
    startDialogue() {
        this.currentDialogue = 0;
        this.elements.dialogueOverlay.classList.add('active');
        this.showDialogue();
        
        this.elements.dialogueNext.addEventListener('click', () => {
            this.nextDialogue();
        });
    }
    
    showDialogue() {
        const dialogue = this.dialogues[this.currentDialogue];
        const textEl = this.elements.dialogueText;
        
        // Update speaker name
        const speakerEl = document.querySelector('.speaker-name');
        speakerEl.textContent = dialogue.speaker;
        
        // Typing effect
        textEl.textContent = '';
        let charIndex = 0;
        const typingSpeed = 30;
        
        const typeInterval = setInterval(() => {
            if (charIndex < dialogue.text.length) {
                textEl.textContent += dialogue.text[charIndex];
                charIndex++;
                
                // Play typing sound
                if (charIndex % 3 === 0) {
                    this.playSound('typing');
                }
            } else {
                clearInterval(typeInterval);
            }
        }, typingSpeed);
    }
    
    nextDialogue() {
        this.currentDialogue++;
        
        if (this.currentDialogue < this.dialogues.length) {
            this.showDialogue();
        } else {
            this.endDialogue();
        }
    }
    
    endDialogue() {
        this.elements.dialogueOverlay.classList.remove('active');
        localStorage.setItem('forge_visited', 'true');
        
        // Trigger hammer strike effects
        this.triggerForgeEffects();
        
        // Award achievement
        if (storage.addAchievement({
            id: 'met_hephaestus',
            name: 'Apprentice of Hephaestus',
            description: 'Met the legendary blacksmith',
            tier: 'silver'
        })) {
            setTimeout(() => {
                this.showAchievement('Apprentice of Hephaestus', 'The forge master acknowledges you!');
            }, 1000);
        }
        
        storage.addXP(50);
    }
    
    updateForgeStats() {
        const completedQuests = storage.getCompletedQuests();
        const weaponsCount = completedQuests.filter(q => q.includes('quest')).length;
        
        if (this.elements.weaponsForged) {
            this.elements.weaponsForged.textContent = weaponsCount;
        }
        
        if (this.elements.totalPower) {
            // Calculate power based on completed quests
            const powerMap = {
                'pyos_quest': 95,
                'autonix_quest': 100,
                'web_quest': 85
            };
            
            let totalPower = 0;
            completedQuests.forEach(quest => {
                totalPower += powerMap[quest] || 0;
            });
            
            this.elements.totalPower.textContent = totalPower;
        }
    }
    
    markCompletedQuests() {
        const completedQuests = storage.getCompletedQuests();
        
        completedQuests.forEach(questId => {
            const badge = document.getElementById(`badge-${questId.replace('_quest', '')}`);
            if (badge) {
                badge.textContent = '✓ Forged';
                badge.classList.add('completed');
            }
            
            const card = document.querySelector(`[data-quest="${questId}"]`);
            if (card) {
                const btn = card.querySelector('.forge-btn');
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = `
                        <span class="btn-icon">✓</span>
                        <span class="btn-text">Claimed</span>
                    `;
                }
            }
        });
    }
    
    triggerForgeEffects() {
        // Create multiple hammer strikes
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.hammerStrike();
            }, i * 300);
        }
        
        // Create extra embers
        this.createEmberBurst();
    }
    
    hammerStrike() {
        const strikeEl = this.elements.hammerStrike;
        if (!strikeEl) return;
        
        strikeEl.classList.add('active');
        
        // Create sparks
        this.createSparks();
        
        // Play hammer sound
        this.playSound('hammer');
        
        setTimeout(() => {
            strikeEl.classList.remove('active');
        }, 500);
    }
    
    createSparks() {
        const container = document.querySelector('.sparks-container');
        if (!container) return;
        
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--gold);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--gold);
            `;
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 100;
            
            container.appendChild(spark);
            
            setTimeout(() => {
                spark.style.transition = 'all 0.8s ease-out';
                spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                spark.style.opacity = '0';
                
                setTimeout(() => spark.remove(), 800);
            }, 50);
        }
    }
    
    createEmberBurst() {
        const container = this.elements.emberParticles;
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const ember = document.createElement('div');
                ember.className = 'ember';
                ember.style.left = `${Math.random() * 100}%`;
                ember.style.animationDelay = '0s';
                ember.style.animationDuration = `${Math.random() * 3 + 3}s`;
                container.appendChild(ember);
                
                setTimeout(() => ember.remove(), 6000);
            }, i * 50);
        }
    }
    
    createEmberParticles() {
        const container = this.elements.emberParticles;
        if (!container) return;
        
        for (let i = 0; i < 25; i++) {
            const ember = document.createElement('div');
            ember.className = 'ember';
            ember.style.left = `${Math.random() * 100}%`;
            ember.style.animationDelay = `${Math.random() * 5}s`;
            ember.style.animationDuration = `${Math.random() * 4 + 4}s`;
            container.appendChild(ember);
        }
        
        // Continuously spawn embers
        setInterval(() => {
            if (container.children.length < 25) {
                const ember = document.createElement('div');
                ember.className = 'ember';
                ember.style.left = `${Math.random() * 100}%`;
                ember.style.animationDelay = '0s';
                ember.style.animationDuration = `${Math.random() * 4 + 4}s`;
                container.appendChild(ember);
                
                setTimeout(() => ember.remove(), 8000);
            }
        }, 1000);
    }
    
    createStarfield() {
        const starfield = this.elements.starfield;
        if (!starfield) return;
        
        for (let i = 0; i < 150; i++) {
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
    
    playSound(soundName) {
        const sound = new Audio(`assets/sounds/${soundName}.mp3`);
        sound.volume = 0.3;
        sound.play().catch(e => {});
    }
    
    showAchievement(title, description) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: -400px;
            background: var(--gradient-card);
            border: 3px solid var(--gold);
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5);
            z-index: 1000;
            transition: right 0.5s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 3rem;">🏆</div>
            <div>
                <h3 style="color: var(--gold); margin-bottom: 5px; font-size: 1.2rem;">${title}</h3>
                <p style="color: var(--text-primary); font-size: 0.95rem;">${description}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.right = '30px';
        }, 100);
        
        setTimeout(() => {
            notification.style.right = '-400px';
            setTimeout(() => notification.remove(), 500);
        }, 3500);
        
        this.playSound('achievement');
    }
}

// Quest Completion Function (Global)
function completeQuest(questId, button) {
    const success = questSystem.complete(questId);
    
    if (success) {
        // Update button
        button.disabled = true;
        button.innerHTML = `
            <span class="btn-icon">✓</span>
            <span class="btn-text">Claimed</span>
        `;
        
        // Update badge
        const badge = document.getElementById(`badge-${questId.replace('_quest', '')}`);
        if (badge) {
            badge.textContent = '✓ Forged';
            badge.classList.add('completed');
        }
        
        // Trigger hammer strike effect
        const forgeSystem = window.forgeSystemInstance;
        if (forgeSystem) {
            forgeSystem.hammerStrike();
            forgeSystem.updateForgeStats();
        }
        
        // Show completion message
        const card = button.closest('.weapon-card');
        if (card) {
            const weaponName = card.querySelector('.weapon-name').textContent;
            
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--pyro), var(--gold));
                border: 4px solid var(--gold);
                border-radius: 20px;
                padding: 40px 60px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 20px 60px rgba(255, 215, 0, 0.6);
                animation: weaponClaimed 0.6s ease;
            `;
            
            message.innerHTML = `
                <div style="font-size: 5rem; margin-bottom: 20px;">⚒️</div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: white; margin-bottom: 15px;">
                    Weapon Forged!
                </h2>
                <p style="font-size: 1.3rem; color: white;">
                    ${weaponName} added to your arsenal!
                </p>
            `;
            
            document.body.appendChild(message);
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes weaponClaimed {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                message.style.transition = 'opacity 0.5s ease';
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            }, 2500);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.forgeSystemInstance = new ForgeSystem();
});