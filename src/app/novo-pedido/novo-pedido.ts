import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ModalProdutoComponent } from '../../components/modal-produto/modalProduto';
import { AuthService } from '../auth/auth.service';
import { Produto, ProdutoService } from '../cadastro-produto/produto.service';
import { Mesa, MesaService } from '../mesas/mesa.service';
import { ItemVendaService } from './item-venda.service';
import { STATUS_PEDIDO, VendaService } from './venda.service';

const ICONE_POR_CATEGORIA: Record<string, string> = {
  Lanches: 'bi-egg-fried',
  Acompanhamentos: 'bi-basket3',
  Bebidas: 'bi-cup-straw',
};

interface ItemCarrinho {
  produto: Produto;
  qtd: number;
}

@Component({
  selector: 'app-novo-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalProdutoComponent],
  templateUrl: './novo-pedido.html',
  styleUrls: ['./novo-pedido.scss'],
})
export class NovoPedido implements OnInit {
  private produtoService = inject(ProdutoService);
  private mesaService = inject(MesaService);
  private vendaService = inject(VendaService);
  private itemVendaService = inject(ItemVendaService);
  protected authService = inject(AuthService);

  cliente = '';
  mesaSelecionada: number | null = null;

  produtos: Produto[] = [];
  mesas: Mesa[] = [];

  categorias: string[] = ['Todos'];
  categoriaSelecionada = 'Todos';

  carregando = true;
  enviando = false;
  erro: string | null = null;
  sucesso = false;

  carrinho: ItemCarrinho[] = [];
  produtoSelecionado: Produto | null = null;

  get usaMesa(): boolean {
    return this.authService.temFuncionalidade('OPERACAO');
  }

  ngOnInit() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos.filter((p) => p.flAtivo !== false);
        const nomesCategorias = new Set(
          this.produtos.map((p) => p.categoria?.nome).filter((nome): nome is string => !!nome),
        );
        this.categorias = ['Todos', ...nomesCategorias];
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os produtos.';
        this.carregando = false;
      },
    });

    if (this.usaMesa) {
      this.mesaService.listar().subscribe((mesas) => (this.mesas = mesas));
    }
  }

  selecionarCategoria(cat: string) {
    this.categoriaSelecionada = cat;
  }

  iconeCategoria(nomeCategoria?: string | null): string {
    if (!nomeCategoria) return 'bi-basket3';
    return ICONE_POR_CATEGORIA[nomeCategoria] ?? 'bi-basket3';
  }

  produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') return this.produtos;
    return this.produtos.filter((p) => p.categoria?.nome === this.categoriaSelecionada);
  }

  adicionarAoCarrinho(produto: Produto) {
    const itemExistente = this.carrinho.find((item) => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.qtd++;
    } else {
      this.carrinho.push({ produto, qtd: 1 });
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

  total(): number {
    return this.carrinho.reduce((soma, item) => soma + item.produto.preco * item.qtd, 0);
  }

  podeFinalizar(): boolean {
    if (this.carrinho.length === 0) return false;
    return this.usaMesa ? this.mesaSelecionada !== null || !!this.cliente.trim() : true;
  }

  confirmarPedido() {
    if (!this.podeFinalizar() || this.enviando) {
      return;
    }

    const usuarioId = this.authService.usuario()?.id;
    if (!usuarioId) {
      this.erro = 'Sessão inválida, faça login novamente.';
      return;
    }

    this.enviando = true;
    this.erro = null;

    const mesa = this.usaMesa && this.mesaSelecionada ? { id: this.mesaSelecionada } : null;

    this.vendaService
      .criar({
        status: STATUS_PEDIDO.AGUARDANDO,
        tipo: mesa ? 'Mesa' : 'Balcão',
        mesa,
        nomeCliente: this.cliente.trim() || null,
        usuario: { id: usuarioId },
      })
      .subscribe({
        next: (venda) => this.enviarItens(venda.id),
        error: () => {
          this.enviando = false;
          this.erro = 'Não foi possível criar o pedido. Tente novamente.';
        },
      });
  }

  private enviarItens(vendaId: number) {
    const chamadas = this.carrinho.map((item) =>
      this.itemVendaService.criar({
        venda: { id: vendaId },
        produto: { id: item.produto.id },
        quantidade: item.qtd,
        preco_unitario: item.produto.preco,
        valor_total: item.produto.preco * item.qtd,
      }),
    );

    forkJoin(chamadas).subscribe({
      next: () => {
        this.enviando = false;
        this.sucesso = true;
        this.carrinho = [];
        this.cliente = '';
        this.mesaSelecionada = null;
        setTimeout(() => (this.sucesso = false), 4000);
      },
      error: () => {
        this.enviando = false;
        this.erro = 'O pedido foi criado, mas houve um problema ao salvar os itens.';
      },
    });
  }

  abrirDetalhes(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  fecharModal() {
    this.produtoSelecionado = null;
  }
}
