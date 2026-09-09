// Playlist "genérica" usada por categorias que não têm bioma associado
// (Armas, Acessórios, Mana, Inimigos, NPCs, Bosses, World Generation,
// Multiplayer, Crashes, Exploits). Coloque mais arquivos em /public/audio/
// e liste-os aqui para variar a playlist aleatória. Se um arquivo não
// existir, o player simplesmente pula para o próximo e continua
// funcionando normalmente.
export const RANDOM_TRACKS: string[] = ['theme.mp3'];

// Ainda não há uma trilha exclusiva por bioma — todos usam a mesma faixa
// por enquanto. Para dar um som único a um bioma, adicione o arquivo em
// /public/audio/ e troque o "audioFile" dele em src/data/biomes.ts.
export const BIOME_AUDIO_DIR = '/audio/';
export const RANDOM_AUDIO_DIR = '/audio/';
