import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type StatusMesa = 'Livre' | 'Ocupada' | 'Reservada';

interface Mesa {
  numero: number;
  status: StatusMesa;
}

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.html',
  styleUrl: './mesas.scss',
})
export class Mesas {
  mesas: Mesa[] = Array.from({ length: 12 }, (_, i) => ({
    numero: i + 1,
    status: this.statusInicial(i + 1),
  }));

  private statusInicial(numero: number): StatusMesa {
    if ([2, 5, 9].includes(numero)) return 'Ocupada';
    if ([4, 8].includes(numero)) return 'Reservada';
    return 'Livre';
  }

  get totalLivres(): number {
    return this.mesas.filter((m) => m.status === 'Livre').length;
  }

  get totalOcupadas(): number {
    return this.mesas.filter((m) => m.status === 'Ocupada').length;
  }

  get totalReservadas(): number {
    return this.mesas.filter((m) => m.status === 'Reservada').length;
  }

  badgeClasse(status: StatusMesa): string {
    switch (status) {
      case 'Livre':
        return 'sucesso';
      case 'Ocupada':
        return 'alerta';
      case 'Reservada':
        return 'neutro';
    }
  }

  cicloStatus(mesa: Mesa) {
    const ordem: StatusMesa[] = ['Livre', 'Ocupada', 'Reservada'];
    const indiceAtual = ordem.indexOf(mesa.status);
    mesa.status = ordem[(indiceAtual + 1) % ordem.length];
  }
}
