
const fs = require('fs');
const { showThrottleMessage } = require("@ethersproject/providers");
const { ethers } = require("ethers");
const { id } = require("ethers/lib/utils");
const axios = require('axios');
const { Console } = require('console');
require("dotenv").config();



const init = async () => {
    const baseUrl = 'https://cronos.crypto.org/explorer/api' // Cronos explorer API
    var provider = new ethers.providers.JsonRpcProvider("https://rpc.tectonic.finance") // https://cronos-rpc.elk.finance https://evm-cronos.crypto.org https://rpc.tectonic.finance
    var lpPairDict = {};  // key:  Lp contract address  , Value : Transactions with sync() event
    var lpPairList = []   // List of all the Lp contract 
    const providerList = ['https://evm-cronos.crypto.org','https://evm-cronos.crypto.org','https://rpc.tectonic.finance','https://rpc.tectonic.finance','https://rpc.tectonic.finance','https://rpc.tectonic.finance','https://rpc-cronos.crypto.org','https://evm-cronos.crypto.org','https://rest-cronos.crypto.org','https://grpc-cronos.crypto.org',] // This are all the RPC available on cronos, we will have to split the workload between these RPC otherwise there will be too much timeout from the RPC
    const factoryAddress = '0x3b44b2a187a7b3824131f8db5a74194d0a42fc15' // VVS factory contract address
    const routerAddress = '0x145863Eb42Cf62847A6Ca784e6416C1682b1b2Ae' //  VVS router contract address
    const createLPContract = async(addressHash) => { 
        contractAbi = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Burn","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Mint","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Swap","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount0Out","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1Out","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Sync","inputs":[{"type":"uint112","name":"reserve0","internalType":"uint112","indexed":false},{"type":"uint112","name":"reserve1","internalType":"uint112","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_SEPARATOR","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MINIMUM_LIQUIDITY","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"amount0","internalType":"uint256"},{"type":"uint256","name":"amount1","internalType":"uint256"}],"name":"burn","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint112","name":"_reserve0","internalType":"uint112"},{"type":"uint112","name":"_reserve1","internalType":"uint112"},{"type":"uint32","name":"_blockTimestampLast","internalType":"uint32"}],"name":"getReserves","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_token0","internalType":"address"},{"type":"address","name":"_token1","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"kLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price0CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price1CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"skim","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"swap","inputs":[{"type":"uint256","name":"amount0Out","internalType":"uint256"},{"type":"uint256","name":"amount1Out","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"sync","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token0","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false}]
        return new ethers.Contract(addressHash,contractAbi,provider);
    }
    const getQuery = async (i,addressHash) => { // We will query for sync() events thru ethers.js library
        while (1) {     // While loop so that if we get timed out, we will be able to query again
            try{
                let providerRPC = providerList[Math.floor(Math.random()*providerList.length)] // Randomly select RPC - Read comment at line 17    
                provider = new ethers.providers.JsonRpcProvider(providerRPC)                
                contractPlaceholder = await createLPContract(addressHash)
                filterPairs = contractPlaceholder.filters.Sync()                        // Create filter for event sync()
                await contractPlaceholder.queryFilter(filterPairs,i-9999,i).then( (r) => {  // Query only for 10,000 block
                    lpPairDict[addressHash].push(r) // Push the transaction into the dictionary, read Line 15 for mor einfo
                })
            }catch(err){
                console.log(`${i-9999} to ${i}`)  // Print out the block that went wrong
                continue
            }   
        break
        }
    }
    async function queryEtherscan(addressHash) { // Query LP tokens contract address thru cronos explorer API
        const firstTopic = '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';
        const croExplorer = `${baseUrl}?module=logs&action=getLogs&fromBlock=-1&toBlock=latest&address=${addressHash}&topic0=${firstTopic}`;
        let usefulData = await axios.get(croExplorer).then(r => { return r['data']['result']; });
        for (let tx of usefulData) {
            pairAddressFromData = tx['data'].slice(0, 2) + tx['data'].slice(26, 66);  // Parsing 
            lpPairDict[pairAddressFromData] = [];
        }
        for (addressHash in lpPairDict){
            lpPairList.push(addressHash) // push the key off the dictionary into a list
        }
    }

    async function writeJsonFile() {     // We will write the result into a json file for reference
        data = JSON.stringify(lpPairDict);
        fs.writeFileSync('storage.json', data);
    }


    await queryEtherscan(factoryAddress); // Initialise lpPairDict and lpPairList
    var promiseList = []   // We will add the promises into a list so that we can use Promise all at the end, this will make the run time significantly faster.
    blockNumber = await provider.getBlockNumber()    
    for (let i = blockNumber; i>0;) {
        for (let j in lpPairList){
            promiseList.push(getQuery(i,lpPairList[j]))  // Push promise into promiseList 
            break
        }
        i -= 9999;
    }
    await Promise.all(promiseList)  // Let's wait for all the promise to be done, if we get timed out then we will iterate through the while loop until we get a result ; See line 25
    console.log(lpPairDict) 
    writeJsonFile()
} 

init()
        





