import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { providers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    @Inject('APP_WEB3_PROVIDER') private readonly _web3provider: providers.Web3Provider,
    private readonly _router: Router
  ) {}

  async canActivate(): Promise<boolean>  {
    // request to get accounts list
    const accounts = await this._web3provider.listAccounts();    
    // if accounts list is NOT empty, redirect to main
    if (accounts.length > 0) {
      this._router.navigateByUrl('main');
      return false;
    } else {
      return true;
    }
  }
}
