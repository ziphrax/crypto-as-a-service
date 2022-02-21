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

            <form className="c-form" onSubmit={onSubmitCreateWallet}>
                <h2>New Wallet</h2>

                <p>Enter a name for your new crypto wallet below.</p>

                <div className="c-form-input">
                    <label className="c-label" htmlFor="wallet">Name:</label>
                    <input className="c-input" id="name" type="text" />
                </div>

                <div className="c-form-input">
                    {/* TODO: OFFSET */}
                    <label className="c-label"></label>
                    <button className="c-button c-button--primary" type="submit">Create</button>
                </div>
            </form>

        </div>
    );
}