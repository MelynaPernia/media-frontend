import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatSortModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class MaterialModule {

}
