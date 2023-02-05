import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialogComponent } from '../../../users/components/user-dialog/user-dialog.component';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
})
export class ProfileDialogComponent {
  public isEdit: boolean = false;
  public title: string = '';

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  avatarControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/),
  ]);
  isAdminControl = new FormControl(false, [Validators.required]);
  isActiveControl = new FormControl(true, [Validators.required]);

  profileForm = new FormGroup({
    email: this.emailControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    avatar: this.avatarControl,
    isAdmin: this.isAdminControl,
    isActive: this.isActiveControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; profile: User }
  ) {
    const { title, profile } = data;

    this.title = title;

    if (profile) {
      this.profileForm.patchValue(profile);
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);

      this.profileForm.reset();
    }
  }
}
