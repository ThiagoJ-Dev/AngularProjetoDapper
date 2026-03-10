import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DashBoardDto } from '../models/DashboardDto';
import { firstValueFrom } from 'rxjs';
import { CategoryTotalDto } from '../models/CategoryTotalDto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  url = environment

  async obterResumo(year: number, month: number): Promise<DashBoardDto> {
    const query =  new URLSearchParams();
    query.append('year', year.toString());
    query.append('month', month.toString());

    const url = `${this.url.apiUrl}/dashboard/summary?${query.toString()}`;

    return await firstValueFrom(this.http.get<DashBoardDto>(url));
  }

   async obterTotaisPorCategoria(year: number, month: number): Promise<CategoryTotalDto[]> {
    const query =  new URLSearchParams();
    query.append('year', year.toString());
    query.append('month', month.toString());

    const url = `${this.url.apiUrl}/dashboard/SummaryByCategory?${query.toString()}`;

    return await firstValueFrom(this.http.get<CategoryTotalDto[]>(url));
  }
}
