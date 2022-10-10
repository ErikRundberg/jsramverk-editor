import React, {useState} from "react";
import Modal from "react-modal";
import docsModel from "../models/docs";

import InviteModal from "./InviteModal";

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


function ModalInviteButtons({doc, user, token}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addUserIsOpen, setAddUserIsOpen] = useState(false);
    const [inviteUserIsOpen, setInviteUserIsOpen] = useState(false);
    const [accessIsOpen, setAccessIsOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");

    async function addUser() {
        if (inviteEmail !== "") {
            const body = {
                _id: doc._id,
                email: inviteEmail
            };

            await docsModel.addUser(token, body);
        }

        closeModal();
    }

    async function emailInviteUser() {
        if (inviteEmail !== "") {
            const body = {
                to: inviteEmail,
                from: user.email,
                title: doc.title
            };

            await docsModel.inviteUser(token, body);
            await docsModel.addUser(token, body);
        }

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
        setInviteEmail("");
        setAddUserIsOpen(false);
        setInviteUserIsOpen(false);
        setAccessIsOpen(false);
    }

    function openAddUser() {
        addUserIsOpen
            ? setAddUserIsOpen(false)
            : setAddUserIsOpen(true);
        setInviteUserIsOpen(false);
        setAccessIsOpen(false);
    }

    function openInviteUser() {
        inviteUserIsOpen
            ? setInviteUserIsOpen(false)
            : setInviteUserIsOpen(true);
        setAddUserIsOpen(false);
        setAccessIsOpen(false);
    }

    function openAccess() {
        accessIsOpen
            ? setAccessIsOpen(false)
            : setAccessIsOpen(true);
        setInviteUserIsOpen(false);
        setAddUserIsOpen(false);
    }

    function AccessList() {
        let listItems = [];

        if (doc.allowedUsers) {
            if (doc.allowedUsers.includes("*")) {
                listItems = [<li key={"1"}><strong>Document is public</strong></li>];
            } else {
                doc.allowedUsers.forEach((item, index) => {
                    listItems.push(<li key={index}><strong>{item}</strong></li>);
                });
            }
        }

        return doc.allowedUsers === undefined
            ? <ul className={"access-list"}><strong>Empty</strong></ul>
            : <ul className={"access-list"}>{listItems}</ul>;
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
                <div className={"modal-buttons"}>
                    { doc._id ?
                        <>
                            <button className={"invite-button"} onClick={openAddUser}>
                                <img src={"./assets/letter-icon.png"} alt={"letter icon"}/>
                                <strong>Add user to document</strong>
                            </button>
                            <button className={"invite-button"} onClick={openInviteUser}>
                                <img src={"./assets/mail-icon.png"} alt={"mail icon"}/>
                                <strong>Mail invitation</strong>
                            </button>
                            <button className={"invite-button"} onClick={openAccess}>
                                <img src={"./assets/entries-icon.png"} alt={"entries icon"}/>
                                <strong>Document access</strong>
                            </button>
                        </>
                        :
                        <h2 style={{color: "ghostwhite"}}>Can only invite to saved document</h2>
                    }

                </div>
                <InviteModal title={"Invite to document"}
                    openState={addUserIsOpen}
                    changeHandler={changeHandler}
                    inviteFunction={addUser} />
                <InviteModal title={"Mail invitation"}
                    openState={inviteUserIsOpen}
                    changeHandler={changeHandler}
                    inviteFunction={emailInviteUser} />
                <div style={{transition: "all 1s"}}
                    className={`${accessIsOpen ? "opened" : "closed"}`}>
                    <div className={"grid"}>
                        <div className={"grid-gap login"}>
                            <h3 style={{color: "ghostwhite"}}>Document access</h3>
                        </div>
                        <AccessList />
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
