import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Produto {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  custo: number | null;
  flAtivo: boolean;
  categoria: { id: number; nome: string } | null;
}

const API_URL = `${environment.apiUrl}/produtos`;

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(API_URL);
  }
}
