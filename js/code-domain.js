// Code Domain - Wizard Theme System
class CodeDomainSystem {
    constructor() {
        this.dialogues = [
            {
                speaker: "Merlin, Keeper of Programming Arts",
                text: "Ah, a traveler! Welcome to my Code Sanctum, young apprentice."
            },
            {
                speaker: "You",
                text: "Who are you? What is this place?"
            },
            {
                speaker: "Merlin, Keeper of Programming Arts",
                text: "I am Merlin, guardian of the ancient programming arts. This sanctum houses the collected knowledge of the developer of this web-sight."
            },
            {
                speaker: "Merlin, Keeper of Programming Arts",
                text: "These magical scrolls contain skills and techniques that was accquired through hardwork and passion. Each skill that one masters and strengthen as a developer."
            },
            {
                speaker: "You",
                text: "How do i know what skill the so called developer of websight have?"
            },
            {
                speaker: "Merlin, Keeper of Programming Arts",
                text: "Simply channel your focus into any scroll. Feel the knowledge flow into you!"
            },
            {
                speaker: "Merlin, Keeper of Programming Arts",
                text: "Now go forth, young apprentice. Let the lightning of knowledge illuminate your path! ⚡"
            }
        ];
        
        this.currentDialogue = 0;
        this.hasVisited = localStorage.getItem('code_domain_visited') === 'true';
        
        this.elements = {
            loadingScreen: document.getElementById('loading-screen'),
            loadingProgress: document.getElementById('loading-progress'),
            dialogueOverlay: document.getElementById('dialogue-overlay'),
            dialogueText: document.getElementById('dialogue-text'),
            dialogueNext: document.getElementById('dialogue-next'),
            lightningCanvas: document.getElementById('lightning-canvas'),
            magicParticles: document.getElementById('magic-particles'),
            starfield: document.getElementById('starfield')
        };
        
        this.skills = {
            programming: ['Python', 'JavaScript', 'C++', 'Assembly', 'SQL', 'MySQL', 'Kotlin', 'HTML', 'CSS', 'Node.js', 'React.js', 'Linux', 'Bash', 'Tkinter', 'Arduino IDE', 'Embedded C++', 'distutil', 'shutil', 'XML'],
            
            webdev: ['HTML Scripting', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Front-End Development', 'Multi-page Website Design', 'Android Studio', 'Android Development', 'OSMdroid', 'SMS Integration', 'Android Testing'],
            
            ml: ['Data Analysis', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Supervised Learning', 'Unsupervised Learning', 'Artificial Intelligence', 'Deep Learning', 'Computer Vision', 'Neural Networks (CNN, DNN)', 'Geospatial Intelligence', 'Python Kivy'],
            
            robotics: ['Robotics', 'Arduino', 'Sensors', 'Embedded C++', 'Robotic Engineering'],
            
            uiux: ['Figma', 'User Interface Design', 'Replit', 'GitHub'],
            
            leadership: ['Leadership', 'Team Leadership', 'Discipline', 'Organizational Leadership', 'Motivation', 'Team Building', 'Teamwork', 'Communication', 'Management', 'Defense', 'Leadership Development'],
            
            cloud: ['Web3', 'Blockchain'],
            
            other: ['Database Management (DBMS)', 'Roblox Development', 'Camera Operation']
        };
        
        this.init();
    }
    
    init() {
        // Show loading screen
        this.showLoadingScreen();
        
        // Create effects
        this.createStarfield();
        this.createMagicParticles();
        this.setupLightning();
        
        // Create skill cards
        this.createAllSkills();
        
        // Setup dialogue if first visit
        if (!this.hasVisited) {
            setTimeout(() => {
                this.startDialogue();
            }, 3000);
        }
        
        // Unlock lore
        setTimeout(() => {
            loreSystem.unlock('first_code');
        }, 1000);
    }
    
    showLoadingScreen() {
        const progress = this.elements.loadingProgress;
        if (!progress) return;
        
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 20;
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
                
                // Play typing sound (optional)
                this.playSound('typing');
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
        localStorage.setItem('code_domain_visited', 'true');
        
        // Trigger lightning effect
        this.triggerLightningStorm();
        
        // Award achievement
        if (storage.addAchievement({
            id: 'met_merlin',
            name: 'Apprentice of Merlin',
            description: 'Met Merlin in the Code Sanctum',
            tier: 'silver'
        })) {
            setTimeout(() => {
                this.showAchievement('Apprentice of Merlin', 'Met the legendary wizard!');
            }, 1000);
        }
        
        storage.addXP(50);
    }
    
    createAllSkills() {
        this.createSkillCards(this.skills.programming, 'programming-grid');
        this.createSkillCards(this.skills.webdev, 'webdev-grid');
        this.createSkillCards(this.skills.ml, 'ml-grid');
        this.createSkillCards(this.skills.robotics, 'robotics-grid');
        this.createSkillCards(this.skills.uiux, 'uiux-grid');
        this.createSkillCards(this.skills.leadership, 'leadership-grid');
        this.createSkillCards(this.skills.cloud, 'cloud-grid');
        this.createSkillCards(this.skills.other, 'other-grid');
    }
    
    createSkillCards(skillsArray, gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        skillsArray.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-scroll';
            card.innerHTML = `<div class="skill-name">${skill}</div>`;
            
            // Add click effect
            card.addEventListener('click', () => {
                this.activateSkill(card, skill);
            });
            
            grid.appendChild(card);
        });
    }
    
