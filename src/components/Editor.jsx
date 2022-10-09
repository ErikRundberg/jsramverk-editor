import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from "socket.io-client";

import DocSelector from './DocSelector';
import docsModel from '../models/docs';
import React, {useEffect, useState} from "react";

let update = true;

let baseUrl = window.location.href.includes("localhost") ?
    "http://localhost:1338" :
    "https://jsramverk-editor-erru17.azurewebsites.net";

function Editor({docs, fetchDocs, user, doc, setDoc, setEditor, token}) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [socket, setSocket] = useState(null);

    async function saveDoc() {
        const newDoc = {
            _id: doc ? doc._id : null,
            title: title,
            content: content,
            allowedUsers: user.email
        };
        const result = await docsModel.createDoc(token, newDoc);

        await setDoc(result);
        await fetchDocs(user.email);
    }

    function newDoc() {
        setDoc([]);
        setTitle("");
        setContent("");
        document.getElementById("doc-select").value = -99;
    }

    function emitContent() {
        if (socket) {
            const copy = Object.assign({}, doc);

            update = false;
            copy.content = content;
            setDoc(copy);
            socket.emit("doc", doc);
        }
    }

    function emitTitle() {
        if (socket) {
            const copy = Object.assign({}, doc);

            update = false;
            copy.title = title;
            setDoc(copy);
            socket.emit("doc", doc);
        }
    }

    function changeTitle() {
        setTitle(document.getElementById("title").value);
    }

    function createEditorInstance(ref) {
        if (ref) {
            setEditor(ref.getEditor());
        }
    }

    useEffect(() => {
        (async () => {
            await fetchDocs(user.email);
        })();
    }, []);

    useEffect(() => {
        setSocket(io(baseUrl));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("create", doc["_id"]);
        }
    }, [doc._id]);

    useEffect(() => {
        if (socket) {
            socket.on("update", (doc) => {
                if (update) {
                    setDoc(doc);
                    setContent(doc.content);
                    setTitle(doc.title);
                }
                update = true;
            });
        }
    }, [socket]);

    return (
        <div className={"editor-container"}>
            <div className={"padded-bot doc-selector"}>
                <button onClick={newDoc}>New</button>
                <div>
                    <label>Title: </label>
                    <input name={"title"} onChange={changeTitle} onKeyUp={emitTitle}
                        value={title} id={"title"} />
                    <button className={"margin-left"} onClick={saveDoc}>
                        Save</button>
                </div>
                <DocSelector docs={docs} setDoc={setDoc} setContent={setContent}
                    setTitle={setTitle} email={user.email} token={token}/>
            </div>
            <ReactQuill ref={(ref) => {createEditorInstance(ref);}} theme={"snow"} value={content}
                onChange={setContent} preserveWhitespace={ true } onKeyUp={emitContent} />
        </div>
    );
}

export default Editor;
