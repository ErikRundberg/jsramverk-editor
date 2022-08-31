import React, { Component } from "react";
import "trix/dist/trix";
import "trix/dist/trix.css"
import { TrixEditor } from "react-trix";

class Editor extends Component {
    mergeTags = []
    handleChange = () => {};
    save = () => {
      let text = document.querySelector("trix-editor").value;
      console.log(text);
    };
    render() {
        return (
            <div>
                <header>
                    <h1>jsramverk Editor</h1>
                </header>
                <div className={"main"}>
                    <div className={"buttons"}>
                        <div className={"buttons-padding"}>
                            <button className={"button"} onClick={this.save}>Save</button>
                            <button className={"button disabled"}>Invite</button>
                            <button className={"button disabled"}>Code-mode</button>
                            <button className={"button disabled"}>PDF</button>
                        </div>
                    </div>
                    <div className={"editor-container"}>
                        <TrixEditor id={"trix"} onChange={this.handleChange} mergeTags={this.mergeTags}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Editor;