    activateSkill(card, skillName) {
        // Visual effect
        card.classList.add('activated');
        setTimeout(() => {
            card.classList.remove('activated');
        }, 600);
        
        // Lightning strike
        this.drawLightning(
            card.getBoundingClientRect().left + card.offsetWidth / 2,
            card.getBoundingClientRect().top
        );
        
        // Sound effect
        this.playSound('lightning');
        
        // Show skill info (optional popup)
        this.showSkillInfo(skillName);
    }
    
    showSkillInfo(skillName) {
        // Create floating text
        const infoText = document.createElement('div');
        infoText.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(255, 215, 0, 0.9));
            border: 3px solid var(--gold);
            border-radius: 15px;
            padding: 20px 40px;
            font-family: 'Cinzel', serif;
            font-size: 1.5rem;
            color: white;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(168, 85, 247, 0.6);
            animation: skillInfoAppear 0.5s ease;
            pointer-events: none;
        `;
        infoText.textContent = `⚡ ${skillName} ⚡`;
        
        document.body.appendChild(infoText);
        
        setTimeout(() => {
            infoText.style.animation = 'skillInfoFade 0.5s ease';
            setTimeout(() => infoText.remove(), 500);
        }, 1500);
        
        // Add CSS animations
        if (!document.getElementById('skill-info-animations')) {
            const style = document.createElement('style');
            style.id = 'skill-info-animations';
            style.textContent = `
                @keyframes skillInfoAppear {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                @keyframes skillInfoFade {
                    to {
                        opacity: 0;
                        transform: translate(-50%, -60%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupLightning() {
        const canvas = this.elements.lightningCanvas;
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext('2d');
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    drawLightning(x, y) {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        const segments = 20;
        const spread = 30;
        
        ctx.strokeStyle = '#A855F7';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#A855F7';
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        
        let currentX = x;
        let currentY = 0;
        
        for (let i = 0; i < segments; i++) {
            currentX += (Math.random() - 0.5) * spread;
            currentY += y / segments;
            ctx.lineTo(currentX, currentY);
        }
        
        ctx.stroke();
        
        // Fade out
        setTimeout(() => {
            ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }, 200);
    }
    
    triggerLightningStorm() {
        let strikes = 0;
        const maxStrikes = 10;
        
        const stormInterval = setInterval(() => {
            if (strikes >= maxStrikes) {
                clearInterval(stormInterval);
                return;
            }
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            this.drawLightning(x, y);
            
            strikes++;
        }, 200);
    }
    
    createMagicParticles() {
        const container = this.elements.magicParticles;
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
            container.appendChild(particle);
        }
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
        // Create achievement notification
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
        
        // Slide in
        setTimeout(() => {
            notification.style.right = '30px';
        }, 100);
        
        // Slide out
        setTimeout(() => {
            notification.style.right = '-400px';
            setTimeout(() => notification.remove(), 500);
        }, 3500);
        
        // Play sound
        this.playSound('achievement');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CodeDomainSystem();
});
