import { BiomeInfo } from '../types/bug';

// Cada bioma aponta para um arquivo em /public/audio/biomes/.
// Se o arquivo não existir, o AudioManager cai automaticamente no fallback silencioso.
export const BIOMES: BiomeInfo[] = [
  { key: 'forest', label: 'Floresta', icon: '🌲', audioFile: 'forest.mp3', accent: '#6fae4a', particle: 'leaves' },
  { key: 'desert', label: 'Deserto', icon: '🏜️', audioFile: 'desert.mp3', accent: '#d9b26a', particle: 'sand' },
  { key: 'jungle', label: 'Selva', icon: '🌴', audioFile: 'jungle.mp3', accent: '#2f9e4f', particle: 'vines' },
  { key: 'snow', label: 'Neve', icon: '❄️', audioFile: 'snow.mp3', accent: '#bfe3ec', particle: 'snow' },
  { key: 'ocean', label: 'Oceano', icon: '🌊', audioFile: 'ocean.mp3', accent: '#3f8fc9', particle: 'bubbles' },
  { key: 'mushroom', label: 'Glowing Mushroom', icon: '🍄', audioFile: 'mushroom.mp3', accent: '#4fd6c0', particle: 'spores' },
  { key: 'underground', label: 'Underground', icon: '⛏️', audioFile: 'underground.mp3', accent: '#8a7256', particle: 'none' },
  { key: 'cavern', label: 'Cavern', icon: '🪨', audioFile: 'cavern.mp3', accent: '#6b6b76', particle: 'none' },
  { key: 'dungeon', label: 'Dungeon', icon: '🏰', audioFile: 'dungeon.mp3', accent: '#5b7bb0', particle: 'bones' },
  { key: 'hallow', label: 'Hallow', icon: '🌈', audioFile: 'hallow.mp3', accent: '#e28fd0', particle: 'sparkles' },
  { key: 'corruption', label: 'Corruption', icon: '🟣', audioFile: 'corruption.mp3', accent: '#7a5ec7', particle: 'shadow' },
  { key: 'crimson', label: 'Crimson', icon: '🔴', audioFile: 'crimson.mp3', accent: '#b23a48', particle: 'blood' },
  { key: 'jungletemple', label: 'Jungle Temple', icon: '🏛️', audioFile: 'jungletemple.mp3', accent: '#3f8f5f', particle: 'none' },
  { key: 'beehive', label: 'Bee Hive', icon: '🐝', audioFile: 'beehive.mp3', accent: '#e0b032', particle: 'none' },
  { key: 'floatingislands', label: 'Floating Islands', icon: '☁️', audioFile: 'space.mp3', accent: '#9fd6e8', particle: 'stars' },
  { key: 'underworld', label: 'Underworld', icon: '🔥', audioFile: 'underworld.mp3', accent: '#c9522f', particle: 'embers' },
  { key: 'graveyard', label: 'Graveyard', icon: '💀', audioFile: 'graveyard.mp3', accent: '#7d8471', particle: 'bones' },
];

export const biomeByKey = (key?: string) => BIOMES.find((b) => b.key === key);
