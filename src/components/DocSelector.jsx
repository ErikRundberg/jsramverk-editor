import React from "react";
import docsModel from '../models/docs';

function DocSelector({docs, setDoc, setContent, setTitle}) {
    async function fetchDoc() {
        const docSelect = document.getElementById("doc-select");

        if (docSelect.value !== "-99") {
            const doc = await docsModel.getDoc(docSelect.value);

            setDoc(doc);
            setContent(doc.content);
            setTitle(doc.title);
            docSelect.value = doc._id;
        }
    }

    function CreateOptions() {
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
