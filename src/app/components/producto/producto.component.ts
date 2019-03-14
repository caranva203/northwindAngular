import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'producto',
    templateUrl: './producto.component.html',
    styles: []
})
export class ProductoComponent implements OnInit {

    listaPersonas: string[] = [];

    constructor(public http: HttpClient) {
      let url = environment.URLSERVICIO + "/SampleData/WeatherForecasts";
      this.http.get(url).subscribe((resp: any) => {
        console.log(resp);
            this.listaPersonas = resp;
        });

    }

    ngOnInit() {
    }

}
