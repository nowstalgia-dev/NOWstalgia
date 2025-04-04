const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');
const yearTitle = document.getElementById('year-title');
const yearImages = document.getElementById('year-images');
const yearInfo = document.getElementById('year-info');
const categoryButtons = document.querySelectorAll('.category-btn');
const memoryInput = document.getElementById('memory-input');
const submitMemory = document.getElementById('submit-memory');
const modal = document.getElementById('marketplace-modal');
const modalTitle = document.getElementById('modal-title');
const modalBuy = document.getElementById('modal-buy');
const modalStream = document.getElementById('modal-stream');
const modalMarketplace = document.getElementById('modal-marketplace');
const modalClose = document.getElementById('modal-close');

let currentCategory = 'all';
let swiper;

// Marketplace data for each year (example links)
const marketplaceData = {
    1980: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=rubiks+cube+vintage", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=disco+records", stream: "https://open.spotify.com/playlist/37i9dQZF1DX1MUPbVKMgJE", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=empire+strikes+back+poster", stream: "https://www.disneyplus.com/movies/star-wars-the-empire-strikes-back-episode-v/12NlK7V043jG", marketplace: "#" }
        ]
    },
    1985: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=nintendo+nes+console", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=back+to+the+future+poster", stream: "https://www.netflix.com/title/60010110", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=madonna+like+a+virgin+vinyl", stream: "https://open.spotify.com/album/2MTi4yA1xPPG0yHNqHiuS0", marketplace: "#" }
        ]
    },
    1990: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=gameboy+original", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=home+alone+poster", stream: "https://www.disneyplus.com/movies/home-alone/77lKvdDccO2o", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=nirvana+bleach+vinyl", stream: "https://open.spotify.com/album/1rGIP9k6b3S2z5vT3qQMCG", marketplace: "#" }
        ]
    },
    1995: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=playstation+1+console", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=toy+story+poster", stream: "https://www.disneyplus.com/movies/toy-story/6kS7z1S6x1Zq", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=oasis+wonderwall+vinyl", stream: "https://open.spotify.com/track/5qqabIl2Q0u6bVwZpRsMPQ", marketplace: "#" }
        ]
    },
    2000: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=nokia+3310", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=gladiator+poster", stream: "https://www.netflix.com/title/60000805", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=eminem+stan+vinyl", stream: "https://open.spotify.com/track/3UmaczJpikHgJFBRCHkMmx", marketplace: "#" }
        ]
    },
    2005: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=old+computer", stream: "https://www.youtube.com/about/", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=batman+begins+poster", stream: "https://www.hbomax.com/movies/batman-begins", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=green+day+american+idiot+vinyl", stream: "https://open.spotify.com/album/5dN7F9DV0Qg1XRdBeAqR8B", marketplace: "#" }
        ]
    },
    2010: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=apple+ipad+1st+generation", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=inception+poster", stream: "https://www.netflix.com/title/70131314", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=lady+gaga+bad+romance+vinyl", stream: "https://open.spotify.com/track/0SiywuOBRcynK0uKGWdCnn", marketplace: "#" }
        ]
    },
    2015: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=smart+tv", stream: "https://www.netflix.com", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=mad+max+fury+road+poster", stream: "https://www.hbomax.com/movies/mad-max-fury-road", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=the+weeknd+cant+feel+my+face+vinyl", stream: "https://open.spotify.com/track/6RS6O1V2OormANf6UzD7yx", marketplace: "#" }
        ]
    },
    2020: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=smartphone", stream: "https://www.tiktok.com", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=the+last+dance+poster", stream: "https://www.netflix.com/title/80203144", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=billie+eilish+everything+i+wanted+vinyl", stream: "https://open.spotify.com/track/3ZCTVFBt2Brf31RLEnCkWJ", marketplace: "#" }
        ]
    },
    2025: {
        images: [
            { buy: "https://www.ebay.com/sch/i.html?_nkw=ai+art+print", stream: "", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=avatar+3+poster", stream: "https://www.disneyplus.com", marketplace: "#" },
            { buy: "https://www.ebay.com/sch/i.html?_nkw=synthwave+vinyl", stream: "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7Aq8oUk", marketplace: "#" }
        ]
    }
};

