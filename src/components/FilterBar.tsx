import { Bug } from '../types/bug';

export interface Filters {
  query: string;
  version: string;
  status: string;
  impact: string;
  platform: string;
}

export const EMPTY_FILTERS: Filters = { query: '', version: '', status: '', impact: '', platform: '' };

export function applyFilters(bugs: Bug[], f: Filters): Bug[] {
  return bugs.filter((b) => {
    if (f.query && !(`${b.name} ${b.description}`.toLowerCase().includes(f.query.toLowerCase()))) return false;
    if (f.version && b.version !== f.version) return false;
    if (f.status && b.status !== f.status) return false;
    if (f.impact && b.impact !== f.impact) return false;
    if (f.platform && b.platform !== f.platform) return false;
    return true;
  });
}

export function FilterBar({ bugs, filters, onChange }: { bugs: Bug[]; filters: Filters; onChange: (f: Filters) => void }) {
  const versions = Array.from(new Set(bugs.map((b) => b.version))).sort();
  const platforms = Array.from(new Set(bugs.map((b) => b.platform)));

  return (
    <div className="filter-bar">
      <input
        className="filter-input"
        placeholder="🔎 Pesquisar bug por nome ou descrição..."
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
      />
      <select className="filter-select" value={filters.version} onChange={(e) => onChange({ ...filters, version: e.target.value })}>
        <option value="">Versão: todas</option>
        {versions.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
      <select className="filter-select" value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>
        <option value="">Status: todos</option>
        <option value="corrigido">Corrigido</option>
        <option value="nao-corrigido">Não corrigido</option>
        <option value="parcial">Parcial</option>
      </select>
      <select className="filter-select" value={filters.impact} onChange={(e) => onChange({ ...filters, impact: e.target.value })}>
        <option value="">Impacto: todos</option>
        <option value="critico">Crítico</option>
        <option value="alto">Alto</option>
        <option value="moderado">Moderado</option>
        <option value="baixo">Baixo</option>
      </select>
      <select className="filter-select" value={filters.platform} onChange={(e) => onChange({ ...filters, platform: e.target.value })}>
        <option value="">Plataforma: todas</option>
        {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
}
