import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { BusinessService } from '../../services/business.service';
import { Business } from '../../models/business';
import { FormValidatorsService } from 'src/app/services/form.validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'src/app/utilities/alerts.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
  providers: [BusinessService]
})
export class BusinessComponent implements OnInit {

  businessTypes = ["Restaurante", "Ferretería", "Farmácia"];

  cover;
  logo;

  bsnsForm: any;//Formulario del negocio
  buttonMessage: string = "Registrar";

  dayName = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]


  constructor( private businessService: BusinessService,
    private formBuilder: FormBuilder,
    public validator: FormValidatorsService,
    private router: Router,
    public alert: AlertsService) { 
  }

  ngOnInit(): void {

    this.loadForm();
  }

  loadForm(){
    /*
      Método que se encarga de inicializar los 3 formularios que se utilizan dentro
      del componente.
    */
    this.bsnsForm = this.formBuilder.group({

      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[6-7]\d{3}-\d{4}$/)]],
      type: ['', Validators.required],
      logo: new FormControl(),
      cover: new FormControl(),
      isDetailed: false,
      generalStart: ['', Validators.required],
      generalEnd: ['', Validators.required]
    });
  }
  
  //Métodos de horarios

  changeScheduleType(){
    /*
      Método que se encarga de modificar los controles dentro del formulario.

      Por defecto, existe un único horario(general) que se utiliza para asignarlo
      a todos los dias de la semana dentro de los horarios de atención del negocio.

      Si el usuario desea detallar cada los horarios de atención de cada día de la
      semana, se añadirían un control para cada día de la semana respectivamente
      con la nomenclatura:
      -start${i} para indicar la hora de inicio del día i.
      -end${i} para indicar la hora de fin del día i.
      -isOpen${i} para indicar si el día i estará disponible el negocio.
    */
    let isDetailed = this.bsnsForm.get('isDetailed').value;

    if(isDetailed){

      this.bsnsForm.removeControl('generalStart');
      this.bsnsForm.removeControl('generalEnd');
      for(let i = 0; i <= 6; i++){

        this.bsnsForm.addControl(`start${i}`, new FormControl(Validators.required));
        this.bsnsForm.get(`start${i}`).setValue('');
        this.bsnsForm.addControl(`end${i}`, new FormControl(Validators.required));
        this.bsnsForm.get(`end${i}`).setValue('');
        this.bsnsForm.addControl(`isOpen${i}`, new FormControl(true));
      }
    }else{

      this.bsnsForm.addControl('generalStart', new FormControl(Validators.required));
      this.bsnsForm.get('generalStart').setValue('');
      this.bsnsForm.addControl('generalEnd', new FormControl(Validators.required));
      this.bsnsForm.get('generalEnd').setValue('');

      for(let i = 0; i <= 6; i++){
          
        this.bsnsForm.removeControl(`start${i}`);
        this.bsnsForm.removeControl(`end${i}`);
        this.bsnsForm.removeControl(`isOpen${i}`);
      }
    }
  }

  parseSchedule(){
    /*
      Método encargado de la asignación de valores del horario de atención.

      Dependiendo si el horario es detallado o general, se crea un array
      que almacena los horarios que se asignarán al negocio
    */
    let schedule = [], isOpen: boolean;
    let start: string, startHours: number, startMin: number;
    let end: string, endHours: number, endMin: number;
    let di: Date = new Date(), de: Date = new Date();

    if(!this.bsnsForm.get('isDetailed').value){
      start = this.bsnsForm.get('generalStart').value;
      startHours = parseInt(start.substring(0,2));
      startMin = parseInt(start.substring(3));
      di.setHours(startHours, startMin);

      end = this.bsnsForm.get('generalEnd').value;
      endHours = parseInt(end.substring(0,2));
      endMin = parseInt(end.substring(3));
      de.setHours(endHours, endMin);

      for(let i = 0; i <= 6; i++){

        schedule.push({
          'isOpen': true,
          'start': di,
          'end': de
        });
      }
      
    }else{
      
      for(let i = 0; i <= 6; i++){
        
        isOpen = this.bsnsForm.value[`isOpen${i}`];
        di = new Date(), de = new Date();
        if(isOpen){

          start = this.bsnsForm.get(`start${i}`).value;
          startHours = parseInt(start.substring(0,2));
          startMin = parseInt(start.substring(3));
          di.setHours(startHours, startMin);

          end = this.bsnsForm.get(`end${i}`).value;
          endHours = parseInt(end.substring(0,2));
          endMin = parseInt(end.substring(3));
          de.setHours(endHours, endMin);

        }else{

          di = null;
          de = null;
        }


        schedule.push({
          'isOpen': isOpen,
          'start': di,
          'end': de
        });        
      }
      
    }
    return schedule;
  }

  checkImage(fileInput: any){
    /*
      Validación de imagenes que se almacenarán en el servidor.
      No deben sobrepasar el peso máximo de 200kb y deben ser de un tipo
      permitido.
    */

    let controlName = fileInput.target.name;//Obtenemos el nombre del input
    //En este caso, también será el nombre del control

    if (fileInput.target.files.length > 0) {

      const max_size = 200000;//200kb como peso máximo
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (fileInput.target.files[0].size > max_size) {

        this.bsnsForm.get(controlName).setErrors({invalidImageSize: true});

        if(controlName == "logo"){
          this.logo = undefined;
        }else{
          this.cover = undefined;
        }
        return;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        
        this.bsnsForm.get(controlName).setErrors({invalidImageType: true});

        if(controlName == "logo"){
          this.logo = undefined;
        }else{
          this.cover = undefined;
        }
        return;
      }

      let file = fileInput.target.files[0];
      if(controlName == "logo"){
        this.logo = file;
      }else{
        this.cover = file;
      }
    }
  }

  restartTimeControl(id: number){
    
    let isOpen = this.bsnsForm.value[`isOpen${id}`];
    if(!isOpen){

      this.bsnsForm.get(`start${id}`).disable();
      this.bsnsForm.get(`end${id}`).disable();
    }else{

      this.bsnsForm.get(`start${id}`).enable();
      this.bsnsForm.get(`end${id}`).enable();
    }
    this.bsnsForm.get(`start${id}`).setValue('');
    this.bsnsForm.get(`end${id}`).setValue('');
  }

  async addBusiness() {
    /*
      Método que registra un nuevo negocio en la base de datos
    */

    this.validator.checkTimeFormat(this.bsnsForm);
    await this.validator.nameAvailableInBusiness(this.bsnsForm);
    await this.validator.phoneAvailableInBusiness(this.bsnsForm);

    if(this.bsnsForm.invalid){
      this.alert.failed('Ups... revisa los campos del formulario');
      return;
    }
    this.buttonMessage = "Enviando...";
    
    let business: Business = new Business(this.bsnsForm as FormGroup, this.parseSchedule());
    
    business.user.push({'userId': 'idexample', 'role': 'Administrator'});
    
    let cover: FormData = undefined;
    let logo: FormData = undefined;
    
    if(this.cover != undefined){
      
      cover = new FormData();
      cover.append('image', this.cover);
    }
    if(this.logo != undefined){
      
      logo = new FormData();
      logo.append('image', this.logo);
    }
    
    this.businessService.postBusiness(business, logo, cover).then(res => {

      this.alert.success('Negocio registrado exitosamente');
      this.router.navigate(['/']);//Retorno auxiliar
    }).catch(rej => {
      
      this.alert.failed('No fue posible registrar el negocio')
      this.buttonMessage = "Registrar";
    });
    
  }
}