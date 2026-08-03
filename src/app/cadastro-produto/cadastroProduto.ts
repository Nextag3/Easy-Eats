import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalCadastroProduto } from '../../components/modal-cadastro-produto/modal-cadastro-produto';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalCadastroProduto],
  templateUrl: './cadastroProduto.html',
  styleUrls: ['./cadastroProduto.scss'],
})
export class CadastroProdutoComponent {
  currentYear = new Date().getFullYear();

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    estoque: new FormControl('', Validators.required),
  });

  produtoParaConfirmar: any = null;

  abrirModalConfirmacao() {
    if (this.form.valid) {
      this.produtoParaConfirmar = { ...this.form.value };
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  fecharModal() {
    this.produtoParaConfirmar = null;
  }

  finalizarCadastro(produtoConfirmado: any) {
    console.log('Dados do produto salvos:', produtoConfirmado);
    alert('Produto salvo com sucesso!');
    this.form.reset();
    this.fecharModal();
  }
}
