import { Component, inject, signal, Signal } from '@angular/core';
import { FinanceiroService } from '../services/financeiro-service';
import { Transaction } from '../models/Transaction';
import { CATEGORIA_MAP } from '../categoria.map';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { abrirCriarEditarModal } from '../editar-criar-modal-component/editar-criar-modal-component';
import { RelatorioService } from '../services/relatorio-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  financasService = inject(FinanceiroService);
  financas = signal<Transaction[]>([]);
  categories = CATEGORIA_MAP;
  dialog = inject(MatDialog);
  relatorioService = inject(RelatorioService);
  router = inject(Router);

  filtroTipo: 'R' | 'D' | '' = '';
  filtroAno: number | null = null;
  filtroMes: number | null = null;

  meses = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  constructor() {
    this.carregarFinancas();
  }

  async carregarFinancas() {
    try {
      const params = this.MontarQeryParams();
      const financas = await this.financasService.buscarFinancas(params);
      this.financas.set(financas);
    } catch (err) {
      console.log(err);
    }
  }

  private MontarQeryParams() {
    const params: any = {};

    if (this.filtroTipo) params.type = this.filtroTipo;
    if (this.filtroAno) params.year = this.filtroAno;
    if (this.filtroMes) params.month = this.filtroMes;
    return params;
  }
  getCategoryName(Id: number): string {
    return this.categories[Id]?.name ?? 'Desconhecida';
  }

  async remover(financaId: number) {
    try {
      await this.financasService.removerFinanca(financaId);
      const financas = this.financas();

      const novaListaFinancas = financas.filter((financa) => financa.id !== financaId);
      this.financas.set(novaListaFinancas);
    } catch (err) {
      console.log(err);
    }
  }
  async editar(financa: Transaction) {
    const novaFinanca = await abrirCriarEditarModal(this.dialog, {
      modo: 'editar',
      titulo: 'Editar Finança',
      financa: financa,
    });

    const financas = this.financas();

    const novasFinancas = financas.map((financa) =>
      financa.id === novaFinanca.id ? novaFinanca : financa,
    );
    this.financas.set(novasFinancas);
  }
  async aplicarFiltros() {
    const params = this.MontarQeryParams();
    const lista = await this.financasService.buscarFinancas(params);
    this.financas.set(lista);
  }
  async novaFinanca() {
    const novaFinanca = await abrirCriarEditarModal(this.dialog, {
      modo: 'criar',
      titulo: 'Editar Finança',
    });
    const novasFinancas = [...this.financas(), novaFinanca];
    this.financas.set(novasFinancas);
  }
  async exportarCsv() {
    const params = this.MontarQeryParams();
    const blob = await this.relatorioService.exportarCsv(params);

    this.downloadArquivo(blob, 'relatorio.csv');
  }
  async exportarExcel() {
    const params = this.MontarQeryParams();
    const blob = await this.relatorioService.exportarExcel(params);

    this.downloadArquivo(blob, 'relatorio.xlsx');
  }

  private downloadArquivo(blob: Blob, nomeArquivo: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
  async limparFiltros() {
    this.filtroTipo = '';
    this.filtroAno = null;
    this.filtroMes = 0;

    const lista = await this.financasService.buscarFinancas({});
    this.financas.set(lista);
  }
}
