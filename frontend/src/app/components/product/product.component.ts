import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FormValidatorsService } from 'src/app/services/form.validators.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  businessId: String = null;

  categoryList = ["Promoción", "Combo", "Individual", "Postre", "Extra"];

  productInformation: any;

  image;

  constructor( private productService: ProductService,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public formValidators: FormValidatorsService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadForm();
    this.getBusinessId();
  }

  private loadForm(){
    /*
      Método encargado de inicializar el formulario del nuevo producto
    */
    this.productInformation = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['0.00', Validators.required],
      picture: [''],
      category: ['', Validators.required],
      productionTime: ['0', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      promotionData: this.formBuilder.group({
        isPermanent: false,
        start: '',
        end: ''
      })
    })
  }

  private async getBusinessId(){
    /*
      Método que valida si el id del negocio, enviado a través de la 
      URL existe en la base de datos
    */
    this.businessId = this.route.snapshot.paramMap.get('id');
    let res = await this.businessService.checkBusinessById(this.businessId).toPromise();
    if(res == null) this.router.navigate(['/business/catalog']);
  }

  checkImage(fileInput, control){
    /*
      Método que se encarga de validar los archivos que se desean guardar en el servidor.
    */
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 200000;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (fileInput.target.files[0].size > max_size) {
          control.setErrors({invalidImageSize: true});
          return;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        control.setErrors({invalidImageType: true});
          return;
      }
      let file = fileInput.target.files[0];
      this.image = file;
    }
  }

  checkCategory(){
    /*
      Método encargado de establecer los validadores del los controles:
        -start.
        -end.
      si la categoria seleccionada es una promoción.
    */
    let category = this.productInformation.get('category').value;
    let promotion = (this.productInformation.controls['promotionData'] as FormGroup);
    if(category == "Promoción"){
      promotion.get('start').setValidators(Validators.required);
      promotion.get('start').updateValueAndValidity();

      promotion.get('end').setValidators(Validators.required);
      promotion.get('end').updateValueAndValidity();
    }else{
      promotion.get('start').clearValidators();
      promotion.get('start').updateValueAndValidity();

      promotion.get('end').clearValidators();
      promotion.get('end').updateValueAndValidity();
    }
  }

  //Métodos de acceso a información del FormGroup promotionData
  isPermanentValue(){
    /*
      Método que dicta si una promoción será permanente o nó
    */
    return (this.productInformation.controls['promotionData'] as FormGroup).get('isPermanent').value;
  }

  isStartInvalid(){
    /*
      Método que retorna si el control start es valido o no
    */
    return (this.productInformation.controls['promotionData'] as FormGroup).get('start').invalid;
  }

  isEndInvalid(){
    /*
      Método que retorna si el control end es valido o no
    */
    return (this.productInformation.controls['promotionData'] as FormGroup).get('end').invalid;
  }

  getStart(){
    /*
      Método que retorna el control start de promotionData
    */
    return (this.productInformation.controls['promotionData'] as FormGroup).get('start') as FormControl;
  }

  getEnd(){
    /*
      Método que retorna el control end de promotionData
    */
    return (this.productInformation.controls['promotionData'] as FormGroup).get('end') as FormControl;
  }

  permanentChange(){
    /*
      Método que remueve o añade el control end, dentro del FormGroup promotionData.
      Si la promoción será permanente, solo se necesita que establezca la fecha de inicio de la promoción
      Si la promoción no será permanente, se añade un control para establecer la fecha de fin de la promoción
    */
    let promotion = (this.productInformation.controls['promotionData'] as FormGroup);
    let permanent = promotion.get('isPermanent').value;
    if(permanent){
      promotion.removeControl('end');
    }else{
      promotion.addControl('end', new FormControl('', Validators.required));
    }
  }

  openAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    })
  }

  private async addProduct(){
    /**
     * Método encargado de guardar la imagen del producto y
     * el producto mismo dentro de la base de datos
     */
    let product: Product = this.formGroupToProduct();

    let image = new FormData();
    image.append("image", this.image);
    
    if(this.image != undefined){
      let res: any = await this.productService.uploadImage(image).toPromise();
      product.picture = res.image;
    }
    this.productService.postProduct(product);
  }

  checkFormValidation(){
    /**
     * Método de validaciones secundarias:
     * Si el formulario es inválido, significa que no se han completado los campos requeridos
     * y por ende, se procede a validar:
     *  1. Si existe algún producto dentro del negocio, registrado con el mismo nombre.
     *  2. Formato del precio: debe ser un número o cumpliendo el formato 00.00.
     *  3. El precio debe ser mayor a cero.
     *  4. Formato de la fecha de inicio y fín de la promoción,
     *  5. La fecha de inicio de la promoción debe ser igual o mayor a la fecha actual.
     *  6. La fecha de fín debe ser igual o mayor a la fecha de inicio de la promoción,
     *     si la promoción no es permanente.
     */
    if(this.productInformation.invalid) return false;

    let name: FormControl = this.productInformation.get('name') as FormControl;
    this.formValidators.alreadyExistIn(name,'name','products',this.businessId);
    if(name.invalid){
      this.openAlert("Nombre de producto inválido");
      return false;
    }

    let priceControl: FormControl = this.productInformation.get('price') as FormControl;

    this.formValidators.checkFormatPrice(priceControl);
    if(priceControl.invalid){
      this.openAlert("Precio de producto inválido");
      return false;
    }
    this.formValidators.moreThanCeroPrice(priceControl);
    if(priceControl.invalid){
      this.openAlert("Precio de producto inválido");
      return false;
    }

    let category = this.productInformation.get('category').value;

    if(category == "Promoción"){
      let promotionData: FormGroup = 
      this.productInformation.controls['promotionData'] as FormGroup;

      let start: FormControl;
      start = promotionData.get('start') as FormControl;
      this.formValidators.checkDateFormat(start);
      if(start.invalid){
        this.openAlert("Fecha de inicio inválida");
        return false;
      }
      this.formValidators.checkPastDate(start);
      if(start.invalid){
        this.openAlert("Fecha de inicio inválida");
        return false;
      }

      let isPermanent = promotionData.get('isPermanent').value;
      if(!isPermanent){
        let end: FormControl;
        end = promotionData.get('end') as FormControl;
        this.formValidators.checkDateFormat(end);
        if(end.invalid){
          this.openAlert("Fecha de fín inválida");
          return false;
        }
        this.formValidators.checkEndPromotionDate(start, end);
        if(end.invalid){
          this.openAlert("Fecha de fín inválida");
          return false;
        }
      }
    }
    this.addProduct();
  }

  private formGroupToProduct(){
    /**
     * Método que retorna un objeto de tipo Product, con los valores
     * del formGroup productInformation.
     * Exceptuando la imagen.
     */
    let product: Product = new Product();
    product.name = this.productInformation.get('name').value;
    product.description = this.productInformation.get('description').value;
    product.price = this.productInformation.get('price').value;
    product.business = this.businessId;
    product.category = this.productInformation.get('category').value;
    product.productionTime = this.productInformation.get('productionTime').value;

    if(product.category == "Promoción"){
      let promotionData: FormGroup = 
        this.productInformation.controls['promotionData'] as FormGroup; 
      product.promotionData.isPermanent = promotionData.get('isPermanent').value;
      let start: Date = new Date(promotionData.get('start').value);
      start.setDate(start.getDate() + 1);
      product.promotionData.start = start;
      if(!product.promotionData.isPermanent){
        let end: Date = new Date(promotionData.get('end').value);
        end.setDate(end.getDate() + 1);
        product.promotionData.end = end;
      }
    }
    return product;
  }

}
