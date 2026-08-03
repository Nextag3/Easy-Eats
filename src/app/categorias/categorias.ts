import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  produtosVinculados: number;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {
  private fb = new FormBuilder();
  private proximoId = 5;

  editandoId: number | null = null;

  categorias: Categoria[] = [
    { id: 1, nome: 'Lanches', descricao: 'Hambúrgueres, hot dogs e sanduíches', produtosVinculados: 6 },
    { id: 2, nome: 'Bebidas', descricao: 'Refrigerantes, sucos e água', produtosVinculados: 5 },
    { id: 3, nome: 'Acompanhamentos', descricao: 'Porções e extras', produtosVinculados: 3 },
    { id: 4, nome: 'Sobremesas', descricao: 'Doces e milk shakes', produtosVinculados: 1 },
  ];

  form = this.fb.group({
    nome: ['', Validators.required],
    descricao: [''],
  });

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, descricao } = this.form.value;

    if (this.editandoId !== null) {
      const categoria = this.categorias.find((c) => c.id === this.editandoId);
      if (categoria) {
        categoria.nome = nome!;
        categoria.descricao = descricao ?? '';
      }
      this.editandoId = null;
    } else {
      this.categorias.push({
        id: this.proximoId++,
        nome: nome!,
        descricao: descricao ?? '',
        produtosVinculados: 0,
      });
    }

    this.form.reset();
  }

  editar(categoria: Categoria) {
    this.editandoId = categoria.id;
    this.form.setValue({ nome: categoria.nome, descricao: categoria.descricao });
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.form.reset();
  }

  excluir(categoria: Categoria) {
    if (categoria.produtosVinculados > 0) {
      alert(`Não é possível excluir "${categoria.nome}": há ${categoria.produtosVinculados} produto(s) vinculado(s).`);
      return;
    }

    if (confirm(`Excluir a categoria "${categoria.nome}"?`)) {
      this.categorias = this.categorias.filter((c) => c.id !== categoria.id);
    }
  }
}
