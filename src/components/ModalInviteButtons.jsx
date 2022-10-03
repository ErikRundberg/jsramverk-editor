import React, {useState} from "react";
import Modal from "react-modal";
import docsModel from "../models/docs";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "30vw",
        minHeight: "25vh",
        backgroundColor: "#2c3338",
        overflow: "hidden"
    }
};

function ModalInviteButtons({doc}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addUserIsOpen, setAddUserIsOpen] = useState(false);
    const [inviteUserIsOpen, setInviteUserIsOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");

    async function inviteUser() {
        const body = {
            _id: doc._id,
            email: inviteEmail
        };

        await docsModel.addUser(body);
        console.log(inviteEmail + " not yet implemented");
        closeModal();
    }

    function changeHandler(event) {
        setInviteEmail(event.target.value);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openAddUser() {
        addUserIsOpen
            ? setAddUserIsOpen(false)
            : setAddUserIsOpen(true);
        setInviteUserIsOpen(false);
    }

    function openInviteUser() {
        inviteUserIsOpen
            ? setInviteUserIsOpen(false)
            : setInviteUserIsOpen(true);
        setAddUserIsOpen(false);
    }

    return (
        <>
            <button onClick={openModal} className={"button"}>Invite</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}>
                <div className={"modal-close"} onClick={closeModal}>
                    <svg viewBox="0 0 40 40">
                        <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                    </svg>
                </div>
                <div className={"two-buttons"}>
                    <button className={"invite-button"} onClick={openAddUser}>
                        <img src={"./assets/letter-icon.png"}/>
                        <strong>Add user to document</strong>
                    </button>
                    <button className={"invite-button"} onClick={openInviteUser}>
                        <img src={"./assets/mail-icon.png"}/>
                        <strong>Mail invitation</strong>
                    </button>
                </div>
                <div style={{transition: "all 1s"}}
                    className={`${addUserIsOpen ? "opened" : "closed"}`}>
                    <div className={"grid"}>
                        <div className={"grid-gap login"} >
                            <h3 style={{color: "ghostwhite"}}>Invite to document</h3>
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
                            <small style={{color: "ghostwhite", textAlign: "center"}}>
                                        Type * to make document public</small>
                            <button style={{marginTop: "0.5em"}} onClick={inviteUser}>
                                        Invite</button>
                        </div>
                    </div>
                </div>
                <div style={{transition: "all 1s"}}
                    className={`${inviteUserIsOpen ? "opened" : "closed"}`}>
                    <div className={"grid"}>
                        <div className={"grid-gap login"}>
                            <h3 style={{color: "ghostwhite"}}>Mail invitation</h3>
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
                            <small style={{color: "ghostwhite", textAlign: "center"}}>
                                        Type * to make document public</small>
                            <button style={{marginTop: "0.5em"}} onClick={inviteUser}>
                                        Invite</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <svg className={"icons"}>
                <symbol id="icon-user" viewBox="0 0 1792 1792">
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53
                     3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48
                      108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81
                       43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5
                        783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                </symbol>
            </svg>
        </>);
}

export default ModalInviteButtons;
