import { Routes } from '@angular/router';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroTecnico } from './pages/registro-tecnico/registro-tecnico';
import { ClientesDasbhoard } from './pages/clientes-dasbhoard/clientes-dasbhoard';
import { LoginPage } from './pages/login-page/login-page';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { MenuTecnicos } from './pages/menu-tecnicos/menu-tecnicos';

export const routes: Routes = [
    { path: 'registro-cliente', component: RegistroCliente },
    { path: 'admin/menu-tecnicos', component: MenuTecnicos },
    { path: 'registro-tecnico', component: RegistroTecnico },
    { path: 'clientes', component: ClientesDasbhoard },
    { path: 'login', component: LoginPage },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'admin', component: AdminDashboard }
];