import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AngularFireAuth} from 'angularfire2/auth';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../components/training/training.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;
    // original user
    // private user: User | undefined | null;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService
        ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/training']);  
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }   
        })
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                console.log(result);
            })
            .then(error => {
                console.log(error)
            });

        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        // this.authSuccessfully();
    };

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
            console.log(result);
            })
            .then(error => {
            console.log(error)
            });
            
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        //     this.authSuccessfully();
    };

    logout() {
        // this.user = null;
            // you are not logged in
            this.afAuth.auth.signOut();
            // this.trainingService.cancelSubscriptions();
            // this.authChange.next(true);
            // this.router.navigate(['/login']);
            // this.isAuthenticated = false;
    };

    // getUser() {
    //     // will return new user which has same properties, but a brand new object
    //     return {...this.user}
    // };

    isAuth() {
        return this.isAuthenticated;
        // return this.user != null;
    }

};