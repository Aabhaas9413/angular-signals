import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  // 8. Set change detection strategy to OnPush
})
export class AppComponent {
  // 1. replace with a writeable signal with an initial value of 0
  readonly firstNumber = signal(0); 

  // 2. replace with a writeable signal with an initial value of 0
  readonly secondNumber = signal(0);

  // 3. replace with a computed signal that emits the sum of the first and second numbers
  readonly sum = this.firstNumber() + this.secondNumber();

  setSecondSignalTo10() {
    // 4. set the second number signal to 10
    this.secondNumber.set(10);
  }

  incrementFirstSignal() {
    // 5. increment the first number signal by 1 but only if it's less than 10
    if (this.firstNumber() < 10) {
      this.firstNumber.set(this.firstNumber() + 1);
    }
  }

  incrementBothSignals() {
    // 6. increment both number signals by 1 with a maximum of 10
    if (this.firstNumber() < 10) {
      this.firstNumber.set(this.firstNumber() + 1);
    }
    if (this.secondNumber() < 10) {
      this.secondNumber.set(this.secondNumber() + 1);
    }
  }


  constructor() {
    // 7. Define an effect that displays both signals to the console whenever any of them changes
    
  }
}
