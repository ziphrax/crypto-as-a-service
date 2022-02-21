import React from "react";

import './footer.css';

interface FooterProps { }

function Footer(props: React.PropsWithChildren<FooterProps>){
    return (
        <footer className="c-footer">
            {props.children}
        </footer>
    );   
}

export default Footer;