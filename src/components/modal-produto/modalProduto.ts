import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

const ICONE_POR_CATEGORIA: Record<string, string> = {
  Lanches: 'bi-egg-fried',
  Acompanhamentos: 'bi-basket3',
  Bebidas: 'bi-cup-straw',
};

@Component({
  selector: 'app-modal-produto',
  imports: [CommonModule],
  templateUrl: './modal-produto.html',
  styleUrls: ['./modal-produto.scss']
})
export class ModalProdutoComponent {
  @Input() produto: any = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() adicionar = new EventEmitter<any>();

  get iconeProduto(): string {
    const nomeCategoria = this.produto?.categoria?.nome ?? this.produto?.categoria;
    return ICONE_POR_CATEGORIA[nomeCategoria] ?? 'bi-basket3';
  }

  fecharModal() {
    this.fechar.emit();
  }

  adicionarProduto() {
    this.adicionar.emit(this.produto);
    this.fecharModal();
  }
}