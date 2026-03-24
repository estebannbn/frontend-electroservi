import { ItemDeMaterial } from './material';
import { ItemDeRepuesto } from './repuesto';
import { Electrodomestico } from './electrodomestico';

export enum EstadoServicio {
    PENDIENTE = 'PENDIENTE',
    EN_REPARACION = 'EN_REPARACION',
    REPARADO = 'REPARADO',
    PAGADO = 'PAGADO',
    ENTREGADO = 'ENTREGADO',
    CANCELADO = 'CANCELADO'
}

// Las fechas varían en date o string porque suelen venir como string desde el backend
export interface Servicio {
    id?: number;
    estado?: EstadoServicio | string;
    fechaLlegadaEstimada?: Date | string;
    fechaLlegadaReal?: Date | string;
    fechaDiagnostico?: Date | string;
    fechaReparacion?: Date | string;
    fechaRetiro?: Date | string;
    fechaFin?: Date | string;
    comentario?: string;
    tecnicoId?: number | null;
    clienteId: number;
    tipoTrabajoId?: number | null;
    electrodomesticoId?: number;
    electrodomestico?: Electrodomestico;
    itemsMaterial?: ItemDeMaterial[];
    itemsRepuesto?: ItemDeRepuesto[];
}