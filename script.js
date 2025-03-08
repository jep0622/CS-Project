// Common utility scripts

// Function to get URL parameters - cached version for improved performance
const getUrlParameter = (() => {
    const paramCache = {};
    
    return function(name) {
        // Return from cache if available
        if (paramCache[name] !== undefined) {
            return paramCache[name];
        }
        
        const formattedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + formattedName + '=([^&#]*)');
        const results = regex.exec(location.search);
        const value = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        
        // Cache the result
        paramCache[name] = value;
        
        return value;
    };
})();

// Toggle dropdown functionality
function toggleDropdown(headerElement, contentElement) {
    contentElement.classList.toggle('show');
    headerElement.classList.toggle('active');
    
    // Update border radius based on state
    headerElement.style.borderRadius = contentElement.classList.contains('show') ? 
        '5px 5px 0 0' : '5px';
}

// Ridiculous confetti animation from chatgpt
function showConfetti() {
  const confettiCount = 100;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Animate the confetti falling
    const animation = confetti.animate(
      [
        { transform: `translate(0, 0) rotate(${Math.random() * 360}deg)` },
        { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight}px) rotate(${Math.random() * 720}deg)` }
      ],
      {
        duration: Math.random() * 2000 + 1000,
        easing: 'cubic-bezier(.37,1.04,.68,.98)'
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}