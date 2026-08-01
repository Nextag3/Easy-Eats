import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  cliente: string;
  itens: { nome: string; quantidade: number }[];
  horario: string;
  status: 'aguardando' | 'preparando' | 'pronto';
  total: number;
}

@Component({
  selector: 'app-historico-vendas',
  standalone: true,
  templateUrl: './historico-vendas.html',
  styleUrls: ['./historico-vendas.scss'],
  imports: [CommonModule, FormsModule],
})
export class HistoricoVendasComponent {
  busca = '';

  filtros = ['Todos', 'Aguardando', 'Preparando', 'Pronto'];
  filtroSelecionado = 'Todos';

  pedidos: Pedido[] = [
    {
      id: 1,
      cliente: 'João',
      itens: [
        { nome: 'Hambúrguer Clássico', quantidade: 2 },
        { nome: 'Batata Frita', quantidade: 1 },
        { nome: 'Coca-Cola', quantidade: 2 },
      ],
      horario: '02:21',
      status: 'preparando',
      total: 70,
    },
    {
      id: 2,
      cliente: 'Maria',
      itens: [
        { nome: 'X-Bacon', quantidade: 1 },
        { nome: 'Onion Rings', quantidade: 1 },
      ],
      horario: '02:21',
      status: 'aguardando',
      total: 42,
    },
  ];

  selecionarFiltro(filtro: string) {
    this.filtroSelecionado = filtro;
  }

  get pedidosFiltrados() {
    return this.pedidos
      .filter((pedido) => {
        if (this.filtroSelecionado === 'Todos') return true;

        return (
          pedido.status.toLowerCase() ===
          this.filtroSelecionado.toLowerCase()
        );
      })
      .filter((pedido) => {
        const termo = this.busca.toLowerCase();

        return (
          pedido.cliente.toLowerCase().includes(termo) ||
          pedido.id.toString().includes(termo)
        );
      });
  }

  get totalFiltrado() {
    return this.pedidosFiltrados.reduce(
      (total, pedido) => total + pedido.total,
      0
    );
  }

  get totalPedidos() {
    return this.pedidosFiltrados.length;
  }
}