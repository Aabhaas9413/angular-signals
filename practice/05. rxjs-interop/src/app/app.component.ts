import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // 1. Create an observable called number$ that emits an integer value every second
  number$ = new Observable<number>(subscriber => {
    let count = 0;
    const intervalId = setInterval(() => {
      subscriber.next(count++);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  // 2. Convert the observable to a signal called number from the number$ observable.
  number = toSignal(this.number$);

  // 3. Add an element in the UI that displays the value of the 'number' signal.
  

  readonly myName = signal('John Doe');
  // 4. Create an observable called myName$ from the "myName" signal

  myName$ = toObservable(this.myName);

  // 5. Subscribe to myName$ and log the value to the console so that you log every name change from the UI.  
  /**
   *
   */
  constructor() {
     this.myName$.subscribe(name => {
    console.log('Name changed:', name);
    });
  }


  ngOnInit() {
    // 6. challenge - repeat steps 1 - 4 in this method
  }

}
