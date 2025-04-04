const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');
const yearTitle = document.getElementById('year-title');
const yearImages = document.getElementById('year-images');
const yearInfo = document.getElementById('year-info');
const categoryButtons = document.querySelectorAll('.category-btn');
const memoryInput = document.getElementById('memory-input');
const submitMemory = document.getElementById('submit-memory');

let currentCategory = 'all';
let swiper;

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

    // Add new images to Swiper
    const images = yearData.images || [];
    images.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${image}" alt="Nostalgia Image">`;
        yearImages.appendChild(slide);
    });

    // Reinitialize Swiper
    if (swiper) swiper.destroy();
    swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true, // Infinite scroll
        loopAdditionalSlides: 3, // Pre-fill with more slides for balance
        loopPreventsSlide: false, // Ensure smooth looping
        initialSlide: 1, // Start on the second slide to balance
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

    // Force Swiper to re-render after a slight delay to ensure loop fills both sides
    setTimeout(() => {
        swiper.update();
        swiper.slideToLoop(1, 0); // Move to the second slide to ensure balance
    }, 100);
}

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
