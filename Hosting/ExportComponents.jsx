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
                <table style={{width: '100%', margin: '0px'}} class="partInfo">
                    <tbody>
                        <tr>
                            <td class="partName"><strong id={this.props.pname}></strong></td>
                            <td style={{textAlign: 'right'}} class="partMark"><strong id={this.props.pmark}></strong></td>
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
                <p style={{margin: '0px'}} class="quest" id={this.props.qid}></p>
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