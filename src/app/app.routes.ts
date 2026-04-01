import { Routes } from '@angular/router';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroTecnico } from './pages/registro-tecnico/registro-tecnico';
import { ClientesDasbhoard } from './pages/clientes-dasbhoard/clientes-dasbhoard';
import { LoginPage } from './pages/login-page/login-page';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: 'registro-cliente', component: RegistroCliente },
    { path: 'registro-tecnico', component: RegistroTecnico },
    { path: 'clientes', component: ClientesDasbhoard },
    { path: 'login', component: LoginPage },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'admin', component: AdminDashboard }
];