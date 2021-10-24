import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { map } from 'rxjs/operators/map';
import 'rxjs/Rx';


@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    // availableExercises: Exercise[] = [
    //     {id: 'A', name: 'Aaa', duration: 3, calories: 2},
    //     {id: 'B', name: 'Bbb', duration: 200, calories: 90},
    //     {id: 'C', name: 'Ccc', duration: 50, calories: 65},
    // ];
    finishedExercisesChanged = new Subject<Exercise[]>();
    private runningExercise: Exercise;
    // private finishedExercises: Exercise[] = [];
    private availableExercises: Exercise[] = [];
    private firebaseSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) {}
  
    getAvailableExercises() {
      return this.availableExercises.slice();
    }
  
    startExercise(selectedId: string) {
      // example of interacting with a single document on next line
      // this.db.doc('availableExercises/' + selectedId).update({lastSelected: Date()})

      this.runningExercise = this.availableExercises.find(
        ex => ex.id === selectedId
      );
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  
    finishExercise() {
        // object that will be pushed to exercises if not canceled, but completed
        // this.exercises.push({
          this.addFinishedExerciseToDB({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        // this.exercises.push({
          this.addFinishedExerciseToDB({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'canceled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getCurrentExercise() {
        return {...this.runningExercise};
    }

    getCompletedOrCanceledExercises() {
      this.firebaseSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }))
        // return this.finishedExercises.slice();
    }

    fetchAvailableExercises() {
        this.firebaseSubs.push(this.db
          .collection('availableExercises')
          .snapshotChanges()
          .pipe(map(docArray => {
          
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
              };
            });
          }))

          .subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          }, error => {
            console.log(error);
          }));
      }

      private addFinishedExerciseToDB(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
      }

      cancelSubscriptions() {
        this.firebaseSubs.forEach(sub => sub.unsubscribe());
      }
}

// to emit an event in a service component, use Subject



    // private runningExercise!: Exercise;
    // // to store all completed/canceled exercises:
    // private exercises: Exercise[] = [];

    // getAvailableExercises() {
    //     // will return a copy of above, can be edited without affecting the old one
    //     return this.availableExer.slice();
    // }

    // startExercise(selectedId: string) {
    //      const runningExercise = this.availableExer.find(ex => ex.id === selectedId);
    //     //  return a new object where all properties of running exercise are distributed, so new obj is returned, and not the one stored in the service
    //      this.exerciseChanged.next({...this.runningExercise});
    // }
