import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pedido } from '../model/pedido';
import { producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  //metodo para traer los pedidos
  getPedidos(): Observable<pedido[]>{
    return this.http.get<pedido[]>("http://localhost:57207/api/Order");
  }

  //metodo para eliminar un pedido
  eliminarPedido(Order:pedido):Observable<any>{
    return this.http.delete("http://localhost:57207/api/Order/"+ Order.OrderID);
  }

  //metodo para buscar un pedido
  getPedidoFiltrer(id: string): Observable<pedido[]>{
    debugger;
    if(id == ""){
      return this.getPedidos();
    }else{
      return this.http.get<pedido[]>("http://localhost:57207/api/Order/" + id);
    }
  }

  //metodo para traer la lista de productos de los pedidos
  getProductos(): Observable<producto[]>{
    return this.http.get<producto[]>("http://localhost:57207/api/Product");
  }

  //metodo para insertar un pedido en la BD
  agregarPedido(unPedido: pedido): any {
    let body = JSON.stringify(unPedido);
    let headers = new HttpHeaders({'Content-Type': 'application/json; chaset-utf-8'});
    return this.http.post<pedido>("http://localhost:57207/api/Order", unPedido, { headers: headers });
  }

}
