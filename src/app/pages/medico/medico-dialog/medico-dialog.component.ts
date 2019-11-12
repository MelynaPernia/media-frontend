import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: "app-medico-dialog",
  templateUrl: "./medico-dialog.component.html"
})
export class MedicoDialogComponent implements OnInit{
  medico: Medico;
  // primero de hace una referencia
  constructor(public dialogRef: MatDialogRef<MedicoDialogComponent>,
    //obteniendo la data del padre
    @Inject(MAT_DIALOG_DATA) public data: Medico, private medicoService: MedicoService){
  }

  ngOnInit(){
    // this.medico = this.data // no cambia la información
    // Se hace una nueva inctancia
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
  }
  cancelar(){
    this.dialogRef.close();
  }
  operar(){
    if(this.medico != null && this.medico.idMedico>0){
      // pipe es q voy aseguir utilizando estoooo...
      // El pipe indica que sigues trabajando algo dentro de esta llamada pero al final voy a devilver un obervable
      this.medicoService.modificar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(medicos => {
        this.medicoService.medicoCambio.next(medicos); // almacenando en la variable reactiva. se pasa la información
         this.medicoService.mensajeCambio.next("Se modificó");
      })


      // // Es una mala practica tener un subcribe dentro de otro
      // this.medicoService.modificar(this.medico).subscribe(()=> {
      //   this.medicoService.listar().subscribe(medicos=> {
      //    this.medicoService.medicoCambio.next(medicos); // almacenando en la variable reactiva. se pasa la información
      //    this.medicoService.mensajeCambio.next("Se modificó"); // Luego se muestra
      //  })
      // })
    } else {
      // alert('Registrar')
      this.medicoService.registrar(this.medico).subscribe(()=> {
        // console.log(data)
        this.medicoService.listar().subscribe(medicos=> {
          this.medicoService.medicoCambio.next(medicos);
          this.medicoService.mensajeCambio.next("Se registró")
        })
      })
    }
    this.dialogRef.close();

  }
}
