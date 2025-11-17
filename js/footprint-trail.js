// Footprint Trail System
class FootprintTrailSystem {
    constructor() {
        this.footprintContainer = document.getElementById('footprint-trails');
        this.pathMap = {
            'skills-projects': 'path-skills-projects',
            'projects-skills': 'path-skills-projects',
            'projects-certifications': 'path-projects-certifications',
            'certifications-projects': 'path-projects-certifications',
            'skills-education': 'path-skills-education',
            'education-skills': 'path-skills-education',
            'projects-experience': 'path-projects-experience',
            'experience-projects': 'path-projects-experience',
            'certifications-contact': 'path-certifications-contact',
            'contact-certifications': 'path-certifications-contact',
            'education-experience': 'path-education-experience',
            'experience-education': 'path-education-experience',
            'experience-contact': 'path-experience-contact',
            'contact-experience': 'path-experience-contact'
        };
        
        this.footprintSVG = {
            left: `<path d="M 0,0 Q -2,-3 -1,-5 Q 0,-6 1,-5 Q 3,-4 4,-2 Q 4,0 3,2 Q 2,3 0,4 Q -2,3 -3,1 Q -3,-1 0,0 M 1,-3 Q 2,-4 3,-3 Q 3,-2 2,-1 Q 1,-1 1,-2 Z" transform="scale(0.8)"/>`,
            right: `<path d="M 0,0 Q 2,-3 1,-5 Q 0,-6 -1,-5 Q -3,-4 -4,-2 Q -4,0 -3,2 Q -2,3 0,4 Q 2,3 3,1 Q 3,-1 0,0 M -1,-3 Q -2,-4 -3,-3 Q -3,-2 -2,-1 Q -1,-1 -1,-2 Z" transform="scale(0.8)"/>`
        };
        
        this.init();
    }
    
    init() {
        if (!this.footprintContainer) return;
        
        // Load and render existing trails
        this.renderExistingTrails();
    }
    
    renderExistingTrails() {
        const journeyHistory = this.getJourneyHistory();
        
        journeyHistory.forEach((journey, index) => {
            const pathKey = `${journey.from}-${journey.to}`;
            const pathId = this.pathMap[pathKey];
            
            if (pathId) {
                this.createFootprintTrail(pathId, index < journeyHistory.length - 1);
            }
        });
    }
    
    createFootprintTrail(pathId, isOld = false) {
        const path = document.getElementById(pathId);
        if (!path) return;
        
        const pathLength = path.getTotalLength();
        const footprintCount = Math.floor(pathLength / 30); // One footprint every 30 units
        
        for (let i = 0; i < footprintCount; i++) {
            const distance = (i / footprintCount) * pathLength;
            const point = path.getPointAtLength(distance);
            
            // Alternate left and right footprints
            const isLeft = i % 2 === 0;
            const side = isLeft ? 'left' : 'right';
            
            // Get path tangent for rotation
            const nextPoint = path.getPointAtLength(Math.min(distance + 5, pathLength));
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
            
            // Offset footprint slightly to the side
            const offset = isLeft ? -3 : 3;
            const offsetX = point.x + Math.cos((angle + 90) * Math.PI / 180) * offset;
            const offsetY = point.y + Math.sin((angle + 90) * Math.PI / 180) * offset;
            
            this.addFootprint(offsetX, offsetY, angle, side, isOld);
        }
    }
    
    addFootprint(x, y, rotation, side, isOld) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', `footprint ${side} ${isOld ? '' : 'recent'}`);
        g.setAttribute('transform', `translate(${x}, ${y}) rotate(${rotation})`);
        g.innerHTML = this.footprintSVG[side];
        
        this.footprintContainer.appendChild(g);
    }
    
    addNewJourney(fromRegion, toRegion) {
        // Save to history
        const history = this.getJourneyHistory();
        history.push({
            from: fromRegion,
            to: toRegion,
            timestamp: Date.now()
        });
        localStorage.setItem('journeyHistory', JSON.stringify(history));
        
        // Create trail
        const pathKey = `${fromRegion}-${toRegion}`;
        const pathId = this.pathMap[pathKey];
        
        if (pathId) {
            this.createFootprintTrail(pathId, false);
        }
    }
    
    getJourneyHistory() {
        const history = localStorage.getItem('journeyHistory');
        return history ? JSON.parse(history) : [];
    }
    
    clearAllTrails() {
        if (this.footprintContainer) {
            this.footprintContainer.innerHTML = '';
        }
        localStorage.removeItem('journeyHistory');
        localStorage.removeItem('lastVisitedRegion');
    }
    
    // Track current location for future journeys
    trackVisit(regionId) {
        const lastVisit = localStorage.getItem('lastVisitedRegion');
        
        if (lastVisit && lastVisit !== regionId) {
            this.addNewJourney(lastVisit, regionId);
        }
        
        localStorage.setItem('lastVisitedRegion', regionId);
    }
}

// Global instance
const footprintTrail = new FootprintTrailSystem();
