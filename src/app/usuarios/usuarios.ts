import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Perfil = 'Administrador' | 'Operador';
type Status = 'Ativo' | 'Inativo';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  status: Status;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  private fb = new FormBuilder();
  private proximoId = 5;

  usuarios: Usuario[] = [
    { id: 1, nome: 'Mateus Bitencourt', email: 'mateus.bitencourt@easyeats.com', perfil: 'Administrador', status: 'Ativo' },
    { id: 2, nome: 'Renata Campos', email: 'renata.campos@easyeats.com', perfil: 'Operador', status: 'Ativo' },
    { id: 3, nome: 'João Vitor Pereira', email: 'joao.pereira@easyeats.com', perfil: 'Operador', status: 'Ativo' },
    { id: 4, nome: 'Camila Andrade', email: 'camila.andrade@easyeats.com', perfil: 'Operador', status: 'Inativo' },
  ];

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    perfil: ['Operador' as Perfil, Validators.required],
  });

  adicionar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, email, perfil } = this.form.value;

    this.usuarios.push({
      id: this.proximoId++,
      nome: nome!,
      email: email!,
      perfil: perfil as Perfil,
      status: 'Ativo',
    });

    this.form.reset({ perfil: 'Operador' });
  }
}
