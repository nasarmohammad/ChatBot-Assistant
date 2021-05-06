import React from 'react'
import '../styles/BotIntro.css'
import NASER from '../images/61.png'

function BotIntro() {
    return (
        <div className="botintro">
            <img className="bot_image" src={NASER} alt="bot_dp" />
            <div className="title">
                <h1> John </h1>
            </div>
            <div className="subtitle">
                <p> CUSTOMER SUPPORT REPRESENTATIVE </p>
            </div>
        </div>

    )
}

export default BotIntro
