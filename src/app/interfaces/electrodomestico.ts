export interface Electrodomestico {
    id?: number;
    tipo: string;
    marca: string;
    modelo: string;
    numeroSerie?: string;
    clienteId: number;
}