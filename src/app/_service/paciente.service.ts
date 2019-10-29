import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  // String template   --- se usa el operador back holl
  url: string = `${environment.HOST}/paciente`

  // Inyección de dependencias.
  constructor(private httpCLient: HttpClient) { }
  listar(){
    // Arreglo de pacientes
    return this.httpCLient.get<Paciente[]>(this.url)
  }
  listarPorId(idPaciente: number){
    return this.httpCLient.get<Paciente>(`${this.url}/${idPaciente}`);
  }
}