// Nostalgia data with multiple images per year
const nostalgiaData = {
    1980: {
        all: "Disco fades, Rubik’s Cube launches, *Empire Strikes Back* hits. <a href='https://www.ebay.com/sch/i.html?_nkw=rubiks+cube+vintage' target='_blank'>Get a Rubik’s Cube</a>",
        tech: "Rubik’s Cube puzzles the world, arcade games peak. <a href='https://www.ebay.com/sch/i.html?_nkw=rubiks+cube+vintage' target='_blank'>Buy one</a>",
        music: "Disco’s last gasp—Blondie’s *Call Me* rules.",
        movies: "*Empire Strikes Back*—Vader drops the bomb.",
        images: [
            "https://images.pexels.com/photos/5425588/pexels-photo-5425588.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    1985: {
        all: "*Back to the Future* zaps in, NES lands, Madonna reigns. <a href='https://www.ebay.com/sch/i.html?_nkw=nintendo+nes+console' target='_blank'>Grab an NES</a>",
        tech: "Nintendo Entertainment System brings Mario home. <a href='https://www.ebay.com/sch/i.html?_nkw=nintendo+nes+console' target='_blank'>Buy it</a>",
        music: "Madonna’s *Like a Virgin* owns the charts.",
        movies: "*Back to the Future*—Marty rewinds time.",
        images: [
            "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    1990: {
        all: "Game Boy grips kids, *Home Alone* steals Xmas, grunge brews. <a href='https://www.ebay.com/sch/i.html?_nkw=gameboy+original' target='_blank'>Score a Game Boy</a>",
        tech: "Game Boy’s Tetris addiction spreads. <a href='https://www.ebay.com/sch/i.html?_nkw=gameboy+original' target='_blank'>Get it</a>",
        music: "Nirvana’s grunge whispers start with *Bleach*.",
        movies: "*Home Alone*—Kevin’s pizza and traps.",
        images: [
            "https://images.pexels.com/photos/38568/gameboy-color-nintendo-retro-38568.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3541916/pexels-photo-3541916.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    1995: {
        all: "PlayStation drops, *Toy Story* animates, Oasis vs. Blur. <a href='https://www.ebay.com/sch/i.html?_nkw=playstation+1+console' target='_blank'>Snag a PlayStation</a>",
        tech: "Sony PlayStation redefines gaming. <a href='https://www.ebay.com/sch/i.html?_nkw=playstation+1+console' target='_blank'>Buy it</a>",
        music: "Oasis’ *Wonderwall* battles Blur’s *Country House*.",
        movies: "*Toy Story*—Pixar’s first big buzz.",
        images: [
            "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2000: {
        all: "Y2K flops, Nokia 3310 vibes, *Gladiator* slays. <a href='https://www.ebay.com/sch/i.html?_nkw=nokia+3310' target='_blank'>Hunt a Nokia 3310</a>",
        tech: "Nokia 3310—indestructible brick phone. <a href='https://www.ebay.com/sch/i.html?_nkw=nokia+3310' target='_blank'>Get it</a>",
        music: "Eminem’s *Stan* haunts the airwaves.",
        movies: "*Gladiator*—Maximus roars in the arena.",
        images: [
            "https://images.pexels.com/photos/3541916/pexels-photo-3541916.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2005: {
        all: "YouTube boots up, *Batman Begins*, MySpace peaks. <a href='https://www.youtube.com/about/' target='_blank'>Visit YouTube</a>",
        tech: "YouTube launches—cat videos incoming. <a href='https://www.youtube.com/about/' target='_blank'>Check it</a>",
        music: "Green Day’s *American Idiot* resurges punk.",
        movies: "*Batman Begins*—Nolan’s dark knight rises.",
        images: [
            "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2010: {
        all: "Instagram snaps in, iPad reshapes, *Inception* dreams. <a href='https://www.ebay.com/sch/i.html?_nkw=apple+ipad+1st+generation' target='_blank'>Grab an iPad</a>",
        tech: "Apple iPad—tablets go mainstream. <a href='https://www.ebay.com/sch/i.html?_nkw=apple+ipad+1st+generation' target='_blank'>Buy it</a>",
        music: "Lady Gaga’s *Bad Romance* slays pop.",
        movies: "*Inception*—dreams within dreams.",
        images: [
            "https://images.pexels.com/photos/257923/pexels-photo-257923.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3541916/pexels-photo-3541916.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2015: {
        all: "Netflix booms, *Mad Max: Fury Road*, streaming wars. <a href='https://www.netflix.com' target='_blank'>Stream Netflix</a>",
        tech: "Netflix doubles down on originals. <a href='https://www.netflix.com' target='_blank'>Watch it</a>",
        music: "The Weeknd’s *Can’t Feel My Face* vibes.",
        movies: "*Mad Max: Fury Road*—insane desert chases.",
        images: [
            "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2020: {
        all: "Lockdowns hit, TikTok explodes, *The Last Dance* streams. <a href='https://www.tiktok.com' target='_blank'>Join TikTok</a>",
        tech: "TikTok—short vids take over. <a href='https://www.tiktok.com' target='_blank'>Get it</a>",
        music: "Billie Eilish’s *Everything I Wanted* haunts.",
        movies: "*The Last Dance*—Jordan’s final shot.",
        images: [
            "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3541916/pexels-photo-3541916.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/257923/pexels-photo-257923.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    2025: {
        all: "AI art booms, *Avatar 3* lands, retro’s back big. <a href='https://www.ebay.com/sch/i.html?_nkw=retro+synth' target='_blank'>Score a synth</a>",
        tech: "AI tools like Grok (hey, that’s me!) rule. <a href='https://www.ebay.com/sch/i.html?_nkw=retro+synth' target='_blank'>Buy one</a>",
        music: "Synthwave revival—nostalgia’s sound.",
        movies: "*Avatar 3*—Pandora’s next chapter.",
        images: [
            "https://images.pexels.com/photos/5185436/pexels-photo-5185436.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    }
};

// Load user-submitted memories from localStorage
let userMemories = JSON.parse(localStorage.getItem('userMemories')) || {};

// Update content based on slider and category
function updateContent() {
    const year = slider.value;
    yearDisplay.textContent = year;
    yearTitle.textContent = year;
    const yearData = nostalgiaData[year] || {};
    yearInfo.innerHTML = yearData[currentCategory] || userMemories[year] || "No vibes yet—add your own!";

    // Clear previous images
    yearImages.innerHTML = '';

    // Duplicate images to ensure enough slides for balanced display
    const images = yearData.images || [];
    const duplicatedImages = [...images, ...images];

    // Add duplicated images to Swiper with click handlers
    duplicatedImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${image}" alt="Nostalgia Image">`;
        slide.dataset.index = index % images.length; // Map to original image index
        slide.dataset.year = year;
        slide.addEventListener('click', handleImageClick);
        yearImages.appendChild(slide);
    });

    // Reinitialize Swiper
    if (swiper) swiper.destroy();
    swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        loopAdditionalSlides: 3,
        initialSlide: Math.floor(images.length / 2),
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    setTimeout(() => {
        swiper.update();
        swiper.slideToLoop(Math.floor(images.length / 2), 0);
    }, 100);
}

// Handle image click to show modal
function handleImageClick(event) {
    const year = event.currentTarget.dataset.year;
    const index = event.currentTarget.dataset.index;
    const links = marketplaceData[year]?.images[index] || {};

    // Update modal content
    modalTitle.textContent = `Explore ${year} Nostalgia`;
    modalBuy.onclick = () => window.open(links.buy || '#', '_blank');
    modalStream.onclick = () => window.open(links.stream || '#', '_blank');
    modalMarketplace.onclick = () => window.open(links.marketplace || '#', '_blank');

    // Show/hide buttons based on available links
    modalBuy.style.display = links.buy ? 'block' : 'none';
    modalStream.style.display = links.stream ? 'block' : 'none';
    modalMarketplace.style.display = links.marketplace ? 'block' : 'none';

    // Show modal
    modal.style.display = 'flex';
}

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

slider.addEventListener('input', updateContent);

// Category button logic
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        updateContent();
    });
});

// Submit memory logic
submitMemory.addEventListener('click', () => {
    const year = slider.value;
    const memory = memoryInput.value.trim();
    if (memory) {
        userMemories[year] = memory;
        localStorage.setItem('userMemories', JSON.stringify(userMemories));
        memoryInput.value = '';
        updateContent();
    }
});

// Initial load
updateContent();
