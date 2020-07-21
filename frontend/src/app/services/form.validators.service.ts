import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {

  constructor(private userService: UserService,
    private businessService: BusinessService) { }

  checkPasswords(formGroup: FormGroup) {
      let pass = formGroup.get('pass').value;
      let confirmPass = formGroup.get('confirmPass').value;
      if(pass.trim().length > 0 && confirmPass.trim().length > 0 && pass != confirmPass){
          formGroup.get('confirmPass').setErrors({notSame: true})
      }   
  }

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

  alreadyExistIn(formControl: FormControl, name: String, collectionName: String){
    if(formControl.dirty){
      switch(collectionName){
        case "users":{
          switch(name){
            case "user":{
              this.checkUserInUsers(formControl);
              break;
            }
            case "email":{
              this.checkEmailInUsers(formControl);
              break;
            }
            case "phone":{
              this.checkPhoneInUsers(formControl);
              break;
            }
          }
          break;
        }
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
      }
    }
  }

  //Users

  private checkUserInUsers(formControl: FormControl){
    this.userService.checkUser(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidUser': true});;
    });
  }

  private checkEmailInUsers(formControl: FormControl){
    this.userService.checkEmail(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidEmail': true});;
    });
  }

  private checkPhoneInUsers(formControl: FormControl){
    this.userService.checkPhone(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidPhone': true});;
    });
  }

  //Businesses

  private checkNameInBusiness(formControl: FormControl){
    this.businessService.checkName(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidBusinessName': true});;
    });
  }

  private checkPhoneInBusiness(formControl: FormControl){
    this.businessService.checkPhone(formControl.value).subscribe((res: any) => {
      if(res.docs == 1) formControl.setErrors({'invalidPhone': true});;
    });
  }

  getErrorMessage(control: FormControl){
    for(let error in control.errors){
      switch(error){
        case "required":{
          return "Campo requerido";
          break;
        }
        case "email":{
          return "Formato de correo electrónico erroneo";
          break;
        }
        case "pattern":{
          return "Formáto de telefono erroneo";
          break;
        }
        case "notSame":{
          return "Las contraseñas no coinciden";
          break;
        }
        case "invalidUser":{
          return "Este usuario ya existe en Perula2Go";
          break;
        }
        case "invalidEmail":{
          return "Este correo electrónico ya existe en Perula2Go";
          break;
        }
        case "invalidPhone":{
          return "Este teléfono ya existe en Perula2Go";
          break;
        }
        case "invalidBusinessName":{
          return "Este negocio ya existe en Perula2Go";
          break;
        }
        case "invalidTime":{
          return "Formato de tiempo invalido";
          break;
        }
        case "invalidImageSize":{
          return "Tamaño máximo de imagen: 200KB";
          break;
        }
        case "invalidImageType":{
          return "Formato de imagen inválido";
          break;
        }
      }
    }
  }
}
