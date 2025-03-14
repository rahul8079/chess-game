import { useState } from "react";

const Rook = ({rookColor, onClick})=>{
    return (
        <div onClick={onClick}>
        <img src={`/images/rook-${rookColor}.png`} alt={`rook-${rookColor}`} />
        </div>
    );
}

export default Rook;