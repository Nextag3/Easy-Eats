import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type TipoLancamento = 'Ganho' | 'Gasto';
type FiltroLancamento = 'Todos' | 'Ganhos' | 'Gastos';

interface Lancamento {
  id: number;
  descricao: string;
  categoria: string;
  data: string;
  valor: number;
  tipo: TipoLancamento;
}

@Component({
  selector: 'app-gestao-financeira',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestao-financeira.html',
  styleUrl: './gestao-financeira.scss',
})
export class GestaoFinanceira {
  filtroAtivo: FiltroLancamento = 'Todos';

  lancamentos: Lancamento[] = [
    { id: 1, descricao: 'Venda no balcão', categoria: 'Vendas', data: '2026-07-28', valor: 620, tipo: 'Ganho' },
    { id: 2, descricao: 'Compra de carne bovina', categoria: 'Insumos', data: '2026-07-27', valor: 1250, tipo: 'Gasto' },
    { id: 3, descricao: 'Venda delivery', categoria: 'Vendas', data: '2026-07-27', valor: 340, tipo: 'Ganho' },
    { id: 4, descricao: 'Conta de energia', categoria: 'Utilidades', data: '2026-07-26', valor: 480, tipo: 'Gasto' },
    { id: 5, descricao: 'Venda no balcão', categoria: 'Vendas', data: '2026-07-25', valor: 510, tipo: 'Ganho' },
    { id: 6, descricao: 'Salário funcionários', categoria: 'Folha de Pagamento', data: '2026-07-24', valor: 3200, tipo: 'Gasto' },
    { id: 7, descricao: 'Compra de embalagens', categoria: 'Insumos', data: '2026-07-23', valor: 210, tipo: 'Gasto' },
    { id: 8, descricao: 'Venda evento corporativo', categoria: 'Vendas', data: '2026-07-22', valor: 1800, tipo: 'Ganho' },
  ];

  get lancamentosFiltrados(): Lancamento[] {
    if (this.filtroAtivo === 'Ganhos') {
      return this.lancamentos.filter((l) => l.tipo === 'Ganho');
    }
    if (this.filtroAtivo === 'Gastos') {
      return this.lancamentos.filter((l) => l.tipo === 'Gasto');
    }
    return this.lancamentos;
  }

  get totalGanhos(): number {
    return this.lancamentos
      .filter((l) => l.tipo === 'Ganho')
      .reduce((soma, l) => soma + l.valor, 0);
  }

  get totalGastos(): number {
    return this.lancamentos
      .filter((l) => l.tipo === 'Gasto')
      .reduce((soma, l) => soma + l.valor, 0);
  }

  get saldo(): number {
    return this.totalGanhos - this.totalGastos;
  }

  selecionarFiltro(filtro: FiltroLancamento) {
    this.filtroAtivo = filtro;
  }
}
