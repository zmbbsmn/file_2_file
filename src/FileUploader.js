import React from 'react'
import FileInput, {FileOp} from './FileInput'

const back_end = 'path/to/api'

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

        fetch(back_end+'/appoutline/').then(
            response => {
                response.json().then(
                    data => {
                        this.setState({
                            files_required: data.files_required,
                            action_required: data.action_required
                        });
                    });
            },
            rejection => {
                console.log(rejection);
                this.setState({
                    files_required: ['Placeholder1', 'Placeholder2'],
                    action_required: 'ActionPlaceholder'
                });
            }   
        );
    }

    handleFileSubmit(fileSrc, fileToOp, op) {

        if (op === FileOp.ADD) {
            this.files_collected.push({fileSrc,fileToOp})
        } else if (op === FileOp.DEL) {
            this.files_collected = this.files_collected.filter( 
                ({_,f}) => { return f.name !== fileToOp.name }
            )
        }
        console.log(this.files_collected)
    }

    handleActionBtnClick () {
        var data = new FormData();

        if (this.files_collected.length === this.state.files_required.length) {

            this.files_collected.forEach( e => data.append(e.fileSrc, e.fileToOp))
            fetch(back_end+'/filefetch/', {
                method: 'POST',
                body: data
              }).then(
                  response => {
                    response.json().then(
                        data => {
                            this.setState({
                                result: data
                            });
                        }
                    ) 
                  }
              );
            this.setState();

        } else {
            alert('at least 1 file is missing');
        }
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

                <button onClick={this.handleActionBtnClick.bind(this)}>
                    {this.state.action_required}
                </button>

                <div>
                    {this.state.result}
                </div>
            </div>
        );
    }
}


export default FileUploader