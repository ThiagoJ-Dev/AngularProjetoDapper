import { Component, inject } from '@angular/core';
import { EditarCriarModalDados } from '../models/EditarCriarModalDados';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIA_MAP } from '../categoria.map';
import { TransactionCreateDto } from '../models/TransactionCreateDto';
import { FinanceiroService } from '../services/financeiro-service';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-criar-modal-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-criar-modal-component.html',
  styleUrl: './editar-criar-modal-component.css',
})
export class EditarCriarModalComponent {
  fb = inject(FormBuilder);
  data: EditarCriarModalDados = inject(MAT_DIALOG_DATA);
  categoryList = Object.entries(CATEGORIA_MAP).map(([id, value]) => ({
    id: Number(id),
    name: value.name,
    color: value.color,
  }));
  dialogRef = inject(MatDialogRef);
  financasService = inject(FinanceiroService);

 form = this.fb.group({
  type: ['', [Validators.required]],
  amount: [0, [Validators.required, Validators.min(0.01)]],
  date: ['', [Validators.required]],
  categoryId: [0, [Validators.required]],
  description: [''],
});

  campoInvalido(nome: string) {
    const campo = this.form.get(nome);
    return campo?.invalid && (campo.dirty || campo.touched);
  }

  constructor() {
    const dataFormatada = this.data?.financa?.date ? this.data.financa.date.substring(0, 10) : '';

    this.form.patchValue({
      type: this.data?.financa?.type,
      amount: this.data?.financa?.amount,
      date: dataFormatada,
      categoryId: this.data?.financa?.categoryId,
      description: this.data?.financa?.description,
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const financasPropriedades = this.form.value as TransactionCreateDto;

    if (this.data.modo === 'editar') {
      this.editarFinanca(this.data?.financa!.id, financasPropriedades);
    } else {
      this.criarFinanca(financasPropriedades);
    }
  }
  async editarFinanca(financaId: number, mudancas: TransactionCreateDto) {
    try {
      const atualizarFinanca = await this.financasService.atualizarFinanca(financaId, mudancas);
      this.dialogRef.close(atualizarFinanca);
    } catch (err) {
      console.log(err);
    }
  }

  async criarFinanca(novaFinanca: TransactionCreateDto) {
    try {
      const criacaoFinanca = await this.financasService.criarFinanca(novaFinanca);
      this.dialogRef.close(criacaoFinanca);
    } catch (err) {
      console.log(err);
    }
  }
}
export async function abrirCriarEditarModal(dialog: MatDialog, data: EditarCriarModalDados) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(EditarCriarModalComponent, config).afterClosed();

  return firstValueFrom(close$);
}
