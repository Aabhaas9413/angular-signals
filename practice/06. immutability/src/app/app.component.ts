import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly names = signal(['Alice', 'Bob', 'Charlie']);
  readonly person = signal({ name: 'Alice', age: 30 });

  constructor() {
    setTimeout(() => {
      // 1. Add a new name to the array
      this.names.update((names) => [...names, 'David']);

    }, 1000);

    setTimeout(() => {
      // 2. Change the name of the person while keeping other properties intact
      this.person.update((person) => ({ ...person, name: 'David' }));
    }, 2000);

    setTimeout(() => {
      // 3. Convert all the names in the array to uppercase
      this.names.update((names) => names.map((name) => name.toUpperCase()));
      this.names.update( names=> names.map(name => name[0].toLocaleLowerCase() + name.slice(1)) );
    }, 3000);

    setTimeout(() => {
      // 4. Remove from the array, the name that begins with 'B'
      this.names.update((names) => names.filter((name) => name[0] !== 'b'));
    }, 4000);
  }
}
