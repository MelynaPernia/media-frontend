import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: "app-medico-dialog",
  templateUrl: "./medico-dialog.component.html"
})
export class MedicoDialogComponent implements OnInit{
  medico: Medico;
  constructor(public dialogRef: MatDialogRef<MedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico, private medicoService: MedicoService){
  }

  ngOnInit(){
    // this.medico = this.data
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
      this.medicoService.modificar(this.medico).subscribe(data=> {
       this.medicoService.listar().subscribe(medicos=> {
         this.medicoService.medicoCambio.next(medicos);
         this.medicoService.mensajeCambio.next("Se moificó");
       })

      })
    } else {
      alert('Registrar')
      this.medicoService.registrar(this.medico).subscribe(data=> {
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
