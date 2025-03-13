// Extension of the base transition system with interactive features

// Track mouse position for centered gradient effect
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Update mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Create a more dramatic version of the conic gradient
function createDramaticGradient(startColor, endColor) {
  // Add more color stops for a more vibrant effect
  return `conic-gradient(
    from 0deg,
    ${startColor} 0%,
    ${endColor} 15%,
    ${startColor} 30%,
    ${endColor} 45%,
    ${startColor} 60%,
    ${endColor} 75%,
    ${startColor} 90%,
    ${endColor} 100%
  )`;
}

// Enhanced version of the page transition with mouse position
function triggerDramaticTransition(fromColor, toColor) {
  const overlay = document.createElement('div');
  overlay.className = 'gradient-overlay';
  
  // Create a dramatic cone gradient
  overlay.style.background = createDramaticGradient(fromColor, toColor);
  
  // Position based on last mouse position instead of center
  overlay.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  
  document.body.appendChild(overlay);
  
  // Trigger animation after a short delay
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

// Enhance the default click handler
document.addEventListener('click', (e) => {
  // Check if clicked element is a link to another page on the site
  if (e.target.closest('a') && 
      e.target.closest('a').href && 
      e.target.closest('a').href.includes(window.location.hostname) &&
      !e.target.closest('a').href.includes('#') &&
      !e.target.closest('a').getAttribute('target')) {
    
    const link = e.target.closest('a');
    const fromColor = getCurrentPageColor();
    
    // Determine target page color
    let targetPath = new URL(link.href).pathname;
    let targetType = 'home';
    
    if (targetPath === '/' || targetPath === '/index.html') targetType = 'home';
    else if (targetPath.includes('/releases')) targetType = 'releases';
    else if (targetPath.includes('/performances')) targetType = 'performances';
    else if (targetPath.includes('/works')) targetType = 'works';
    else if (targetPath.includes('/about')) targetType = 'about';
    else if (targetPath.includes('/inquiry')) targetType = 'inquiry';
    
    const toColor = pageColors[targetType];
    
    // Use mouse position where the link was clicked
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Trigger the dramatic transition
    triggerDramaticTransition(fromColor, toColor);
    
    // Store the color for the next page
    localStorage.setItem('previousPageColor', fromColor);
  }
}); 