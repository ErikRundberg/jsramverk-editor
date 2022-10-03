import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
import docsModel from './models/docs';
import Editor from './components/Editor';
import Buttons from "./components/Buttons";
import Login from "./components/Login";
import ModalInviteButtons from "./components/ModalInviteButtons";

function App() {
    const [docs, setDocs] = useState([]);
    const [token, setToken] = useState("asd");
    const [user, setUser] = useState({});
    const [doc, setDoc] = useState([]);
    const [editor, setEditor] = useState({});

    async function fetchDocs(email) {
        const allDocs = await docsModel.getAllDocs(email);

        setDocs(allDocs);
    }

    return (
        <div className="App">
            <header>
                <h1>jsramverk Editor</h1>
            </header>
            <main className="main">
                <ModalInviteButtons />
                {/*{ token ?*/}
                {/*    <>*/}
                {/*        <Buttons setToken={setToken} doc={doc} editor={editor}/>*/}
                {/*        <Editor docs={docs} fetchDocs={fetchDocs} user={user} doc={doc}*/}
                {/*            setDoc={setDoc} setEditor={setEditor}/>*/}
                {/*    </>*/}
                {/*    :*/}
                {/*    <Login setToken={setToken} user={user} setUser={setUser} /> }*/}
            </main>
        </div>
    );
}

export default App;
