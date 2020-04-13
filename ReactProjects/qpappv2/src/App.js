import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

var is_chrome = ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) &&(navigator.vendor.toLowerCase().indexOf("google") > -1));
var recognition='';
var outputJson={
  schoolName:'',
  stdAndSec:'',
  marks:'',
  time:'',
  examName:'',
  subjectName:''
};

if(is_chrome)
{
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  recognition = new window.SpeechRecognition();

  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
  recognition.continuous = true;
}

/* FORM COMPONENTS */


class ExaminationInfoQuestComp extends React.Component{
  render(){
      return(
          <tbody>
              <tr>
                  <td style={{width: '20%'}} id="classInfo"><strong>Class: {this.props.std}</strong></td>
                  <td style={{textAlign: 'center',width: '60%'}} id="schlName"><strong>{this.props.schlName}</strong></td>
                  <td style={{textAlign: 'right'}} id="markInfo"><strong>Marks: {this.props.marks}</strong></td>
              </tr>
              <tr>
                  <td style={{width: '20%'}} id="duration"><strong>Time : {this.props.time}</strong></td>
                  <td style={{textAlign: 'center',width: '60%'}} id="testName"><strong>{this.props.exam}</strong></td>
                  <td style={{textAlign: 'right'}}>&emsp;</td>
              </tr>
              <tr>
                  <td style={{width: '20%'}}>&emsp;</td>
                  <td style={{textAlign: 'center',width: '60%'}} id="subjectName"><strong>{this.props.sub}</strong></td>
                  <td style={{textAlign: 'right'}}>&emsp;</td>
              </tr>                        
          </tbody>
      );
  }
}

class PartInfoQuestComp extends React.Component{
  render(){
      return(
          <div style={{margin:'0px'}} id={this.props.pidmain}>
              <table style={{width: '100%', margin: '0px'}} className="partInfo">
                  <tbody>
                      <tr>
                          <td className="partName"><strong id={this.props.pname}></strong></td>
                          <td style={{textAlign: 'right'}} className="partMark"><strong id={this.props.pmark}></strong></td>
                      </tr>
                  </tbody>
              </table>
              <div id={this.props.pqid}></div>
          </div>    
      );
  }
}

class PartCollectionComp extends React.Component{
  render(){
      return(
          <div style={{margin:'0px'}}>
              {this.props.pcollection}
          </div>
      )
  }
}

class QuestionQuestComp extends React.Component{
  render(){
      return(
          <div style={{margin:'0px'}} id={this.props.qid+"_Ediv"}>
              <p style={{margin: '0px'}} className="quest" id={this.props.qid}></p>
              <div style={{margin:'0px'}} id={this.props.pqcid}>                            
              </div>
          </div>
      );
  }
}

class QCollectionComp extends React.Component{
  render(){
      return(
          <div style={{margin: '0px'}}>
              {this.props.qcollection}
          </div>
      )
  }
}

class OptionCollectionComp extends React.Component{
  render(){
      return(
          <table style={{width: '100%', marginLeft: '20px'}} className="optionCollection">
              <tbody>
                  <tr>
                      {this.props.ccollection}
                  </tr>
              </tbody>                        
          </table>
      )
  }
}

class ChoiceQuestComp extends React.Component{
  render(){
      return(
          <td style={{width: '20%'}} id={this.props.cid}></td>
      )
  }
}

