import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {
  form: FormGroup;
  edicion: boolean;
  constructor(private examenService: ExamenService, private router: Router) { }

  ngOnInit() {
    this.formBuild();
  }
  operar(){
    let examen = new Examen();
    examen.idExamen = this.form.value['idExamen'];
    examen.nombres = this.form.value['nombres'];
    examen.descripcion = this.form.value['descripcion'];

    if(this.edicion) {
      this.examenService.modificar(examen).pipe(switchMap(()=>{
        return this.examenService.listar();
      })).subscribe(examen =>{
        this.examenService.examenCambio.next(examen);
        this.examenService.mensajeCambio.next('Se modificó');
      })

    } else {
      this.examenService.registrar(examen).pipe(switchMap(()=> {
        return this.examenService.listar();
      })).subscribe(examen => {
        this.examenService.examenCambio.next(examen);
        this.examenService.mensajeCambio.next('Se registró');
      })
    }
    this.router.navigate(['/examen'])
  }

  formBuild(){
    this.form = new FormGroup({
      'idExamen': new FormControl(0),
      'nombres': new FormControl(''),
      'descripcion': new FormControl('')
    })
  }



}
