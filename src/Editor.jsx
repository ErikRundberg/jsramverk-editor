import React, { Component } from "react";
import "trix/dist/trix";
import "trix/dist/trix.css"
import { TrixEditor } from "react-trix";

class Editor extends Component {
    mergeTags = [{
        trigger: "@",
        tags: [
            {name: "Dominic St-Pierre", tag: "@dominic"},
            {name: "John Doe", tag: "@john"}
        ]
    }, {
        trigger: "{",
        tags: [
            {name: "First name", tag: "{{ .FirstName }}"},
            {name: "Last name", tag: "{{ .LastName }}"}
        ]
    }]
    handleChange = () => {};
    render() {
        return (
            <div>
                <header>
                    <h1>jsramverk Editor</h1>
                </header>
                <div className={"main"}>
                    <div className={"buttons"}>
                        <div className={"buttons-padding"}>
                            <button className={"button"}>Save</button>
                            <button className={"button disabled"}>Invite</button>
                            <button className={"button disabled"}>Code-mode</button>
                            <button className={"button disabled"}>PDF</button>
                        </div>
                    </div>
                    <div className={"trix-container"}>
                        <div className={"editor-container"}>
                            <TrixEditor id={"trix"} onChange={this.handleChange} mergeTags={this.mergeTags}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Editor;