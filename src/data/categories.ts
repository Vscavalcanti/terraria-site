import { CategoryInfo } from '../types/bug';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'biomas', label: 'Biomas', icon: '🗺️', description: 'Bugs organizados por bioma, com trilha sonora de ambientação.' },
  { key: 'armas', label: 'Armas', icon: '⚔️', description: 'Falhas em projéteis, dano e comportamento de armas.' },
  { key: 'acessorios', label: 'Acessórios', icon: '💍', description: 'Efeitos indevidos ou ausentes em acessórios equipáveis.' },
  { key: 'mana', label: 'Mana', icon: '🔷', description: 'Regeneração, consumo e balanceamento do sistema de mana.' },
  { key: 'inimigos', label: 'Inimigos', icon: '👾', description: 'Comportamento incorreto de IA, movimentação e status de inimigos.' },
  { key: 'npcs', label: 'NPCs', icon: '🧑‍🌾', description: 'Moradia, conquistas e interações relacionadas a NPCs.' },
  { key: 'bosses', label: 'Bosses', icon: '👹', description: 'Ataques, dano de contato e sincronização de bosses.' },
  { key: 'worldgen', label: 'World Generation', icon: '🌍', description: 'Estruturas, loot e posicionamento incorretos na geração de mundo.' },
  { key: 'multiplayer', label: 'Multiplayer', icon: '🌐', description: 'Crashes e inconsistências específicas de sessões multiplayer.' },
  { key: 'interface', label: 'Interface', icon: '🖥️', description: 'Poluição visual e problemas de HUD.' },
  { key: 'crashes', label: 'Crashes', icon: '💥', description: 'Falhas que derrubam o processo do jogo.' },
  { key: 'exploits', label: 'Exploits', icon: '🕳️', description: 'Falhas de segurança, duplicação de itens e abusos de rede.' },
];

export const categoryByKey = (key?: string) => CATEGORIES.find((c) => c.key === key);
