import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {ModalController, NavController} from "@ionic/angular";
import {AlertService} from "../../../services/alerts/alert.service";

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

  dismissRegister() {
      this.modalController.dismiss();
  }

}
