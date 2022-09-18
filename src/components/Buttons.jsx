import React from "react";

function Buttons() {
    return (
        <div>
            <div className={"buttons"}>
                <div className={"buttons-padding"}>
                    <button className={"button disabled"}>Invite</button>
                    <button className={"button disabled"}>Code-mode</button>
                    <button className={"button disabled"}>PDF</button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
