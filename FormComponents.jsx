class ChoiceInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeChoice = this.ChangeChoice.bind(this);
        this.RemoveChoice = this.RemoveChoice.bind(this);
    }
    RemoveChoice() {
        document.getElementById(this.props.cid + "_Hdiv").remove();
        document.getElementById(this.props.cid).remove();
    }

    ChangeChoice(e) {
        document.getElementById(this.props.cid).textContent = e.target.value;
    }
    render() {
        return (
            <div style={{ margin: '0px', width: '20%', display: 'inline-block', paddingRight: '5px' }} id={this.props.cid + "_Hdiv"}>
                <button className="btn btn-outline-danger" onClick={() => this.RemoveChoice()}>x</button>
                <input type="text" className="form-control" placeholder="Eg: a. ChoiceOne" onChange={(e => { this.ChangeChoice(e) })} />
            </div>
        )
    }
}