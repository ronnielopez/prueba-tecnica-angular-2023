import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import { FormServiceNew } from "src/app/form.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{
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

  // Instancia para el servicio


  constructor(private _formService: FormServiceNew) { 
  }

  ngOnInit(): void {
  }
  handleCreateEmployeer(values : any , isValid : any){
    if(isValid){
      const body = {
        "nombre_municipio": values.municipio,
        "nombre_departamento": values.department,
        "ubicacion": values.address,
      }
      this._formService.createAddress(body).subscribe(async (res: any) => {
        const body2 = {
          "nombre": values.name,
          "correo": values.email,
          "telefono": values.phone,
          "apellidos": values.lastName,
          "id_direccion": await res[0].id
        }
        this._formService.createEmployees(body2).subscribe((res: any) => {
          Swal.fire('Success', 'Empleado creado correctamente', 'success').then((result) => {
            location.href = '/';
          });
        });
      });
    }else{
        Swal.fire('Error', 'Hay campos que no pueden estar vacio', 'error');
    }
}
}
