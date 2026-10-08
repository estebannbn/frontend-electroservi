import { Routes } from '@angular/router';

// Pages
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
import { TecnicosDashboard } from './pages/tecnicos-dashboard/tecnicos-dashboard';
import { AdminMateriales } from './pages/admin-materiales/admin-materiales';
import { AdminRepuestos } from './pages/admin-repuestos/admin-repuestos';
import { SolicitarInventario } from './pages/solicitar-inventario/solicitar-inventario';
import { ServiciosCargo } from './pages/servicios-cargo/servicios-cargo';
import { AdminServicio } from './pages/admin-servicio/admin-servicio';
import { RelevarServicio } from './pages/relevar-servicio/relevar-servicio';
import { NotificacionesCliente } from './pages/notificaciones-cliente/notificaciones-cliente';
import { PresupuestoCliente } from './pages/presupuesto-cliente/presupuesto-cliente';

// Guards
import { adminGuard } from './auth/admin-guard';
import { clienteGuard } from './auth/cliente-guard';
import { tecnicoGuard } from './auth/tecnico-guard';

import { PedirRepuestosComponent } from './pages/pedir-repuestos/pedir-repuestos';
import { PedirMaterialesComponent } from './pages/pedir-materiales/pedir-materiales';
import { FinalizarRelevamientoComponent } from './pages/finalizar-relevamiento/finalizar-relevamiento';

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
            { path: 'modificar-tipo-trabajo', component: ModificarTipoTrabajo },
            { path: 'materiales', component: AdminMateriales },
            { path: 'materiales/solicitud', component: SolicitarInventario },
            { path: 'repuestos', component: AdminRepuestos },
            { path: 'repuestos/solicitud', component: SolicitarInventario },
            { path: 'servicio', component: AdminServicio }
        ],
        canActivate: [adminGuard]
    },
    {
        path: 'clientes',
        children: [
            { path: '', component: ClientesDasbhoard },
            { path: 'editar-perfil', component: EditarUsuario },
            { path: 'solicitar-servicio', component: SolicitarServicio },
            { path: 'notificaciones', component: NotificacionesCliente },
            { path: 'presupuesto/:id', component: PresupuestoCliente }
        ],
        canActivate: [clienteGuard]
    },
    {
        path: 'tecnicos',
        children: [
            { path: '', component: TecnicosDashboard },
            { path: 'editar-perfil', component: EditarUsuario },
            { path: 'servicios', component: ServiciosCargo },
            { path: 'servicios/:id', component: RelevarServicio },
            { path: 'servicios/:id/pedir-repuestos', component: PedirRepuestosComponent },
            { path: 'servicios/:id/pedir-materiales', component: PedirMaterialesComponent },
            { path: 'servicios/:id/finalizar', component: FinalizarRelevamientoComponent },
        ],
        canActivate: [tecnicoGuard],
        runGuardsAndResolvers: 'always'
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];