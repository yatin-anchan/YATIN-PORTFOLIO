// Vision Attack Animation System
class VisionAttackSystem {
    constructor() {
        this.attacks = {
            electro: this.electroAttack.bind(this),
            pyro: this.pyroAttack.bind(this),
            cryo: this.cryoAttack.bind(this),
            anemo: this.anemoAttack.bind(this),
            geo: this.geoAttack.bind(this),
            hydro: this.hydroAttack.bind(this)
        };
        
        this.sounds = {
            electro: new Audio('assets/sounds/vision-attacks/electro.mp3'),
            pyro: new Audio('assets/sounds/vision-attacks/pyro.mp3'),
            cryo: new Audio('assets/sounds/vision-attacks/cryo.mp3'),
            anemo: new Audio('assets/sounds/vision-attacks/anemo.mp3'),
            geo: new Audio('assets/sounds/vision-attacks/geo.mp3'),
            hydro: new Audio('assets/sounds/vision-attacks/hydro.mp3')
        };
    }
    
    trigger(element, targetElement) {
        if (this.attacks[element]) {
            this.playSound(element);
            this.screenFlash(element);
            this.attacks[element](targetElement);
        }
    }
    
    playSound(element) {
        if (this.sounds[element]) {
            this.sounds[element].currentTime = 0;
            this.sounds[element].volume = 0.4;
            this.sounds[element].play().catch(e => {});
        }
    }
    
    screenFlash(element) {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.background = `var(--${element})`;
        document.body.appendChild(flash);
        
        setTimeout(() => flash.remove(), 400);
    }
    
    electroAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Lightning slash
        const slash = document.createElement('div');
        slash.className = 'electro-attack';
        container.appendChild(slash);
        
        // Particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'electro-particles';
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 100;
            particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            particle.style.animationDelay = `${i * 0.05}s`;
            container.appendChild(particle);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1000);
    }
    
    pyroAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Flame burst
        const burst = document.createElement('div');
        burst.className = 'pyro-attack';
        container.appendChild(burst);
        
        // Flame particles
        for (let i = 0; i < 8; i++) {
            const flame = document.createElement('div');
            flame.className = 'flame-particle';
            flame.style.left = `${Math.random() * 100 - 50}px`;
            flame.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(flame);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1200);
    }
    
    cryoAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Ice cross
        const cross = document.createElement('div');
        cross.className = 'cryo-attack';
        container.appendChild(cross);
        
        // Ice shards
        for (let i = 0; i < 10; i++) {
            const shard = document.createElement('div');
            shard.className = 'ice-shard';
            const angle = (Math.PI * 2 * i) / 10;
            const distance = 80;
            shard.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            shard.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            shard.style.setProperty('--r', `${Math.random() * 360}deg`);
            shard.style.animationDelay = `${i * 0.05}s`;
            container.appendChild(shard);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1000);
    }
    
    anemoAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Wind swirl
        const swirl = document.createElement('div');
        swirl.className = 'anemo-attack';
        container.appendChild(swirl);
        
        // Wind streaks
        for (let i = 0; i < 6; i++) {
            const streak = document.createElement('div');
            streak.className = 'wind-particle';
            const angle = (Math.PI * 2 * i) / 6;
            streak.style.setProperty('--tx', `${Math.cos(angle) * 120}px`);
            streak.style.setProperty('--ty', `${Math.sin(angle) * 30}px`);
            streak.style.transform = `rotate(${angle}rad)`;
            streak.style.animationDelay = `${i * 0.08}s`;
            container.appendChild(streak);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1000);
    }
    
    geoAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Rock pillars
        for (let i = 0; i < 5; i++) {
            const pillar = document.createElement('div');
            pillar.className = 'geo-attack';
            pillar.style.left = `${(i - 2) * 30}px`;
            pillar.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(pillar);
        }
        
        // Rock particles
        for (let i = 0; i < 8; i++) {
            const rock = document.createElement('div');
            rock.className = 'rock-particle';
            rock.style.left = `${Math.random() * 100 - 50}px`;
            rock.style.setProperty('--tx', `${Math.random() * 60 - 30}px`);
            rock.style.animationDelay = `${i * 0.08}s`;
            container.appendChild(rock);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1200);
    }
    
    hydroAttack(target) {
        const container = document.createElement('div');
        container.className = 'attack-animation';
        
        // Water wave
        const wave = document.createElement('div');
        wave.className = 'hydro-attack';
        container.appendChild(wave);
        
        // Water droplets
        for (let i = 0; i < 10; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'water-droplet';
            const angle = (Math.PI * 2 * i) / 10;
            const distance = 70;
            droplet.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            droplet.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            droplet.style.animationDelay = `${i * 0.06}s`;
            container.appendChild(droplet);
        }
        
        target.appendChild(container);
        setTimeout(() => container.remove(), 1100);
    }
}

// Create global instance
const visionAttacks = new VisionAttackSystem();
