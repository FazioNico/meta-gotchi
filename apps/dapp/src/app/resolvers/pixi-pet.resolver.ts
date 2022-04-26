import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PixiPetResolver implements Resolve<boolean> {

  constructor(
    @Inject('APP_PIXI_TOKEN_ID') private _getTokenId: any,
  ) {}

  async resolve(): Promise<any> {
    console.log('[INFO] PixiPetResolver');
    // check if user have pixi pet in Database storage
    const pixiPetTokenId = await this._getTokenId();
    return pixiPetTokenId||null;
  }
}
