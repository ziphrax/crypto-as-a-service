import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { IErrors, IValues } from '../../utils/interfaces';
import { createWallet } from './walletAPI';
import { createWalletAsync, selectWallet, selectWallets } from './walletSlice';
import { v4 as uuidv4} from 'uuid';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement
}
interface NameFormElement extends HTMLFormElement {
    // now we can override the elements type to be an HTMLFormControlsCollection
    // of our own design...
    readonly elements: FormElements
}

export function WalletsList(){
    const wallets = useAppSelector(selectWallets);

    return <ul>
        {wallets.map((wallet, index) => {
            return <li key={index}>{wallet.name}</li>
        })}
    </ul>
    
}

export function Wallet() {
    const wallet = useAppSelector(selectWallet);
    const dispatch = useAppDispatch();

    const [formState, setFormState] = useState({
        errors: {} as IErrors,
        values: {} as IValues,
        submitSuccess: false
    });

    const onSubmitCreateWallet = async (e: React.FormEvent<NameFormElement>): Promise<void> => {
        e.preventDefault();

        console.log(e);

        const formElements = e.currentTarget.elements;
        
        console.log(e);
        
        setFormState({ ...formState, ...formElements });

        dispatch(createWalletAsync({address: uuidv4(),name: formElements.name.value, balance: 0 }))
    }

    return (
        <div>
            <WalletsList />

            <form onSubmit={onSubmitCreateWallet}>
                <legend>New Wallet</legend>
                <label htmlFor="wallet">Name:</label>
                <input id="name" type="text" />
                <button type="submit">Create</button>
            </form>

        </div>
    );
}