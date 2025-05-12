import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // 1. set change detection strategy to OnPush
})
export class AppComponent {
  readonly counter$ = interval(1000);
  readonly options$ = new BehaviorSubject<{ [key: string]: string }>({'r': 'red', 'g': 'green', 'b': 'blue'});
  readonly selected$ = new BehaviorSubject<string>('r');


  readonly selectedValue$ = combineLatest([this.options$, this.selected$]).pipe(
    map(([options, selected]) => options[selected])
  );

  // 2. Remove the counter property and the constructor
  counter = 0;

  constructor() {
 this.selectedValue$.subscribe(console.log);
    }
  

  // 3. In the html, bind directly to the counter$ observable using the async pipe
}