export default class ExaminationInfoComponent extends React.Component {
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
          outputJson.schoolName=this.schlNme.value;
          outputJson.stdAndSec=this.std.value;
          outputJson.marks=this.marks.value;
          outputJson.time=this.time.value;
          outputJson.examName=this.exam.value;
          outputJson.subjectName=this.sub.value;
          //TODO: FILL THE SUBJECT ID AFTER INTRODUCING AUTO SUGGEST DROP DOWN
          outputJson.subjectId=''
          ReactDOM.render(
            <InfoSubmitModal showModal={true} infoModalMessage={"Examination Information has been submitted successfully!"}/>, document.getElementById("infoSubmitModalContainer")
          )
          
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
          outputJson.schoolName=''
          outputJson.stdAndSec=''
          outputJson.marks=''
          outputJson.time=''
          outputJson.examName=''
          outputJson.subjectName=''
          //TODO: FILL THE SUBJECT ID AFTER INTRODUCING AUTO SUGGEST DROP DOWN
          outputJson.subjectId=''    
      console.log(outputJson);        
      ReactDOM.render(
        <InfoSubmitModal showModal={true} infoModalMessage={"Examination Information has been resetted successfully!"}/>, document.getElementById("infoSubmitModalContainer")
      )    
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
              <br/>
              <p className="lead stdText">Unit From:&nbsp;</p> <input type="text" style={{width:'10%', display:'inline-block'}} className="form-control"
                  placeholder="From" id="unitFrom" ref={(c)=> this.unitFrom=c} /> &emsp;
              <p className="lead stdText">Unit To:&nbsp;</p> <input type="text" style={{width:'10%' , display:'inline-block'}} className="form-control"
                  placeholder="To" id="unitTo" ref={(c)=> this.unitTo=c} />        
              <br />
              <div className="text-right">
                  <button className="btn btn-outline-danger" type="button" onClick={this.resetExamInfo}>Reset</button>&emsp;<button type="button"
                      className="btn btn-outline-success" onClick={this.submitExamInfo} data-toggle="modal" data-target="#ExamInfoSubmitModal" href="#ExamInfoSubmitModal">Submit</button>
              </div>                     
          </div>
      );
  }
}

class ExportBtnComponent extends React.Component{
  constructor(props){
    super(props);
    this.ExporttoDoc=this.ExporttoDoc.bind(this);
  }
  ExporttoDoc(){
    var elementId='DocumentContent';
    var filename='QuestionPaper'
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(elementId).innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        //only for firefox
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        //for other browsers
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);

  }
  render(){
    return(
      <>
      <button className="btn btn-outline-success" onClick={this.ExporttoDoc}>Export as
        .doc</button>
      </>
    )
  }
}

