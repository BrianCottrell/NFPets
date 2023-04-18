// deploy/00_deploy_your_contract.js
const { globSource } = require('ipfs-http-client')
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

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // First, we upload the metadata to IPFS and get the CID  
  const file = await ipfs.add(globSource("./erc1155metadata", { recursive: true }))
  console.log(file.cid.toString());
  const tokenUri = "https://ipfs.io/ipfs/"+file.cid.toString()+"/{id}.json"

  await deploy("YourCollectible", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [tokenUri],
    log: true,
    value: ethers.utils.parseEther("0.05")
  });

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");
    
    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */
};
module.exports.tags = ["YourCollectible"];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
