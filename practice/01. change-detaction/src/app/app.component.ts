import { ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // 1. add change detection strategy here
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  counter = 0;

  // 2. inject ChangeDetectorRef here
  changeDetector = inject(ChangeDetectorRef);

  constructor() {
    setInterval(() => {
      this.counter++;
      console.log('Counter:', this.counter);
    }, 1000);

    // 3. Add another interval that calls detectChanges() every 5 seconds
    setInterval(() => {
      this.changeDetector.detectChanges();     
    }, 5000);
  }

}
