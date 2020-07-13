import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Extra, Option } from 'src/app/models/extra';
import { ExtraService } from 'src/app/services/extra.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FormValidatorsService } from 'src/app/services/form.validators.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {

  productName: String;
  id: String;

  extras: FormGroup;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private extraService: ExtraService,
    private formBuilder: FormBuilder,
    public formValidators: FormValidatorsService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductName();
    this.loadForm();
  }

  loadForm(){
    this.extras = this.formBuilder.group({
      extraList: this.formBuilder.array([this.extraFormGroup])
    });
  }

  //Definición de la información que contendrán los extras y sus respectivas opciones
  get optionFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: ['0.00'],
      selected: false
    });
  };

  get extraFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      multiple: [false],
      options: this.formBuilder.array([this.optionFormGroup])
    });
  }


  //Métodos referidos a la gestión de controles dentro del formulario
  addExtra(){
    if(this.validateForm()) (this.extras.get('extraList') as FormArray).push(this.extraFormGroup);
  }

  addOption(extra: AbstractControl){
    if(this.validateForm()) (extra.get('options') as FormArray).push(this.optionFormGroup);
  }

  deleteExtra(index){
    (this.extras.get('extraList') as FormArray).removeAt(index);
  }
  
  deleteOption(index, extra: AbstractControl){
    (extra.get('options') as FormArray).removeAt(index);
  }



  async getProductName(){
    /*
      Método que obtiene información del producto en el que se registrará los extras
    */
    this.id = this.route.snapshot.paramMap.get('id');
    const res: any = await this.productService.getProductById(this.id).toPromise() as String;
    this.productName = res.name;
  }

  isLastElement(index: Number, collection: AbstractControl, name: string){
    /*
      Método que determina si el indice de los parámetros es igual la cantidad de
      elementos registrada en una colección determinada.

      Se utiliza para expandir automatiamente los paneles del formulario.
    */
    let totalElements = this.getElements(collection, name);
    totalElements -= 1;
    if(index == totalElements) return true;
    return false;
  }

  getElements(collection: AbstractControl, name: string){
    /*
      Obtiene la cantidad de elementos que posee una colección de controles
    */
    let totalElements = Object.keys((collection.get(name) as FormGroup).controls).length;
    return totalElements;
  }

  getControlsFromArray(form: AbstractControl, name){
    /*
      Método que obtiene la lista de controles de un AbstractControl

      Utilizado en los foreach del componente html
    */
    return (form.get(name) as FormGroup).controls;
  }

  defaultOption(index, extra: AbstractControl){
    /*
      Método que establece la propiedad 'selected' de una lista de opciones,
      exceptuando la opción que coincida con index.

      Se utiliza al momento de establecer si una opción sera seleccionada por defecto
      dentro de un complemento.
      Si el extra no permite opción multiple, solo podrá establecer un valor por defecto
      de entre todas las opciones que registre.
    */
    let totalElements = this.getElements(extra, 'options');
    for(let i = 0; i < totalElements; i++){
      if(i != index)
        (extra.get('options') as FormGroup).controls[i].get('selected').setValue(false);
    }
  }

  toFalse(extra: AbstractControl){
    /*
      Método que establece la propiedad 'selected' de una lista de opciones.

      Se utiliza al momento de activar la opción multiple.
    */
    let totalElements = this.getElements(extra, 'options');
    for(let i = 0; i < totalElements; i++){
      (extra.get('options') as FormGroup).controls[i].get('selected').setValue(false);
    }
  }
  
  openAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    })
  }

  validateForm(){
    //Método que valida si el formulario esta listo para ser registrado en la base de datos
    if(!this.extras.valid){
      this.openAlert("Formulario incompleto");
      return false;
    }
    if(!this.checkSameInformation()){
      return false;
    }
    return true;
  }

  checkSameInformation(){
    /*
      Método que valida si existen extras con el mismo nombre
      o opciones, dentro de un extra, con el mismo nombre
    */
    let extra: FormArray;
    let option: FormArray;

    let extraNames = [];
    let optionNames = [];
    let extName, opName;
    for(let i = 0; i < this.getElements(this.extras, 'extraList'); i++){

      extra =  (this.extras.get('extraList') as FormArray);
      option = (extra.controls[i].get('options') as FormArray);

      extName = (this.extras.get('extraList') as FormArray).controls[i].get('name').value;
      if(extraNames.includes(extName)){
        this.openAlert("No es posible tener 2 extras con el mismo nombre");
        return false;
      }else{
        extraNames.push(extName);
      }

      for(let j = 0; j < this.getElements(extra.controls[i], 'options'); j++){
        opName = option.controls[j].get('name').value;
        if(optionNames.includes(opName)){
          this.openAlert("No es posible tener 2 opciones con el mismo nombre dentro de un extra");
          return false;
        }else{
          optionNames.push(opName);
        }
      }
      optionNames = [];
    }
    return true;
  }

  createExtras(){

    /*
      Método que prepara la información que sera registrada en la base de datos
    */

    if(!this.validateForm()) return false;
    let extraList: Extra[] = [];
    let optionList: Option[];
    let opAux: Option;
    let extAux: Extra;
    let extra: FormArray;
    let option: FormArray;

    let aux = false;

    for(let i = 0; i < this.getElements(this.extras, 'extraList'); i++){

      extra =  (this.extras.get('extraList') as FormArray);
      option = (extra.controls[i].get('options') as FormArray);

      extAux = new Extra();
      optionList = [];

      extAux.name = extra.controls[i].get('name').value;
      extAux.multiple = extra.controls[i].get('multiple').value;
      extAux.status = "Disponible";
      extAux.product = this.id;

      for(let j = 0; j < this.getElements(extra.controls[i], 'options'); j++){
        opAux = new Option();

        opAux.name = option.controls[j].get('name').value;
        opAux.price = option.controls[j].get('price').value;

        /*
          Si el usuario no activo la opción multiple y no estableció alguna opción por defecto
          se establecerá la primera opción del extra como la opción por defecto
        */

        if(!aux && !extAux.multiple) aux = option.controls[j].get('selected').value;

        if(j + 1 == this.getElements(extra.controls[i], 'options') && !aux && !extAux.multiple){
          if(optionList.length > 0){
            optionList[0].selected = true;
          }else{
            option.controls[j].get('selected').setValue(true);
          }
        }

        opAux.selected = option.controls[j].get('selected').value;
        opAux.status = "Disponible";

        optionList.push(opAux);
      }

      extAux.option = optionList;

      extraList.push(extAux);
    }
    console.log(extraList);
    this.extraService.postExtra(extraList);
  }
}
