import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Paciente } from 'src/app/_model/paciente';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[];
  displayedColumns: string[] = ['idPaciente','nombres','apellidos','direccion','acciones']; // Columnas q se necesita mostrar
  dataSource = new MatTableDataSource<Paciente>(this.pacientes);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // Es como el getElementById, static: true son subdivisiones
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor( private pacienteService: PacienteService) { }

  ngOnInit() {
    this.listarPaciente();
  }
  listarPaciente() {
    // Información te devuelve un observable
    this.pacienteService.listar().subscribe(data=> {
      this.dataSource.data =  data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  // filter(event){
  //   console.log(event)
  // }
  applyFilter(filterValue: string) {
    // Trim cortar
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
