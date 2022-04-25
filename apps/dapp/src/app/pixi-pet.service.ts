import { inject, Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PixiPet } from "./pixi-pet.class";

type State = {
  foodLevel: number;
  sleepLevel: number;
  happyLevel: number;
};

@Injectable({
  providedIn: "root"
})
export class PixiPetService {

  private  animationStarted!: number|undefined;
  private _state$: BehaviorSubject<State> = new BehaviorSubject({
    foodLevel: Date.now(),
    sleepLevel: Date.now(),
    happyLevel: Date.now()
  });
  public state$ = this._state$.asObservable();

  constructor(
    @Inject('APP_STATE') private _defaultState: Promise<State>
  ) {
    this._defaultState.then(state => {
      console.log('[INFO]', state);
      this._state$.next(state);
    });
  }

  init(timestamp: number = 0) {
    if (!this.animationStarted) {
      this.animationStarted = timestamp
    };
    const progress = timestamp - this.animationStarted;
    // run logic
    // crerate interval
    if (progress > 250) {
      this.animationStarted = undefined;
      this._drain();
    }
    requestAnimationFrame((t) => this.init(t));
  };
  
  actions(type: string) {
    switch (true) {
      case type === 'feed':
        // only update if foodLevel is less than current timestamp
        if ( this._state$.value.foodLevel < Date.now() ) {
          const foodLevel = this._state$.value.foodLevel + 2000000;
          this._state$.next({
            ...this._state$.value,
            foodLevel: foodLevel < Date.now() ? foodLevel : Date.now()
          })
        }
        break;
      case type === 'sleep':
        // only update if sleepLevel is less than current timestamp
        if ( this._state$.value.sleepLevel < Date.now() ) {
          const sleepLevel = this._state$.value.sleepLevel + 1000000;
          this._state$.next({
            ...this._state$.value,
            sleepLevel: sleepLevel < Date.now() ? sleepLevel : Date.now()
          })
        }
        break;
      case type === 'play':
        // only update if happyLevel is less than current timestamp
        if ( this._state$.value.happyLevel < Date.now() ) {
          const happyLevel = this._state$.value.happyLevel + 800000;
          this._state$.next({
            ...this._state$.value,
            happyLevel: happyLevel < Date.now() ? happyLevel : Date.now()
          })
        }
        break;
    }
    // save state to smart contract
    localStorage.setItem('STATE', JSON.stringify(this._state$.value));
  }

  private _drain() {
    this._state$.next({
      foodLevel: this._state$.value.foodLevel - 5,
      sleepLevel: this._state$.value.sleepLevel - 3,
      happyLevel: this._state$.value.happyLevel - 2
    });
  }

}