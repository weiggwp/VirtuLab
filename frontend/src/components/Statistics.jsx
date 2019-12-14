import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import icon from "../Images/v.jpg";
import {Button, Image, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import GLOBALS from "../Globals";


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {

            courseID: props.courseID,
            numOfStudents: 0,
            completePercentage: 0,
            incompletePercentage: 0,

            completed: 75,
            noRetries:25,

            stepsArr: [],

            data: [ true, false, false, false ]
        };
        this.computeStats() // for completion
        this.computeStepStats()
    }
    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }
    toolbar()
    {
        return (
            <Navbar style={{ marginLeft:40,marginRight:40,marginTop:10,marginBottom:10}}  className={"justify-content-between bar"}>
                <Nav >

                </Nav>

                <Nav >
                    <Link to="/instructor_home">
                        <Image  onClick={this.setRedirectHome} className={"config_image"} src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png" rounded />
                    </Link>
                </Nav>

            </Navbar>
        )
    }


    computeStats() {

        const course = {
            email: this.props.email,
            courseID: this.state.courseID
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'lab_stats', course, axiosConfig)
            .then((response) => {
                alert("came back")
                let arr = response.data
                this.setState({
                    numOfStudents: arr[2],
                    completePercentage: arr[0],
                    incompletePercentage: arr[1],
                })
            })
            .catch((error) => {
                console.log(error)

                }
            );

    }

    computeStepStats() {
        const course = {
            email: this.props.email,
            labID: 9610
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'step_stats', course, axiosConfig)
            .then((response) => {
                alert("yo step_stats")
                let arr = response.data
                this.setState({
                    stepsArr: arr
                })
                console.log("steps stats")
                console.log(arr)
            })
            .catch((error) => {
                    console.log(error)

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

    render() {
        let stepData = this.formatStepStats(this.state.stepsArr)


        const { completed,noRetries} = this.state;

        const completeRatio = [
            { label: '', title: 'Completed', value: parseInt(completed), color: '#B385C8' },
            { label: '', title: 'zeroRetries', value: parseInt(noRetries), color: '#7566BD' },

        ];
        let total = 100;

        let percentCompleted = 0;
        let percentNoRetries = 0;


        percentCompleted = Math.round(parseFloat(completed) / total * 100);
        percentNoRetries = Math.round(parseFloat(noRetries) / total * 100);

        return (
            <div className="charts">
                {this.banner()}
                {this.toolbar()}
                <h2> {this.state.mode} </h2>
                <div className="header">
                    <div className="greeting">Hi, SummerBagel</div>

                </div>
                <div  style={{marginLeft:40,marginTop:20}}>
                    <div className="row" style={{marginRight:50}}>

                        <PieChart
                            labelPosition={50}
                            data={[
                                { title: 'Completed', value: this.state.completePercentage, color: '#E38627', label: "Completed" },
                                { title: 'Incompletes', value: this.state.incompletePercentage, color: '#C13C37', label: "Incomplete" },

                            ]}
                            label={"Percent completed"}
                            labelStyle={{ color: 'black' }}
                        />
                        <PieChart
                            data={[
                                { title: 'Completed', value: 30, color: '#E38627' },
                                { title: 'Incompletes', value: 25, color: '#C13C37' },


                            ]}
                            label={"Percent completed with no retries"}
                            labelStyle={{ color: 'black' }}
                        />;
                        <PieChart
                            // data={[
                            //     { title: 'step1', value: 20, color: '#E38627' },
                            //     { title: 'step2', value: 25, color: '#C13C37' },
                            //     { title: 'step3', value: 25, color: '#f3b2a3' }
                            //
                            // ]}
                            data={stepData}
                            label={"Retries per instruction"}
                            labelStyle={{ color: 'black' }}
                        />;
                        <div style={{paddingTop:20,width:"50vh",height:"60vh",backgroundColor:"lightgray"}}>
                            Completed Student emails:
                            <br/>
                            foo1@gmail.com
                            <br/>
                            bar1@gmail.com
                            <br/>
                            boop@yahoo.com


                        </div>

                    </div>



                    </div>
                </div>
        );
    }

}
export default Statistics;