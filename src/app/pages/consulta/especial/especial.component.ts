import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Paciente } from 'src/app/_model/paciente';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Examen } from 'src/app/_model/examen';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {
  form: FormGroup;
  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionado: Especialidad;
  examenSeleccionado: Examen;


  fechaSeleccionada: Date= new Date();
  maxFecha: Date= new Date();
  constructor() { }

  ngOnInit() {
  }

  aceptar(){

  }

}
