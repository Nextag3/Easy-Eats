import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  unidade: string;
}

interface Movimentacao {
  id: string;
  nomeProduto: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: Date;
}

const ICONE_POR_CATEGORIA: Record<string, string> = {
  Pães: 'bi-basket3',
  Carnes: 'bi-fire',
  Laticínios: 'bi-egg',
  Vegetais: 'bi-flower1',
  Congelados: 'bi-snow',
  Bebidas: 'bi-cup-straw',
};

@Component({
  selector: 'app-controle-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controle-estoque.html',
  styleUrls: ['./controle-estoque.scss'],
})
export class ControleEstoque implements OnInit {
  produtos: Produto[] = [
    { id: '1', nome: 'Pão de Hambúrguer', categoria: 'Pães', quantidade: 15, quantidadeMinima: 30, unidade: 'un' },
    { id: '2', nome: 'Carne Bovina', categoria: 'Carnes', quantidade: 8, quantidadeMinima: 20, unidade: 'kg' },
    { id: '3', nome: 'Queijo Cheddar', categoria: 'Laticínios', quantidade: 12, quantidadeMinima: 15, unidade: 'kg' },
    { id: '4', nome: 'Alface', categoria: 'Vegetais', quantidade: 25, quantidadeMinima: 20, unidade: 'un' },
    { id: '5', nome: 'Tomate', categoria: 'Vegetais', quantidade: 30, quantidadeMinima: 25, unidade: 'kg' },
    { id: '6', nome: 'Batata Congelada', categoria: 'Congelados', quantidade: 5, quantidadeMinima: 15, unidade: 'kg' },
    { id: '7', nome: 'Refrigerante', categoria: 'Bebidas', quantidade: 40, quantidadeMinima: 30, unidade: 'un' },
  ];

  movimentacoes: Movimentacao[] = [
    { id: '1', nomeProduto: 'Pão de Hambúrguer', tipo: 'saida', quantidade: 10, data: new Date(2026, 4, 20, 19, 30) },
    { id: '2', nomeProduto: 'Carne Bovina', tipo: 'entrada', quantidade: 20, data: new Date(2026, 4, 19, 14, 15) },
    { id: '3', nomeProduto: 'Refrigerante', tipo: 'saida', quantidade: 15, data: new Date(2026, 4, 18, 20, 0) },
  ];

  estoqueBaixo: Produto[] = [];

  ngOnInit(): void {
    this.estoqueBaixo = this.produtos.filter((p) => p.quantidade < p.quantidadeMinima);
  }

  iconeCategoria(categoria: string): string {
    return ICONE_POR_CATEGORIA[categoria] ?? 'bi-box-seam';
  }
}
