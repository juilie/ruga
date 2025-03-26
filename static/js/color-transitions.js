// Define page colors (matching CSS variables)
const pageColors = {
  home: '#f2f6f5',
  releases: '#f8caef',
  releases_page: '#e092ca',
  performances: '#ffd6cc',
  works: '#ccd4ff',
  about: 'rgb(255, 221, 221)',
  inquiry: '#ffeccf'
};

// Function to get current page type from URL
function getCurrentPageType() {
  const path = window.location.pathname;
  
  if (path === '/' || path === '/index.html') return 'home';
  if (path.includes('/releases') && !path.match(/\/releases\/.+/)) return 'releases';
  if (path.match(/\/releases\/.+/)) return 'releases_page';
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

// Get the transition duration from CSS custom property
function getTransitionDuration() {
  const durationStr = getComputedStyle(document.documentElement)
    .getPropertyValue('--transition-duration');
  
  // Parse seconds or milliseconds into milliseconds
  if (durationStr.includes('ms')) {
    return parseFloat(durationStr);
  } else {
    // Convert seconds to milliseconds
    return parseFloat(durationStr) * 1000;
  }
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
  
  // Create overlay with previous color for transition
  if (prevColor !== currentColor) {
    // Add a transitioning class to the body
    document.body.classList.add('transitioning');
    
    const overlay = document.createElement('div');
    overlay.className = 'color-overlay';
    overlay.style.backgroundColor = prevColor;
    document.body.appendChild(overlay);
    
    // Get transition duration from CSS
    const transitionDuration = getTransitionDuration();
    
    // Listen for animation end to clean up properly
    overlay.addEventListener('animationend', () => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        document.body.classList.remove('transitioning');
      }
    });
    
    // Fallback timeout in case animationend doesn't fire
    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        document.body.classList.remove('transitioning');
      }
    }, transitionDuration + 50); // Add small buffer
  }
});

// Handle links to preserve color transition on navigation
document.addEventListener('click', (e) => {
  // Check if clicked element is a link to another page on the site
  const linkElement = e.target.closest('a');
  if (linkElement && 
      linkElement.href && 
      linkElement.href.includes(window.location.hostname) &&
      !linkElement.href.includes('#') &&
      !linkElement.target) {
    
    // Remember current page color
    localStorage.setItem('previousPageColor', getCurrentPageColor());
  }
}); 