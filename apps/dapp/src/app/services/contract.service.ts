import { Inject, Injectable } from '@angular/core';
import { Contract, ContractInterface, ethers, providers, EventFilter, BigNumber } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends Contract {

  constructor(
    @Inject('APP_CONTRACT_ADDRESS') readonly _address: string,
    @Inject('APP_CONTRACT_ABI') readonly _abi: ContractInterface,
    @Inject('APP_WEB3_PROVIDER') readonly _provider: providers.Web3Provider
  ) {
    super(_address, _abi, _provider.getSigner());
  }

  async mintPixiPetNFT(name: string) {
    const value = ethers.utils.parseEther("0.001");
    const overrides = { value };
    const tx = await this['mint'](name, overrides);
    const confirm = await tx.wait();
    // util function to get tokenId from tx
    const getTokenid = (topic: number | bigint | ethers.utils.BytesLike | ethers.utils.Hexable) => {
      const hexValue = ethers.utils.hexValue(topic).toString();
      return Number(hexValue);
    }
    const tokenId = getTokenid(confirm.logs[0].topics[3]);
    return {tx, confirm, tokenId};
  }

  async healPixiPetNFT(tokenid: string, type: string) {
    const value = ethers.utils.parseEther("0.0001");
    const overrides = { value };
    const tx = await this['heal'](tokenid, type, overrides);
    await tx.wait();
    return tx;
  }

  async isOwnerOf(address: string, tokenid: string) {
    const owner = await this['ownerOf'](tokenid)
      .catch((err: any) => false);
    return String(owner).toLowerCase() === String(address).toLowerCase();
  }

  async getPixiPetNFTDetails(tokenid: number): Promise<any> {
    console.log('getPixiPetNFTDetails', tokenid);    
    const [foodLevel, sleepLevel, happyLevel]: BigNumber[] = await this['getTokenDetails'](tokenid);
    return {
      foodLevel: foodLevel.toNumber(), 
      sleepLevel: sleepLevel.toNumber(), 
      happyLevel: happyLevel.toNumber()
    };
  }

  // async getTokenFromAddress(address: string) {
  //   const t: EventFilter = {
  //     address,
  //     topics: [],
  //   }
  //   const r = await this['queryFilter'](t)
  //   console.log(r);
  //   return r;
  // }

}
