import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Fornecedor {
  id: number;
  nome: string;
  contato: string;
  categoria: string;
}

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedores.html',
  styleUrl: './fornecedores.scss',
})
export class Fornecedores {
  private fb = new FormBuilder();
  private proximoId = 5;

  editandoId: number | null = null;

  fornecedores: Fornecedor[] = [
    { id: 1, nome: 'Frigorífico Boa Carne', contato: '(11) 98765-4321', categoria: 'Carnes' },
    { id: 2, nome: 'Distribuidora Águas Claras', contato: '(11) 91234-5678', categoria: 'Bebidas' },
    { id: 3, nome: 'Embalagens Rápidas Ltda', contato: '(11) 99887-6655', categoria: 'Embalagens' },
    { id: 4, nome: 'Hortifruti Sabor da Terra', contato: '(11) 93344-2211', categoria: 'Hortifruti' },
  ];

  form = this.fb.group({
    nome: ['', Validators.required],
    contato: ['', Validators.required],
    categoria: ['', Validators.required],
  });

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, contato, categoria } = this.form.value;

    if (this.editandoId !== null) {
      const fornecedor = this.fornecedores.find((f) => f.id === this.editandoId);
      if (fornecedor) {
        fornecedor.nome = nome!;
        fornecedor.contato = contato!;
        fornecedor.categoria = categoria!;
      }
      this.editandoId = null;
    } else {
      this.fornecedores.push({
        id: this.proximoId++,
        nome: nome!,
        contato: contato!,
        categoria: categoria!,
      });
    }

    this.form.reset();
  }

  editar(fornecedor: Fornecedor) {
    this.editandoId = fornecedor.id;
    this.form.setValue({
      nome: fornecedor.nome,
      contato: fornecedor.contato,
      categoria: fornecedor.categoria,
    });
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.form.reset();
  }

  excluir(fornecedor: Fornecedor) {
    if (confirm(`Excluir o fornecedor "${fornecedor.nome}"?`)) {
      this.fornecedores = this.fornecedores.filter((f) => f.id !== fornecedor.id);
    }
  }
}
