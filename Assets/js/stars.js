// Enhanced star creation script with variable brightness and shooting stars
function createStars() {
    const backgroundContainer = document.querySelector('.background-container');
    const starCount = 70; // Base star count
    
    // Create regular twinkling stars with varied brightness
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Randomly assign brightness class
      const brightness = Math.random();
      if (brightness < 0.3) {
        star.classList.add('star-dim');
      } else if (brightness < 0.6) {
        star.classList.add('star-medium');
      } else if (brightness < 0.9) {
        star.classList.add('star-bright');
      } else {
        star.classList.add('star-very-bright');
      }
      
      // Random size based on brightness
      let size;
      if (star.classList.contains('star-dim')) {
        size = Math.random() * 1.5 + 1; // 1-2.5px
      } else if (star.classList.contains('star-medium')) {
        size = Math.random() * 1.5 + 1.5; // 1.5-3px
      } else if (star.classList.contains('star-bright')) {
        size = Math.random() * 1.5 + 2; // 2-3.5px
      } else {
        size = Math.random() * 2 + 3; // 3-5px
      }
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position with better distribution
      const margin = 5;
      star.style.left = `${margin + Math.random() * (100 - margin * 2)}%`;
      star.style.top = `${margin + Math.random() * (100 - margin * 2)}%`;
      
      // Random animation delay for more natural twinkling
      star.style.animationDelay = `${Math.random() * 10}s`;
      
      backgroundContainer.appendChild(star);
    }
    
    // Create a few exceptionally bright stars
    for (let i = 0; i < 8; i++) {
      const brightStar = document.createElement('div');
      brightStar.classList.add('star', 'star-very-bright');
      
      // Slightly larger than regular stars
      const size = Math.random() * 2 + 4; // 4-6px
      brightStar.style.width = `${size}px`;
      brightStar.style.height = `${size}px`;
      
      // Random position
      brightStar.style.left = `${10 + Math.random() * 80}%`;
      brightStar.style.top = `${10 + Math.random() * 80}%`;
      
      // More pronounced animation
      brightStar.style.animationDuration = `${4 + Math.random() * 3}s`;
      brightStar.style.animationDelay = `${Math.random() * 4}s`;
      
      backgroundContainer.appendChild(brightStar);
    }
    
    // Set up shooting stars to appear occasionally
    setupShootingStars(backgroundContainer);
  }
  
  // Function to handle shooting stars
  function setupShootingStars(container) {
    // Create several shooting star elements that will be reused
    const shootingStarCount = 3;
    const shootingStars = [];
    
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      container.appendChild(shootingStar);
      shootingStars.push(shootingStar);
    }
    
    // Function to trigger a shooting star
    function triggerShootingStar() {
      // Pick a random shooting star element
      const starIndex = Math.floor(Math.random() * shootingStarCount);
      const shootingStar = shootingStars[starIndex];
      
      // Reset any existing animation
      shootingStar.style.animation = 'none';
      
      // Set a random start position in the top third of the screen
      const startX = 30 + Math.random() * 50; // 30-80% from left
      const startY = Math.random() * 30; // 0-30% from top
      shootingStar.style.left = `${startX}%`;
      shootingStar.style.top = `${startY}%`;
      
      // Force reflow to ensure animation restart
      shootingStar.offsetHeight;
      
      // Choose a random animation
      const animations = ['shooting-star-1', 'shooting-star-2', 'shooting-star-3'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      
      // Apply the animation
      shootingStar.style.animation = `${randomAnimation} 6s linear forwards`;
      
      // Schedule the next shooting star after a random delay
      const nextDelay = 10000 + Math.random() * 20000; // 10-30 seconds
      setTimeout(triggerShootingStar, nextDelay);
    }
    
    // Initial trigger with a delay to let the page load fully
    setTimeout(() => {
      triggerShootingStar();
      
      // Add a second trigger with offset to make the pattern less predictable
      setTimeout(triggerShootingStar, 15000);
      
      // Add a third trigger with another offset
      setTimeout(triggerShootingStar, 25000);
    }, 5000);
  }
  
  // Call this function when the page loads
  window.addEventListener('load', createStars);