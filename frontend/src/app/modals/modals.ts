import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'info-dialog',
    templateUrl: 'info-dialog.html',
  })
  export class InfoDialog {
  
    constructor(
      public dialogRef: MatDialogRef<InfoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }