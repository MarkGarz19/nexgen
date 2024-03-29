
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [FormsModule], // Agregar CommonModule aquí
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.css'

})

export class ClimaComponent {
  urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  api_key = '605507acf87117e111e54a3ab5238541';
  difKelvin = 273.15;
  datosClima: any = {};
  ciudad: string = ''; // Definición de la propiedad ciudad

  constructor() { }

  buscarClima(ciudad: string) { // la funcion buscarClima es la que se encarga de hacer la petición a la API
    if (ciudad) {
      this.fetchDatosClima(ciudad);
    }
  }

  fetchDatosClima(ciudad: string) { // la funcion fetchClima es la que se encarga de procesar la respuesta
    fetch(`${this.urlBase}?q=${ciudad}&appid=${this.api_key}`)
      .then(data => data.json())
      .then(data => this.mostrarDatosClima(data));
  }

  mostrarDatosClima(data: any) { // la funcion mostrarClima es la que se encarga de mostrar los datos del clima
    this.datosClima = {
      ciudadNombre: data.name,
      paisNombre: data.sys.country,
      temperatura: Math.floor(data.main.temp - this.difKelvin),
      humedad: data.main.humidity,
      descripcion: data.weather[0].description,
      icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
  }
}
