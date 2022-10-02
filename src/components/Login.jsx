import React from "react";

import authModel from "../models/auth";

export default function Login({setToken, user, setUser}) {
    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    }

    async function register() {
        const result = await authModel.register(user);

        setToken("data" in result ? result.data.token : "");
    }

    async function login() {
        const result = await authModel.login(user);

        setToken("data" in result ? result.data.token : "");
    }

    return (
        <div className={"center"}>
            <div className={"grid"}>
                <div className={"grid-gap login"}>
                    <h3 style={{color: "ghostwhite", marginTop: "1em"}}>Login</h3>
                    <div className={"form-field"}>
                        <label aria-label={"email"}>
                            <svg className="icon">
                                <use xlinkHref={"#icon-user"}></use>
                            </svg>
                            <span className="hidden">Username</span>
                        </label>
                        <input type={"email"} name={"email"} onChange={changeHandler}
                            autoComplete={"email"} className={"form-input"}
                            onKeyUp={async (event) => {
                                if (event.key === "Enter") {await login();}
                            }}/>
                    </div>
                    <div className={"form-field"}>
                        <label aria-label={"password"}>
                            <svg className="icon">
                                <use xlinkHref={"#icon-lock"}></use>
                            </svg>
                            <span className="hidden">Password</span>
                        </label>
                        <input type={"password"} name={"password"} onChange={changeHandler}
                            autoComplete={"password"} className={"form-input"}
                            onKeyUp={async (event) => {
                                if (event.key === "Enter") {await login();}
                            }}/>
                    </div>
                    <button onClick={login} style={{marginTop: "0.5em"}}>Log in</button>
                    <button id={"register"} onClick={register}>Register</button>
                </div>
            </div>
            <svg className={"icons"}>
                <symbol id="icon-lock" viewBox="0 0 1792 1792">
                    <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832
                     96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40
                      28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68
                       28t28 68z" />
                </symbol>
                <symbol id="icon-user" viewBox="0 0 1792 1792">
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53
                     3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48
                      108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81
                       43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5
                        783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                </symbol>
            </svg>
        </div>
    );
}
