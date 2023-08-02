import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormServiceNew } from 'src/app/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Input()
  empleado: any
  //variable que almacena el input
  name: any;
  //variable que almacena el input
  email: any;
  //variable que almacena el input
  phone: any;
  //variable que almacena el input
  lastName: any;
  //variable que almacena el input
  municipio: any;
  //variable que almacena el input
  department: any;
  //variable que almacena el input
  address: any;

  idDirecciones: string = '';

  constructor(private _formService: FormServiceNew, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    
    
  }

  handleEditEmployeer(values: any, isValid: any) {
    if (isValid) {
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
        this._formService.editEmployees(body2, this.empleado.id).subscribe((res: any) => {
          Swal.fire('Success', 'Empleado modificado correctamente', 'success').then((result) => {
            location.href = '/';
          });
        });
      });
    } else {
      Swal.fire('Error', 'Hay campos que no pueden estar vacio', 'error');
    }
  }

  getInitials(empleado: any) {
      this.name = empleado.nombre;
      this.email = empleado.correo;
      this.phone = empleado.telefono;
      this.lastName = empleado.apellidos;
      this.municipio = empleado.direcciones.nombre_municipio;
      this.department = empleado.direcciones.nombre_departamento;
      this.address = empleado.direcciones.ubicacion;
      this.idDirecciones = empleado.direcciones.id;
  }
}
