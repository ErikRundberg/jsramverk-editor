import "trix/dist/trix";
import "trix/dist/trix.css"
import { TrixEditor } from "react-trix";
import DocSelector from './DocSelector';
import docsModel from '../models/docs';
import {useState} from "react";


function Editor({docs, fetchDocs}) {
    const [doc, setDoc] = useState([]);
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
    function handleChange() {
        doc["content"] = document.querySelector("trix-editor").value;
    }
    return (
        <div className={"editor-container"}>
            <div className={"padded-bot doc-selector"}>
                <button onClick={newDoc}>New</button>
                <div>
                    <label>Title: </label>
                    <input name={"title"} id={"doc-title"}/>
                    <button className={"margin-left"} onClick={saveDoc}>Save</button>
                </div>
                <DocSelector docs={docs} setDoc={setDoc}/>
            </div>
            <TrixEditor id={"trix"} onChange={handleChange} mergeTags={[]}/>
        </div>
    );
}

export default Editor;