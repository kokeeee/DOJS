import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  total: number = 0;
  itemsCarrito: any[] = [];

  constructor(private carrito: CarritoService) { }

  ngOnInit() {
    this.actualizarCarrito();
    this.actualizarTotalCarrito();
  }

  actualizarCarrito() {
    this.itemsCarrito = this.carrito.obtenerItems();
  }

  actualizarTotalCarrito() {
    this.total = this.carrito.calcularTotal();
  }

  eliminar(item: any) {
    this.carrito.eliminarDelCarrito(item);
    this.actualizarCarrito();
    this.actualizarTotalCarrito();
  }
}
