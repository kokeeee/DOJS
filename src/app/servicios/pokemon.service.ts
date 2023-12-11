import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<any> {
    const url = `${this.baseUrl}/pokemon`;
    return this.http.get<any>(url);
  }

  getPokemonDetails(pokemonId: number): Observable<any> {
    const url = `${this.baseUrl}/pokemon/${pokemonId}`;
    return this.http.get<any>(url);
  }

  getPokemonImage(url: string): string {
    const id = url.split('/pokemon/')[1].split('/')[0];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
