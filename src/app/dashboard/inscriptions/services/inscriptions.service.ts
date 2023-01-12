import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inscription } from '../../../core/models/inscription.model';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private inscriptions = new BehaviorSubject<Inscription[]>([]);
  public inscriptions$ = this.inscriptions.asObservable();

  constructor() {}

  addInscription(newInscription: Inscription) {
    const lastId =
      this.inscriptions.value[this.inscriptions.value.length - 1]?.id || 0;

    newInscription.id = lastId + 1;

    this.inscriptions.next([...this.inscriptions.value, newInscription]);
  }

  editInscription(id: number, editInscription: Inscription) {
    const editedInscription = this.inscriptions.value.map((inscription) => {
      if (id === inscription.id) {
        return { ...inscription, ...editInscription };
      }
      return inscription;
    });

    this.inscriptions.next(editedInscription);
  }

  deleteInscription(id: number) {
    const deletedInscription = this.inscriptions.value.filter(
      (inscription) => inscription.id !== id
    );

    this.inscriptions.next(deletedInscription);
  }
}
