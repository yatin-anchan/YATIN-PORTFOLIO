/**
 * ═══════════════════════════════════════════════════════════════
 * THE DIVINE POND SYSTEM
 * Blessed by the gods, honored by the heavens
 * Each ripple carries the whispers of destiny
 * ═══════════════════════════════════════════════════════════════
 */

class DivinePond {
    constructor() {
        // Sacred experiences - The fish that swim in destiny's waters
        this.sacredExperiences = [
            {
                id: 'golden_koi',
                icon: '🐟',
                color: '#ffd700',
                glow: 'rgba(255, 215, 0, 0.8)',
                title: 'SUO (Senior Under Officer)',
                organization: 'National Cadet Corps (NCC), Mumbai',
                duration: 'August 2023 - Present',
                story: 'In the halls of discipline and honor, the developer rose to lead as Senior Under Officer. Through rigorous training exercises, company formations, and ceremonial duties, they fostered a spirit of unity and excellence among cadets. Their dedication was recognized with the prestigious Best Company Commander award in May 2025—a testament to unwavering leadership and service to the nation.',
                skills: ['Leadership', 'Team Leadership', 'Discipline', 'Organizational Leadership', 'Management', 'Defense'],
                position: { top: '35%' },
                speed: 15,
                delay: 0
            },
            {
                id: 'azure_scholar',
                icon: '🐠',
                color: '#4a90e2',
                glow: 'rgba(74, 144, 226, 0.8)',
                title: 'Computer Science Student',
                organization: 'The Royal Higher Education Societies College, Mira Road',
                duration: 'June 2023 - Present',
                story: 'In the sacred halls of learning, the developer delves deep into the mysteries of Computer Science. From crafting operating system simulators to developing Android safety applications, from building web platforms to conducting research on rider safety systems—each project a stepping stone on the path to mastery. Their published research demonstrates not just technical prowess, but a commitment to solving real-world problems through innovation.',
                skills: ['C++', 'Python', 'HTML/CSS/JavaScript', 'Assembly', 'DBMS', 'Communication', 'Teamwork'],
                position: { top: '55%' },
                speed: 8,
                delay: 14
            },
            {
                id: 'crimson_warrior',
                icon: '🐡',
                color: '#ff7043',
                glow: 'rgba(255, 112, 67, 0.8)',
                title: 'Athletics & Sports Excellence',
                organization: 'Various Competitions & Teams',
                duration: '2023 - Present',
                story: 'Beyond the realm of code and command, the developer sharpens body and spirit through athletic pursuit. In volleyball courts, on football fields, and across running tracks—they cultivate teamwork, endurance, and the warrior\'s competitive spirit. These activities forge not just physical strength, but mental resilience and the ability to thrive under pressure—qualities that transcend into every aspect of their journey.',
                skills: ['Teamwork', 'Physical Fitness', 'Competitive Spirit', 'Time Management'],
                position: { top: '75%' },
                speed: 18,
                delay: 7
            }
        ];
        
        // Sage wisdom collection
        this.divineWisdom = [
            "Each fish carries the developer's journey within its soul...",
            "The waters remember every lesson learned...",
            "Leadership flows like water—gentle yet persistent...",
            "In these sacred depths, experience becomes wisdom...",
            "Click upon the fish to unveil their sacred stories...",
            "The pond reflects the sky of infinite possibilities..."
        ];
        
        this.init();
    }
    
    init() {
        // Bless the waters with divine animation
        this.animateWaters();
        
        // Summon the sacred fish
        this.summonFish();
        
        // Bind the cosmic events
        this.bindEvents();
        
        // Rotate sage wisdom
        this.rotateSageWisdom();
        
        // Update fish count
        this.updateFishCount();
        
        console.log('%c🌊 THE DIVINE POND AWAKENS 🌊', 'font-size: 20px; color: #4a90e2; font-weight: bold;');
        console.log('%c✨ The gods smile upon this creation ✨', 'font-size: 14px; color: #7cb342; font-style: italic;');
    }
    
    // ═══════════════════════════════════════════════════════════
    // ANIMATE THE SACRED WATERS
    // ═══════════════════════════════════════════════════════════
    
