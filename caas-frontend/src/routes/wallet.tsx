import Main from "../components/Main/Main";
import { Wallet } from "../features/wallet/Wallet";

function WalletPage(){
    return (
        <Main>
            <h1>Wallets</h1>
            <Wallet></Wallet>
        </Main>
    );
}

export default WalletPage;