import { Paciente } from './paciente';
import { Medico } from './medico';
import { Especialidad } from './especialidad';
import { DetalleConsulta } from './detalleConsulta';

export class Consulta {
  idConsulta: number;
  paciente: Paciente;
  medico: Medico;
  especialidad: Especialidad;
  fecha: string; // por q se va mandar string a la bd
  detalleConsulta: DetalleConsulta[];
}
