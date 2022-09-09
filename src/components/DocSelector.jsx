import docsModel from '../models/docs';

function DocSelector({docs, setDoc}) {
    async function fetchDoc() {
        const docSelect = document.getElementById("doc-select");
        if (docSelect.value !== "-99") {
            const doc = await docsModel.getDoc(docSelect.value);
            document.getElementById("doc-title").value = doc["title"];
            document.querySelector("trix-editor").value = doc["text"];
            setDoc(doc);
            docSelect.value = doc["_id"];
        }
    }
    return (
        <div>
            <select id={"doc-select"}>
                <option value="-99" key="0">Choose a document</option>
                {docs.map((doc, index) => <option value={doc._id} key={index}>{doc.title}</option>)}
            </select>
            <button className={"margin-left"} onClick={fetchDoc}>Open</button>
        </div>
);
}

export default DocSelector;