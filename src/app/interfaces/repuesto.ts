export interface Repuesto {
    id?: number;
    nombre: string;
    cantidadActual: number;
    precioVentaActual: number;
}

export interface ItemDeRepuesto {
    cantidadDeRepuesto: number;
    servicioId?: number;
    repuestoId: number;
    repuesto?: Repuesto;
}
