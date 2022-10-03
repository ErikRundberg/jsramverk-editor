import React from "react";
import ModalInvite from "./ModalInvite";
import {pdfExporter} from "quill-to-pdf";
import { saveAs } from 'file-saver';

function Buttons({setToken, doc, editor}) {
    async function exportPdf() {
        const pdfBlob = await pdfExporter.generatePdf(editor.getContents());
        const title = "title" in doc ? doc.title : "untitled";

        saveAs(pdfBlob, `${title}.pdf`);
    }

    return (
        <div>
            <div className={"buttons"}>
                <div className={"buttons-padding"}>
                    <ModalInvite doc={doc} />
                    <button className={"button disabled"}>Code-mode</button>
                    <button className={"button"} onClick={exportPdf}>PDF</button>
                    <button className={"button"} onClick={() => {setToken("");}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
