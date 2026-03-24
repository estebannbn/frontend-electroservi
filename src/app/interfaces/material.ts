export interface Material {
    id?: number;
    nombre: string;
    cantidadActual: number;
    cantidadAlerta: number;
    precioVentaActual: number;
}

export interface ItemDeMaterial {
    cantidadDeMaterial: number;
    servicioId?: number;
    materialId: number;
    material?: Material;
}