    animateWaters() {
        const canvas = document.getElementById('water-canvas');
        if (!canvas) return;
        
        const pond = document.querySelector('.pond-sacred-waters');
        canvas.width = pond.offsetWidth;
        canvas.height = pond.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        let frame = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw heavenly water shimmer
            for (let i = 0; i < 20; i++) {
                const opacity = 0.15 + Math.sin(frame * 0.015 + i * 0.4) * 0.1;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                for (let x = 0; x < canvas.width; x += 15) {
                    const y = canvas.height * (i / 20) + 
                             Math.sin((x + frame * 1.5) * 0.015) * 25 + 
                             Math.cos((x + frame * 1) * 0.02) * 15;
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
            
            // Draw light reflections
            for (let i = 0; i < 8; i++) {
                const x = (Math.sin(frame * 0.01 + i) * 0.4 + 0.5) * canvas.width;
                const y = (Math.cos(frame * 0.008 + i * 0.5) * 0.3 + 0.4) * canvas.height;
                const size = 40 + Math.sin(frame * 0.02 + i) * 20;
                const opacity = 0.1 + Math.sin(frame * 0.015 + i * 0.3) * 0.05;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            frame++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // ═══════════════════════════════════════════════════════════
    // CREATE DIVINE RIPPLES
    // ═══════════════════════════════════════════════════════════
    
    createRipple(x, y) {
        const pond = document.querySelector('.pond-sacred-waters');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.marginLeft = '-125px';
        ripple.style.marginTop = '-125px';
        
        pond.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 3000);
    }
    
    // ═══════════════════════════════════════════════════════════
    // SUMMON THE SACRED FISH
    // ═══════════════════════════════════════════════════════════
    
    summonFish() {
        const fishRealm = document.getElementById('fish-realm');
        if (!fishRealm) return;
        
        this.sacredExperiences.forEach(exp => {
            const fish = document.createElement('div');
            fish.className = 'divine-fish';
            fish.textContent = exp.icon;
            fish.style.top = exp.position.top;
            fish.style.animationDuration = `${exp.speed}s`;
            fish.style.animationDelay = `${exp.delay}s`;
            fish.style.filter = `drop-shadow(0 5px 12px ${exp.glow})`;
            fish.dataset.expId = exp.id;
            
            fish.addEventListener('click', (e) => {
                this.revealExperience(exp);
                const rect = fishRealm.getBoundingClientRect();
                this.createRipple(
                    e.clientX - rect.left,
                    e.clientY - rect.top
                );
            });
            
            fishRealm.appendChild(fish);
        });
    }
    
    // ═══════════════════════════════════════════════════════════
    // REVEAL THE SACRED EXPERIENCE
    // ═══════════════════════════════════════════════════════════
    
    revealExperience(exp) {
        const modal = document.getElementById('exp-modal');
        if (!modal) return;
        
        // Set the content
        document.getElementById('fish-spirit').textContent = exp.icon;
        document.getElementById('fish-spirit').style.color = exp.color;
        document.getElementById('exp-title').textContent = exp.title;
        document.getElementById('exp-org').textContent = exp.organization;
        document.getElementById('exp-time').textContent = exp.duration;
        document.getElementById('exp-story').textContent = exp.story;
        
        // Populate skills
        const skillsGarden = document.getElementById('skills-garden');
        skillsGarden.innerHTML = '';
        
        exp.skills.forEach(skill => {
            const petal = document.createElement('div');
            petal.className = 'skill-petal';
            petal.textContent = skill;
            skillsGarden.appendChild(petal);
        });
        
        // Show the revelation
        modal.classList.add('active');
        
        // Award XP for enlightenment
        if (typeof storage !== 'undefined' && storage.addXP) {
            storage.addXP(15);
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // CLOSE THE REVELATION
    // ═══════════════════════════════════════════════════════════
    
    closeRevelation() {
        const modal = document.getElementById('exp-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // ROTATE SAGE WISDOM
    // ═══════════════════════════════════════════════════════════
    
    rotateSageWisdom() {
        const wisdomEl = document.getElementById('sage-wisdom');
        if (!wisdomEl) return;
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % this.divineWisdom.length;
            
            // Fade out
            wisdomEl.style.opacity = '0';
            wisdomEl.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                wisdomEl.textContent = `"${this.divineWisdom[currentIndex]}"`;
                wisdomEl.style.opacity = '1';
                wisdomEl.style.transform = 'translateY(0)';
            }, 400);
        }, 8000);
        
        // Add transition
        wisdomEl.style.transition = 'all 0.4s ease';
    }
    
    // ═══════════════════════════════════════════════════════════
    // UPDATE FISH COUNT
    // ═══════════════════════════════════════════════════════════
    
    updateFishCount() {
        const countEl = document.getElementById('fish-count');
        if (countEl) {
            countEl.textContent = this.sacredExperiences.length;
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // BIND COSMIC EVENTS
    // ═══════════════════════════════════════════════════════════
    
    bindEvents() {
        // Close modal button
        const closeBtn = document.getElementById('close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeRevelation());
        }
        
        // Return to waters button
        const returnBtn = document.getElementById('return-waters');
        if (returnBtn) {
            returnBtn.addEventListener('click', () => this.closeRevelation());
        }
        
        // Click on pond for ripples
        const pond = document.getElementById('sacred-pond');
        if (pond) {
            pond.addEventListener('click', (e) => {
                const rect = pond.getBoundingClientRect();
                this.createRipple(
                    e.clientX - rect.left,
                    e.clientY - rect.top
                );
            });
        }
        
        // Close modal on background click
        const modal = document.getElementById('exp-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeRevelation();
                }
            });
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// AWAKEN THE DIVINE POND
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const pond = new DivinePond();
    
    // Bless the page with the sacred title
    document.title = '🌊 The Divine Pond of Experience 🌊';
});

// May the gods smile upon this creation! 🙏✨
