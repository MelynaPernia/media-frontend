import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  especialidades: Especialidad[];
  displayedColumns=['idEspecialidad', 'nombres'];
  dataSource = new MatTableDataSource<Especialidad>(this.especialidades);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }

}
