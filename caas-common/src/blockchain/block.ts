import { Transaction } from './transaction'
import CryptoJS from 'crypto-js';

export class Block {
    transactions: Transaction[];
    previousHash: string;
    hash: string;
    time: Date;
    index: number;

    constructor(transactions: Transaction[], time: Date, index: number){
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.time = time;
        this.index = index;
    }

    calculateHash(): string {
        let hashTransactions = "";

        for(let i = 0; i < this.transactions.length; i++){
            const transaction = this.transactions[i];
            
            hashTransactions += transaction.hash;
        }

        const hashString = this.time + hashTransactions + this.previousHash + this.index;
        const hash = CryptoJS.SHA512(hashString);

        return hash.toString();
    }

    mineBlock(difficulty: number){
        //TODO: 
    }
}