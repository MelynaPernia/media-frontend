import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Paciente } from 'src/app/_model/paciente';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;
  constructor(private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router ) { }

  ngOnInit() {
    this.formBuild();
  }
  operar(){
    let paciente = new Paciente(); // Creando un objeto
    paciente.idPaciente = this.form.value['idPaciente'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.direccion = this.form.value['direccion'];
    paciente.telefono = this.form.value['telefono'];
    console.log(paciente)
    if(this.edicion){
      //Llamar al servicio de edicions
      this.pacienteService.modificar(paciente).subscribe(()=>{
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data); // estoy mandando a la variable
        })
        // console.log()
        // Es una variable reactiva
        // this.pacienteService.pacienteCambio.next(data);

      })
    } else {
      this.pacienteService.registrar(paciente).subscribe(()=>{
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
        })
      })
      // lllamar al servicio de nuevo
      // this.pacienteService.ELIMINAR(paciente.idPaciente).subscribe()
    }
  this.router.navigate(['/paciente'])


  }

  formBuild(){
    this.form = new FormGroup({
      'idPaciente': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl('')
    });
    this.route.params.subscribe((params: Params)=>{
      this.id= params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      // cargar el servicio
      this.pacienteService.listarPorId(this.id).subscribe((data:Paciente)=> {
        this.form = new FormGroup({
          'idPaciente': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono)
        });
      })

    }
  }

}
