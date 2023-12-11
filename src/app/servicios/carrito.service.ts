import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cartKey = 'cartItems'; //con esto identificaremos los elementos del carrito
  total: number = 0;
  

  constructor(private firestoreService: FirestoreService) { }

  agregarAlCarrito(juego: any) {
    const items = this.obtenerItems();
    const itemExistente = items.find((item: any) => item.id === juego.id);

    if (itemExistente) {
      // Si el juego ya está en el carrito, aumenta su cantidad en 1
      itemExistente.cantidad += 1;
    } else {
      // Si es un juego nuevo en el carrito, establece su cantidad en 1
      juego.cantidad = 1;
      items.push(juego);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.calcularTotal();
    this.disStock(juego.id);
  }

  obtenerItems(): any[] {
    const storedItems = localStorage.getItem(this.cartKey);
    return storedItems ? JSON.parse(storedItems) : []; // Retorna los elementos del carrito desde localStorage
  }
  eliminarDelCarrito(item: any) {
    const items = this.obtenerItems();
    const index = items.findIndex((i: any) => i.id === item.id);
    
    if (index !== -1) {
      const itemAEliminar = items[index];
      
      if (itemAEliminar.cantidad > 1) {
        itemAEliminar.cantidad -= 1; // Resta una unidad si hay más de una en el carrito
      } else {
        items.splice(index, 1); // Elimina todo el elemento si solo hay una unidad
      }
      
      localStorage.setItem(this.cartKey, JSON.stringify(items));
      this.sumStock(itemAEliminar.id); // Actualiza el stock correspondiente
    }
  }
  calcularTotal(): number {
    const itemsCarrito = this.obtenerItems();
    return itemsCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }
  private disStock(juegoId: string) {
    this.firestoreService.restarStock(juegoId);
  }

  private sumStock(juegoId: string) {
    this.firestoreService.sumarStock(juegoId);
  }
}