class PartContainerComponent extends React.Component{
  constructor(props){
      super(props);
      this.partFormsId=[];
      this.PartForms=[];
      this.partInfoId=[];
      this.PartInfoData=[];
      this.pid=0;
      this.state={
          parts:this.PartForms
      }
      this.AddPart=this.AddPart.bind(this);
      outputJson.parts=[];
  }
  AddPart(){
      var pnameid=this.pid+"_pn";
      var pmarkid=this.pid+"_pm";
      var pqid=this.pid+"_pqid";
      var pidmain=this.pid+"_pidmain";
      var pid=this.pid;
      //this.PartForms.push(<PartComponent pnameid={pnameid} pmarkid={pmarkid} pqid={pqid} pidmain={pidmain}/>);
      this.partFormsId.push({pnameid:{pnameid}, pmarkid:{pmarkid}, pqid:{pqid}, pidmain:{pidmain}, pid:{pid}})
      this.PartForms=this.partFormsId.map((id)=>
        <PartComponent key={id.pqid.pqid} pnameid={id.pnameid.pnameid} pmarkid={id.pmarkid.pmarkid} pqid={id.pqid.pqid} pidmain={id.pidmain.pidmain} pid={id.pid.pid}/>
      )
      //this.PartInfoData.push(<PartInfoQuestComp pname={pnameid} pmark={pmarkid} pqid={pqid} pidmain={pidmain}/>)
      this.partInfoId.push({pname:{pnameid}, pmark:{pmarkid}, pqid:{pqid}, pidmain:{pidmain}})      
      this.PartInfoData=this.partInfoId.map((Id)=>
        <PartInfoQuestComp key={Id.pqid.pqid} pname={Id.pname.pnameid} pmark={Id.pmark.pmarkid} pqid={Id.pqid.pqid} pidmain={Id.pidmain.pidmain}/>
      )
      this.setState({
          parts:this.PartForms
      });
      ReactDOM.render(<PartCollectionComp pcollection={this.PartInfoData} />,document.getElementById("PartCollectionContainer"));                  
      let partObj={
        partId:'',
        partName:'',
        marksText:'',
        questions:[]
      };
      partObj.partId=this.pid;
      outputJson.parts.push(partObj);
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
      this.QuestFormsId=[];
      this.QuestDataId=[];
      this.QuestData=[];            
      this.qid=0;
      this.ChangePartNameInfo=this.ChangePartNameInfo.bind(this);
      this.ChangePartMarkInfo=this.ChangePartMarkInfo.bind(this);
      this.RemovePart=this.RemovePart.bind(this);
      this.AddQuestion=this.AddQuestion.bind(this);      
      this.pnameidval=this.props.pnameid;
      this.pmarkidval=this.props.pmarkid;
      this.pqid=this.props.pqid;
      this.pid=this.props.pid;   
      this.pidinpmain=this.props.pidmain+"_inpmain";
      //partNameinputId
      this.pidinp=this.props.pidmain+"_inp";             
      this.state={
        quests:this.QuestForms,
        showModal:false,
        inpId:this.pidinp,
        hiddenId:this.pnameidval,
        parentId:this.pidinpmain        
    }
  }
  ChangePartNameInfo(e){
      document.getElementById(this.pnameidval).textContent=e.target.value;
      outputJson.parts[this.pid].partName=e.target.value;
  }
  ChangePartMarkInfo(e){
      document.getElementById(this.pmarkidval).textContent=e.target.value;
      outputJson.parts[this.pid].marksText=e.target.value;
  }
  AddQuestion(){
      var qid=this.qid+"_qid"+this.pqid;
      var questid=this.qid;
      var pid=this.pid;
      var pqcid=this.qid+"_qid"+this.pqid+"_pqcid";
      //this.QuestForms.push(<QuestionComponent qid={qid} pqcid={pqcid}/>);
      this.QuestFormsId.push({qid:{qid}, pqcid:{pqcid}, questid:{questid}, pid:{pid}});
      //this.QuestData.push(<QuestionQuestComp qid={qid} pqcid={pqcid} />);
      this.QuestDataId.push({qid:{qid}, pqcid:{pqcid}});
      this.QuestData=this.QuestDataId.map((questData)=>
        <QuestionQuestComp key={questData.pqcid.pqcid} qid={questData.qid.qid} pqcid={questData.pqcid.pqcid} />
      )
      this.QuestForms=this.QuestFormsId.map((questForm)=>
        <QuestionComponent key={questForm.pqcid.pqcid} qid={questForm.qid.qid} pqcid={questForm.pqcid.pqcid} questid={questForm.questid.questid} pid={questForm.pid.pid}/>
      )
      this.setState({
          quests:this.QuestForms
      });
      let questObj={
        partId:this.pid,
        questionId:this.qid,
        questionName:'',
        unit:'',
        choices:[]
      };
      outputJson.parts[this.pid].questions.push(questObj);
      this.qid=this.qid+1;
      ReactDOM.render(<QCollectionComp qcollection={this.QuestData} />,document.getElementById(this.pqid));
      console.log(outputJson);
  }

  RemovePart(id,inpid){
      outputJson.parts.splice(this.pid,1);
      document.getElementById(id).remove();
      document.getElementById(inpid).remove();
  }
  render(){
      return(
        <>        
          <div style={{margin:'0px'}} id={this.pidinpmain}>          
          <br/>
          <div className="card border-primary" style={{borderRadius:'0px'}} id="PartDetails">
              <div className="card-body"> 
                  <button type="button" className="btn btn-outline-danger" style={{float:'right'}} onClick={(id,inpid)=>{this.RemovePart(this.props.pidmain,this.pidinpmain)}}>Remove Part</button><br/>                           
                  <p className="lead halfrem">Part Name: </p> 
                  <input type="text" id={this.pidinp} className="form-control width95" style={{display:'inline-block'}} placeholder="Eg: I. Part Name:" onChange={(e)=>{this.ChangePartNameInfo(e)}} />                                     
                  <Speech2TextModal showModal={false} compId={this.state.inpId} hiddenId={this.state.hiddenId} parentId={this.state.parentId}/>
                   <br />
                  <p className="lead stdText">Marks Text:&emsp;</p> <input type="text" className="form-control stdSection"
                  placeholder="Eg: [20 x 1 = 20]" onChange={(e)=>{this.ChangePartMarkInfo(e)}} /><br />                            
                  <button type="button" className="btn btn-outline-primary m-b-10" onClick={this.AddQuestion}>Add Questions</button>
                  {this.state.quests}
              </div>                        
          </div>
          </div>                    
          </>
      )
  }
}

