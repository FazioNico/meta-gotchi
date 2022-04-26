import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract, providers } from 'ethers';

@Component({
  selector: 'meta-gotchi-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  public name!: string;
  public account!: string;

  constructor(
    @Inject('APP_WEB3_PROVIDER') private readonly _web3provider: providers.Web3Provider,
    @Inject('APP_CONTRACT_SERVICE') private readonly _contract: Contract,
    @Inject('APP_DATABASE') private readonly _database: any,
    private readonly _router: Router,
  ) { 
  }
  
  async ngOnInit() {
    // use web3 provider to get accounts
    const ether = this._web3provider.provider; 
    const accounts = await ether.request?.({ method: 'eth_requestAccounts' });
    // handle error
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts');
    }
    // define default account
    this.account = accounts[0]; 
  }
  
  async actions(type: string, payload?: any) {
    if (type === 'create') {
      console.log('[INFO] Request Mint PixiPet NFT');
      // send request using contract service
      const {tx, confirm, tokenId} = await this._contract['mintPixiPetNFT'](this.name);
      // TODO: add `tx` & `confirm` to decentralized database
      // save tokenId to database storage
      await this._database.setItem('pixiPetTokenId', tokenId);
      // request to get pixi pet details
      const state = await this._contract['getPixiPetNFTDetails'](tokenId);
      // save default pixi pet details to database storage
      await this._database.setItem('STATE', state); 
      // navigate to pixi pet main page
      await this._router.navigateByUrl('main');
    }
  }

}
