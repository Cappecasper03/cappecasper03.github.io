document.addEventListener('DOMContentLoaded', () => {
    const navHeight = document.querySelector('nav').offsetHeight;

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image overlay functionality
    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Add click handlers to all gallery images
    document.querySelectorAll('.grid img').forEach((img, index) => {
        img.addEventListener('click', function() {
            // Update gallery images array in case DOM has changed
            galleryImages = Array.from(document.querySelectorAll('.grid img'));
            currentImageIndex = index;
            showImage(currentImageIndex);
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Previous image button
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Next image button
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (overlay.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeImageOverlay();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showImage(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showImage(currentImageIndex);
            }
        }
    });

    // Close overlay when clicking outside the image
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.tagName === 'BUTTON') {
            closeImageOverlay();
        }
    });

    // Function to show image at specific index
    function showImage(index) {
        const img = galleryImages[index];
        overlayImage.src = img.src;
        overlayImage.alt = img.alt;
    }

    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (loadingScreen) {
        if (!hasVisited) {
            sessionStorage.setItem('hasVisited', 'true');
            loadingScreen.style.display = 'flex'; // Show loading screen
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = ''; // Reset body overflow
                startHeroNameTyping();
            }, 1000); // Hide after 1 second
        } else {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = ''; // Reset body overflow
            startHeroNameTyping();
        }
    }

    function startHeroNameTyping() {
        // Hero name typing animation (only on index.html)
        const heroNameElement = document.getElementById('hero-name');
        if (heroNameElement) {
            const originalName = heroNameElement.textContent;
            heroNameElement.textContent = ''; // Clear content initially
            let charIndex = 0;
            const typingSpeed = 100; // milliseconds per character

            function typeHeroName() {
                if (charIndex < originalName.length) {
                    heroNameElement.textContent += originalName.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeHeroName, typingSpeed);
                } else {
                    const caretSpan = document.createElement('span');
                    caretSpan.textContent = '|';
                    caretSpan.classList.add('caret');
                    heroNameElement.appendChild(caretSpan);
                }
            }

            typeHeroName();
        }
    }
});

// Function to close the image overlay
function closeImageOverlay() {
    const overlay = document.getElementById('imageOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}