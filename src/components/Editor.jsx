import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import DocSelector from './DocSelector';
import docsModel from '../models/docs';
import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/socket";

function Editor({docs, fetchDocs, user, doc, setDoc, setEditor, token}) {
    const socket = useContext(SocketContext);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    async function saveDoc() {
        const newDoc = {
            _id: doc ? doc._id : null,
            title: title,
            content: content,
            allowedUsers: user.email,
            editor: "doc"
        };
        const result = await docsModel.createDoc(token, newDoc);

        await setDoc(result);
        await fetchDocs(user.email, "doc");
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

    function createEditorInstance(ref) {
        if (ref) {
            setEditor(ref.getEditor());
        }
    }

    useEffect(() => {
        (async () => {
            await fetchDocs(user.email, "doc");
        })();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("create", doc["_id"]);
        }
    }, [doc._id]);

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
            <ReactQuill ref={(ref) => {createEditorInstance(ref);}} theme={"snow"} value={content}
                onChange={emitContent} preserveWhitespace={ true } />
        </div>
    );
}

export default Editor;