class QuestionComponent extends React.Component{
  constructor(props){
      super(props);
      this.cid=0;
      this.ChoiceFormsId=[];
      this.ChoiceForms=[];
      this.ChoiceDataId=[];
      this.ChoiceData=[];
      this.state={
          choice:this.ChoiceForms
      }
      this.ChangeQuestion=this.ChangeQuestion.bind(this);
      this.AddChoice=this.AddChoice.bind(this);
      this.RemoveQuestion=this.RemoveQuestion.bind(this);
      this.qid=this.props.qid;
      this.pid=this.props.pid;
      this.questid=this.props.questid;
  }
  ChangeQuestion(e){      
      document.getElementById(this.qid).textContent=e.target.value;
      outputJson.parts[this.pid].questions[this.questid].questionName=e.target.value;
  }
  RemoveQuestion(qId) {
      outputJson.parts[this.pid].questions.splice(this.questid);
      document.getElementById(qId + "_Hdiv").remove();
      document.getElementById(qId + "_Ediv").remove();
  }                        

  AddChoice(){
      var cid=this.cid+"_cqp"+this.qid;
      var choiceId=this.cid;
      var pid=this.pid;
      var qid=this.questid;
      console.log(choiceId);
      console.log(pid);
      console.log(qid);
      //this.ChoiceForms.push(<ChoiceInputComponent cid={cid} />);
      this.ChoiceFormsId.push({cid:{cid}, pid:{pid}, qid:{qid}, choiceId:{choiceId}});
      this.ChoiceForms=this.ChoiceFormsId.map((id)=>
        <ChoiceInputComponent key={id.cid.cid} cid={id.cid.cid} pid={id.pid.pid} qid={id.qid.qid} choiceId={id.choiceId.choiceId}/>
      )
      //this.ChoiceData.push(<ChoiceQuestComp cid={cid} />);
      this.ChoiceDataId.push({cid:{cid}})
      this.ChoiceData=this.ChoiceDataId.map((id)=>
        <ChoiceQuestComp key={id.cid.cid} cid={id.cid.cid} />
      )
      this.setState({
          choice:this.ChoiceForms
      });
      let choiceObj={
        choiceId:this.cid,
        choiceName:''        
      }
      outputJson.parts[this.pid].questions[this.questid].choices.push(choiceObj);
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
                      <input type="text" className="form-control width95" style={{display: 'inline-block'}} id={this.props.qid + "_qinp"} placeholder="Eg: 1. What is science?" onChange={(e) => { this.ChangeQuestion(e) }} />
                      <Speech2TextModal showModal={false} compId={this.props.qid + "_qinp"} hiddenId={this.props.qid} parentId={this.props.qid + "_Hdiv"}/>
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
      this.pid=this.props.pid;
      this.qid=this.props.qid;
      this.choiceId=this.props.choiceId;
  }
  RemoveChoice() {
      outputJson.parts[this.pid].questions[this.qid].choices.splice(this.choiceId,1);
      document.getElementById(this.props.cid + "_Hdiv").remove();
      document.getElementById(this.props.cid).remove();
  }

  ChangeChoice(e) {
      outputJson.parts[this.pid].questions[this.qid].choices[this.choiceId].choiceName=e.target.value;
      document.getElementById(this.props.cid).textContent = e.target.value;
      console.log(JSON.stringify(outputJson));
  }
  render() {
      return (
        <div style={{ margin: '0px', width: '70%', paddingRight: '5px' }} className="row" id={this.props.cid + "_Hdiv"}>
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 remove">
            <button className="btn btn-outline-danger" onClick={() => this.RemoveChoice()}>x</button>
          </div>
          <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
            &emsp;<input type="text" className="form-control" style={{ display: 'inline-block', width:'85%'}} id={this.props.cid + "_cinp"} placeholder="Eg: a. ChoiceOne" onChange={(e => { this.ChangeChoice(e) })} />
            <Speech2TextModal showModal={false} compId={this.props.cid + "_cinp"} hiddenId={this.props.cid} parentId={this.props.cid + "_Hdiv"} />
          </div>
        </div>
      )
  }
}

