import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { OrderComponent } from './order/order.component';
import { CrearPedidoComponent } from "./crear-pedido/CrearPedidoComponent";


const routes: Routes = [
    { path: 'usuarios', component: UsuarioComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'pacientes', component: PacienteComponent },
    { path: 'pedidos', component: OrderComponent },
    { path: 'crearPedido', component: CrearPedidoComponent },
    { path: '', pathMatch:'full',redirectTo:'usuarios' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentRoutingModule {} 
