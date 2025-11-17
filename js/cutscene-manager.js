// Cutscene Timeline Manager
class CutsceneManager {
    constructor() {
        this.scenes = document.querySelectorAll('.scene');
        this.currentScene = 0;
        this.skipBtn = document.getElementById('skip-btn');
        this.bgm = document.getElementById('cutscene-bgm');
        this.rumble = document.getElementById('rumble-sound');
        
        this.timeline = [
            { id: 'scene-1', duration: 5000 },
            { id: 'scene-2', duration: 4500 },
            { id: 'scene-3', duration: 5500 },
            { id: 'scene-4', duration: 6000 }
        ];
        
        this.init();
    }
    
    init() {
        // Play background music
        this.bgm.volume = 0.3;
        this.bgm.play().catch(e => console.log('Audio autoplay blocked'));
        
        // Skip button
        this.skipBtn.addEventListener('click', () => this.skip());
        
        // Start cutscene
        this.playScene(0);
    }
    
    playScene(index) {
        if (index >= this.timeline.length) {
            this.end();
            return;
        }
        
        this.currentScene = index;
        const scene = document.getElementById(this.timeline[index].id);
        
        // Show current scene
        scene.classList.add('active');
        
        // Special effects per scene
        if (index === 0) {
            this.rumble.play().catch(e => {});
        }
        
        // Auto-advance to next scene
        setTimeout(() => {
            scene.classList.remove('active');
            this.playScene(index + 1);
        }, this.timeline[index].duration);
    }
    
    skip() {
        // Stop all animations
        this.scenes.forEach(scene => scene.classList.remove('active'));
        this.end();
    }
    
    end() {
        // Mark cutscene as played
        localStorage.setItem('cutscenePlayed', 'yes');
        
        // Fade out and redirect
        document.body.style.transition = 'opacity 1s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'character-custom.html';
        }, 1000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CutsceneManager();
});
