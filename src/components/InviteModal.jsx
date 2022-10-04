import React from 'react';

function InviteModal({openState, changeHandler, inviteFunction, title}) {
    return (
        <div style={{transition: "all 1s"}}
            className={`${openState ? "opened" : "closed"}`}>
            <div className={"grid"}>
                <div className={"grid-gap login"} >
                    <h3 style={{color: "ghostwhite"}}>{title}</h3>
                    <div className={"form-field"}>
                        <label aria-label={"email"}>
                            <svg className="icon">
                                <use xlinkHref={"#icon-user"}></use>
                            </svg>
                            <span className="hidden">Username</span>
                        </label>
                        <input type={"email"} name={"email"}
                            autoComplete={"email"} className={"form-input"}
                            placeholder={"email"} onChange={changeHandler}/>
                    </div>
                    {
                        title === "Invite to document"
                            ?
                            <small style={{color: "ghostwhite", textAlign: "center"}}>
                                Type * to make document public</small>
                            : <small></small>
                    }
                    <button style={{marginTop: "0.5em"}} onClick={inviteFunction}>
                        Invite</button>
                </div>
            </div>
        </div>
    );
}

export default InviteModal;
