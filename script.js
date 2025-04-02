const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');
const yearTitle = document.getElementById('year-title');
const yearInfo = document.getElementById('year-info');
const categoryButtons = document.querySelectorAll('.category-btn');

let currentCategory = 'all';

// Expanded nostalgia data with categories
const nostalgiaData = {
    1980: {
        all: "Disco fades, Rubik’s Cube launches, *Empire Strikes Back* hits.",
        tech: "Rubik’s Cube puzzles the world, arcade games peak.",
        music: "Disco’s last gasp—Blondie’s *Call Me* rules.",
        movies: "*Empire Strikes Back*—Vader drops the bomb."
    },
    1985: {
        all: "*Back to the Future* zaps in, NES lands, Madonna reigns.",
        tech: "Nintendo Entertainment System brings Mario home.",
        music: "Madonna’s *Like a Virgin* owns the charts.",
        movies: "*Back to the Future*—Marty rewinds time."
    },
    1990: {
        all: "Game Boy grips kids, *Home Alone* steals Xmas, grunge brews.",
        tech: "Game Boy’s Tetris addiction spreads.",
        music: "Nirvana’s grunge whispers start with *Bleach*.",
        movies: "*Home Alone*—Kevin’s pizza and traps."
    },
    1995: {
        all: "PlayStation drops, *Toy Story* animates, Oasis vs. Blur.",
        tech: "Sony PlayStation redefines gaming.",
        music: "Oasis’ *Wonderwall* battles Blur’s *Country House*.",
        movies: "*Toy Story*—Pixar’s first big buzz."
    },
    2000: {
        all: "Y2K flops, Nokia 3310 vibes, *Gladiator* slays.",
        tech: "Nokia 3310—indestructible brick phone.",
        music: "Eminem’s *Stan* haunts the airwaves.",
        movies: "*Gladiator*—Maximus roars in the arena."
    },
    2005: {
        all: "YouTube boots up, *Batman Begins*, MySpace peaks.",
        tech: "YouTube launches—cat videos incoming.",
        music: "Green Day’s *American Idiot* resurges punk.",
        movies: "*Batman Begins*—Nolan’s dark knight rises."
    },
    2010: {
        all: "Instagram snaps in, iPad reshapes, *Inception* dreams.",
        tech: "Apple iPad—tablets go mainstream.",
        music: "Lady Gaga’s *Bad Romance* slays pop.",
        movies: "*Inception*—dreams within dreams."
    },
    2015: {
        all: "Netflix booms, *Mad Max: Fury Road*, streaming wars.",
        tech: "Netflix doubles down on originals.",
        music: "The Weeknd’s *Can’t Feel My Face* vibes.",
        movies: "*Mad Max: Fury Road*—insane desert chases."
    },
    2020: {
        all: "Lockdowns hit, TikTok explodes, *The Last Dance* streams.",
        tech: "TikTok—short vids take over.",
        music: "Billie Eilish’s *Everything I Wanted* haunts.",
        movies: "*The Last Dance*—Jordan’s final shot."
    },
    2025: {
        all: "AI art booms, *Avatar 3* lands, retro’s back big.",
        tech: "AI tools like Grok (hey, that’s me!) rule.",
        music: "Synthwave revival—nostalgia’s sound.",
        movies: "*Avatar 3*—Pandora’s next chapter."
    }
};

// Update content based on slider and category
function updateContent() {
    const year = slider.value;
    yearDisplay.textContent = year;
    yearTitle.textContent = year;
    const yearData = nostalgiaData[year] || {};
    yearInfo.textContent = yearData[currentCategory] || "No vibes yet—add your own!";
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

// Initial load
updateContent();
