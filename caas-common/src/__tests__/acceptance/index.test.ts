import { Block, BlockChain, BlockChainOptions, Transaction } from '../../blockchain'
import { v4 as uuidv4 } from 'uuid';

import { givenInitialBlockChain, givenTransactions } from '../fixtures/given';

describe("Blockchain proof of concept", () => {
    test("Should create a block chain", () => {
        const blockchain = givenInitialBlockChain();

        console.log(blockchain);

        expect(blockchain.chain.length).toBe(1);
    })

    test("Adds a block", () => {
        const blockchain = givenInitialBlockChain();

        const transactions = givenTransactions();

        const block = new Block(transactions, new Date(), blockchain.chain.length);
        
        blockchain.addBlock(block);

        const result = blockchain.getLastBlock();

        expect(blockchain.chain.length).toBe(2);
    });

    test("Gets last block", () => {
        const blockchain = givenInitialBlockChain();

        const transactions = givenTransactions();

        const block = new Block(transactions, new Date(), blockchain.chain.length);
        
        blockchain.addBlock(block);

        const result = blockchain.getLastBlock();

        console.log(result);

        expect(result.hash).toBe(block.hash);
    })
})