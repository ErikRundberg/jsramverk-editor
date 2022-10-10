import React, {useState} from "react";
import Editor from "@monaco-editor/react";

import code from "../models/code";

function CodeEditor() {
    const [editorValue, setEditorValue] = useState("");

    function handleChange(value) {
        setEditorValue(value);
    }

    async function executeCode() {
        await code.execute(editorValue);
    }

    return (
        <>
            <button className={"button"} style={{margin: "1vh"}}
                onClick={executeCode}>Execute</button>
            <Editor
                height="70vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onChange={handleChange}
            />
        </>);
}

export default CodeEditor;
