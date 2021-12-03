import { Block, BlockChain, BlockChainOptions, Transaction } from '../../blockchain'
import { v4 as uuidv4 } from 'uuid';

export function givenInitialBlockChain(): BlockChain{
    const genesisSender = uuidv4();
    const genesisReceiver = uuidv4();
    const genesisAmount = 10;

    const options: BlockChainOptions = {
        genesisSender, genesisReceiver, genesisAmount
    } 

    const blockchain = new BlockChain(options);

    return blockchain;
}

export function givenTransactions(): Transaction[] {
    const sender = uuidv4();
    const receiver = uuidv4();

    return [
        new Transaction(sender, receiver, 1)
    ]
}