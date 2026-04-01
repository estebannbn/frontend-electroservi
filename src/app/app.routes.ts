import { Routes } from '@angular/router';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroTecnico } from './pages/registro-tecnico/registro-tecnico';
import { ClientesDasbhoard } from './pages/clientes-dasbhoard/clientes-dasbhoard';
import { LoginPage } from './pages/login-page/login-page';
import { TablaTecnicos } from './components/tabla-tecnicos/tabla-tecnicos';

export const routes: Routes = [
    { path: 'registro-cliente', component: RegistroCliente },
    { path: 'tecnicos', component: TablaTecnicos },
    { path: 'registro-tecnico', component: RegistroTecnico },
    { path: 'clientes', component: ClientesDasbhoard },
    { path: 'login', component: LoginPage },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];