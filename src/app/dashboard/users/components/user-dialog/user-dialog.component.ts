import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent {
  public isEdit: boolean = false;
  public title: string = '';

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  avatarControl = new FormControl('', [Validators.required]);
  isAdminControl = new FormControl(false, [Validators.required]);
  isActiveControl = new FormControl(true, [Validators.required]);

  userForm = new FormGroup({
    email: this.emailControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    avatar: this.avatarControl,
    isAdmin: this.isAdminControl,
    isActive: this.isActiveControl,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; user: User }
  ) {
    const { title, user } = data;

    this.title = title;

    if (user) {
      this.userForm.patchValue(user);
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);

      this.userForm.reset();
    }
  }
}
