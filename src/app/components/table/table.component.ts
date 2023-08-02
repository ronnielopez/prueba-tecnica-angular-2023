import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'flowbite';
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
  cantidad: number = 4;

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

  selectedEmpleado: any;

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
    this.getEmpleados(false);
  }
  //Obtiene todos los empleados que cargan al inicio
  getEmpleados(reset: boolean) {
    if (reset) {
      this.empleados = [];
      this.page = 0;
      this.cantidad = 4;
    }
    this._homeService
      .getEmployees(this.filtro, this.cantidad, this.page)
      .subscribe((response: any) => {
        //contando los pokemones enviado
        this.empleados = response;
      });
    this._homeService.getEmployeesTotal().subscribe((response: any) => {
      this.totalEmpleados = response.length;
    });
  }

  // function para eleiminar un empleado
  deleteEmpleado(id: string) {
    Swal.fire({
      title: 'Estas seguro de borrar este empleado?',
      text: 'Se eliminara permanentemente el empleado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, conservarlo'
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this._homeService.deleteEmployee(id).subscribe((response: any) => {
          Swal.fire(
            'Eliminado!',
            'El empleado ha sido eliminado correctamente.',
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

  // function para seleccionar el Id del empleado
  selectId(empleado: any) {
    this.selectedEmpleado = empleado;
    const $targetEl = document.getElementById('edit-modal');
    const modal = new Modal($targetEl);
    modal.show();
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

