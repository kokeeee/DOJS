import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { JuegosI } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  juego: JuegosI = {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    plataforma: '',
    imagen: '',
    stock: 0,
  };

  constructor(private firebase: AngularFirestore,
              private storage: AngularFireStorage) { }

  createDoc(data: any, path: string, id: string) {

    const collection = this.firebase.collection(path);
    return collection.doc(id).set(data);

  }

  getId() {
    return this.firebase.createId();
  }

  getCollection<tipo>(path: string) {

    const collection = this.firebase.collection<tipo>(path);
    return collection.valueChanges();

  }
  getDoc<tipo>(path: string, id: string) {
    return this.firebase.collection(path).doc<tipo>(id).valueChanges()
   }

   updateDoc(path: string, id: string, data: any) {
    return  this.firebase.collection(path).doc(id).update(data);
  }

  deleteDoc(path: string, id: string) {
    return this.firebase.collection(path).doc(id).delete();
  }

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(  resolve => {
        const filePath = path + '/' + nombre;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file);
        task.snapshotChanges().pipe(
          finalize(  () => {
                ref.getDownloadURL().subscribe( res => {
                  const downloadURL = res;
                  resolve(downloadURL);
                  return;
                });
          })
       )
      .subscribe();
    });
}

  restarStock(juegoId: string) {
    const juegoRef = this.firebase.collection<JuegosI>('juegos').doc(juegoId);
    juegoRef.ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const stockActual = data?.stock || 0; // Manejo de datos faltantes
        if (stockActual > 0) {
          juegoRef.update({ stock: stockActual - 1 });
        }
      }
    });
  }

  sumarStock(juegoId: string) {
    const juegoRef = this.firebase.collection<JuegosI>('juegos').doc(juegoId);
    juegoRef.ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const stockActual = data?.stock || 0; // Manejo de datos faltantes
        juegoRef.update({ stock: stockActual + 1 }); // Incrementar el stock en 1
      }
    });
  }
}
