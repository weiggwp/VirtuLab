import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';


// import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import '../stylesheets/public_lab.css';
import icon from '../Images/v.jpg';
import {
    Button,
    Image,
    Navbar,
    NavItem,
    InputGroup,
    Nav,
    NavDropdown,
    Row,
    Col,
    FormGroup,
    PageItem,
    Pagination,
    Tooltip, OverlayTrigger
} from 'react-bootstrap';

import {Expandable_Classes} from "./expandable_course";
import Card from "react-bootstrap/Card";
import axios from "axios";
import GLOBALS from "../Globals";
import InstructorHeader from "./instructorHeader";
import {WithContext as ReactTags} from "react-tag-input";
import Dropdown from "react-bootstrap/Dropdown";
import {ToastsContainer, ToastsStore} from "react-toasts";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class PublicLab {
    constructor(id, name, author, keywords, description) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.keywords = keywords;
        this.description = description;
    }


}

class public_labs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false,
            loading_labs:true,
            tags: [],
            totalPages: 1,
            currentPage: 1,
            perPage: 2,

            notFound:"",
            suggestions: [

            ],
            labs: [
                new PublicLab(0,
                    "Intro to Beakers",
                    "Noob",
                    "Beaker, Intro, Break, Solution",
                    "Student will learn how to use beaker in lab setting"),
                new PublicLab(1,
                    "Dilution",
                    "Anonymous",
                    "Beaker, Chemicals, Solution, Reaction",
                    "Student will learn how to use mix solution with different concentrations"),
            ],
            viewLab:undefined,
            viewing:false,


        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

        this.handlePage = this.handlePage.bind(this);
    }



handleSelect(page) {
        alert(page)
}


handlePage(event) {
    this.setState({
        currentPage: Number(event.target.id)
    })
    alert(event.target.id)
    let pageNum = event.target.id
    let pagingReq = {
        pageNum: pageNum,
        perPage: 3,
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'responseType': 'json'
        }
    };

    axios.post(GLOBALS.BASE_URL + 'page_lab', pagingReq, axiosConfig)
        .then((response) => {
            // alert(response)
            let numPages = response.data["totalPages"]
            // console.log(response.data['totalPages']) // number of pages needed
            // console.log(response.data['labs']['content']) //this is the list

            this.setState({
                totalPages: numPages
            })

            this.setState({
                labs: response.data['labs']['content']
            })

        })
}



handleDelete(i) {
    const { tags } = this.state;
    this.setState({
        tags: tags.filter((tag, index) => index !== i),
    });
}
handleAddition(tag) {

        if(tag.text.toString().length>=20)
        {
            ToastsStore.error("Please Limit tag length to less than 20 characters")
            return
        }
        if(this.state.tags.length>=5)
        {
            ToastsStore.error("Please Limit to less than 5 tags")
            return
        }

    this.setState(state => ({ tags: [...state.tags, tag] }));
}
handleFieldChange = (e, field) => {
    this.setState({[field]: e.target.value});
};
    handleSubmit = (e) => {
        e.preventDefault();
        let tags = [];
        for (let i=0; i<this.state.tags.length; i++){
            tags[i]=this.state.tags[i].text;
        }
    const lab= {
        labID: 12,
        author: "",
        description:"",
        tags: tags,
    }
    // console.log("tags are " +this.state.tags +" + lab is " +JSON.stringify(tags))
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'responseType': 'json'
        }
    };

    var labArray=[];

    //axio sends message to backend to handle authentication
    // 'aws_website:8080/userPost'
    axios.post(GLOBALS.BASE_URL + 'get_matching_public_labs', lab, axiosConfig)
        .then((response) => {
            // console.log("resp is " +response.json())
          //  alert("data is "+JSON.stringify(response))
            if (response.data.length==0){
                this.state.notFound="No matching labs found.";
                this.setState({labs:labArray,loading_labs:false});
                return
            }
            this.state.notFound="";
            for (let i=0; i<response.data.length; i++){

                labArray[i]={lab_id:response.data[i].labID,name:response.data[i].name,author:response.data[i].creator,
                    keywords:response.data[i].tags,description:response.data[i].description};

            }
            // console.log("AAA classarray is "+classArray);
            this.setState({labs:labArray,loading_labs:false});
        })
        .catch((error) => {
                alert(error +" is the error")
            }
        );
}



    handleViewLab(lab){


        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        const labpub= {
            labID: lab.lab_id,

        };

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_lab', labpub, axiosConfig)
            .then((response) => {

                const data = response.data;
                console.log("data",response.data)
                this.setState(
                    {
                        viewLab:{id:data.labID,name:data.name,equipments:data.equipments,steps:data.steps},
                        viewing:true
                    }
                )
                console.log(this.state.viewLab)


            })
            .catch((error) => {
                    console.log("doot" + error)
                this.setState(
                    {
                        viewing:false
                    }
                )
                }
            );


    }


    handleCloneLab(lab){

        console.log(" lab is " +JSON.stringify(lab))

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        const labpub= {
            labID: lab.lab_id,
            author: this.props.email,
            description:lab.description,
            tags:lab.tags,
        };

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'clone_lab', labpub, axiosConfig)
            .then((response) => {
                this.render();
                window.location.reload()

            })
            .catch((error) => {
                    console.log("doot" + error)
                }
            );
    }


handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
}
    setRedirectAcct = () => {
        this.setState({
            redirectAcct: true
        })
    }
    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/account_settings'/>
        }
        // else if(this.state.redirectCourse){
        //     return <Redirect to='/add_course' />
        // }
        // else
        // {
        //     return <Redirect to='/do_lab' />
        // }
    }
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    }


    updateLabs(){
        const user = {

        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'responseType': 'json'
            }
        };

        var labArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_public_labs',  axiosConfig)
            .then((response) => {
                this.state.notFound="";
                // console.log("resp is " +response.json())
                console.log("data is "+JSON.stringify(response))


                for (let i=0; i<response.data.length; i++){

                    labArray[i]={lab_id:response.data[i].labID,name:response.data[i].name,author:response.data[i].creator,
                        keywords:response.data[i].tags,description:response.data[i].description};

                }
                // console.log("AAA classarray is "+classArray);
                this.setState({labs:labArray,loading_labs:false});
            })
            .catch((error) => {
                console.log(error +" is the error")
                }
            );

        axios.post(GLOBALS.BASE_URL + 'get_tags',  axiosConfig)
            .then((response) => {
                let suggestionArray=[];
                console.log("data is "+JSON.stringify(response))
                for (let k=0; k<response.data.length; k++){
                    suggestionArray[k]=       { id: response.data[k], text: response.data[k] };


                }
                console.log("suggestion array is " +suggestionArray)
                const temp = [       { id: 'Acids', text: 'Acids' },
                    { id: 'Mixtures', text: 'Mixtures' },
                    { id: 'Decomposition', text: 'Decomposition' },]
                console.log("temp is " +temp)
                this.setState({suggestions:suggestionArray});





            })
            .catch((error) => {
                    console.log(error +" is the error")
                }
            );

    }




    render() {

        const numberPages = Math.floor(this.state.totalResults / 5)
        if (this.state.loading_labs){
            this.updateLabs();
            return null;
        }
        if(this.state.viewing)
        {
            return <Redirect exact to={{
                pathname: "/view_lab",
                state: {
                    id:this.state.viewLab.id,
                    name:this.state.viewLab.name,
                    steps:this.state.viewLab.steps,
                    equipments:this.state.viewLab.equipments
                },
            }}/>;
        }
        let labs = this.state.labs;

        let active = this.state.currentPage
        let items = [];
        for (let number = 1; number <= this.state.totalPages; number++) {
            items.push(
                <Pagination.Item id={number} key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );


        }

        const paginationBasic = (
            <div>
                <Pagination>{items}</Pagination>
                <br />
            </div>
        );

        return (

            <div>
                {this.renderRedirect()}
                <InstructorHeader currentTab="Labs"/>

                <Navbar>
                    {/*<Navbar.Brand href="#student_home"> Back to Home</Navbar.Brand>*/}
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.props.email}
                            {/*    <a href="#login"> </a>*/}
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Navbar>


                <div>
                    <Navbar style={{backgroundColor: "lightgray", height:40,marginLeft: 40, marginRight: 40}}
                            className={"justify-content-between"}>
                        <Navbar.Brand href="instructor_home"> </Navbar.Brand>
                        <Nav>
                            <h3 className="accountH3">&nbsp;</h3>

                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Search: Press enter to add tag,
                                        then submit to look for labs with those tags.
                                    </Tooltip>
                                }
                            >
                            <form onSubmit={this.handleSubmit} style={{marginTop:5}}>
                            <FormGroup controlId="formBasicText" className={"tag"} >

                                <ReactTags tags={this.state.tags}
                                           suggestions={this.state.suggestions}
                                           handleDelete={this.handleDelete}
                                           handleAddition={this.handleAddition}
                                           handleDrag={this.handleDrag}
                                />

                            </FormGroup>
                           <input className="submit" type="submit" value="Search" />
                            </form>
                            </OverlayTrigger>

                        </Nav>
                        <Nav>
                            <Image onClick={this.setRedirectAcct} className={"config_image"}
                                   src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                        </Nav>

                    </Navbar>
                </div>
                {this.state.notFound}
                <div>
                    {labs.map(lab => (
                        <div >
                            <Dropdown as={ButtonGroup} style={{width: "95%"}}
                                      class={"dropdown-menu-right dropdown-button-drop-right"}>

                            <Dropdown.Toggle className={"public_lab"} variant="info">
                                <h4>{lab.name}</h4>
                                {"Author: " + lab.author}
                                <br/>
                                {"Description: " + lab.description}
                                <br/>
                                {"Keywords: " + lab.keywords}
                                <br/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu class="dropdown-menu">
                                <Dropdown.Item class={"dropdown-item"}
                                               onClick=
                                                   {() => this.handleViewLab(lab)}
                                               eventKey="1">View</Dropdown.Item>

                                <Dropdown.Item onClick=
                                                   {() => this.handleCloneLab(lab)} class={"dropdown-item"} eventKey="2">Clone</Dropdown.Item>


                                {/*<Dropdown.Divider />*/}

                            </Dropdown.Menu>
                        </Dropdown>
                        </div>




                    ))}



                </div>

                <div>
                    <Pagination style={{float:"right",marginRight:"3%"}} onClick={this.handlePage}>
                        {items}

                        <Pagination.Next/>
                    </Pagination>

                </div>

                <ToastsContainer store={ToastsStore}/>





            </div>






        )
    }
}

export default public_labs;