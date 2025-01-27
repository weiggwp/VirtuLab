import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import icon from "../Images/v.jpg";
import {Button, Image, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import GLOBALS from "../Globals";
import Dropdown from "react-bootstrap/Dropdown";
import BarChart from 'react-bar-chart';
import '../stylesheets/stats.css';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {

            courseID: props.courseID,
            numOfStudents: 0,
            completePercentage: 0,
            incompletePercentage: 0,
            renderedStats:false,
            completed: 75,
            noRetries:25,


            stepsArr: [],
            StatOption:"Bar Display Data",


            stepMap:null,
            stepData: [],
            currentBarData: 'avg',
            currentStepIndex: 0,

            data: [ true, false, false, false ]
        };
        this.computeStats() // for completion
        //this.computeStepStats()
    }
    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }
    changeStatDisplay=(option)=>
    {
        this.setState(
            {
                StatOption:option
            }
        )
    }
    toolbar()
    {
        return (
            <Navbar style={{ marginLeft:40,marginRight:40,marginTop:10,marginBottom:10}}  className={"justify-content-between bar"}>
                <Nav >
                    { this.props.location.state.lab_name}
                </Nav>

                <Nav >

                    <Link to="/instructor_home">
                        <Image  onClick={this.setRedirectHome} className={"config_image"} src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png" rounded />
                    </Link>
                </Nav>

            </Navbar>
        )
    }

    displayBar(input){
        this.changeStatDisplay(input);

    }


    computeStats = () => {
        console.log("props is ");
        console.log(this.props);
        let labs = [];
        const lab = {
            labID: this.props.location.state.labID
        }
        labs[0] = lab
        const course = {
            email: this.props.email,
            labs: labs,
            code: this.props.location.state.courseID,

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'lab_stats', course, axiosConfig)
            .then((response) => {

                let arr = response.data
                this.setState({
                    numOfStudents: arr[2],
                    completePercentage: arr[0],
                    incompletePercentage: arr[1],
                })
                console.log("state is ");
                console.log(this.state)
            })
            .catch((error) => {
                    console.log(error)

                }
            );

        axios.post(GLOBALS.BASE_URL + 'step_stats', course, axiosConfig)
            .then((response) => {

                console.log("resp is ");
                console.log(response)
                this.setState({stepMap: response.data}, this.callbackCalculate);
            })
            .catch((error) => {
                    console.log("wawawaaaa")
                }
            );
    }


