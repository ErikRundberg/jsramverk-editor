import React, { useState, useEffect } from 'react';

import docsModel from './models/docs';
import Editor from './components/Editor';
import Buttons from "./components/Buttons";


function App() {
    const [docs, setDocs] = useState([]);

    async function fetchDocs() {
        const allDocs = await docsModel.getAllDocs();

        setDocs(allDocs);
    }

    useEffect(() => {
        (async () => {
            await fetchDocs();
        })();
    }, []);

    function NoServerError() {
        if (docs.length == 0) {
            return (
                <div className="alert">
                    <p>Could not fetch documents</p>
                    <p>Is the server on?</p>
                </div>
            );
        }
    }

    return (
        <div className="App">
            <header>
                <h1>jsramverk Editor</h1>
            </header>
            <NoServerError />
            <main className="main">
                <Buttons />
                <Editor docs={docs} fetchDocs={fetchDocs} />
            </main>
        </div>
    );
}

export default App;
