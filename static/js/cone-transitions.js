// Define page colors (matching CSS variables)
const pageColors = {
  home: '#f2f6f5',
  releases: '#f8caef',
  performances: '#ffd6cc',
  works: '#ccd4ff',
  about: '#ccd6ff',
  inquiry: '#ffeccf'
};

// Function to get current page type from URL
function getCurrentPageType() {
  const path = window.location.pathname;
  
  if (path === '/' || path === '/index.html') return 'home';
  if (path.includes('/releases')) return 'releases';
  if (path.includes('/performances')) return 'performances';
  if (path.includes('/works')) return 'works';
  if (path.includes('/about')) return 'about';
  if (path.includes('/inquiry')) return 'inquiry';
  
  return 'home'; // Default fallback
}

// Get the color for current page
function getCurrentPageColor() {
  const pageType = getCurrentPageType();
  return pageColors[pageType] || pageColors.home;
}

// Create a conic gradient
function createConicGradient(startColor, endColor) {
  return `conic-gradient(
    from 0deg,
    ${startColor} 0%,
    ${endColor} 33%,
    ${startColor} 67%,
    ${endColor} 100%
  )`;
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  // Get previous color from localStorage
  const prevColor = localStorage.getItem('previousPageColor') || pageColors.home;
  const currentColor = getCurrentPageColor();
  
  // Save current color for next page transition
  localStorage.setItem('previousPageColor', currentColor);
  
  // Set the destination background color
  document.body.style.backgroundColor = currentColor;
  
  // Create gradient overlay for transition
  if (prevColor !== currentColor) {
    const overlay = document.createElement('div');
    overlay.className = 'gradient-overlay';
    
    // Create a dramatic cone gradient
    overlay.style.background = createConicGradient(prevColor, currentColor);
    
    // Position from center
    overlay.style.transformOrigin = 'center center';
    
    document.body.appendChild(overlay);
    
    // Trigger animation after a short delay to ensure DOM is ready
    setTimeout(() => {
      overlay.classList.add('active');
      
      // Remove overlay after animation completes
      setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1800); // Match to CSS transition-duration
    }, 50);
  }
});

// Handle links to preserve color transition on navigation
document.addEventListener('click', (e) => {
  // Check if clicked element is a link to another page on the site
  if (e.target.tagName === 'A' && 
      e.target.href && 
      e.target.href.includes(window.location.hostname) &&
      !e.target.href.includes('#') &&
      !e.target.target) {
    
    // Remember current page color
    localStorage.setItem('previousPageColor', getCurrentPageColor());
  }
}); 