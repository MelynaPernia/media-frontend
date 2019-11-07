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
  mensajeCambio = new Subject<string>();

  // Inyección de dependencias.
  constructor(private httpCLient: HttpClient) { }
  listar(){
    // Arreglo de pacientes
    return this.httpCLient.get<Medico[]>(this.url)
  }
  listarPorId(idMedico: number){
    return this.httpCLient.get<Medico>(`${this.url}/${idMedico}`);
  }

  registrar(medico: Medico){
    // el segundo parametro es lo que va en el body
    return this.httpCLient.post(this.url, medico);
  }

  modificar(medico: Medico){
    return this.httpCLient.put(this.url, medico);
  }

  eliminar(idMedico: number){
    return this.httpCLient.delete(`${this.url}/${idMedico}`);
  }
}
