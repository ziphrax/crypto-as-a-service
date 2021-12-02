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
        return '';
    }
}