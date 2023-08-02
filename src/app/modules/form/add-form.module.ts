import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import { AddFormRoutingModule } from './add-form-routing.module';
import { FormService } from './form.service';
import { EditFormComponent } from 'src/app/components/edit-form/edit-form.component';


@NgModule({
  declarations: [
    AddFormComponent,
    EditFormComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    AddFormRoutingModule
  ],
  providers: [FormService]
})
export class AddFormModule { }
