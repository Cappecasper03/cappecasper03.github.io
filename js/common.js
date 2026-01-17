document.addEventListener('DOMContentLoaded', () => {
    // Scroll Spy & Nav Pill Logic
    const sections = ['about', 'games', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const navPill = document.getElementById('nav-pill');

    function updateActivePill() {
        if (!navPill) return;

        let currentSection = '';

        // Check if we are at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSection = 'contact';
        } else {
            // Find which section is currently active
            const reversedSections = [...sections].reverse();
            for (const sectionId of reversedSections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // If section top is above the middle of screen, considered active
                    if (rect.top <= window.innerHeight / 2) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
        }

        // Update pill position
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-white');
                link.classList.remove('text-gray-400');

                // Move pill - calculate position relative to the nav container
                const linkRect = link.getBoundingClientRect();
                const navContainer = document.querySelector('.glass-nav');
                const navRect = navContainer.getBoundingClientRect();

                // Calculate relative position accounting for padding/nesting
                const navStyle = window.getComputedStyle(navContainer);
                const borderLeft = parseFloat(navStyle.borderLeftWidth) || 0;
                const relativeX = linkRect.left - navRect.left - borderLeft;

                navPill.style.width = `${linkRect.width}px`;
                navPill.style.transform = `translateX(${relativeX}px)`;
                navPill.style.opacity = '1';
            } else {
                link.classList.add('text-gray-400');
                link.classList.remove('text-white');
            }
        });

        // Hide pill if no section active (scrolled to top)
        if (!currentSection) {
            navPill.style.opacity = '0';
        }
    }

    // Attach listeners
    window.addEventListener('scroll', updateActivePill);
    window.addEventListener('resize', updateActivePill);

    // Initial call
    updateActivePill();

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
    // We target images inside grids or specifically marked containers to avoid opening ui icons
    const potentialImages = document.querySelectorAll('.grid img, .glass-panel img:not(.icon)');
    potentialImages.forEach((img, index) => {
        // Simple check to ensure we aren't clicking a small icon
        if (img.width < 100 || img.height < 100) return;

        img.addEventListener('click', function () {
            // Re-query in case of dynamic content, but usually static
            galleryImages = Array.from(potentialImages).filter(i => i.width >= 100);
            // Find the real index in the filtered list
            currentImageIndex = galleryImages.indexOf(img);

            showImage(currentImageIndex);
            openOverlay();
        });
    });

    function openOverlay() {
        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
        // Force reflow
        void overlay.offsetWidth;
        overlay.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
    }

    // Previous image button
    if (prevButton) {
        prevButton.addEventListener('click', function (e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentImageIndex);
        });
    }

    // Next image button
    if (nextButton) {
        nextButton.addEventListener('click', function (e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(currentImageIndex);
        });
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', function (e) {
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
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.tagName === 'BUTTON' || e.target.closest('#closeOverlay')) {
            closeImageOverlay();
        }
    });

    // Function to show image at specific index
    function showImage(index) {
        if (galleryImages.length === 0) return;
        const img = galleryImages[index];
        overlayImage.src = img.src;
        overlayImage.alt = img.alt;
    }

    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    document.body.style.overflow = ''; // Reset body overflow
    startHeroNameTyping();

    function startHeroNameTyping() {
        // Hero name typing animation (only on index.html)
        const heroNameElement = document.getElementById('hero-name');
        if (heroNameElement) {
            const originalName = "Casper Juvas"; // Hardcoded or read from data attribute if needed, existing code used current textContent
            // But since I changed HTML structure, let's just ensure it types "Casper Juvas" or respects the span structure.
            // My new HTML has <span class="text-white">Casper</span><span class="...">Juvas</span>
            // This typing animation might break that structure.
            // Let's simplified the typing animation to just blink the caret or simply skip complex text replacement to avoid breaking the gradient spans.
            // The CSS 'caret' class is doing the blinking. 
            // I will disable the text-emptying logic to preserve the specific HTML, or just let it blink.
            // The existing implementation wipes textContent. New HTML has styled spans. Wiping it would lose styles.
            // I will COMMENT OUT the destructive typing logic and just leave the cursor blinking.
        }
    }
});

// Function to close the image overlay
function closeImageOverlay() {
    const overlay = document.getElementById('imageOverlay');
    overlay.classList.add('opacity-0');

    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}
