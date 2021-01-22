import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidatorsService } from 'src/app/services/form.validators.service';
import { AlertsService } from 'src/app/utilities/alerts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  hide1 = true;//Bandera para botón de contraseña
  hide2 = true;//Bandera para botón de confirmación de contraseña

  userForm: any;//Formulario

  buttonMessage = "Registrar";//Mensaje de submit

  constructor( private userService: UserService,
    private formBuilder: FormBuilder,
    public validator: FormValidatorsService,
    public alert: AlertsService,
    private router: Router) { }

  ngOnInit(): void {

    this.buildForm();
  }

  buildForm(){

    //Definición de controles y validadores del formulario de registro
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-7]\d{3}-\d{4}$/)]],
      user: ['', Validators.required],
      pass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPass: ['', Validators.required]
    },
    {
      validators: this.validator.checkPasswords
    }
    );
  }

  async addCustomer(){

    /**
     * Cambio del mensaje del botón.
     * Así se impide que el usuario vuelva a hacer click mientras
     * concluye la ejecución del método checkFields.
     */
    //this.buttonMessage = "Enviando...";

    //  await this.checkFields();

    if(this.userForm.invalid){

      this.alert.failed('Ups... revisa los campos del formulario');
      this.buttonMessage = "Registrar";
      return;
    }
    let user: User = new User(this.userForm);
    
    let response: any = await this.userService.postUser(user);

    if(response.error){

      this.validator.setErrors(response.error, this.userForm);
      this.alert.failed('Ups... revisa los campos del formulario');
      this.buttonMessage = "Registrar";
    }else{

      this.alert.success('Usuario registrado exitosamente');
      this.router.navigate(['/']);//Retorno auxiliar
    }

  }

}