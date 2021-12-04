import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Block, Transaction} from '.';
import { blockchain } from '..';
import { CryptoNode } from './crypto-node';

export interface BlockChainOptions {
    name: string;
    genesisSender: string;
    genesisReceiver: string; 
    genesisAmount: number;
    difficulty: number;
    minerRewards: number;
    blockSize: number;
}

export interface NodeSet {
    [key: string] : CryptoNode;
}

export class BlockChain {
    chain: Block[];
    pendingTransactions: Transaction[];
    difficulty: number;
    minerRewards: number;
    blockSize: number;
    nodes: NodeSet;
    name: string;

    constructor(
        options: BlockChainOptions
    ){
        this.chain = [ ];
        this.pendingTransactions = [ ];

        this.name = options.name;

        this.difficulty = options.difficulty;
        this.minerRewards = options.minerRewards;
        this.blockSize = options.blockSize;

        this.addGenesisBlock(options.genesisSender, options.genesisReceiver, options.genesisAmount);

        this.nodes = {};
    }

    registerNode (cryptoNode: CryptoNode): string{
        const id = uuidv4();

        cryptoNode.id = id;

        this.nodes[id] = cryptoNode;

        return id;
    }

    // resolveConflicts(){
    //     const neighbors = this.nodes;
    //     let newChain: BlockChain;

    //     const maxLength = this.chain.length;
    //     const keys = Object.keys(neighbors);

    //     for(let i = 0; i < keys.length; i++){
    //         const key = keys[i];
    //         const n = this.nodes[key];

    //         const response = axios.get(`http://${n.address}/chain`);

	// 		// if response.status_code == 200:
	// 		// 	length = response.json()['length'];
	// 		// 	chain = response.json()['chain'];

	// 		// 	if length > maxLength and self.isValidChain():
	// 		// 		maxLength = length;
	// 		// 		newChain = chain;

    //     }

	// 	// if newChain:
	// 	// 	self.chain = self.chainJSONdecode(newChain);
	// 	// 	print(self.chain);
	// 	// 	return True;

    //     return false;

    // }

    // miner is the receiver of the miner rewards for mining the transactions
    minePendingTransaction(miner: string): boolean {
        const pendingTransactionsCount = this.pendingTransactions.length;
        
        // Must always be more then one otherwise you could just mine your own reward transaction infinitely
        if(pendingTransactionsCount <= 1){
            console.log('Not enough transactions to mine');
            return false;
        }

        let index = 0;

        let end = pendingTransactionsCount;
        
        if(pendingTransactionsCount > this.blockSize){
            end = this.blockSize;
        }
        
        const transactionSlice = this.pendingTransactions.slice(index, end);
        
        const newBlock = new Block(transactionSlice, new Date(),this.chain.length);
        
        newBlock.mineBlock(this.difficulty);

        this.addBlock(newBlock);

        const remainingTransactions = this.pendingTransactions.slice(end);
        
        console.log(`Block Mined: Pay Miner ${miner} ${this.minerRewards}`);

        const payMiner = new Transaction(this.name, miner, this.minerRewards);
        
        // should the miner only mine one block the pending transactions should only remove the completed transactions
        remainingTransactions.push(payMiner);

        this.pendingTransactions = remainingTransactions; 

        return true;
    }

    addTransactions(transactions: Transaction[]){
        this.pendingTransactions.push(...transactions);
    }

    addGenesisBlock(sender:string, receiver:string, amount: number): void {
        const genesisTransactions = [new Transaction(sender, receiver, amount)];
        const genesis = new Block(genesisTransactions, new Date(), 0);

        genesis.previousHash = "none";

        return this.addBlock(genesis);
    }

    getLastBlock(): Block{
        return this.chain[this.chain.length-1];
    }

    addBlock(block: Block):void {
        if(this.chain.length > 0){
            block.previousHash = this.getLastBlock().hash;
        } else {
            block.previousHash = "none";
        }

        this.chain.push(block);
    }
}