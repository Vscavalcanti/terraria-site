import { BiomeInfo } from '../types/bug';

// Cada bioma aponta para um arquivo em /public/audio/. Por enquanto todos
// usam a mesma faixa (theme.mp3); para dar som próprio a um bioma, coloque
// o arquivo em /public/audio/ e troque o audioFile dele abaixo.
// Se o arquivo não existir, o AudioManager cai automaticamente no fallback silencioso.
export const BIOMES: BiomeInfo[] = [
  { key: 'forest', label: 'Floresta', icon: '🌲', audioFile: 'theme.mp3', accent: '#6fae4a', particle: 'leaves' },
  { key: 'desert', label: 'Deserto', icon: '🏜️', audioFile: 'theme.mp3', accent: '#d9b26a', particle: 'sand' },
  { key: 'jungle', label: 'Selva', icon: '🌴', audioFile: 'theme.mp3', accent: '#2f9e4f', particle: 'vines' },
  { key: 'snow', label: 'Neve', icon: '❄️', audioFile: 'theme.mp3', accent: '#bfe3ec', particle: 'snow' },
  { key: 'ocean', label: 'Oceano', icon: '🌊', audioFile: 'theme.mp3', accent: '#3f8fc9', particle: 'bubbles' },
  { key: 'mushroom', label: 'Glowing Mushroom', icon: '🍄', audioFile: 'theme.mp3', accent: '#4fd6c0', particle: 'spores' },
  { key: 'underground', label: 'Underground', icon: '⛏️', audioFile: 'theme.mp3', accent: '#8a7256', particle: 'none' },
  { key: 'cavern', label: 'Cavern', icon: '🪨', audioFile: 'theme.mp3', accent: '#6b6b76', particle: 'none' },
  { key: 'dungeon', label: 'Dungeon', icon: '🏰', audioFile: 'theme.mp3', accent: '#5b7bb0', particle: 'bones' },
  { key: 'hallow', label: 'Hallow', icon: '🌈', audioFile: 'theme.mp3', accent: '#e28fd0', particle: 'sparkles' },
  { key: 'corruption', label: 'Corruption', icon: '🟣', audioFile: 'theme.mp3', accent: '#7a5ec7', particle: 'shadow' },
  { key: 'crimson', label: 'Crimson', icon: '🔴', audioFile: 'theme.mp3', accent: '#b23a48', particle: 'blood' },
  { key: 'jungletemple', label: 'Jungle Temple', icon: '🏛️', audioFile: 'theme.mp3', accent: '#3f8f5f', particle: 'none' },
  { key: 'beehive', label: 'Bee Hive', icon: '🐝', audioFile: 'theme.mp3', accent: '#e0b032', particle: 'none' },
  { key: 'floatingislands', label: 'Floating Islands', icon: '☁️', audioFile: 'theme.mp3', accent: '#9fd6e8', particle: 'stars' },
  { key: 'underworld', label: 'Underworld', icon: '🔥', audioFile: 'theme.mp3', accent: '#c9522f', particle: 'embers' },
  { key: 'graveyard', label: 'Graveyard', icon: '💀', audioFile: 'theme.mp3', accent: '#7d8471', particle: 'bones' },
];

export const biomeByKey = (key?: string) => BIOMES.find((b) => b.key === key);
