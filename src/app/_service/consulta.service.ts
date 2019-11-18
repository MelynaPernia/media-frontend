import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../_model/consulta';
import { ConsultarListaExamenDTO } from '../_dto/ConsultaListaExameneDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url: string = `${environment.HOST}/consultas`
  constructor(private http: HttpClient) { }

  registrar(consultarDTO: ConsultarListaExamenDTO){
   return this.http.post(this.url, consultarDTO);
  }
}
