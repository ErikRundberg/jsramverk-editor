import React from "react";
import ModalInviteButtons from "./ModalInviteButtons";
import {pdfExporter} from "quill-to-pdf";
import "quill-delta";
import { saveAs } from 'file-saver';
import Delta from "quill-delta";

function Buttons({setToken, doc, editor, user, token, setCodeMode, codeMode, setDoc, codeEditor}) {
    async function exportPdf() {
        let pdfContent;

        if (codeMode === "Doc-mode") {
            pdfContent = editor.getContents();
        } else {
            pdfContent = new Delta([ { insert: codeEditor.getValue().replaceAll("\r", "") }]);
        }

        const pdfBlob = await pdfExporter.generatePdf(pdfContent);
        const title = "title" in doc ? doc.title : "untitled";

        saveAs(pdfBlob, `${title}.pdf`);
    }

    function changeCodeMode() {
        setDoc([]);
        setCodeMode(!codeMode);
    }

    return (
        <div>
            <div className={"buttons"}>
                <div className={"buttons-padding"}>
                    <ModalInviteButtons doc={doc} user={user} token={token}/>
                    <button className={"button"} onClick={changeCodeMode}>
                        { codeMode ? "Doc-mode" : "Code-mode" }</button>
                    <button className={"button"} onClick={exportPdf}>PDF</button>
                    <button className={"button"} onClick={() => {setToken("");}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
