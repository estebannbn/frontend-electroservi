import { Routes } from '@angular/router';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroTecnico } from './pages/registro-tecnico/registro-tecnico';

export const routes: Routes = [
    { path: 'registro-cliente', component: RegistroCliente },
    { path: 'registro-tecnico', component: RegistroTecnico },
    { path: '', redirectTo: '/registro-cliente', pathMatch: 'full' }
];