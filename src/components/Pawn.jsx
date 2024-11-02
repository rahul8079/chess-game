import { useState } from "react";

const Pawn = ({pawnColor, onClick})=>{
    return (
        <div onClick={onClick}>
        <img src={`/images/pawn-${pawnColor}.png`} alt={`pawn-${pawnColor}`} />
        </div>
    );
}

export default Pawn;