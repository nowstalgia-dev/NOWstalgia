const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');
const yearTitle = document.getElementById('year-title');
const yearInfo = document.getElementById('year-info');

const nostalgiaData = {
    1980: "Disco’s last dance, Rubik’s Cube drops, *Empire Strikes Back* rules the galaxy.",
    1990: "Game Boy grips kids, *Home Alone* steals Christmas, grunge whispers start.",
    2000: "Y2K fizzles, Nokia 3310 vibes, *Gladiator* slays the Oscars.",
    2010: "Instagram snaps in, iPad reshapes tech, *Inception* dreams big.",
    2020: "Lockdowns hit, TikTok takes over, *The Last Dance* dunks on streaming."
};

slider.addEventListener('input', () => {
    const year = slider.value;
    yearDisplay.textContent = year;
    yearTitle.textContent = year;
    yearInfo.textContent = nostalgiaData[year] || "No vibes yet—add your own!";
});