//     data={[
//             { title: 'step1', value: 20, color: '#E38627' },
// { title: 'step2', value: 25, color: '#C13C37' },
// { title: 'step3', value: 25, color: '#f3b2a3' }
//
// ]}
    formatStepStats(arr){

        let items = []
        if (arr.length === 1 && arr[0] === 100) {
            let color='#' + parseInt(Math.random() * 0xffffff).toString(16)
            items.push({
                title: "perfect",
                value: 100,
                color: color
            })
            return items
        }

        for (let i = 0; i < arr.length; i ++) {
            let color='#' + parseInt(Math.random() * 0xffffff).toString(16)
            items.push({
                title: 'step' + (i + 1),
                value: arr[i],
                color: color
            })
        }
        return items
    }



    callbackCalculate(){
        console.log("stepmap is ");
        console.log(this.state.stepMap)
        console.log("stepmap is ");
        console.log(this.state.stepMap.size)
        let stepData=[];
        let count=0;
        while (true){ // for each step.... (not counting 0)
            let step=this.state.stepMap[count+1]
            if (step==null||step==undefined)break;
            //console.log("step is ");
           // console.log(step)
            let sum=0;
            let min=Number.MAX_VALUE;
            let max=0;
            let avg=0;
            let reallist=[];
            let median=0;
            let studcount=0;
            for (let j=0; j<step.length; j++){
               // console.log("stepmap is ");
                //console.log(step[j])
                if (step[j].tries==0)continue;
                sum+=step[j].tries;
                reallist[studcount]=step[j].tries;
                studcount++;
                min=Math.min(min,step[j].tries)
                max=Math.max(max,step[j].tries)
            }
            //console.log("Reallist is ");
            //console.log(reallist)
            reallist.sort();
            console.log("Reallist is ");
            console.log(reallist)
            if (reallist.length%2==1){
                median=reallist[Math.floor(reallist.length/2)];
            }
            else{
                median=reallist[Math.floor(reallist.length/2)-1]+reallist[Math.floor(reallist.length/2)];
                median/=2;
            }
            avg=sum/(studcount)
            const data = {
                sum:sum,
                min:min,
                max:max,
                avg:avg,
                median:median,
                completed:studcount,
                stepTag: "Step "+(count+1),
                index:count

            }
            stepData[count++]=data
        }
        console.log("data is ");
        this.setState({stepData:stepData},this.prepareRender)
        this.render()
    }
    prepareRender(){
        this.setState({renderedStats:true},this.render)
    }

    displayStep(i){
            console.log("i is "+i)
        this.setState({currentStepIndex:i},this.render)
    }


    renderNavigation() {

        return (
            <div>
                <Navbar style={{backgroundColor: "#bcc2d7"}}
                        className={"justify-content-between"}>
                    <Nav>
                        <Button href="instructor_home" className="goBack" variant="primary">Go
                            Back</Button>
                    </Nav>
                    <Nav>
                        <h1 className={"title"}>Statistics</h1>
                    </Nav>

                </Navbar>
            </div>
        )
    }



    render() {
        if (this.state.renderedStats==false||this.state.stepData==[]) {
            this.computeStats()

            //this.render()
            return null
        }

        let stepData=this.state.stepData;

        let stepOutput=[];

        if (stepData[this.state.currentStepIndex] === undefined || stepData[this.state.currentStepIndex].max===0){

            stepOutput = ["No students have completed this step."]
            this.state.stepData[this.state.currentStepIndex].min=0
        }
        else{
            stepOutput[0]="Average number of tries: "+ this.state.stepData[this.state.currentStepIndex].avg
            stepOutput[1]="Max number of tries: "+ this.state.stepData[this.state.currentStepIndex].max
            stepOutput[2]="Minimum number of tries: "+ this.state.stepData[this.state.currentStepIndex].min
            stepOutput[3]="Median number of tries: "+ this.state.stepData[this.state.currentStepIndex].median
            stepOutput[4]="Number of students who have attempted step: "+ this.state.stepData[this.state.currentStepIndex].completed
            + " ( " +(Math.floor(100*((this.state.stepData[this.state.currentStepIndex].completed/this.state.numOfStudents)*100)))/100+" percent )"
        }

   //     console.log("stepdata is ");
    //    console.log(stepData)
    //    console.log("curr step is ");
     //   console.log(this.state.currentStepIndex)
        let index = this.state.currentStepIndex;
        const { completed,noRetries} = this.state;

        const completeRatio = [
            { label: '', title: 'Completed', value: parseInt(this.state.completePercentage), color: '#B385C8' },
            { label: '', title: 'zeroRetries', value: parseInt(this.state.incompletePercentage), color: '#7566BD' },

        ];
        let total = 100;

        let percentCompleted = 0;
        let percentNoRetries = 0;


        percentCompleted = Math.round(parseFloat(completed) / total * 100);
        percentNoRetries = Math.round(parseFloat(noRetries) / total * 100);
        const data = [


        ];

        for (let i=0; i<stepData.length; i++){
            if (this.state.currentBarData=='avg')
            data[i]={text:'Step '+(i+1), value:stepData[i].avg}
            if (this.state.currentBarData=='med')
                data[i]={text:'Step '+(i+1), value:stepData[i].median}
            if (this.state.currentBarData=='max')
                data[i]={text:'Step '+(i+1), value:stepData[i].max}
            if (this.state.currentBarData=='min')
                data[i]={text:'Step '+(i+1), value:stepData[i].min}
        }
        const margin = {top: 20, right: 20, bottom: 30, left: 40};

        return (
            <div>
                {this.banner()}
                {/*{this.toolbar()}*/}


            <div className="charts">
                {this.renderNavigation()}


                <h2> {this.state.mode} </h2>
                <div className="header">


                </div>
                <div  style={{marginLeft:20,marginTop:20}}>
                    <div className="row" style={{marginRight:50}}>
                        <Dropdown>
                            <Dropdown.Toggle className={"statToggle"} id="dropdown-basic">
                                View Step
                            </Dropdown.Toggle>


                            <Dropdown.Menu>


                                {stepData.map(step => (
                                    <Dropdown.Item onClick=
                                                       {() => this.displayStep(step.index)}>{step.stepTag}</Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>



                        <div style={{paddingTop:20,width:"50vh",height:"60vh",backgroundColor:"lightgray"}}>
                            <b> Statistics for Step {index+1}</b>
                            {stepOutput.map(step => (
                                <div style={{
                                    textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10,
                                     borderWidth: 1
                                }}>
                                   { step}
                                </div>
                            ))}




                        </div>
                        <Dropdown>
                            <Dropdown.Toggle className={"statToggle"} id="dropdown-basic">
                                {this.state.StatOption}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>



                                    <Dropdown.Item onClick=
                                                       {() => this.displayBar('Average attempts')}>Average attempts</Dropdown.Item>
                                <Dropdown.Item onClick=
                                                   {() => this.displayBar('Median attempts')}>Median attempts</Dropdown.Item>
                                <Dropdown.Item onClick=
                                                   {() => this.displayBar('Max attempts')}>Max attempts</Dropdown.Item>
                                <Dropdown.Item onClick=
                                                   {() => this.displayBar('Minimum attempts')}>Minimum attempts</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <div ref='root'>
                            <div style={{width: '50%'}}>
                                {/*<b> {title}</b>*/}
                                <BarChart ylabel='Attempts'

                                          width={500}
                                          height={500}
                                          margin={margin}
                                          data={data}
                                          onBarClick={this.handleBarClick}/>
                            </div>
                        </div>
                    </div>



                    </div>
                </div>
            </div>
        );
    }

}
export default Statistics;