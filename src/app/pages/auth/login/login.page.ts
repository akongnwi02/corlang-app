import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {ModalController, NavController} from "@ionic/angular";
import {AlertService} from "../../../services/alerts/alert.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private navCtrl: NavController,
      private alertService: AlertService
  ) { }

  ngOnInit() {
  }

    login() {
        this.authService.login(
            this.form.value.email,
            this.form.value.password
        );
    }
}