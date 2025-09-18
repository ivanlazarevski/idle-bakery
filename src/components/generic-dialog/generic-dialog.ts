import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-generic-dialog',
  imports: [MatButton],
  templateUrl: './generic-dialog.html',
  styleUrl: './generic-dialog.scss',
})
export class GenericDialog {
  readonly dialogRef = inject(MatDialogRef<GenericDialog>);
  readonly data = inject<{
    title: string;
    message: string;
  }>(MAT_DIALOG_DATA);
}
