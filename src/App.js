import React, { useState } from 'react';

import docsModel from './models/docs';
import Editor from './components/Editor';
import Buttons from "./components/Buttons";
import Login from "./components/Login";

function App() {
    const [docs, setDocs] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [doc, setDoc] = useState([]);

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
                { token ?
                    <>
                        <Buttons setToken={setToken} doc={doc} />
                        <Editor docs={docs} fetchDocs={fetchDocs} user={user} doc={doc}
                            setDoc={setDoc} />
                    </>
                    :
                    <Login setToken={setToken} user={user} setUser={setUser} /> }
            </main>
        </div>
    );
}

export default App;
