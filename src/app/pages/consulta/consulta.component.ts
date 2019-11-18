import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Examen } from 'src/app/_model/examen';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { identifierModuleUrl } from '@angular/compiler';
import { BrowserStack } from 'protractor/built/driverProviders';
import { MatSnackBar } from '@angular/material';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultarListaExamenDTO } from 'src/app/_dto/ConsultaListaExameneDTO';
import { ConsultaService } from 'src/app/_service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];
  idPacienteSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  diagnostico: string;
  tratamiento: string;
  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  mensaje: string;
  constructor(private pacienteService: PacienteService,
    private especialidadeService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private snackBar: MatSnackBar,
    private consultaService: ConsultaService) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecialidades();
    this.listarMedicos();
    this.listarExamenes();
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    })
  }
  listarEspecialidades() {
    this.especialidadeService.listar().subscribe(data => {
      this.especialidades = data;
    })
  }
  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    })
  }

  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    })
  }

  agregar() {
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    }


  }
  removeDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1)
  }
  agregarExamen() {
    console.log(this.idExamenSeleccionado)
    if (this.idExamenSeleccionado > 0) {
     let cont = 0;
     for(let i = 0 ; i < this.examenesSeleccionados.length; i++){
      let examen = this.examenesSeleccionados[i];
      if(examen.idExamen === this.idExamenSeleccionado){
        cont++;
        break;
      }
     }
     if(cont>0){
       this.mensaje = 'El examen ya se ecnuentra en la lista';
       this.snackBar.open(this.mensaje,'Aviso', {duration: 200});
     } else {
      // se crea una instancia
      let examen = new Examen();
      examen.idExamen = this.idExamenSeleccionado;
      this.examenService.listarPorId(this.idExamenSeleccionado).subscribe((data: Examen) => {
        examen.nombres = data.nombres;
        examen.descripcion = data.descripcion;
        this.examenesSeleccionados.push(examen);

      })
      // this.examenesSeleccionados.push()
     }

    }else {
      this.mensaje = "Debe agregar un examen";
      this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000})
    }
  }

  removeExamen(index:number){
    this.examenesSeleccionados.splice(index, 1);

  }

  aceptar(){
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;
    let consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.medico= medico;
    consulta.paciente=paciente;
    // consulta.fecha = this.fechaSeleccionada; // yy-mm-ddTHH:mm:ss
    // ISODATE
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset()*60000;
    let localISOTime =(new Date(Date.now()- tzoffset)).toISOString();
    consulta.fecha = localISOTime;
   consulta.detalleConsulta = this.detalleConsulta;
   let consultaListaExamenDTO = new ConsultarListaExamenDTO();
   consultaListaExamenDTO.consulta = consulta;
   consultaListaExamenDTO.listExamen = this.examenesSeleccionados;
   this.consultaService.registrar(consultaListaExamenDTO).subscribe(()=> {
     this.snackBar.open('Se registró', 'Aviso', {duration: 2000})
     setTimeout(()=>{
       this.limpiarControles()
     }, 2000);
   })
  }

  removerExamen(index: number) {

  }

  estadoBotonRegistrar(){
    return this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0
  }

  limpiarControles(){
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico= '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }
}
