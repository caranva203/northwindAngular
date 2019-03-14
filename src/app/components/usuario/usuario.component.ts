import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/paciente';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  clienteSeleccionado:Cliente = new Cliente();
    

  constructor(private service:CustomerService) { }

  ngOnInit() {
  }


  registrarCliente(){
    this.service.agregarCliente(this.clienteSeleccionado)
    .subscribe(
      data => {
        console.log(data);
      }, 

      error =>{
        console.log(error);
      }

    );
    this.clienteSeleccionado = new Cliente();
  }

}
