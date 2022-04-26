import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { providers } from 'ethers';

@Component({
  selector: 'meta-gotchi-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public pixiPetTokenId!: string|undefined;

  constructor(
    @Inject('APP_WEB3_PROVIDER') private readonly _web3provider: providers.Web3Provider,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) {}

  ngOnInit() {
    this.pixiPetTokenId = this._route.snapshot.paramMap.get('pixiPetTokenId')||undefined;
  }

  public async actions(type: string) {
    if (type === 'login') {
      // request auth
      await this._loginWithMetamask();
      // then redirect to correct page
      await this._redirectTo();
    }
  }

  protected async _loginWithMetamask() {
    const ether = this._web3provider.provider; 
    // request accounts from web3 provider
    const accounts = await ether?.request?.({ method: 'eth_requestAccounts' });
    const account = accounts?.[0]; 
    // handle error
    if (!account) {
      throw new Error('No account');
    }
    return account;
  }

  protected async _redirectTo() {
    let url;
    // create destination page url based on pixi pet token id
    if (this.pixiPetTokenId) {
      // redirect to pixi pet `main` page if pixi pet token id is defined
      url = `/main`;
    } else {
      // redirect to `create` page if pixi pet token id is undefined
      url = '/create';
    }
    // handle error
    if (!url) {
      throw new Error('No url defined');
    }
    await this._router.navigate([url]);
  }

}
