import {Block} from './block'

export class BlockChain {
    chain: Block[]

    constructor(){
        this.chain = [];
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