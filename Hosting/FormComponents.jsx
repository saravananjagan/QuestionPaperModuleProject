class ExaminationInfoComponent extends React.Component {
    constructor(props){
        super(props);
        this.submitExamInfo= this.submitExamInfo.bind(this);
        this.resetExamInfo=this.resetExamInfo.bind(this);
    }
    submitExamInfo(){
        var school=this.schlNme;                
        ReactDOM.render(
            <ExaminationInfoQuestComp 
                schlName={school.value} 
                std={this.std.value} 
                marks={this.marks.value}
                time={this.time.value}
                exam={this.exam.value}
                sub={this.sub.value}
            />, document.getElementById("ExamInfoQuest"))
    }
    resetExamInfo(){
        this.schlNme.value="";
        this.std.value="";
        this.marks.value="";
        this.time.value="";
        this.exam.value="";
        this.sub.value="";
        ReactDOM.render(
            <ExaminationInfoQuestComp 
                schlName={this.schlNme.value} 
                std={this.std.value} 
                marks={this.marks.value}
                time={this.time.value}
                exam={this.exam.value}
                sub={this.sub.value}
            />, document.getElementById("ExamInfoQuest"))
    }
    render() {
        return (
            <div className="card-body">
                <h3 className="card-title text-primary">Examination Information</h3>
                <p className="lead halfrem">School Name: </p> <input type="text" className="form-control"
                    placeholder="School Name" id="schoolName" ref={(c)=> this.schlNme=c} /> <br />
                <p className="lead stdText">Std and Section:&emsp;</p> <input type="text" className="form-control stdSection"
                    placeholder="Std and Section" id="stdSection" ref={(c)=> this.std=c} />
                <br />
                <p className="lead stdText" style={{display:'inline-block'}}>Marks Text:&emsp;</p> <input type="text" className="form-control stdSection"
                    placeholder="Marks Text" id="marksText" ref={(c)=> this.marks=c} /> &emsp;
                <p className="lead stdText">Hours Text:&emsp;</p> <input type="text" className="form-control stdSection"
                    placeholder="Hours Text" id="hoursText" ref={(c)=> this.time=c} />
                <br />
                <p className="lead stdText">Examination Name:&emsp;</p> <input type="text" className="form-control"
                    placeholder="Examination Name" id="examName" ref={(c)=> this.exam=c} />
                <br />
                <p className="lead stdText">Subject Name:&emsp;</p> <input type="text" className="form-control"
                    placeholder="Subject Name" id="subName" ref={(c)=> this.sub=c} />
                <br />
                <div className="text-right">
                    <button className="btn btn-outline-danger" onClick={this.resetExamInfo}>Reset</button>&emsp;<button type="button"
                        className="btn btn-outline-success" onClick={this.submitExamInfo}>Submit</button>
                </div>                     
            </div>
        );
    }
}
class PartContainerComponent extends React.Component{
    constructor(props){
        super(props);
        this.PartForms=[];
        this.PartInfoData=[];
        this.pid=0;
        this.state={
            parts:this.PartForms
        }
        this.AddPart=this.AddPart.bind(this);
    }
    AddPart(){
        var pnameid=this.pid+"_pn";
        var pmarkid=this.pid+"_pm";
        var pqid=this.pid+"_pqid";
        var pidmain=this.pid+"_pidmain";
        this.PartForms.push(<PartComponent pnameid={pnameid} pmarkid={pmarkid} pqid={pqid} pidmain={pidmain}/>);
        this.PartInfoData.push(<PartInfoQuestComp pname={pnameid} pmark={pmarkid} pqid={pqid} pidmain={pidmain}/>)
        this.setState({
            parts:this.PartForms
        });
        ReactDOM.render(<PartCollectionComp pcollection={this.PartInfoData} />,document.getElementById("PartCollectionContainer"));
        this.pid=this.pid+1;
    }
    render(){
        return(
            
            <div id="partsContainer" style={{margin: '0px'}}>
                <button type="button" className="btn btn-outline-primary" onClick={this.AddPart}>Add Part</button>
                <div>{this.state.parts}</div>
            </div>
        )
    }
}
class PartComponent extends React.Component{
    constructor(props){
        super(props);
        this.QuestForms=[];
        this.QuestData=[];            
        this.qid=0;
        this.state={
            quests:this.QuestForms
        }
        this.ChangePartNameInfo=this.ChangePartNameInfo.bind(this);
        this.ChangePartMarkInfo=this.ChangePartMarkInfo.bind(this);
        this.RemovePart=this.RemovePart.bind(this);
        this.AddQuestion=this.AddQuestion.bind(this);
        this.pnameidval=this.props.pnameid;
        this.pmarkidval=this.props.pmarkid;
        this.pqid=this.props.pqid;   
        this.pidinpmain=this.props.pidmain+"_inpmain";             
    }
    ChangePartNameInfo(e){
        document.getElementById(this.pnameidval).textContent=e.target.value;
    }
    ChangePartMarkInfo(e){
        document.getElementById(this.pmarkidval).textContent=e.target.value;
    }
    AddQuestion(){
        var qid=this.qid+"_qid"+this.pqid;
        var pqcid=this.qid+"_qid"+this.pqid+"_pqcid";
        this.QuestForms.push(<QuestionComponent qid={qid} pqcid={pqcid}/>);
        this.QuestData.push(<QuestionQuestComp qid={qid} pqcid={pqcid} />);
        this.setState({
            quests:this.QuestForms
        });
        this.qid=this.qid+1;
        ReactDOM.render(<QCollectionComp qcollection={this.QuestData} />,document.getElementById(this.pqid));
    }

