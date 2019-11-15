import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from 'src/app/_model/examen';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ExamenService } from 'src/app/_service/examen.service';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  examen: Examen[];
  displayedColumns= ['idExamen', 'nombres', 'descripcion', 'acciones'];
  dataSource= new MatTableDataSource<Examen>(this.examen);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private examenService: ExamenService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.examenService.examenCambio.subscribe(data=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.examenService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })
    })
    this.listaExamen();
  }

  listaExamen(){
    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  eliminar(idExamen: number){
    this.examenService.eliminar(idExamen).pipe(switchMap(()=> {
      return this.examenService.listar();
    })).subscribe(data=> {
      this.examenService.examenCambio.next(data);
    })

  }

}