class InfoSubmitModal extends React.Component {
  constructor(props){
      super(props);
      this.hideModal=this.hideModal.bind(this);
      this.showModal=this.props.showModal;
      this.state={
        showModal:this.showModal
    }
  }
  hideModal(){
    this.setState({
      showModal:false
    });
  }
  render(){
      return(
        <Modal show={this.state.showModal}>
          <Modal.Header><b>Info</b></Modal.Header>
          <Modal.Body>{this.props.infoModalMessage}</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-primary" onClick={this.hideModal}>OK</button>
          </Modal.Footer>
        </Modal>                  
      )
  }
}

class Speech2TextModal extends React.Component{
  constructor(props){
    super(props)
    this.showModal=this.props.showModal;
    this.compId=this.props.compId;
    this.hiddenId=this.props.hiddenId;
    this.parentId=this.props.parentId;
    this.state={
      showModal:this.props.showModal,
      inpId:this.compId,
      hiddenId:this.hiddenId,
      parentId:this.parentId,
      speechButtonVisiblity:(is_chrome)?'block':'none',
      compValue:""
    }
    this.hideModal=this.hideModal.bind(this);
    this.S2TStart = this.S2TStart.bind(this);
    this.S2TStop=this.S2TStop.bind(this);
    this.SubmitResults=this.SubmitResults.bind(this);
    this.openS2TModal= this.openS2TModal.bind(this);
    this.finalTranscript = '';    
  }
  S2TStart(){    
    recognition.start();
    document.getElementById('STarea').value=document.getElementById(this.compId).value+" ";
    this.finalTranscript=document.getElementById('STarea').value;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      document.getElementById('STarea').value = this.finalTranscript + interimTranscript;
    }
    document.getElementById("S2TStart").disabled=true;
  }
  S2TStop(){
    recognition.stop(); 
    document.getElementById(this.compId).value=document.getElementById('STarea').value;
    document.getElementById(this.hiddenId).textContent=document.getElementById('STarea').value;
    document.getElementById("S2TStart").disabled=false;
  }
  SubmitResults(){
    document.getElementById(this.compId).value=document.getElementById('STarea').value;
    document.getElementById(this.hiddenId).textContent=document.getElementById('STarea').value;
    this.setState({
      showModal:false
    });
  }
  hideModal(){
    this.setState({
      showModal:false
    });
  }

  openS2TModal(){
    this.setState(
      {
        showModal:true,
        compValue:document.getElementById(this.compId).value+" "
      }
    )
  }


  
  render(){
    return(
      <>
      <button type="button" className="btn btn-outline-success" style={{float:'right', display:this.state.speechButtonVisiblity}} onClick={this.openS2TModal}><i className="fa fa-microphone" aria-hidden="true"></i></button><br/>
      <Modal show={this.state.showModal}>
        <Modal.Header><b>Speech To Text Console</b><br/>        
        </Modal.Header>
        <Modal.Body>
        <p><i>* stop/save button can be used for manual save purposes.</i></p>
          <textarea className="form-control" id="STarea" defaultValue={this.state.compValue}/>
        </Modal.Body>
        <Modal.Footer>        
          <button className="btn btn-outline-success" id="S2TStart" onClick={this.S2TStart}>Start</button>
          <button className="btn btn-outline-danger" onClick={this.S2TStop}>Stop/Save</button>
          <button className="btn btn-outline-primary" onClick={this.SubmitResults}>Submit</button>
          <button className="btn btn-outline-primary" onClick={this.hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>                  
      </>
    )
  }
}

ReactDOM.render(<ExportBtnComponent/>,document.getElementById("exportBtnContainer"));
ReactDOM.render(<PartContainerComponent />,document.getElementById("PartFormsContainer"));

