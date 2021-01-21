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

  checkTimeFormat(formGroup: FormGroup){
    
    let values = formGroup.value;
    let regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    let isDetailed = values.isDetailed;
    let start: string;
    let end: string;
    let isOpen: boolean;

    if(!isDetailed){

      start = values.generalStart;
      if(!regex.test(start))
        formGroup.get('generalStart').setErrors({invalidTime: true});

      end = values.generalEnd;
      if(!regex.test(end))
        formGroup.get('generalEnd').setErrors({invalidTime: true});

    }else{

      for(let i = 0; i <= 6; i++){

        isOpen = values[`isOpen${i}`];
        if(isOpen){

          start = values[`start${i}`];
          if(!regex.test(start))
            formGroup.get(`start${i}`).setErrors({invalidTime: true});
  
          end = values[`end${i}`];
          if(!regex.test(end))
            formGroup.get(`end${i}`).setErrors({invalidTime: true});
        }
      }
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

  checkPasswords(formGroup: FormGroup) {

    //Verificamos si ambas contraseñas son semejantes
    let pass = formGroup.get('pass').value;
    let confirmPass = formGroup.get('confirmPass').value;

    if( pass.trim().length > 0 && confirmPass.trim().length > 0 && pass != confirmPass){
        formGroup.get('confirmPass').setErrors({notSame: true})
    }   
  }


  //Businesses

  async nameAvailableInBusiness(formGroup: FormGroup){

    let name = formGroup.get('name').value;
    let response = await this.businessService.checkName(name);

    if(response == 1) formGroup.get('name').setErrors({'invalidBusinessName': true});
  }

  async phoneAvailableInBusiness(formGroup: FormGroup){

    let phone = formGroup.get('phone').value;
    let response = await this.businessService.checkPhone(phone);
    
    if(response == 1) formGroup.get('phone').setErrors({'invalidPhone': true});
  }

  //Products

  private async checkNameInProducts(businessId: String, control: FormControl){
    let product = await this.productService.getProductInBusiness(businessId, control.value).toPromise();
    if(product != null){
      control.setErrors({invalidProductName: true});
    }
  }

  //Errores provenientes del controlador
  setErrors(error, formGroup: FormGroup){
    /**
     * Método encagado de interpretar los errores provenientes de las consultas
     * realizadas a la base de datos.
     * Cuando se ejecuta, a cada error encontrado le compete un control.
     * 
     */

     /**
      * El objet "error" puede contener 2 posibles estructuras:
      * -Error por dato único: será el único error que almacene el objeto "error"
      * -Objeto de errores: errores tales como required o patrones se mostrarán
      *                   en un solo objeto.
      */
    if(error.errors){
      
      let controls = Object.keys(error.errors);
      
      controls.forEach((control: any) => {
        
        switch(control.kind){

          case "required":{
            formGroup.get(control).setErrors({required: true});
          }
          case "pattern":{
            formGroup.get(control).setErrors({pattern: true});
          }
        }
      });
    }else{
      
      let controlName = Object.keys(error.keyPattern);
      formGroup.get(controlName[0]).setErrors({fieldAlreadyExist: true});
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
        case "fieldAlreadyExist":{
          return "Ya existe en Perula2Go";
        }
      }
    }
  }
}
