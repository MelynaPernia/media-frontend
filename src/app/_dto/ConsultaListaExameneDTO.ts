import { Consulta } from '../_model/consulta';
import { Examen } from '../_model/examen';

export class ConsultarListaExamenDTO {
  consulta: Consulta;
  listExamen: Examen[];
}
