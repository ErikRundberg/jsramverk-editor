import React from "react";
import docsModel from '../models/docs';

function DocSelector({docs, setDoc}) {
    async function fetchDoc() {
        const docSelect = document.getElementById("doc-select");

        if (docSelect.value !== "-99") {
            const doc = await docsModel.getDoc(docSelect.value);

            document.getElementById("doc-title").value = doc["title"];
            document.querySelector("trix-editor").value = doc["content"];
            setDoc(doc);
            docSelect.value = doc["_id"];
        }
    }

    function CreateOptions(props) {
        const docs = props.docs;
        const options = [<option value="-99" key="0">Choose a document</option>];

        if (docs) {
            docs.map(
                (doc, index) => options.push(
                    <option value={doc._id} key={index+1}>{doc.title}</option>)
            );
        }

        return (
            <select id={"doc-select"}>
                {options}
            </select>
        );
    }
    return (
        <div>
            <CreateOptions docs={docs} />
            <button className={"margin-left"} onClick={fetchDoc}>Open</button>
        </div>
    );
}

export default DocSelector;
