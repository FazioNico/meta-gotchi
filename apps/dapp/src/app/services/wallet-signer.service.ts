import { Inject, Injectable } from '@angular/core';
import { Signer, providers, Wallet } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class WalletSignerService extends Signer {

  private wallet!: Wallet;

  constructor(@Inject('APP_WEB3_PROVIDER') override provider: providers.Web3Provider) {
    super();
  }

  async login() {
    await this.provider.send("eth_requestAccounts", []);
    const accounts = await this.provider.listAccounts();
    this.wallet = new Wallet(accounts[0], this.provider);    
  }
  
  connect() {
    return this.wallet.connect(this.provider);
  }

  signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    return this.wallet.signTransaction(transaction);
  }
 
  async getAddress(): Promise<string> {
    if (!this.wallet) {
      await this.login();
    }
    return this.wallet.getAddress()
  }

  signMessage(message: string): Promise<string> {
    return this.wallet.signMessage(message);
  }

  override sendTransaction(transaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
    return this.wallet.sendTransaction(transaction);
  }

}
