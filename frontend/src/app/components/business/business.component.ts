import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { MouseEvent } from '@agm/core';


import { BusinessService } from '../../services/business.service';
import { Business, Schedule } from '../../models/business';
import { FormValidatorsService } from 'src/app/services/form.validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
  providers: [BusinessService]
})
export class BusinessComponent implements OnInit {

  userId = "";

  lat: number = 13.763992;
  lng: number = -89.049093;
  zoom: number = 18;

  latMarker = 13.763992;
  lngMarker = -89.049093;

  departments = ["San Salvador", "Cuscatlán"];
  cities = [];

  businessTypes = ["Restaurante", "Ferretería", "Farmácia"];

  cover;
  logo;

  businessInformation: any;
  scheduleInformation: any;
  addressInformation: any;

  auxiliarArray = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];


  constructor( private businessService: BusinessService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public formValidators: FormValidatorsService,
    private route: ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.loadForms();
    this.getUser();
  }

  async getUser(){
    /*
      Método que se encarga de verificar la autenticidad el id proporcionado como
      parámetro dentro de la URL
    */
    let id = this.route.snapshot.paramMap.get('id');
    let obj;
    obj = await this.userService.checkUserById(id).toPromise();
    if(obj != null){
      this.userId = id;
    }else{
      this.router.navigate(['/business/catalog']);
    }
  }

  loadForms(){
    /*
      Método que se encarga de inicializar los 3 formularios que se utilizan dentro
      del componente.
    */
    this.businessInformation = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[6-7]\d{3}-\d{4}$/)]],
      type: ['', Validators.required],
      logo: new FormControl(),
      cover: new FormControl()
    });

    this.scheduleInformation = this.formBuilder.group({
      isDetailed: false,
      general: this.formBuilder.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      })
    });

    this.addressInformation = this.formBuilder.group({
      direction: ['', Validators.required],
      homeNumber: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      reference: ['', Validators.required]
    })
  }
  
  changeScheduleType(){
    /*
      Método que se encarga de modificar los controles dentro del formulario
      scheduleInformation.

      Por defecto, existe un unico horario(general) que se utiliza para asignarlo
      a todos los dias de la semana dentro de los horarios de atención del negocio.

      Si el usuario desea detallar cada los horarios de atención de cada día de la
      semana, se añadirían un control para cada día de la semana respectivamente.
    */
    let isDetailed = (this.scheduleInformation.get('isDetailed') as FormControl).value;

    if(isDetailed){
      this.scheduleInformation.removeControl('general');

      for(let day of this.auxiliarArray){
        this.scheduleInformation.addControl(day,
          this.formBuilder.group({
            start: ['', Validators.required],
            end: ['', Validators.required]
          }));
      }
    }else{
      this.scheduleInformation.addControl('general',
        this.formBuilder.group({
          start: ['', Validators.required],
          end: ['', Validators.required]
        }));

        for(let day of this.auxiliarArray){
          this.scheduleInformation.removeControl(day)
      }
    }
  }

  checkImage(fileInput, control, type){
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
      if(type == "logo"){
        this.logo = file;
      }else{
        this.cover = file;
      }
    }
  }

  getCities(department){
    /*
      Método que reasigna los valores del array de ciudades segun el departamento
      que se ha elegido.
    */
    if(department == "San Salvador"){
      this.cities = ["San Martín"];
    }else{
      this.cities = ["San Bartolomé Perulapía", "San Pedro Perulapán"];
    }
  }

  mapClicked($event: MouseEvent) {
    this.lngMarker = $event.coords.lng;
    this.latMarker = $event.coords.lat;
  }

  async addBusiness() {
    /*
      Método que registra un nuevo negocio en la base de datos
    */
    if(this.businessInformation.invalid || this.scheduleInformation.invalid || this.addressInformation.invalid) return;

    let business: Business = new Business();

    business.name = this.businessInformation.get('name').value;
    business.phone = this.businessInformation.get('phone').value;
    business.type = this.businessInformation.get('type').value;
    business.description = this.businessInformation.get('description').value;
    business.picture.logo = this.logo;
    business.picture.cover = this.cover;

    business.schedule = this.parseSchedule();

    business.address.latitude = this.latMarker;
    business.address.longitude = this.lngMarker;
    business.address.direction = this.addressInformation.get('direction').value;
    business.address.homeNumber = this.addressInformation.get('homeNumber').value;
    business.address.department = this.addressInformation.get('department').value;
    business.address.city = this.addressInformation.get('city').value;
    business.address.reference = this.addressInformation.get('reference').value;

    business.user.push({'userId': this.userId, 'role': 'Administrator'});

    const cover = new FormData();
    cover.append('image', this.cover);

    const logo = new FormData();
    logo.append('image', this.logo);


    let res;

    if(this.cover != undefined){
      res = await this.businessService.uploadImage(cover).toPromise();
      business.picture.cover = res.image;
    }
    if(this.logo != undefined){
      res = await this.businessService.uploadImage(logo).toPromise();
      business.picture.logo = res.image;
    }
    this.businessService.postBusiness(business);
  }

  parseSchedule(){
    /*
      Método encargado de la asignación de valores del horario de atención.

      Dependiendo si el horario es detallado o general, se crea un objeto
      de tipo Schedule que almacena los horarios que se asignarán al negocio
    */
    let schedule: Schedule = new Schedule();
    let start, end;
    if(!this.scheduleInformation.get('isDetailed').value){
      start = (this.scheduleInformation.controls['general'] as FormGroup).get('start').value;
      end = (this.scheduleInformation.controls['general'] as FormGroup).get('end').value;

      schedule.monday.start = start;
      schedule.monday.end = end;
      schedule.tuesday.start = start;
      schedule.tuesday.end = end;
      schedule.wednesday.start = start;
      schedule.wednesday.end = end;
      schedule.thursday.start = start;
      schedule.thursday.end = end;
      schedule.friday.start = start;
      schedule.friday.end = end;
      schedule.saturday.start = start;
      schedule.saturday.end = end;
      schedule.sunday.start = start;
      schedule.sunday.end = end;
    }else{
      start = (this.scheduleInformation.controls['Lunes'] as FormGroup).get('start').value;
      schedule.monday.start = start;
      end = (this.scheduleInformation.controls['Lunes'] as FormGroup).get('end').value;
      schedule.monday.end = end;

      start = (this.scheduleInformation.controls['Martes'] as FormGroup).get('start').value;
      schedule.tuesday.start = start;
      end = (this.scheduleInformation.controls['Martes'] as FormGroup).get('end').value;
      schedule.tuesday.end = end;

      start = (this.scheduleInformation.controls['Miercoles'] as FormGroup).get('start').value;
      schedule.wednesday.start = start;
      end = (this.scheduleInformation.controls['Miercoles'] as FormGroup).get('end').value;
      schedule.wednesday.end = end;

      start = (this.scheduleInformation.controls['Jueves'] as FormGroup).get('start').value;
      schedule.thursday.start = start;
      end = (this.scheduleInformation.controls['Jueves'] as FormGroup).get('end').value;
      schedule.thursday.end = end;

      start = (this.scheduleInformation.controls['Viernes'] as FormGroup).get('start').value;
      schedule.friday.start = start;
      end = (this.scheduleInformation.controls['Viernes'] as FormGroup).get('end').value;
      schedule.friday.end = end;

      start = (this.scheduleInformation.controls['Sábado'] as FormGroup).get('start').value;
      schedule.saturday.start = start;
      end = (this.scheduleInformation.controls['Sábado'] as FormGroup).get('end').value;
      schedule.saturday.end = end;

      start = (this.scheduleInformation.controls['Domingo'] as FormGroup).get('start').value;
      schedule.sunday.start = start;
      end = (this.scheduleInformation.controls['Domingo'] as FormGroup).get('end').value;
      schedule.sunday.end = end;
    }

    return schedule;
  }

}
