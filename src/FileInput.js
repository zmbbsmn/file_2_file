import React from 'react'

const FileOp = {
    ADD: 1,
    DEL: 2
}

class FileInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file: null,
            showCancel: false
        }
    }

    handleChange (file_list) {
        
        const filePassedIn = file_list.length > 0 ? file_list[0] : null
        const fileInState = this.state.file
        
        let fileToOp, op;
        if (!fileInState && filePassedIn) {
            fileToOp = filePassedIn;
            op = FileOp.ADD
        } else if (!filePassedIn && fileInState) { 
            fileToOp = fileInState;
            op = FileOp.DEL;
            this.file_input.value = '';
        }

        this.file_input.disabled = !this.file_input.disabled;
        this.setState({
            file: filePassedIn,
            showCancel: filePassedIn ? true : false
        })

        this.props.onSubmit(fileToOp, op);
    }

    render() {

        let cancelButton = this.state.showCancel
                           ? <button onClick={() => this.handleChange([])}>Cancel</button>
                           : null 
        return (
            <div>
                <p>{this.props.label}</p>
                <input 
                    type='file' 
                    ref={(input)=>{this.file_input=input;}}
                    onChange={(e) => this.handleChange.bind(this)(e.target.files)}
                />
                {cancelButton}
            </div>
        )
    }
}

export {FileOp}
export default FileInput