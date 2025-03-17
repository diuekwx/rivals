import { useEffect, useState } from 'react';

const imageModules = import.meta.glob('../assets/hero_images/*.{jpg,jpeg,png,svg,gif}', { eager: true });

const heroColors = {
    "Hulk": "#1D8348", // emerald green
    "Iron_Man": "#C0392B", // crimson red
    "Spider-Man": "#E74C3C", // bright red
    "Captain_America": "#2E86C1", // royal blue
    "Black_Panther": "#17202A", // dark black
    "Doctor_Strange": "#884EA0", // mystic purple
    "Groot": "#6E2C00", // woody brown
    "Rocket_Raccoon": "#7E5109", // raccoon brown
    "Star-Lord": "#B03A2E", // burgundy red
    "Magneto": "#6C3483", // magenta/purple
    "Storm": "#2874A6", // electric blue
    "Psylocke": "#8E44AD", // psychic purple
    "Namor": "#1B4F72", // ocean blue
    "Magik": "#F1C40F", // magical yellow
    "Luna_Snow": "#D6EAF8", // ice blue
    "Peni_Parker": "#F39C12", // bright orange
    "Scarlet_Witch": "#C0392B", // scarlet red
    "Adam_Warlock": "#F39C12", // golden
    "Mantis": "#27AE60", // alien green
    "Loki": "#186A3B", // mischief green
    "Hela": "#1C2833", // dark grey-green
    "Thor": "#2874A6", // lightning blue
    "Black Widow": "#C0392B", // red
    "Hawkeye": "#7D3C98", // purple
    "Winter_Soldier": "#566573", // metallic grey
    "Venom": "#17202A", // symbiote black
    "Cloak_-_Dagger": "#1C2833",
    "Jeff_the_Land_Shark": "#03fcfc",
    "The_Thing": "#e38a24",
    "Human_Torch": "#e6691c",
    "Invisible_Woman": "#0cd7ed",
    "Mr_Fantastic": "#0cd7ed",
    "Wolverine": "#ede90c",
    "Iron_Fist": "#faf764",
    "Moon_Knight": "#ffffff",
    "Punisher": "#4a4a4a",
    "Squirrel_Girl": "#cf7f30",
    "unselected": "#000000"
};

//TODO: font color 
// jquery for onclick
export default function HeroGallery({ setColor }) {
    function getHeroColor(hero) {
        if (heroColors[hero]) {
            setColor(heroColors[hero]);
        } else {
            console.warn(`No color defined for hero: ${hero}`);
            setColor("#cccccc");
        }
    }

    return (
        <div className="gallery flex flex-wrap w-[440px] h-[496px] overflow-auto">
            {Object.entries(imageModules).map(([path, module], index) => {
                const heroPath = path.replace("../assets/hero_images/", "");
                const heroName = heroPath.split('.')[0];
                return (
                    <a 
                        key={index} 
                        onClick={() => getHeroColor(heroName)} 
                        className="w-1/4 p-1 cursor-pointer"
                    >
                        <img src={module.default} alt={`Hero ${heroName}`} />
                    </a>
                );
            })}
        </div>
    );
}