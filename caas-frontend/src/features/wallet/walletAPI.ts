import axios from 'axios';
import { Wallet } from "@caas/common/dist/blockchain/wallet";

const backendUrl: string = process.env.CASS_BACKEND_URL || "http://localhost:3000";

export function createWallet(wallet: Wallet){
    return axios.post(
        `${backendUrl}/wallets`,
        wallet,
        {}
    );
}