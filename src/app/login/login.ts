import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class Login {
  modoRecuperarSenha = false;
  showPassword = false;
  currentYear: number = new Date().getFullYear();

  enviando = false;
  erro: string | null = null;
  recuperacaoEnviada = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  recuperarForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  mensagensValidacoes = {
    email: { required: 'Email é obrigatório.', email: 'Email inválido.' },
    password: { required: 'Senha obrigatória.' },
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  abrirRecuperarSenha() {
    this.modoRecuperarSenha = true;
    this.recuperacaoEnviada = false;
    this.erro = null;
  }

  voltarParaLogin() {
    this.modoRecuperarSenha = false;
  }

  handleLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    this.enviando = true;
    this.erro = null;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.enviando = false;
        let rota = '/home';
        if (this.authService.isSuperadmin()) {
          rota = '/superadmin-dashboard';
        } else if (this.authService.isGarcom()) {
          rota = '/novo-pedido';
        }
        this.router.navigate([rota]);
      },
      error: () => {
        this.enviando = false;
        this.erro = 'E-mail ou senha inválidos.';
      },
    });
  }

  enviarRecuperacao() {
    if (this.recuperarForm.invalid) {
      this.recuperarForm.markAllAsTouched();
      return;
    }

    // Recuperação de senha por e-mail ainda não está implementada no backend
    // (não há envio de e-mail configurado). Em vez de fingir que um link foi
    // enviado, orientamos o usuário a procurar um administrador.
    this.recuperacaoEnviada = true;
  }
}
