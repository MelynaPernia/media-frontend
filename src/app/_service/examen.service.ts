import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Examen } from '../_model/examen';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class ExamenService {
  url: string = `${environment.HOST}/examen`;
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient){}
  listar(){
    return this.http.get<Examen[]>(this.url);
  }

  listarPorId(idExamen: number){
    return this.http.get(`${this.url}/${idExamen}`);
  }

  registrar(examen: Examen){
    return this.http.post(`${this.url}`, examen);
  }

  modificar(examen: Examen){
   return this.http.put(`${this.url}`,examen)
  }

  eliminar(idExamen: number){
    return this.http.delete(`${this.url}/${idExamen}`)
  }

}
