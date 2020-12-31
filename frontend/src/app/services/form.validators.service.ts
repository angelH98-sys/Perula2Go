import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { BusinessService } from './business.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {

  constructor(private userService: UserService,
    private businessService: BusinessService,
    private productService: ProductService) { }

  checkTimeFormat(control: FormControl){
    let time = control.value;
    let regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    if(!regex.test(time)){
      control.setErrors({invalidTime: true});
    }
  }
  
  checkFormatPhone(control: FormControl){
    let regex = new RegExp('[0-9]');
    let currentValue = control.value;
    let validValue = "";
    let letter = "";
    if(currentValue.trim().length > 0){
      for(let i = 0; i < currentValue.length; i++){
        letter = currentValue[i].toString();
        if(i == 0){
          if(letter == '7' || letter == '6' || letter == '2'){
            validValue = validValue.concat(letter);
          }
        }else if(i > 0 && i < 4){
          if(regex.test(letter)){
            validValue = validValue.concat(letter);
          }
        }else if(regex.test(letter)){
          validValue = validValue.concat(letter);
        }

        if(i == 3) validValue = validValue.concat('-');
        
      }
    }
    control.setValue(validValue);
  }

  checkFormatPrice(control: FormControl){
    let price = control.value;
    let regex = new RegExp('^[0-9]+(\.[0-9]{1,2})?$')
    if(!regex.test(price)){
      control.setErrors({invalidPrice: true});
    }
  }

  moreThanCeroPrice(control: FormControl){
    let price: Number = control.value;

    if(price <= 0){
      control.setErrors({invalidPriceValue: true});
    }
  }

  alreadyExistIn(formControl: FormControl, name: String, collectionName: String, extraInfo ? : String){
    if(formControl.dirty){
      switch(collectionName){
        case "businesses":{
          switch(name){
            case "name":{
              this.checkNameInBusiness(formControl);
              break;
            }
            case "phone":{
              this.checkPhoneInBusiness(formControl);
              break;
            }
          }
          break;
        }
        case "products":{
          switch(name){
            case "name":{
              this.checkNameInProducts(extraInfo, formControl);
              break;
            }
          }
          break;
        }
      }
    }
  }

  checkDateFormat(control: FormControl){
    let date: Date = new Date(control.value);
    if(date.toString() == "Invalid Date"){
      control.setErrors({invalidDate: true});
    }
  }

  checkPastDate(control: FormControl){
    //let value: Date = this.stringToDate(control.value);
    let value: Date = new Date(control.value);
    value.setDate(value.getDate() + 1);
    let now: Date = new Date();
    if(now > value){
      control.setErrors({isPastDate: true});
    }
  }

  checkEndPromotionDate(startControl: FormControl, endControl: FormControl){
    let start: Date = new Date(startControl.value);
    start.setDate(start.getDate() + 1);
    let end: Date = new Date(endControl.value);
    end.setDate(end.getDate() + 1);
    if(start > end){
      endControl.setErrors({invalidEndDate: true});
    }
  }

  //Users

  async userAvailableInUsers(formGroup: FormGroup){

    //Verificamos si el usuario esta disponible en la tabla users
    let user = formGroup.get('user').value;
    let response = await this.userService.checkUser(user);
    if(response == 1) formGroup.get('user').setErrors({'invalidUser': true});
  }

  async emailAvailableInUsers(formGroup: FormGroup){

    //Verificamos si el email esta disponible en la tabla users
    let email = formGroup.get('email').value;
    let response = await this.userService.checkEmail(email);
    if(response == 1) formGroup.get('email').setErrors({'invalidEmail': true});
  }

  async phoneAvailableInUsers(formGroup: FormGroup){

    //Verificamos si el teléfono esta disponible en la tabla users
    let phone = formGroup.get('phone').value;
    let response = await this.userService.checkPhone(phone);
    if(response == 1) formGroup.get('phone').setErrors({'invalidPhone': true});
  }

  checkPasswords(formGroup: FormGroup) {

    //Verificamos si ambas contraseñas son semejantes
    let pass = formGroup.get('pass').value;
    let confirmPass = formGroup.get('confirmPass').value;

    if( pass.trim().length > 0 && confirmPass.trim().length > 0 && pass != confirmPass){
        formGroup.get('confirmPass').setErrors({notSame: true})
    }   
  }


  //Businesses

  private checkNameInBusiness(formControl: FormControl){
    this.businessService.checkName(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidBusinessName': true});;
    });
  }

  private checkPhoneInBusiness(formControl: FormControl){
    this.businessService.checkPhone(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidPhone': true});
    });
  }

  //Products

  private async checkNameInProducts(businessId: String, control: FormControl){
    let product = await this.productService.getProductInBusiness(businessId, control.value).toPromise();
    if(product != null){
      control.setErrors({invalidProductName: true});
    }
  }

  getErrorMessage(control: FormControl){
    for(let error in control.errors){
      switch(error){
        case "required":{
          return "Campo requerido";
        }
        case "email":{
          return "Formato de correo electrónico erroneo";
        }
        case "pattern":{
          return "Formáto incorrecto";
        }
        case "notSame":{
          return "Las contraseñas no coinciden";
        }
        case "invalidUser":{
          return "Este usuario ya existe en Perula2Go";
        }
        case "invalidEmail":{
          return "Este correo electrónico ya existe en Perula2Go";
        }
        case "invalidPhone":{
          return "Este teléfono ya existe en Perula2Go";
        }
        case "invalidBusinessName":{
          return "Este negocio ya existe en Perula2Go";
        }
        case "invalidTime":{
          return "Formato de tiempo invalido";
        }
        case "invalidImageSize":{
          return "Tamaño máximo de imagen: 200KB";
        }
        case "invalidImageType":{
          return "Formato de imagen inválido";
        }
        case "invalidPrice":{
          return "Formato de precio inválido";
        }
        case "invalidDate":{
          return "Formato de fecha incorrecto";
        }
        case "isPastDate":{
          return "La fecha debe ser la actual o alguna futura";
        }
        case "invalidEndDate":{
          return "La fecha debe ser igual o superior a la fecha de inicio";
        }
        case "invalidPriceValue":{
          return "El precio debe ser superior a $0.00";
        }
        case "invalidProductName":{
          return "Ya existe un producto con este nombre en Perula2Go";
        }
      }
    }
  }
}
