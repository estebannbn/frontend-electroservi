import { tipoElectrodomestico } from "../services/solicitar-servicio/solicitar-servicio";

export interface Electrodomestico {
    id?: number;
    tipo: tipoElectrodomestico;
    marca: string;
    modelo: string;
}