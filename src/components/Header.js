import React, { useContext } from "react";
import { ChatContext } from '../ChatContext';
import '../styles/Header.css'
import reset from '../images/reset.png'
import { Button } from '@material-ui/core'

function Header() {
    const { resetChat } = useContext(ChatContext);
    return (
        <div className="header">
            <div className="header_elements">
                <div className="header_heading">
                    <h1> Nasar Store </h1>
                </div>

                <div className="header_menu">
                    <Button onClick={resetChat}><img className="header_logo" src={reset} alt="Menu" /></Button>
                </div>
            </div>
            <hr />
        </div>

    )
}

export default Header
