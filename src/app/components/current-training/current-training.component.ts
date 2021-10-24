import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TrainingService } from '../training/training.service';
import { StopTrainingComponent } from './stop-training.component'; 


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress= 0;
  timer!: number;

  @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog, private tS: TrainingService) { }

  ngOnInit(){
    this.resumeTimer();
  };

  resumeTimer() {
    const step = this.tS.getCurrentExercise().duration / 100 * 1000

      this.timer = setInterval(() => {
      this.progress = this.progress + 1;

      if(this.progress >= 100) {
        this.tS.finishExercise();
        clearInterval(this.timer);
      }
    }, step)
  };

  onStop() {
    clearInterval(this.timer);
    const DialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    DialogRef.afterClosed().subscribe(result => {
      if(result) {
        // this.trainingExit.emit();
        this.tS.cancelExercise(this.progress);
      } else {
        this.resumeTimer();
      }
    })
  };

};
