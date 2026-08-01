import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  private fb = new FormBuilder();
  private proximoId = 5;

  editandoId: number | null = null;
  busca = '';

  clientes: Cliente[] = [
    { id: 1, nome: 'Ana Paula Ferreira', telefone: '(11) 98765-4321', email: 'ana.ferreira@email.com', cpf: '123.456.789-00' },
    { id: 2, nome: 'Carlos Eduardo Souza', telefone: '(11) 91234-5678', email: 'carlos.souza@email.com', cpf: '' },
    { id: 3, nome: 'Mariana Costa Lima', telefone: '(11) 99876-1234', email: 'mariana.lima@email.com', cpf: '987.654.321-00' },
    { id: 4, nome: 'João Pedro Almeida', telefone: '(11) 93456-7890', email: 'joao.almeida@email.com', cpf: '' },
  ];

  form = this.fb.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: [''],
  });

  get clientesFiltrados(): Cliente[] {
    const termo = this.busca.toLowerCase().trim();
    if (!termo) {
      return this.clientes;
    }
    return this.clientes.filter((c) => c.nome.toLowerCase().includes(termo));
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, telefone, email, cpf } = this.form.value;

    if (this.editandoId !== null) {
      const cliente = this.clientes.find((c) => c.id === this.editandoId);
      if (cliente) {
        cliente.nome = nome!;
        cliente.telefone = telefone!;
        cliente.email = email!;
        cliente.cpf = cpf ?? '';
      }
      this.editandoId = null;
    } else {
      this.clientes.push({
        id: this.proximoId++,
        nome: nome!,
        telefone: telefone!,
        email: email!,
        cpf: cpf ?? '',
      });
    }

    this.form.reset();
  }

  editar(cliente: Cliente) {
    this.editandoId = cliente.id;
    this.form.setValue({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      cpf: cliente.cpf,
    });
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.form.reset();
  }

  excluir(cliente: Cliente) {
    if (confirm(`Excluir o cliente "${cliente.nome}"?`)) {
      this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
    }
  }
}
