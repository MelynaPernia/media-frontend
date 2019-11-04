import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Medico } from '../_model/medico';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  url: string = `${environment.HOST}/medico`;
  // Variable reactiva
  medicoCambio = new Subject<Medico[]>();

  // Inyección de dependencias.
  constructor(private httpCLient: HttpClient) { }
  listar(){
    // Arreglo de pacientes
    return this.httpCLient.get<Medico[]>(this.url)
  }
  listarPorId(idPaciente: number){
    return this.httpCLient.get<Medico>(`${this.url}/${idPaciente}`);
  }

  registrar(paciente: Medico){
    // el segundo parametro es lo que va en el body
    return this.httpCLient.post(this.url, paciente);
  }

  modificar(paciente: Medico){
    return this.httpCLient.put(this.url, paciente);
  }

  eliminar(idPaciente: number){
    return this.httpCLient.delete(`${this.url}/${idPaciente}`);
  }
}
