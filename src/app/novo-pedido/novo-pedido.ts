import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar';
import { ModalProdutoComponent } from "../../components/modal-produto/modalProduto";

@Component({
  selector: 'app-novo-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, ModalProdutoComponent],
  templateUrl: './novo-pedido.html',
  styleUrls: ['./novo-pedido.scss'],
})
export class NovoPedido {
  cliente = '';
  private router = inject(Router);

  categorias = ['Todos', 'Lanches', 'Acompanhamentos', 'Bebidas'];
  categoriaSelecionada = 'Todos';

  produtos = [
    {
      nome: 'Hambúrguer Clássico',
      preco: 22,
      categoria: 'Lanches',
      emoji: '🍔',
      descricao: 'Hambúrguer tradicional artesanal.',
      ingredientes: [
        'Pão brioche',
        'Hambúrguer bovino',
        'Queijo cheddar',
        'Alface',
        'Tomate',
        'Molho especial'
      ]
    },

    {
      nome: 'X-Bacon',
      preco: 28,
      categoria: 'Lanches',
      emoji: '🥓',
      descricao: 'Hambúrguer com bastante bacon crocante.',
      ingredientes: [
        'Pão brioche',
        'Hambúrguer bovino',
        'Bacon crocante',
        'Queijo cheddar',
        'Molho barbecue'
      ]
    },

    {
      nome: 'X-Salada',
      preco: 25,
      categoria: 'Lanches',
      emoji: '🥗',
      descricao: 'Lanche leve com salada fresca.',
      ingredientes: [
        'Pão brioche',
        'Hambúrguer bovino',
        'Queijo',
        'Alface',
        'Tomate',
        'Cebola roxa',
        'Molho verde'
      ]
    },

    {
      nome: 'Hot Dog',
      preco: 15,
      categoria: 'Lanches',
      emoji: '🌭',
      descricao: 'Cachorro-quente completo.',
      ingredientes: [
        'Pão',
        'Salsicha',
        'Batata palha',
        'Milho',
        'Molho de tomate',
        'Maionese'
      ]
    },

    {
      nome: 'Batata Frita',
      preco: 12,
      categoria: 'Acompanhamentos',
      emoji: '🍟',
      descricao: 'Batatas fritas crocantes.',
      ingredientes: [
        'Batata',
        'Sal',
        'Molho opcional'
      ]
    },

    {
      nome: 'Onion Rings',
      preco: 14,
      categoria: 'Acompanhamentos',
      emoji: '🧅',
      descricao: 'Anéis de cebola empanados.',
      ingredientes: [
        'Cebola',
        'Farinha crocante',
        'Tempero especial'
      ]
    },

    {
      nome: 'Nuggets',
      preco: 16,
      categoria: 'Acompanhamentos',
      emoji: '🍗',
      descricao: 'Nuggets de frango empanados.',
      ingredientes: [
        'Frango',
        'Empanado crocante',
        'Molho especial'
      ]
    },

    {
      nome: 'Coca-Cola',
      preco: 7,
      categoria: 'Bebidas',
      emoji: '🥤',
      descricao: 'Refrigerante gelado.',
      ingredientes: [
        '350ml'
      ]
    },

    {
      nome: 'Guaraná',
      preco: 7,
      categoria: 'Bebidas',
      emoji: '🧃',
      descricao: 'Refrigerante sabor guaraná.',
      ingredientes: [
        '350ml'
      ]
    },

    {
      nome: 'Água',
      preco: 4,
      categoria: 'Bebidas',
      emoji: '💧',
      descricao: 'Água mineral sem gás.',
      ingredientes: [
        '500ml'
      ]
    },

    {
      nome: 'Suco Natural',
      preco: 10,
      categoria: 'Bebidas',
      emoji: '🍊',
      descricao: 'Suco natural feito na hora.',
      ingredientes: [
        'Fruta natural',
        'Gelo',
        'Açúcar opcional'
      ]
    },

    {
      nome: 'Milk Shake',
      preco: 18,
      categoria: 'Bebidas',
      emoji: '🥛',
      descricao: 'Milk shake cremoso e gelado.',
      ingredientes: [
        'Sorvete',
        'Leite',
        'Cobertura',
        'Chantilly'
      ]
    }
  ];

  carrinho: any[] = [];
  produtoSelecionado: any = null;

  protected acessarRota(rota: string) {
    this.router.navigate([rota]);
  }

  selecionarCategoria(cat: string) {
    this.categoriaSelecionada = cat;
  }

  produtosFiltrados() {
    if (this.categoriaSelecionada === 'Todos') return this.produtos;
    return this.produtos.filter((p) => p.categoria === this.categoriaSelecionada);
  }

  adicionarAoCarrinho(produto: any) {
    const itemExistente = this.carrinho.find((p) => p.nome === produto.nome);

    if (itemExistente) {
      itemExistente.qtd++;
    } else {
      this.carrinho.push({ ...produto, qtd: 1 });
    }
  }

  aumentarQtd(index: number) {
    this.carrinho[index].qtd++;
  }

  diminuirQtd(index: number) {
    if (this.carrinho[index].qtd > 1) {
      this.carrinho[index].qtd--;
    } else {
      this.carrinho.splice(index, 1);
    }
  }

  total() {
    return this.carrinho.reduce((sum, item) => sum + item.preco * item.qtd, 0);
  }

  confirmarPedido() {
    console.log('Pedido:', this.carrinho);
    this.carrinho = [];
    this.cliente = '';
    this.acessarRota('/confirmar-pedido');

  }
  modalAberto = false;

  abrirDetalhes(produto: any) {
    this.produtoSelecionado = produto;
  }

  fecharModal() {
  this.produtoSelecionado = null;
}
}
