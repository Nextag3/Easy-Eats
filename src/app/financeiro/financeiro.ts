import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  unidade: string;
  preco: number;
  estoque: number;
}

const ICONE_POR_CATEGORIA: Record<string, string> = {
  Lanches: 'bi-egg-fried',
  Bebidas: 'bi-cup-straw',
};

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./financeiro.scss']
})
export class Financeiro implements OnInit {
  abaSelecionada: 'resumo' | 'vendas' | 'despesas' | 'produtos' = 'resumo';
  filtroSelecionado: 'hoje' | 'semana' | 'periodo' = 'hoje';

  busca: string = '';
  estoqueMinimo = 5;

  vendas = 178;
  despesas = 405;

  get lucro(): number {
    return this.vendas - this.despesas;
  }

  get resumo() {
    return {
      pedidos: 3,
      ticketMedio: 59.33,
      despesasRegistradas: 3,
      resultado: this.lucro,
    };
  }

  produtos: Produto[] = [
    { id: 1, nome: 'Hot Dog', categoria: 'Lanches', unidade: 'unidade', preco: 15, estoque: 10 },
    { id: 2, nome: 'Guaraná', categoria: 'Bebidas', unidade: 'unidade', preco: 7, estoque: 3 },
    { id: 3, nome: 'Hambúrguer Clássico', categoria: 'Lanches', unidade: 'unidade', preco: 22, estoque: 8 },
    { id: 4, nome: 'Coca-Cola', categoria: 'Bebidas', unidade: 'unidade', preco: 7, estoque: 6 },
    { id: 5, nome: 'Batata Frita', categoria: 'Lanches', unidade: 'porção', preco: 12, estoque: 2 },
  ];

  produtosFiltrados: Produto[] = [];

  ngOnInit() {
    this.produtosFiltrados = [...this.produtos];
  }

  selecionarAba(aba: any) {
    this.abaSelecionada = aba;
  }

  selecionarFiltro(filtro: any) {
    this.filtroSelecionado = filtro;
  }

  filtrarProdutos() {
    const termo = this.busca.toLowerCase().trim();
    
    if (!termo) {
      this.produtosFiltrados = [...this.produtos];
    } else {
      this.produtosFiltrados = this.produtos.filter(p =>
        p.nome.toLowerCase().includes(termo)
      );
    }
  }

  isEstoqueBaixo(p: Produto) {
    return p.estoque < this.estoqueMinimo;
  }

  iconeCategoria(categoria: string): string {
    return ICONE_POR_CATEGORIA[categoria] ?? 'bi-box-seam';
  }

  novoProduto() {
    console.log('Novo produto');
  }

  editar(p: Produto) {
    console.log('Editar', p);
  }

  excluir(p: Produto) {
    if (confirm(`Excluir ${p.nome}?`)) {
      this.produtos = this.produtos.filter(x => x.id !== p.id);
      this.filtrarProdutos();
    }
  }
}