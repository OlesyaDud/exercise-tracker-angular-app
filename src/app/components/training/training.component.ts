import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  ongoingTraining= false;
  exerSubscription!: Subscription;
  
  constructor(private traniningServ: TrainingService) { }

  ngOnInit() {
    this.exerSubscription = this.traniningServ.exerciseChanged.subscribe(exercise => {
      // if exercise is not null
      if(exercise) {
        this.ongoingTraining = true;
        // if null or undefined
      } else {
        this.ongoingTraining = false;
      }
    })
  }

}
