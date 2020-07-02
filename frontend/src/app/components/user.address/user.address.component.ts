import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MouseEvent } from '@agm/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface address {
  '_id': String;
  'latitude': Number;
  'longitude': Number;
  'direction': String;
  'homeNumber': String;
  'department': String;
  'city': String;
  'reference': String;
}

@Component({
  selector: 'app-user-address',
  templateUrl: './user.address.component.html',
  styleUrls: ['./user.address.component.css']
})
export class UserAddressComponent implements OnInit {

  customerId = "5ef8c88b89f9da00d0d7dd74";
  addressList: address[] = [];

  constructor(private userService: UserService,
    public newAddressDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress(){
    this.userService.getUserAddress(this.customerId).subscribe(res => {
      this.addressList = res as address[];
    });
  }

  openAddressDialog(address: address = null): void{
    if(address == null){
      address = {
        '_id': null,
        'latitude': 13.763992,
        'longitude': -89.049093,
        'direction': '',
        'homeNumber': '',
        'department': '',
        'city': '',
        'reference': ''
      };
    }
    const dialogRef = this.newAddressDialog.open(AddressDialog, {
      data: {address: address}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.address._id){
          this.editAddress(result.address);
        }else{
          this.addAddress(result.address);
        } 
      }
    });
  }

  addAddress(address: address){
    this.addressList.push(address);
    this.userService.putAddress(this.customerId, this.addressList);
  }

  editAddress(address: address){
    let index = this.addressList.findIndex(element => element._id == address._id);
    this.addressList[index] = address;
    this.userService.putAddress(this.customerId, this.addressList);
  }

  deleteAddress(index){
    this.addressList.splice(index, 1);
    this.userService.putAddress(this.customerId, this.addressList);
  }

}

@Component({
  selector: 'address-dialog',
  templateUrl: 'address-dialog.html'
})
export class AddressDialog {

  departments = ["San Salvador", "Cuscatlán"];
  cities: String[] = [];

  lngMarked = this.data.address.longitude;
  latMarked = this.data.address.latitude;

  constructor(public dialogRef: MatDialogRef<AddressDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  

  mapClicked($event: MouseEvent) {
    this.lngMarked = $event.coords.lng;
    this.latMarked = $event.coords.lat;
  }

  getCities(department){
    if(department == "San Salvador"){
      this.cities = ["San Martín"];
    }else{
      this.cities = ["San Bartolomé Perulapía", "San Pedro Perulapán"];
    }
  }

  checkData(){
    this.data.address.longitude = this.lngMarked;
    this.data.address.latitude = this.latMarked;
  }

  /*controlChange(){
    this.data.totalAmount = this.data.product.price;
    this.data.extra.forEach(element => {
      element.option.forEach(op => {
        if(element.radioValue == op.name || op.selected){
          this.data.totalAmount += op.price;
        }
      });
    });
  }*/
}