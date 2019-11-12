import { Component, OnInit, ViewChild } from "@angular/core";
import { Medico } from 'src/app/_model/medico';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog,  MatSnackBar } from '@angular/material';
import { MedicoService } from 'src/app/_service/medico.service';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styleUrls:["./medico.component.css"]
})

export class MedicoComponent implements OnInit{
  medicos: Medico[];
  displayedColumns=['idMedico','nombres', 'apellidos', 'cmp','acciones'];
  dataSource = new MatTableDataSource<Medico>(this.medicos);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private medicoServie: MedicoService,
    private dialog: MatDialog, private snackBar:MatSnackBar){}
  ngOnInit(){
    this.medicoServie.medicoCambio.subscribe(data=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    })

    this.medicoServie.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })

    })
    this.listMedico();
  }
  listMedico(){
    this.medicoServie.listar().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;

    })
  }
  eliminar(idMedico: number){
    this.medicoServie.eliminar(idMedico).pipe(switchMap(()=>{
      return this.medicoServie.listar();
    })).subscribe(medicos => {
      this.medicoServie.medicoCambio.next(medicos);
      this.medicoServie.mensajeCambio.next('Se Eliminó');
    })
  }
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(medico?: Medico){

    // new Medico() -> es una instancia vacía
    let med = medico != null? medico: new Medico();
    // 3 parámetros ingresa
    this.dialog.open(MedicoDialogComponent, {
      width: '250px',
    data: med
    })
  }

}
