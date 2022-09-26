import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import { io } from "socket.io-client";

import DocSelector from './DocSelector';
import docsModel from '../models/docs';
import React, {useEffect, useState} from "react";


function Editor({docs, fetchDocs}) {
    const [doc, setDoc] = useState([]);
    const [socket, setSocket] = useState(null);
    const [update, setUpdate] = useState(false);


    async function saveDoc() {
        const newDoc = {
            title: document.getElementById("doc-title").value,
            content: doc["content"]
        };

        if (doc !== null) {
            newDoc["_id"] = doc._id;
        }
        const result = await docsModel.createDoc(newDoc);

        await setDoc(result);
        await fetchDocs();
        document.getElementById("doc-select").value = doc["_id"];
    }

    function newDoc() {
        setDoc([]);
        document.getElementById("doc-title").value = "";
        document.querySelector("trix-editor").value = "";
        document.getElementById("doc-select").value = -99;
    }

    function handleChange(html) {
        if (update) {
            const copy = Object.assign({}, doc);

            copy.content = html;
            setDoc(copy);
        }
        setUpdate(true);
    }

    function setEditorContent(content, changeContent) {
        let element = document.querySelector("trix-editor");

        let textPosition = element.editor.getSelectedRange();

        setUpdate(changeContent);
        element.value = "";
        element.editor.setSelectionRange([0, 0]);
        setUpdate(changeContent);
        console.log(content);
        element.editor.insertHTML(content);
        element.editor.setSelectedRange(textPosition.current);
    }

    useEffect(() => {
        setSocket(io("http://localhost:1338"));

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
    }, [doc["_id"]]);

    useEffect(() => {
        if (socket) {
            socket.emit("doc", doc);
        }
    }, [doc]);

    useEffect(() => {
        socket.on("update", (data) => {
            console.log("UPDATING");
            setEditorContent(data.content, false);
        });
    }, [socket]);

    return (
        <div className={"editor-container"}>
            <div className={"padded-bot doc-selector"}>
                <button onClick={newDoc}>New</button>
                <div>
                    <label>Title: </label>
                    <input name={"title"} id={"doc-title"}/>
                    <button className={"margin-left"} onClick={saveDoc}>
                        Save</button>
                </div>
                <DocSelector docs={docs} setDoc={setDoc} />
            </div>
            <TrixEditor id={"trix"} onChange={handleChange} mergeTags={[]}
                placeholder={"Start writing..."} className={"trix-content"}/>
        </div>
    );
}

export default Editor;
