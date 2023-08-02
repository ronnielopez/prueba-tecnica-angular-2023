import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from 'src/app/components/table/table.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';
import { EditFormComponent } from 'src/app/components/edit-form/edit-form.component';
import { FormServiceNew } from 'src/app/form.service';


@NgModule({
  declarations: [
    TableComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [HomeService, FormServiceNew]
})
export class HomeModule { }
