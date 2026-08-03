import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type StatusComanda = 'Aberta' | 'Fechada';

interface Comanda {
  id: number;
  mesa: number;
  cliente: string;
  quantidadeItens: number;
  valorAcumulado: number;
  status: StatusComanda;
}

@Component({
  selector: 'app-comandas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comandas.html',
  styleUrl: './comandas.scss',
})
export class Comandas {
  comandas: Comanda[] = [
    { id: 1, mesa: 2, cliente: 'Carlos Andrade', quantidadeItens: 5, valorAcumulado: 128.5, status: 'Aberta' },
    { id: 2, mesa: 5, cliente: 'Fernanda Lima', quantidadeItens: 3, valorAcumulado: 76.9, status: 'Aberta' },
    { id: 3, mesa: 9, cliente: 'Ricardo Souza', quantidadeItens: 8, valorAcumulado: 214.3, status: 'Aberta' },
    { id: 4, mesa: 1, cliente: 'Juliana Prado', quantidadeItens: 4, valorAcumulado: 92.0, status: 'Fechada' },
    { id: 5, mesa: 7, cliente: 'Marcos Vieira', quantidadeItens: 2, valorAcumulado: 45.0, status: 'Fechada' },
  ];

  get comandasAbertas(): number {
    return this.comandas.filter((c) => c.status === 'Aberta').length;
  }

  get valorTotalEmAberto(): number {
    return this.comandas
      .filter((c) => c.status === 'Aberta')
      .reduce((total, c) => total + c.valorAcumulado, 0);
  }

  badgeClasse(status: StatusComanda): string {
    return status === 'Aberta' ? 'alerta' : 'sucesso';
  }

  fecharComanda(comanda: Comanda) {
    comanda.status = 'Fechada';
  }
}
