import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Cliente } from '../../model/paciente';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { supportsWebAnimations } from '@angular/animations/browser/src/render/web_animations/web_animations_driver';
import { BaseComponent } from '../../shared/base/base.component';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent extends BaseComponent implements OnInit {

  clienteSeleccionado: Cliente = new Cliente();

  private clientes: Cliente[];
  private accion: string;

  modalReference: any;
  pacienteSeleccionado: Cliente = {
    CustomerID: '',
    CompanyName: '',
    ContactName: '',
    City: '',
    Phone: ''
  };;

  constructor(private service: CustomerService, private modalService: NgbModal, private activeModal: NgbActiveModal, toasterService: ToasterService) {
    super(toasterService);
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.service.getCustomer()
      .subscribe(data => {
        //console.log(data);
        this.clientes = data
      },
        error => {
          console.log(error);
        });
  }

  //función para abrir el modal
  /**
   * 
   * @param content 
   * @param unCliente : objeto cliente desde la vista 
   * @param estado : estado de 'Guardar' o 'Actualizar' desde la vista
   */
  open(content, unCliente: Cliente, estado: string) {

    this.accion = estado;

    if (unCliente) {
      this.clienteSeleccionado = unCliente;
    }
    else
      this.clienteSeleccionado = new Cliente();
    console.log(this.clienteSeleccionado);
    this.modalReference = this.modalService.open(content).result.then((result) => {
      console.log("closed");
    }, (reason) => {
      console.log("dismissed");
    });
  }


  actualizarCliente(content, unCliente: Cliente) {
    this.service.actualizarCliente(unCliente);
  }


  seleccionarPaciente(unCliente: Cliente) {
    this.pacienteSeleccionado = unCliente;

  }

  buscarCliente(id: string): void {
    this.service.getCustomerFilter(id)
      .subscribe(data => {
        this.clientes = data
      });
  }
  eliminarCliente(unCliente: Cliente) {
    debugger;
    this.service.eliminarCliente(unCliente).subscribe(
      (x) => x
    );
    this.clientes = this.clientes.filter(h => h !== unCliente);
  }

  //metodo para crear o actualizar un cliente
  Save(form: NgForm, c) {
    debugger;
    if (this.clienteSeleccionado != null) {
      debugger;

      if (this.accion == 'Guardar') {
        if (this.clienteSeleccionado.CustomerID != null 
          && this.clienteSeleccionado.CompanyName != null 
          && this.clienteSeleccionado.ContactName != null 
          && this.clienteSeleccionado.City != null 
          && this.clienteSeleccionado.Phone != null) {
          this.service.agregarCliente(this.clienteSeleccionado)
            .subscribe(
              data => {
                this.getClientes();
              },

              error => {
                console.log(error);
              }
            );
        }
      }
      else {
        this.service.actualizarCliente(this.clienteSeleccionado)
          .subscribe(
            data => {
              this.service.getCustomer();
            },
            error => {
              console.log(error);
            }
          );

      }
      this.showToast("success", "Registro enviado", "Registro procesado correctamente");
      c('close modal');
    }
  }
}

