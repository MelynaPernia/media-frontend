import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoEdicionComponent } from './pages/medico/medico-edicion/medico-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';

const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  {
    path: 'medico', component: MedicoComponent,
    children: [
      { path: 'edicion/:id', component: MedicoEdicionComponent },{
        path: 'nuevo', component: MedicoEdicionComponent
      }
    ]
  }

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
