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

    return (
        <div className="App">
            <header>
                <h1>jsramverk Editor</h1>
            </header>
            <main className="main">
                <Buttons />
                <Editor docs={docs} fetchDocs={fetchDocs} />
            </main>
        </div>
    );
}

export default App;
