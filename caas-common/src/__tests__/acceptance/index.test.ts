import { Block, BlockChain, Transaction } from '../../blockchain'

describe("Blockchain proof of concept", () => {
    test("Should create a block chain", () => {
        const blockchain = new BlockChain();

        const transactions = [
            new Transaction("sender", "receiver", 1)
        ]

        const block1 = new Block(transactions, new Date(), 0);
        const block2 = new Block(transactions, new Date(), 1);

        blockchain.addBlock(block1);
        blockchain.addBlock(block2);

        console.log(blockchain);

        expect(blockchain.chain.length).toBe(2);
    })
})