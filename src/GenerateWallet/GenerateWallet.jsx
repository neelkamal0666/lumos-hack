import Wallet from 'ethereumjs-wallet';
import React from 'react'
const ethWallet = require('ethereumjs-wallet');

export const GenerateWallet = () => {
    for(let index=0; index < 10; index++) {
        let addressData = ethWallet['default'].generate();
        console.log(`Private key = , ${addressData.getPrivateKeyString()}`);
        console.log(`Address = , ${addressData.getAddressString()}`);
    }
    // console.log(ethWallet);
  return (
    <div>GenerateWallet</div>
  )
}
