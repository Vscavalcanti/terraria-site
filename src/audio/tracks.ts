// Playlist "genérica" usada por categorias que não têm bioma associado
// (Armas, Acessórios, Mana, Inimigos, NPCs, Bosses, World Generation,
// Multiplayer, Crashes, Exploits). Coloque os arquivos reais em
// /public/audio/random/. Se um arquivo não existir, o player simplesmente
// pula para o próximo e continua funcionando normalmente.
export const RANDOM_TRACKS: string[] = ['random1.mp3', 'random2.mp3', 'random3.mp3', 'random4.mp3', 'random5.mp3'];

export const BIOME_AUDIO_DIR = '/audio/biomes/';
export const RANDOM_AUDIO_DIR = '/audio/random/';
