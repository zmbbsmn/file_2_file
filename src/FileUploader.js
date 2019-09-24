import React from 'react'
import FileInput, {FileOp} from './FileInput'


class FileUploader extends React.Component {

    constructor () {
        super();
        this.state = {
            files_required: [],
            action_required: '',
            result: ''
        };
        this.files_collected  = [];
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            files_required: ['Placeholder1', 'Placeholder2'],
            action_required: 'ActionPlaceholder'
        });
    }

    handleFileSubmit(fileToOp, op) {

        if (op === FileOp.ADD) {
            this.files_collected.push(fileToOp)
        } else if (op === FileOp.DEL) {
            this.files_collected = this.files_collected.filter( 
                f => { return f.name !== fileToOp.name }
            )
        }
        console.log('collected files: ')
        console.log(this.files_collected);
    }

    render() {
        return (
            <div>
                <ul>{
                    this.state.files_required.map((f, i) => 
                    <FileInput 
                        key={i} 
                        label={f}
                        onSubmit={this.handleFileSubmit} />)}
                </ul>

                <button>{this.state.action_required}</button>

                <div>
                    {this.state.result}
                </div>
            </div>
        );
    }
}


export default FileUploader