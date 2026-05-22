import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { DashboardComponent } from './dashboard/dashboard';
import { ComponentFila } from './fila/component.fila';
import { ConfirmarPedComponent } from './confirmar-pedido/confirmar-pedido';
import { ControleEstoque } from './controle-estoque/controle-estoque';
import { HistoricoVendasComponent } from './historico-vendas/historico-vendas';
import { Financeiro } from './financeiro/financeiro';
import { NovoPedido } from './novo-pedido/novo-pedido';
import { PerfilAdmin } from './perfil-admin/perfilAdmin';
import { PerfilGarcom } from './perfil-garcom/perfilGarcom';
import { CadastroProdutoComponent } from './cadastro-produto/cadastroProduto';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'cadastro',
    component: Cadastro,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'fila',
    component: ComponentFila,
  },

  {
    path: 'perfil-admin',
    component: PerfilAdmin,
  },

  {
    path: 'perfil-garcom',
    component: PerfilGarcom,
  },

  {
    path: 'confirmar-pedido',
    component: ConfirmarPedComponent,
  },

  {
    path: 'controle-estoque',
    component: ControleEstoque,
  },

  {
    path: 'historico-vendas',
    component: HistoricoVendasComponent,
  },

  {
    path: 'financeiro',
    component: Financeiro,
  },

  {
    path: 'novo-pedido',
    component: NovoPedido,
  },

  {
    path: 'cadastro-produto',
    component: CadastroProdutoComponent,
  },

];
