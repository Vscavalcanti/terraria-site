export type ImpactLevel = 'critico' | 'alto' | 'moderado' | 'baixo';
export type BugStatus = 'corrigido' | 'nao-corrigido' | 'parcial';
export type Platform = 'PC' | 'Console' | 'Mobile' | 'Todas as plataformas';

export type CategoryKey =
  | 'biomas'
  | 'armas'
  | 'acessorios'
  | 'mana'
  | 'inimigos'
  | 'npcs'
  | 'bosses'
  | 'worldgen'
  | 'multiplayer'
  | 'interface'
  | 'crashes'
  | 'exploits';

export interface BugSource {
  label: string;
  url?: string;
}

export interface Bug {
  id: string;
  name: string;
  category: CategoryKey;
  biome?: string; // biome key, only for biome-specific bugs
  version: string; // version most associated with the bug being active/reported
  introducedVersion?: string; // "Introduzido em"
  firstDocumentedVersion?: string; // "Primeira versão documentada"
  reportedDate?: string; // "Primeiro relato" DD/MM/AAAA
  description: string; // "Como acontecia"
  reproduction?: string; // "Como reproduzir"
  consequence: string;
  impact: ImpactLevel;
  platform: Platform;
  fixedVersion?: string;
  fixedDate?: string;
  fixDescription?: string;
  status: BugStatus;
  sources: BugSource[];
  featured?: boolean;
  causesCrash?: boolean;
  image?: string; // caminho em /public para o item/personagem/estrutura do bug
}

export interface VersionEntry {
  version: string;
  date: string; // DD/MM/AAAA
  name?: string;
  summary: string;
  bugIds: string[]; // bugs fixed in this version
}

export interface BiomeInfo {
  key: string;
  label: string;
  icon: string;
  audioFile: string; // filename inside /audio/biomes/
  accent: string; // hex color
  particle: 'leaves' | 'sand' | 'vines' | 'snow' | 'bubbles' | 'spores' | 'embers' | 'sparkles' | 'shadow' | 'blood' | 'bones' | 'stars' | 'none';
}

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  icon: string;
  description: string;
}
