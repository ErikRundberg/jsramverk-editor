import React from "react";
import ModalInvite from "./ModalInvite";

function Buttons({setToken, doc}) {
    return (
        <div>
            <div className={"buttons"}>
                <div className={"buttons-padding"}>
                    <ModalInvite doc={doc} />
                    <button className={"button disabled"}>Code-mode</button>
                    <button className={"button disabled"}>PDF</button>
                    <button className={"button"} onClick={() => {setToken("");}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
