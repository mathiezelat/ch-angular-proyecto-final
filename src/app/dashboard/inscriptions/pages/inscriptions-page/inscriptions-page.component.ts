import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from '../../components/inscription-dialog/inscription-dialog.component';
import { Inscription } from '../../../../core/models/inscription.model';
import { InscriptionsService } from '../../services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-page',
  templateUrl: './inscriptions-page.component.html',
})
export class InscriptionsPageComponent {
  constructor(
    private readonly dialogService: MatDialog,
    public readonly inscriptionsService: InscriptionsService
  ) {}

  displayedColumns = ['id', 'course', 'students', 'edit', 'delete'];

  addInscription() {
    const dialog = this.dialogService.open(InscriptionDialogComponent, {
      data: {
        title: 'Agregar inscripción',
      },
    });

    dialog.afterClosed().subscribe((newInscription: Inscription) => {
      newInscription && this.inscriptionsService.addInscription(newInscription);
    });
  }

  editInscription(inscription: Inscription) {
    const dialog = this.dialogService.open(InscriptionDialogComponent, {
      data: {
        title: 'Modificar curso',
        inscription,
      },
    });

    dialog.afterClosed().subscribe((editInscription: Inscription) => {
      editInscription &&
        this.inscriptionsService.editInscription(
          inscription.id,
          editInscription
        );
    });
  }

  deleteInscription(id: number) {
    this.inscriptionsService.deleteInscription(id);
  }
}
