import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../training/exercise.model';
import { TrainingService } from '../training/training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})

export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}





// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Exercise } from '../training/exercise.model';
// import { TrainingService } from '../training/training.service';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable, Subscription } from 'rxjs';
// import 'rxjs/operator/add/map';
// import 'rxjs/Rx';

// @Component({
//   selector: 'app-new-training',
//   templateUrl: './new-training.component.html',
//   styleUrls: ['./new-training.component.scss']
// })
// export class NewTrainingComponent implements OnInit {

//   exercises: Observable<Exercise[]>;
//   exerciseSubscription: Subscription;


//   // @Output() trainingStart = new EventEmitter<void>();

//   constructor(
//     private tS: TrainingService,
//     private db: AngularFirestore
//     ) { }

//   ngOnInit() {
//     // valueChanges() gives only the value, , id will be treated as metadata
//       //  this.exercises = this.db.collection('availableExercises').valueChanges();
//       // snapshotChanges contains metadata additionally

//       //  this.db.collection('availableExercises').snapshotChanges().subscribe(result => console.log(result));

//       // values will be extracted from the  payload
//       //  this.db.collection('availableExercises').snapshotChanges().subscribe(result => {
//       //    for(const res of result) {
//       //      console.log(res.payload.doc.data());
//       //    }
//       //  });


//       // .pipe(map(data => {}))

//       this.exerciseSubscription = this.tS.exercisesChanged.subscribe(
//         exercises => (this.exercises = exercises)
//       );
//       this.tS.fetchAvailableExercises();












//       // ne poluchilos

// // this.exercises = this.db.collection('availableExercises')
// // .valueChanges()
// // .pipe(map(docArray => {))
// // .map(docArray => {
// //   return docArray.map(doc => {
// //     return {
// //       id: doc.payload.doc.id,
// //       name: doc.payload.doc.data().name,
// //       duration: doc.payload.doc.data().duration,
// //       calories: doc.payload.doc.data().calories,
// //     }
// //   })
// // })






//     // this.db.collection('availableExercises').valueChanges().subscribe(
//     //   result => {
//     //     console.log(result)
//     //   }
//     // )


//     // get exercises from service, and store in excersises property declared above
//     // this.exercises = this.tS.getAvailableExercises();
//   }

//   onStartTraining(f: NgForm) {
//     // this.trainingStart.emit();

//     // pass an id, get id from the form in new-training
//     this.tS.startExercise(f.value.exercise);
//   }

// }
