import { Component } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private firestore: FirestoreService,
  ) {}



}
