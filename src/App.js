import React, {useState} from 'react';
import docsModel from './models/docs';
import Editor from './components/Editor';
import Buttons from "./components/Buttons";
import Login from "./components/Login";
import CodeEditor from "./components/CodeEditor";
import {SocketContext, socket} from './context/socket';

function App() {
    const [docs, setDocs] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [doc, setDoc] = useState([]);
    const [editor, setEditor] = useState({});
    const [codeEditor, setCodeEditor] = useState({});
    const [codeMode, setCodeMode] = useState(false);

    async function fetchDocs(email, editor) {
        const allDocs = await docsModel.graphqlAllDocs(token, email, editor);

        setDocs(allDocs);
    }

    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                <header>
                    <h1>jsramverk Editor</h1>
                    { token ? <h2>Welcome {user.email}</h2> : null }
                </header>
                <main>
                    { token ?
                        <>
                            <Buttons setToken={setToken} doc={doc} editor={editor} user={user}
                                token={token} setCodeMode={setCodeMode} codeMode={codeMode}
                                setDoc={setDoc} codeEditor={codeEditor}/>
                            {codeMode ?
                                <CodeEditor docs={docs} fetchDocs={fetchDocs} user={user} doc={doc}
                                    setDoc={setDoc} setCodeEditor={setCodeEditor} token={token} /> :
                                <Editor docs={docs} fetchDocs={fetchDocs} user={user} doc={doc}
                                    setDoc={setDoc} setEditor={setEditor} token={token} />
                            }
                        </>
                        :
                        <Login setToken={setToken} user={user} setUser={setUser} /> }
                </main>
            </div>
        </SocketContext.Provider>
    );
}

export default App;
