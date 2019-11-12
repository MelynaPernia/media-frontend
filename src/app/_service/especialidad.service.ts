import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../_model/especialidad';

@Injectable({
  providedIn: 'root'
})

export class EspecialidadService {
  url: string = `${environment.HOST}/especialidad`;
  constructor( private http: HttpClient){}

  listar(){
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(idEspecialidad: number){
    return this.http.get(`${this.url}/${idEspecialidad}`);
  }

  registrar(especialidad: Especialidad){
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Especialidad){
    return this.http.put(this.url, especialidad);
  }

  eliminar(idEspecialidad: number){
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }

}
