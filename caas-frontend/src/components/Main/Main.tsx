import React from "react";

import './main.css';

interface MainProps { }

function Main(props: React.PropsWithChildren<MainProps>){
    return (
        <main className="c-main">
            {props.children}
        </main>
    );   
}

export default Main;