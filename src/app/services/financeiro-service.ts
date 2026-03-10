import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Query } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Transaction } from '../models/Transaction';
import { first, firstValueFrom } from 'rxjs';
import { TransactionCreateDto } from '../models/TransactionCreateDto';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  http = inject(HttpClient);
  url = environment;

 async buscarFinancas(filtros: { type?: string; year?: number; month?: number }) {

  const query = new URLSearchParams();

  if (filtros.month) {
    query.append('month', filtros.month.toString());
  }

  if (filtros.year) {
    query.append('year', filtros.year.toString());
  }

  if (filtros.type) {
    query.append('type', filtros.type);
  }

  const url = `${this.url.apiUrl}/transactions?${query.toString()}`;

  const response = await this.http.get<Transaction[]>(url);

  return firstValueFrom(response);
}

  async buscarPorId(id: number) {
    const financa$ = this.http.get<Transaction>(`${this.url.apiUrl}/transactions/${id}`);

    const response = await firstValueFrom(financa$);
    return response;
  }

  async criarFinanca(financa: TransactionCreateDto): Promise<Transaction>{
    const financa$ = this.http.post<Transaction>(`${this.url.apiUrl}/transactions`, financa);

    const response = await firstValueFrom(financa$);
    return response;
  }

   async atualizarFinanca(id: number, financa: TransactionCreateDto): Promise<Transaction>{
    const financa$ = this.http.put<Transaction>(`${this.url.apiUrl}/transactions/${id}`, financa);

    const response = await firstValueFrom(financa$);
    return response;
  }

  async removerFinanca(id: number): Promise<Transaction>{
    const financa$ = this.http.delete<Transaction>(`${this.url.apiUrl}/transactions/${id}`);

    const response = await firstValueFrom(financa$);
    return response;
  }
}
