import { Block, BlockChain, BlockChainOptions, Transaction } from '../../blockchain'
import { v4 as uuidv4 } from 'uuid';
import { CryptoNode } from '../../blockchain/crypto-node';

export function givenInitialBlockChain(): BlockChain{
    const genesisSender = uuidv4();
    const genesisReceiver = uuidv4();
    const genesisAmount = 10;

    const options: BlockChainOptions = {
        name: uuidv4(),
        genesisSender, 
        genesisReceiver, 
        genesisAmount,
        difficulty: 1,
        minerRewards: 1,
        blockSize: 10,
    } 

    const blockchain = new BlockChain(options);

    return blockchain;
}

export function givenTransaction(): Transaction[] {
    const sender = uuidv4();
    const receiver = uuidv4();

    return [
        new Transaction(sender, receiver, 1)
    ]
}

export function givenTransactions(): Transaction[] {
    const sender = uuidv4();
    const receiver = uuidv4();

    return [
        new Transaction(sender, receiver, 1),
        new Transaction(sender, receiver, 1)
    ]
}

export function givenTransactionsX(x:number): Transaction[] {
    const sender = uuidv4();
    const receiver = uuidv4();

    const arr = new Array<Transaction>(x);
    for(let i = 0; i< x; i++){
        arr[i] = new Transaction(sender, receiver, 1);
    }

    return arr;
}

export function givenNode(address: string): CryptoNode {
    return {
        address
    } as CryptoNode;
} 