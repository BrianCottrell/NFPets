/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");

const ipfsClient = require('ipfs-http-client');
const projectId = '<INFURA ID>';
const projectSecret = '<INFURA SECTRET>';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  const toAddress = "0x4265690709E6C40a92ac8dc2A61AC8F1913Fe313"

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  await yourCollectible.mint(toAddress,0,1, [],{gasLimit:400000})
  await yourCollectible.mint(toAddress,1,1, [],{gasLimit:400000})
  await yourCollectible.mint(toAddress,2,1, [],{gasLimit:400000})
  // await yourCollectible.mint(toAddress,3,1, [],{gasLimit:400000})
  // await yourCollectible.mint(toAddress,4,1, [],{gasLimit:400000})
  // await yourCollectible.mint(toAddress,5,1, [],{gasLimit:400000})

  await sleep(delayMS)

  // console.log("Transferring Ownership of YourCollectible to "+toAddress+"...")

  // await yourCollectible.transferOwnership(toAddress)

  // await sleep(delayMS)

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
