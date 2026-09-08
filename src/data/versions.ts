import { VersionEntry } from '../types/bug';

export const VERSIONS: VersionEntry[] = [
  {
    version: '1.4.5.0',
    date: '27/01/2026',
    name: 'Bigger and Boulder',
    summary: 'Atualização principal com reformulação de geração de mundo, novos seeds especiais combináveis e diversas correções de estruturas geradas incorretamente.',
    bugIds: ['living-wood-chest-loot', 'floating-island-paintings', 'jungle-temple-no-pressure-plate', 'mushroom-chest-jungle-loot', 'underground-cabins-outside-world', 'boulder-traps-overlap'],
  },
  { version: '1.4.5.1', date: '28/01/2026', summary: 'Hotfix inicial pós-lançamento da 1.4.5.0.', bugIds: [] },
  { version: '1.4.5.2', date: '28/01/2026', summary: 'Segundo hotfix do mesmo dia, focado em estabilidade.', bugIds: [] },
  { version: '1.4.5.3', date: '30/01/2026', summary: 'Hotfix de estabilidade.', bugIds: [] },
  { version: '1.4.5.4', date: '04/02/2026', summary: 'Correções de acessórios (Roller Skates, Reindeer Bells), posicionamento da entrada da Dungeon e efeitos visuais.', bugIds: ['roller-skates-fire-immunity', 'reindeer-bells-quickequip', 'dungeon-entrance-floating-island', 'sandstorm-visuals-desert', 'snow-aurora-title-screen'] },
  { version: '1.4.5.5', date: '10/02/2026', summary: 'Hotfix de estabilidade.', bugIds: [] },
  { version: '1.4.5.6', date: '09/03/2026', summary: 'Hotfix de manutenção.', bugIds: [] },
  {
    version: '1.4.5.7',
    date: '19/08/2026',
    summary: 'Última hotfix planejada do "Bigger and Boulder", com foco pesado em balanceamento, novos itens, rework do sistema de mana e do Moon Lord, além de uma extensa lista de correções de bugs. Introduziu, sem querer, o bug do Acorn Slingshot.',
    bugIds: [
      'acorn-slingshot-ammo-overlap',
      'mana-rework-context',
      'hornet-deceleration',
      'librarian-skeleton-teleport',
      'confused-enemies-web-animation',
      'npc-arriving-homeless',
      'multiplayer-clothing-color-swap',
      'moonlord-contact-damage',
      'jungle-temple-altar-ceiling',
      'proton-crash',
      'seed-special-characters-crash',
      'secret-seed-combo-collapse',
      'malicious-packet-exploit',
    ],
  },
  {
    version: '1.4.5.8',
    date: '23/08/2026',
    summary: 'Hotfix corretiva focada em limpar problemas específicos, alguns deles introduzidos pela própria 1.4.5.7 — incluindo o bug crítico do Acorn Slingshot.',
    bugIds: ['acorn-slingshot-universe', 'mana-regen-band-stack', 'roller-skates-wings', 'quick-buff-slow-magic-reset', 'salamander-bestiary-crash', 'exploit-1458-unspecified'],
  },
  {
    version: '1.4.5.8.5 Mobile',
    date: '03/09/2026',
    summary: 'Ajustes específicos para a build Mobile, sincronizando correções da linha 1.4.5.7/1.4.5.8.',
    bugIds: [],
  },
];
