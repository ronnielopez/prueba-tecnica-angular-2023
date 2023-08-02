import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/modules/home/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //los pokemones
  empleados: any[] = [[]];
  //current page de la paginacion
  page = 0;
  //numero total de empleados
  totalEmpleados: number = 0;

  //numero de empleados por pagina
  cantidad: number = 0;

  //valores de pagination
  responsive: boolean = true;

  //valores de filtros
  filtro: string = '';
  //variable que almacena el input
  name: any;
  //variable que almacena el input
  email: any;
  //variable que almacena el input
  phone: any;
  //variable que almacena el input
  lastName: any;
  //variable que almacena el input


  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
    this.getEmpleados(false);
  }
  //Obtiene todos los empleados que cargan al inicio
  getEmpleados(reset: boolean) {
    if (reset) {
      this.empleados = [];
      this.page = 0;
      this.cantidad = 0;
    }
    this._homeService
      .getEmployees(this.filtro, this.cantidad, this.cantidad + 5)
      .subscribe((response: any) => {
        //contando los pokemones enviado
        this.totalEmpleados = response.length;
        this.empleados = response;
        this.cantidad += 5;
      });
  }

  // function para eleiminar un empleado
  deleteEmpleado(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this._homeService.deleteEmployee(id).subscribe((response: any) => {
          Swal.fire(
            'Deleted!',
            'Your employee has been deleted.',
            'success'
          )
          this.getEmpleados(true);
        })
      }
    })
  }
  // Funcion de filtro de empleados
  filterEmpleados(value: any) {
    let filtronew = ''
    Object.keys(value).forEach(function (key) {
      if (value[key]) {
        filtronew += `&${getKeysEspain(key)}=like.%25${value[key]}%25`
      }
    })
    this.filtro = filtronew;
    this.getEmpleados(true);
  }

  //funcion para limpiar los filtros
  clearFilter() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.lastName = '';
    this.filtro = '';
    this.getEmpleados(true);
  }


}
function getKeysEspain(key: string) {
  switch (key) {
    case 'name':
      return 'nombre'
    case 'lastName':
      return 'apellidos'
    case 'email':
      return 'correo'
    case 'phone':
      return 'telefono'
    default:
      return ''
  }
}

