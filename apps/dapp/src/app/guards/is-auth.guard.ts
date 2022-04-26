import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { providers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(
    @Inject('APP_WEB3_PROVIDER') private readonly _web3provider: providers.Web3Provider,
    private readonly _router: Router
  ) {}

  async canActivate(): Promise<boolean>  {
    // request to get accounts list
    const accounts = await this._web3provider.listAccounts();
    // if accounts list is empty, redirect to login page
    if (!accounts.length) {
      this._router.navigateByUrl('login');
      return false;
    } else {
      return true;
    }
  }
  
}
