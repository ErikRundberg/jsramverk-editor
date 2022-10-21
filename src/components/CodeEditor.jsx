import React, {useEffect, useState, useContext, useRef} from "react";
import Editor from "@monaco-editor/react";

import code from "../models/code";
import DocSelector from "./DocSelector";
import docsModel from "../models/docs";
import {SocketContext} from "../context/socket";

function CodeEditor({docs, fetchDocs, user, doc, setDoc, token}) {
    const socket = useContext(SocketContext);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [executed, setExecuted] = useState("");
    const editorRef = useRef(null);

    async function saveDoc() {
        const newDoc = {
            _id: doc ? doc._id : null,
            title: title,
            content: content,
            allowedUsers: user.email,
            editor: "code"
        };
        const result = await docsModel.createDoc(token, newDoc);

        await setDoc(result);
        await fetchDocs(user.email, "code");
    }

    function handleEditorDidMount(editor) {
        editor.focus();
        editorRef.current = editor;
    }

    function newDoc() {
        setDoc([]);
        setTitle("");
        setContent("");
        document.getElementById("doc-select").value = -99;
    }

    socket.on("update", (doc) => {
        if (doc.typer !== user.email) {
            setDoc(doc);
            setContent(doc.content);
            setTitle(doc.title);
        }
    });

    function emitTitle(data) {
        const newTitle = data.target.value;
        const copy = Object.assign({}, doc);

        setTitle(newTitle);
        copy.title = newTitle;
        copy.typer = user.email;
        setDoc(copy);
        socket.emit("doc", copy);
    }

    function emitContent(data) {
        const copy = Object.assign({}, doc);

        setContent(data);
        copy.content = data;
        copy.typer = user.email;
        setDoc(copy);
        socket.emit("doc", copy);
    }

    useEffect(() => {
        (async () => {
            await fetchDocs(user.email, "code");
        })();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("create", doc["_id"]);
        }
    }, [doc._id]);

    async function executeCode() {
        const response = await code.execute(content);

        setExecuted(response);
    }

    return (
        <div className={"editor-container"}>
            <div className={"padded-bot doc-selector"}>
                <button onClick={newDoc}>New</button>
                <div>
                    <label>Title: </label>
                    <input name={"title"} onChange={emitTitle} value={title} id={"title"} />
                    <button className={"margin-left"} onClick={saveDoc}>
                        Save</button>
                </div>
                <DocSelector docs={docs} setDoc={setDoc} setContent={setContent}
                    setTitle={setTitle} email={user.email} token={token}/>
            </div>
            <div className={"flex-two-cols"}>
                <Editor
                    height="50vh"
                    width={"50%"}
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    value={content}
                    onChange={emitContent}
                    onMount={handleEditorDidMount}
                />
                <div style={{display: "flex", flexDirection: "column"}}
                    className={"console-output code-editor"}>
                    <button className={"execute-button"} onClick={executeCode}>Execute</button>
                    <pre><output>{executed}</output></pre>
                </div>
            </div>
        </div>);
}

export default CodeEditor;
