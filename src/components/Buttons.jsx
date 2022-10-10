import React from "react";
import ModalInviteButtons from "./ModalInviteButtons";
import {pdfExporter} from "quill-to-pdf";
import { saveAs } from 'file-saver';

function Buttons({setToken, doc, editor, user, token, setCodeMode, codeMode}) {
    async function exportPdf() {
        const pdfBlob = await pdfExporter.generatePdf(editor.getContents());
        const title = "title" in doc ? doc.title : "untitled";

        saveAs(pdfBlob, `${title}.pdf`);
    }

    function changeCodeMode() {
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
