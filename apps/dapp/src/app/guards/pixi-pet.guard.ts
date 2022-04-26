import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Contract, providers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class PixiPetGuard implements CanActivate {

  constructor(
    @Inject('APP_PIXI_TOKEN_ID') private _getTokenId: any,
    @Inject('APP_CONTRACT_SERVICE') private _contract: Contract,
    @Inject('APP_WEB3_PROVIDER') private _web3provider: providers.Web3Provider,
    private readonly _router: Router
  ) {}

  async canActivate(): Promise<boolean >  {
    // check if user have pixi pet in local storage
    const pixiPetTokenId = await this._getTokenId();
    if (!pixiPetTokenId) {
      this._router.navigateByUrl('create');
      return false;
    }
    // check if user iis the owner of the pixi pet
    const accounts = await this._web3provider.listAccounts();
    const isOwner = await this._contract['isOwnerOf'](accounts[0], pixiPetTokenId);
    if (!isOwner) {
      this._router.navigateByUrl('create');
    }
    return isOwner;
  }
  
}