    RemovePart(id,inpid){
        document.getElementById(id).remove();
        document.getElementById(inpid).remove();
    }

    render(){
        return(
            <div style={{margin:'0px'}} id={this.pidinpmain}>
            <br/>
            <div className="card border-primary" style={{borderRadius:'0px'}} id="PartDetails">
                <div className="card-body"> 
                    <button type="button" className="btn btn-outline-danger" style={{float:'right'}} onClick={(id,inpid)=>{this.RemovePart(this.props.pidmain,this.pidinpmain)}}>Remove Part</button><br/>                           
                    <p className="lead halfrem">Part Name: </p> <input type="text" className="form-control"
                    placeholder="Eg: I. Part Name:" onChange={(e)=>{this.ChangePartNameInfo(e)}} /> <br />
                    <p className="lead stdText">Marks Text:&emsp;</p> <input type="text" className="form-control stdSection"
                    placeholder="Eg: [20 x 1 = 20]" onChange={(e)=>{this.ChangePartMarkInfo(e)}} /><br />                            
                    <button type="button" className="btn btn-outline-primary m-b-10" onClick={this.AddQuestion}>Add Questions</button>
                    {this.state.quests}
                </div>                        
            </div>
            </div>                    
        )
    }
}

class QuestionComponent extends React.Component{
    constructor(props){
        super(props);
        this.cid=0;
        this.ChoiceForms=[];
        this.ChoiceData=[];
        this.state={
            choice:this.ChoiceForms
        }
        this.ChangeQuestion=this.ChangeQuestion.bind(this);
        this.AddChoice=this.AddChoice.bind(this);
        this.RemoveQuestion=this.RemoveQuestion.bind(this);
        this.qid=this.props.qid;
    }
    ChangeQuestion(e){
        document.getElementById(this.qid).textContent=e.target.value;
    }
    RemoveQuestion(qId) {
        document.getElementById(qId + "_Hdiv").remove();
        document.getElementById(qId + "_Ediv").remove();
    }                        

    AddChoice(){
        var cid=this.cid+"_cqp"+this.qid;
        this.ChoiceForms.push(<ChoiceInputComponent cid={cid} />);
        this.ChoiceData.push(<ChoiceQuestComp cid={cid} />);
        this.setState({
            choice:this.ChoiceForms
        });
        ReactDOM.render(<OptionCollectionComp ccollection={this.ChoiceData} />,document.getElementById(this.props.pqcid))
        this.cid=this.cid+1;
    }
    render(){
        return(
            <div style={{ margin: '0px' }} id={this.props.qid + "_Hdiv"}>
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 remove">
                        <button type="button" className="btn btn-outline-danger" onClick={() => { this.RemoveQuestion(this.props.qid) }}><i className="fa fa-trash-o"></i></button>
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
                        <input type="text" className="form-control" placeholder="Eg: 1. What is science?" onChange={(e) => { this.ChangeQuestion(e) }} />
                    </div>
                </div>
                
                <br />
                <button type="button" className="btn btn-outline-primary" onClick={this.AddChoice}>Add Choice</button>

                <div style={{ padding: '10px' }}>
                    {this.state.choice}
                </div>
            </div>
        )
    }
}

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

ReactDOM.render(<ExaminationInfoComponent />,document.getElementById("ExamInfo"));
ReactDOM.render(<PartContainerComponent />,document.getElementById("PartFormsContainer"));
//FUNCTIONS
// const AddPart=()=>{
//     PartForms.push(<PartComponent />);
//     //ReactDOM.render(<PartContainerComponent forms={PartForms} />,document.getElementById("PartFormsContainer"));
// }