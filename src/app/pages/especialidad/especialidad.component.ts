import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { EspecialidadDialogComponent } from './especialidad-dialog/especialidad-dialog.component';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  especialidades: Especialidad[];
  displayedColumns=['idEspecialidad', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<Especialidad>(this.especialidades);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private dialog: MatDialog,
     private especialidadService: EspecialidadService,
     private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.especialidadService.especialidadCambio.subscribe( (data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.especialidadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })
    })
    this.listEspecialidad();
  }
  listEspecialidad(){
    this.especialidadService.listar().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }
  openDialog(especialidad?: Especialidad){
    let esp = especialidad != null?especialidad: new Especialidad();
    // Add Dialog
    this.dialog.open(EspecialidadDialogComponent, {
      width: '250px',
      data: esp
    })
  }

  eliminar(idEspecialidad: number){
    this.especialidadService.eliminar(idEspecialidad)
    .pipe(switchMap(()=> {
      return this.especialidadService.listar();
    })).subscribe(especialidad => {
      this.especialidadService.especialidadCambio.next(especialidad);
      this.especialidadService.mensajeCambio.next('Se eliminó')
    })

  }
  applyFilter(filterValue: string){
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
