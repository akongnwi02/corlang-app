import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {ModalController, NavController} from "@ionic/angular";
import {AlertService} from "../../../services/alerts/alert.service";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {PasswordValidator} from "../../../validators/password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    form;

    ngOnInit() {
    }

    constructor(
        private modalController: ModalController,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private fb: FormBuilder
    ) {
        this.form = fb.group({

            first_name: ['',[
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ]],

            last_name: ['',[
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ]],

            email: ['',[
                Validators.email,
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]],

            password: ['',[
                Validators.required,
                Validators.minLength(6),
            ]],

            password_confirmation: ['', [
                Validators.required,
            ]]
        },
{
            validator: PasswordValidator.passwordsShouldMatch
        });
    }

    register() {
        this.authService.register(this.form.value.first_name,
            this.form.value.last_name,
            this.form.value.email,
            this.form.value.password).subscribe(
            user => {
                console.log('user created', user);
                this.alertService.presentToast(`Account created successfully`);
            },
            error => {
                console.log('error.error', error.error);

                if(error instanceof  HttpErrorResponse) {
                    if (error.error.message) {
                        this.form.setErrors({
                            hasServerError: {
                                errorMessage: error.error.message
                            }
                        });
                    }

                    if (error.status === 422) {

                        if (error.error.errors.password) {
                            this.form.setErrors({
                                invalidPassword: {
                                    errorMessage: error.error.errors.password[0]
                                }
                            })
                        }

                        if (error.error.errors.email) {
                            this.form.setErrors({
                                invalidEmail: {
                                    errorMessage: error.error.errors.email[0]
                                }
                            })
                        }
                    }
                }
                else {
                    this.form.setErrors({
                        hasUnknownError: {
                            errorMessage: 'An unexpected error occurred'
                        }
                    })
                }
            },
            () => {
                // this.navCtrl.navigateRoot('/home');
            }
        );
    }

    get firstName() {
        return this.form.get('first_name');
    }

    get lastName() {
        return this.form.get('last_name');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    get confirmPassword() {
        return this.form.get('password_confirmation');
    }
}
