import { Block, BlockChain, BlockChainOptions, Transaction } from '../../blockchain'
import { v4 as uuidv4 } from 'uuid';

import { givenInitialBlockChain, givenNode, givenTransaction, givenTransactions, givenTransactionsX } from '../fixtures/given';

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

    test('Register node', () => {
        const blockchain = givenInitialBlockChain();
        const node1 = givenNode(uuidv4());

        const result = blockchain.registerNode(node1);

        console.log('Registered Node: ', result, node1);

        expect(result).not.toBe("");
    })

    test('Mine pending transactions if more then 1', () => {
        const blockchain = givenInitialBlockChain();
        const initialBlockChainLength = blockchain.chain.length;

        const transactions = givenTransactions();

        blockchain.addTransactions(transactions);

        const miner = uuidv4();
        blockchain.minePendingTransaction(miner);

        expect(blockchain.pendingTransactions[0].sender).toBe(blockchain.name);
        expect(blockchain.pendingTransactions[0].receiver).toBe(miner);
        expect(blockchain.pendingTransactions[0].amount).toBe(blockchain.minerRewards);

        expect(blockchain.chain.length).toBe(initialBlockChainLength + 1);
    })

    test('Mine pending transactions if more then X (aka current blocksize of 10)', () => {
        const blockchain = givenInitialBlockChain();
        const initialBlockChainLength = blockchain.chain.length;
        const x = 15;
        const transactions = givenTransactionsX(x);

        blockchain.addTransactions(transactions);

        console.log('Unmined Chain => ',{blockchain});

        const miner = uuidv4();

        blockchain.minePendingTransaction(miner);

        console.log('Mined Chain => ',{blockchain});

        expect(blockchain.chain.length).toBe(initialBlockChainLength + 1);
        expect(blockchain.pendingTransactions.length).toBe(x-blockchain.blockSize + 1);
    })

    test('Dont mine pending transactions if only 1',() => {
        const blockchain = givenInitialBlockChain();
        const initialBlockChainLength = blockchain.chain.length;

        const transactions = givenTransaction();

        blockchain.addTransactions(transactions);

        const miner = uuidv4();

        blockchain.minePendingTransaction(miner);

        expect(blockchain.pendingTransactions).toStrictEqual(transactions);

        expect(blockchain.chain.length).toBe(initialBlockChainLength);
    });
})