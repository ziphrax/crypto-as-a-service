import React from "react";

import './header.css';

interface HeaderProps { }

function Header(props: React.PropsWithChildren<HeaderProps>){
    return (
        <header className="c-header">
            {props.children}
        </header>
    );   
}

export default Header;