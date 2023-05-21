import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js';

class Draftjs extends Component{
    constructor (props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onChange = editorState => {
            this.setState({editorState});
        };
    }
    render() {
        return (
            <div className="basic">
                Basic Editor
                <div className="editor">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

export default Draftjs;