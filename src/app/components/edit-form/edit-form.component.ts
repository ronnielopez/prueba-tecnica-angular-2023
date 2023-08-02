import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit{
  //variable que almacena el input
  name:any;
  //variable que almacena el input
  email:any;
  //variable que almacena el input
  phone:any;
  //variable que almacena el input
  lastName:any;
  //variable que almacena el input
  municipio:any;
  //variable que almacena el input
  department:any;
  //variable que almacena el input
  address:any;

  // Parametros url
  id: string = '';
  idDirecciones : string = '';

  constructor(private _formService: FormService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getInitials(params['id']);
      this.id = params['id'];
    });
  }

handleEditEmployeer(values : any , isValid : any){
  if(isValid){
    const body = {
      "nombre_municipio": values.municipio,
      "nombre_departamento": values.department,
      "ubicacion": values.address,
    }
    this._formService.editAddress(body, this.idDirecciones).subscribe(async (res: any) => {
      const body2 = {
        "nombre": values.name,
        "correo": values.email,
        "telefono": values.phone,
        "apellidos": values.lastName,
        "id_direccion": await res[0].id
      }
      this._formService.editEmployees(body2, this.id).subscribe((res: any) => {
        Swal.fire('Success', 'Empleado modificado correctamente', 'success').then((result) => {
          location.href = '/';
        });
      });
    });
  }else{
      Swal.fire('Error', 'Hay campos que no pueden estar vacio', 'error');
  }
}

  getInitials(id: string){
    this._formService.getInitials(id).subscribe((res: any) => {
      this.name = res[0].nombre;
      this.email = res[0].correo;
      this.phone = res[0].telefono;
      this.lastName = res[0].apellidos;
      this.municipio = res[0].direcciones.nombre_municipio;
      this.department = res[0].direcciones.nombre_departamento;
      this.address = res[0].direcciones.ubicacion;
      this.idDirecciones = res[0].direcciones.id;
    });
  }

}
