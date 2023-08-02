import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { EditFormComponent } from 'src/app/components/edit-form/edit-form.component';


const routes: Routes = [
  {
    path: '',
    component: AddFormComponent
  },
  {
    path: 'edit/:id',
    component: EditFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFormRoutingModule { }