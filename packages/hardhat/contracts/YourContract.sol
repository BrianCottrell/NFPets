pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  event SetAdopted(address sender, string purpose);

  string public purpose = "Find pets a home!";

  error EmptyPurposeError(uint code, string message);

  constructor() {
    // what should we do on deploy?
  }

  function setAdopted(string memory newPurpose) public {
      if(bytes(newPurpose).length == 0){
          revert EmptyPurposeError({
              code: 1,
              message: "Not Adopted"
          });
      }

      purpose = newPurpose;
      console.log(msg.sender,"set purpose to",purpose);
      emit SetAdopted(msg.sender, purpose);
  }
}
