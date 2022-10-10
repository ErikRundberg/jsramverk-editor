import React, { useState } from 'react';
import docsModel from './models/docs';
import Editor from './components/Editor';
import Buttons from "./components/Buttons";
import Login from "./components/Login";
import CodeEditor from "./components/CodeEditor";

function App() {
    const [docs, setDocs] = useState([]);
    const [token, setToken] = useState("a");
    const [user, setUser] = useState({});
    const [doc, setDoc] = useState([]);
    const [editor, setEditor] = useState({});
    const [codeMode, setCodeMode] = useState(false);

    async function fetchDocs(email) {
        const allDocs = await docsModel.graphqlAllDocs(token, email);

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
                        <Buttons setToken={setToken} doc={doc} editor={editor} user={user}
                            token={token} setCodeMode={setCodeMode} codeMode={codeMode}/>
                        {codeMode ?
                            <CodeEditor/> :
                            <Editor docs={docs} fetchDocs={fetchDocs} user={user} doc={doc}
                                setDoc={setDoc} setEditor={setEditor} token={token}/>
                        }
                    </>
                    :
                    <Login setToken={setToken} user={user} setUser={setUser} /> }
            </main>
        </div>
    );
}

export default App;
