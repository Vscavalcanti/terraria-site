# Terraria Bug Archive

Site React + TypeScript (Vite) que documenta bugs, exploits e falhas históricas do Terraria, organizados por bioma, categoria e versão, com trilha sonora ambiente e um modo de apresentação.

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  audio/       AudioManager e lista de faixas
  components/  Nav, Player, BugCard, BugDetail, FilterBar
  data/        BUGS, VERSIONS, BIOMES, CATEGORIES
  hooks/       useAudio, usePresentationMode
  pages/       Home, Biomes, Category, Timeline, Dashboard
  styles/      global.css
  types/       tipos compartilhados (Bug, VersionEntry, BiomeInfo, CategoryInfo)
```

Áudio é opcional: coloque os MP3s em `public/audio/biomes/` e `public/audio/random/` (nomes de arquivo em `src/data/biomes.ts` e `src/audio/tracks.ts`). Sem os arquivos, o player continua funcionando normalmente em modo silencioso.
