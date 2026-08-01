import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Mesa {
  id: number;
  numero: number;
  status: string;
}

const API_URL = `${environment.apiUrl}/mesa`;

@Injectable({ providedIn: 'root' })
export class MesaService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(API_URL);
  }
}
