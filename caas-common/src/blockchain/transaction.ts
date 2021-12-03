import CryptoJS from 'crypto-js'

export class Transaction {
    sender: string;
    receiver: string;
    amount: number;
    time: Date;
    hash: string;

    constructor(sender:string, receiver: string, amount: number){
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.time = new Date();
        this.hash = this.calculateHash();
    }

    calculateHash(){
        const hashString = this.sender + this.receiver + this.amount + this.time;

        return CryptoJS.SHA512(hashString).toString();
    }
}