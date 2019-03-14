import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cliente } from '../model/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }


  getCustomer(): Observable<Cliente[]> {
    return  this.http.get<Cliente[]>("http://localhost:57207/api/Customers");
    }

  agregarCliente(cliente:Cliente):Observable<Cliente>{  
    /*var headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>("http://localhost:53128/crearCliente", cliente, { headers: headers });;*/
    let body = JSON.stringify(cliente);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post<Cliente>("http://localhost:57207/api/Customers", cliente, { headers: headers });
  }


  actualizarCliente(Customer:Cliente):Observable<any>{  
    debugger;
    let body = JSON.stringify(Customer);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    return this.http.put('http://localhost:57207/api/Customers/'+Customer.CustomerID,Customer,{ headers: headers });
  }

  obtenerPaciente():Observable<any>{  
    return  this.http.get("https://hospital-ebce6.firebaseio.com/pacientes.json");
  }


  eliminarCliente(Customer:Cliente):Observable<any>{  
    debugger;
    return  this.http.delete("http://localhost:57207/api/Customers/"+Customer.CustomerID);
  }

  getCustomerFilter(id: string): Observable<Cliente[]>{
    if(id == ""){
      return this.getCustomer();
    }else{
      return this.http.get<Cliente[]>("http://localhost:57207/api/Customers/"+id);
    }
  }
}
