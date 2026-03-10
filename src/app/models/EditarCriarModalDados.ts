import { Transaction } from './Transaction';

export type EditarCriarModalDados = {
  modo: 'criar' | 'editar';
  titulo: string;
  financa?: Transaction;
};
