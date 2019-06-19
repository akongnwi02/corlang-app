import { Injectable } from '@angular/core';
import { EnvService } from "../env/env.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { tap } from "rxjs/operators";
import {User} from "../../models/User";

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLoggedfIn = false;
    token: any;

    constructor(
        private http: HttpClient,
        private storage: NativeStorage,
        private env: EnvService
    ) { }


  login(email: String, password: String) {
      return this.http.post(this.env.API_URL + '/api/auth/login', {
              email: email,
              password: password
          }).pipe(
              tap(token => {
                  this.storage.setItem('token', token)
                      .then(
                          () => {
                              console.log('Token Stored');
                          },
                          error => console.log('Error storing token', error)
                      );
                  this.token = token;
                  this.isLoggedfIn = true;
                  return token;
              })
    )
  }

    register(first_name: String, last_name: String, email: String, password: String) {
        return this.http.post(this.env.API_URL + '/api/auth/register', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            password_confirmation: password,
        })
    }

    logout() {
        const headers = new HttpHeaders({
            'Authorization': this.token['token_type'] + " " + this.token['access_token']
        });
        return this.http.get(this.env.API_URL + 'api/auth/logout', { headers: headers})
            .pipe(
                tap(data => {
                    this.storage.remove('token');
                    this.isLoggedfIn = false;
                    delete this.token;
                    return data;
                })
            );
    }

    user() {
        const headers = new HttpHeaders({
            'Authorization': this.token["token_type"]+" "+this.token["access_token"]
        });

        return this.http.get<User>(this.env.API_URL + 'api/auth/me', {headers: headers})
            .pipe(
                tap(user => {
                    return user;
                })
            )
    }

    getToken() {
        return this.storage.getItem('token').then(
            data => {
                this.token = data;
                this.isLoggedfIn = this.token != null;
            },
            error => {
                this.token = null;
                this.isLoggedfIn = false;
                console.log(error);
            }
        );
    }
}

