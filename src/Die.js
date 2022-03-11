import React from "react";

export default function Die(props){
    /*
    Here we use a tenary to check if the isHeld prop true or false in order to set backgroundColor for each condition
    */ 
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"  
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}