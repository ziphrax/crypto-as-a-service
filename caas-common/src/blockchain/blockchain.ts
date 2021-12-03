import { Block, Transaction} from '.'

export interface BlockChainOptions {
    genesisSender: string;
    genesisReceiver: string; 
    genesisAmount: number;
}

export class BlockChain {
    chain: Block[]
    pendingTransactions: Transaction[];
    dificulty: number

    constructor(
       options: BlockChainOptions
    ){
        this.chain = [ ];
        this.addGenesisBlock(options.genesisSender, options.genesisReceiver, options.genesisAmount);
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