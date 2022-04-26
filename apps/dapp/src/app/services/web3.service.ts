import { Inject, Injectable, InjectionToken } from '@angular/core';
import { providers } from 'ethers';

export const MetamaskWeb3Provider = new InjectionToken('Metamask Web3 provider', {
  providedIn: 'root',
  factory: () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      throw new Error('Ethereum is not installed');
    }
    return ethereum
  }
});

@Injectable()
export class Web3Service extends providers.Web3Provider {

  constructor(
    @Inject(MetamaskWeb3Provider) public web3Provider: providers.ExternalProvider
  ) {
    super(web3Provider);
    console.log('[INFO] Web3Service:', web3Provider);
    
  }

}
