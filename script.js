const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');
const yearTitle = document.getElementById('year-title');
const yearImage = document.getElementById('year-image');
const yearInfo = document.getElementById('year-info');
const categoryButtons = document.querySelectorAll('.category-btn');
const memoryInput = document.getElementById('memory-input');
const submitMemory = document.getElementById('submit-memory');

let currentCategory = 'all';

// Nostalgia data with Pexels images
const nostalgiaData = {
    1980: {
        all: "Disco fades, Rubik’s Cube launches, *Empire Strikes Back* hits.",
        tech: "Rubik’s Cube puzzles the world, arcade games peak.",
        music: "Disco’s last gasp—Blondie’s *Call Me* rules.",
        movies: "*Empire Strikes Back*—Vader drops the bomb.",
        image: "https://images.pexels.com/photos/5425588/pexels-photo-5425588.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    1985: {
        all: "*Back to the Future* zaps in, NES lands, Madonna reigns.",
        tech: "Nintendo Entertainment System brings Mario home.",
        music: "Madonna’s *Like a Virgin* owns the charts.",
        movies: "*Back to the Future*—Marty rewinds time.",
        image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    1990: {
        all: "Game Boy grips kids, *Home Alone* steals Xmas, grunge brews.",
        tech: "Game Boy’s Tetris addiction spreads.",
        music: "Nirvana’s grunge whispers start with *Bleach*.",
        movies: "*Home Alone*—Kevin’s pizza and traps.",
        image: "https://images.pexels.com/photos/38568/gameboy-color-nintendo-retro-38568.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    1995: {
        all: "PlayStation drops, *Toy Story* animates, Oasis vs. Blur.",
        tech: "Sony PlayStation redefines gaming.",
        music: "Oasis’ *Wonderwall* battles Blur’s *Country House*.",
        movies: "*Toy Story*—Pixar’s first big buzz.",
        image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    2000: {
        all: "Y2K flops, Nokia 3310 vibes, *Gladiator* slays.",
        tech: "Nokia 3310—indestructible brick phone.",
        music: "Eminem’s *Stan* haunts the airwaves.",
        movies: "*Gladiator*—Maximus roars in the arena.",
        image: "https://images.pexels.com/photos/3541916/pexels-photo-3541916.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    2005: {
        all: "YouTube boots up, *Batman Begins*, MySpace peaks.",
        tech: "YouTube launches—cat videos incoming.",
        music: "Green Day’s *American Idiot* resurges punk.",
        movies: "*Batman Begins*—Nolan’s dark knight rises.",
        image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300"
    },
    2010: {
        all: "Instagram snaps in, iPad reshapes, *Inception* dreams.",
        tech: "Apple iPad—tablets go mainstream.",
        music: "Lady Gaga’s *Bad Romance* slays pop.",
        movies: "*Inception*—dreams within dreams.",
        image: "https://images.pexels.com/photos/257923/pexels-photo-257923.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    2015: {
        all: "Netflix booms, *Mad Max: Fury Road*, streaming wars.",
        tech: "Netflix doubles down on originals.",
        music: "The Weeknd’s *Can’t Feel My Face* vibes.",
        movies: "*Mad Max: Fury Road*—insane desert chases.",
        image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    2020: {
        all: "Lockdowns hit, TikTok explodes, *The Last Dance* streams.",
        tech: "TikTok—short vids take over.",
        music: "Billie Eilish’s *Everything I Wanted* haunts.",
        movies: "*The Last Dance*—Jordan’s final shot.",
        image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    2025: {
        all: "AI art booms, *Avatar 3* lands, retro’s back big.",
        tech: "AI tools like Grok (hey, that’s me!) rule.",
        music: "Synthwave revival—nostalgia’s sound.",
        movies: "*Avatar 3*—Pandora’s next chapter.",
        image: "https://images.pexels.com/photos/5185436/pexels-photo-5185436.jpeg?auto=compress&cs=tinysrgb&w=300"
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
    yearInfo.textContent = yearData[currentCategory] || userMemories[year] || "No vibes yet—add your own!";
    yearImage.src = yearData.image || '';
    yearImage.style.display = yearData.image ? 'block' : 'none';
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
