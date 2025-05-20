import { Component, DestroyRef, effect, EffectRef, inject, Injector, runInInjectionContext, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  readonly counter = signal(0);

  // 1. Inject the destroyRef here
  readonly destroyRef = inject(DestroyRef);
  // 2. Inject the injector here
  private injector = inject(Injector);
  ef:EffectRef|null  = null;

  constructor() {
    const int = setInterval(() => {
      this.counter.update(v => v + 1);
    }, 1000);

    // 3. Use the destroyRef to clear the interval (use `clearInterval(int)`)
    this.destroyRef.onDestroy(() => {
      clearInterval(int);
    });
  }

  // 4. Create an effect when clicking a button
  startEffect() {
   this.ef =  effect(() => {
      console.log('Counter: ', this.counter());
    }, {
      injector: this.injector});
  }

  // 5. Stop the effect when clicking another button
  stopEffect() {
   this.ef?.destroy();
    this.ef = null;
  }

  x = signal(0);
  isLarge = signal(false);

  increment(){
    this.x.update(v => v + 1);
  }

  check(){
   effect(async () => {
    if(this.x() > 5 && this.x() < 10){
     await new Promise((res) => {
        setTimeout(() => {
          res(true);
        }, 10);
      });
      this.isLarge.set(true);
    }
   }, 
   {
    injector: this.injector
  });
  }

}
