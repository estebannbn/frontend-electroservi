import { Routes } from '@angular/router';
import { RegistroCliente } from './pages/registro-cliente/registro-cliente';
import { RegistroTecnico } from './pages/registro-tecnico/registro-tecnico';
import { ClientesDasbhoard } from './pages/clientes-dasbhoard/clientes-dasbhoard';
import { LoginPage } from './pages/login-page/login-page';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { MenuTecnicos } from './pages/menu-tecnicos/menu-tecnicos';
import { EditarUsuario } from './pages/editar-usuario/editar-usuario';
import { RegistrarPago } from './pages/registrar-pago/registrar-pago';
import { SolicitarServicio } from './pages/solicitar-servicio/solicitar-servicio';
import { ModificarTipoTrabajo } from './pages/modificar-tipo-trabajo/modificar-tipo-trabajo';

export const routes: Routes = [
    { path: 'login', component: LoginPage },
    { path: 'registro-cliente', component: RegistroCliente },
    { path: 'registro-tecnico', component: RegistroTecnico },
    {
        path: 'admin',
        children: [
            { path: '', component: AdminDashboard },
            { path: 'menu-tecnicos', component: MenuTecnicos },
            { path: 'registrar-pago', component: RegistrarPago },
            { path: 'modificar-tipo-trabajo', component: ModificarTipoTrabajo }
        ]
    },
    {
        path: 'clientes',
        children: [
            { path: '', component: ClientesDasbhoard },
            { path: 'editar-perfil', component: EditarUsuario },
            { path: 'solicitar-servicio', component: SolicitarServicio }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];