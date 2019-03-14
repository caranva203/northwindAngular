import { Component, OnInit } from '@angular/core';
import { producto } from '../../model/producto';
import { pedido } from '../../model/pedido';
import { Cliente } from '../../model/paciente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { ToasterService } from 'angular2-toaster';
import { BaseComponent } from '../../shared/base/base.component';
import { detallePedido } from '../../model/detallePedido';


@Component({
  selector: 'crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})

export class CrearPedidoComponent extends BaseComponent implements OnInit {
  modalReference: any;
  private listaProductos: producto[];
  private listaDetalles: any[];
  public registroPedido: pedido;
  private listaClientes: Cliente[];
  public registroCliente: Cliente;
  productoSeleccionado: producto;
  precioUnitario: number;
  total: number;
  cantidad: number;
  totalPedido: number;
  validacion: number;

  constructor(private modalService: NgbModal, private service: OrderService, private customerService: CustomerService , toasterService: ToasterService) {
    super(toasterService);
    this.totalPedido = 0;
    this.listaDetalles = [];
    this.registroPedido = new pedido();
    this.registroCliente = new Cliente();
  }
  ngOnInit() {
    this.getProductos();
    this.getCustomers();
  }
  //metodo para traer la lista de clientes
  getCustomers(): any {
    this.customerService.getCustomer()
      .subscribe(data => {
        this.listaClientes = data;
        //debugger;
      }, error => {
        console.log(error);
      });
  }
  //metodo para traer la lista de productos
  getProductos(): void {
    this.service.getProductos()
      .subscribe(data => {
        //debugger;
        console.log(data);
        this.listaProductos = data;
      }, error => {
        console.log(error);
      });
  }
  //metodo para abrir el modal 
  open(content) {
    this.modalReference = this.modalService.open(content).result.then((result) => {
      console.log("closed");
    }, (reason) => {
      console.log("dismissed");
    });
  }
  //metodo para poner automaticamente el precio unitario
  onChangeProducto(event) {
    this.precioUnitario = event.UnitPrice;
  }
  //metodo para el calculo automatico del total del pedido
  onChangeTotal(valor) {
    this.cantidad = valor;
    //redondear numeros decimales
    this.total = Math.round((valor * this.precioUnitario)*100)/100;
  }
  //metodo para insertar un producto al pedido
  agregarProducto(product: producto,c): void {
    if(this.cantidad && this.precioUnitario){
      this.listaDetalles.push({
        OrderID: undefined,
        ProductID: `${product.ProductID}`,
        ProductName: product.ProductName,
        UnitPrice: product.UnitPrice,
        Quantity: this.cantidad,
        Total: this.total
      });
      this.totalPedido = this.totalPedido + this.total;

      //se setea los campos de formulario para añadir productos
      this.productoSeleccionado = new producto();
      this.precioUnitario = 0;
      this.cantidad = 0;
      this.total = 0;
      c('close modal');
    }
  }
  //metodo para eliminar un detalle o producto
  eliminarDetalle(detalle: detallePedido): void{
    var pos = this.listaDetalles.indexOf(detalle);
    this.totalPedido = this.totalPedido - (detalle["Total"]);
    this.listaDetalles.splice(pos, 1);
  };
  //metodo para insertar un pedido
  agregarPedido(unPedido: pedido): void {
    debugger;
    unPedido.Freight = this.totalPedido;
    unPedido.Order_Details = this.listaDetalles;
    unPedido.CustomerID = this.registroCliente.CustomerID;
    
    if (this.registroPedido.OrderDate != undefined && 
      this.registroPedido.RequiredDate != undefined && 
      this.registroPedido.ShippedDate != undefined && 
      this.registroPedido.Freight != undefined &&
      this.totalPedido != 0 && 
      this.registroCliente.CustomerID != undefined) {      

      if (unPedido != null) {

        this.validacion = this.service.agregarPedido(unPedido)
          .subscribe(data => {
            //console.log(data);
            this.registroPedido = new pedido();
            this.listaDetalles = [];
            this.totalPedido = 0;
            this.registroCliente = new Cliente();
            this.showToast("success", "Registro enviado", "Registro procesado correctamente");
          }, error => {
            //console.log(error);
            this.showToast("warning", "Registro NO enviado", "Hubo un error al ingresar los datos. Error: " + error.statusText);
          });
      }
      else {
        alert("Pedido NO Registrado");
      }
    }
    else {
      alert("Debes llenar todos los campos");
    }
  }
}
