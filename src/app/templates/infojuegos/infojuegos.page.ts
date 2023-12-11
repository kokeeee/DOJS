import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/servicios/countries.service';


@Component({
  selector: 'app-infojuegos',
  templateUrl: './infojuegos.page.html',
  styleUrls: ['./infojuegos.page.scss'],
})
export class InfojuegosPage implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = []; // Lista de países filtrados

  constructor(private restCountriesService: CountriesService) {}

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    this.restCountriesService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
        console.log('Lista de países:', this.countries);
      },
      (error) => {
        console.error('Error al obtener países:', error);
      }
    );
  }

  getCountryByName(name: string) {
    this.restCountriesService.getCountryByName(name).subscribe(
      (data) => {
        console.log('País por nombre:', data);
        // Realiza las acciones necesarias con los datos del país por nombre
      },
      (error) => {
        console.error('Error al obtener país por nombre:', error);
      }
    );
  }
  getLanguages(languages: any): string[] {
    if (!languages) return [];
    return Object.keys(languages);
  }

  isLast(item: string, array: string[]): boolean {
    return item === array[array.length - 1];
  }

  filterCountries(event: any) {
    const term = event?.target?.value || ''; // Verifica si event, target y value están definidos
    this.filteredCountries = this.countries.filter((country: any) => {
      const name = country.name.common.toLowerCase();
      return name.includes(term.toLowerCase());
    });
  }
}