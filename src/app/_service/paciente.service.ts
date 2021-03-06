import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  // String template   --- se usa el operador back holl
  url: string = `${environment.HOST}/paciente`;
  // Variable reactiva
  pacienteCambio = new Subject<Paciente[]>();

  // Inyección de dependencias.
  constructor(private httpCLient: HttpClient) { }
  listar(){
    // Arreglo de pacientes
    return this.httpCLient.get<Paciente[]>(this.url)
  }
  listarPorId(idPaciente: number){
    return this.httpCLient.get<Paciente>(`${this.url}/${idPaciente}`);
  }

  registrar(paciente: Paciente){
    // el segundo parametro es lo que va en el body
    return this.httpCLient.post(this.url, paciente);
  }

  modificar(paciente: Paciente){
    return this.httpCLient.put(this.url, paciente);
  }

  eliminar(idPaciente: number){
    return this.httpCLient.delete(`${this.url}/${idPaciente}`);
  }
}

