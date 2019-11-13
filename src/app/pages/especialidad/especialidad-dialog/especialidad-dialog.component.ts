import { Component, Inject, OnInit } from "@angular/core";
import { Especialidad } from 'src/app/_model/especialidad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: "app-especialidad-dialog",
  templateUrl: "./especialidad-dialog.component.html"
})

export class EspecialidadDialogComponent implements OnInit{
  especialidad: Especialidad;
  constructor(private dialogRef: MatDialogRef<EspecialidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Especialidad,
    private especialidadService: EspecialidadService
    ){

  }
  ngOnInit(){
    this.especialidad = new Especialidad();
    this.especialidad.idEspecialidad = this.data.idEspecialidad;
    this.especialidad.nombre = this.data.nombre;
  }

  operar(){
    // debugger
    if(this.especialidad != null && this.especialidad.idEspecialidad>0){
      this.especialidadService.modificar(this.especialidad).pipe(switchMap(()=>{
        return this.especialidadService.listar();
      })).subscribe(especidalidad => {
        this.especialidadService.especialidadCambio.next(especidalidad);
        this.especialidadService.mensajeCambio.next('Se modificó');
      })
    } else {
      this.especialidadService.registrar(this.especialidad).pipe(switchMap(()=>{
        return this.especialidadService.listar();
      })).subscribe(especialidad => {
        this.especialidadService.especialidadCambio.next(especialidad);
        this.especialidadService.mensajeCambio.next('Se registró');
      })
    }

    this.dialogRef.close();

  }
  cancelar(){
    this.dialogRef.close();

  }

}
