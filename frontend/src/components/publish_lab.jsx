import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, Form, FormControl, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import '../stylesheets/reactTags.css';
import {Droppable_course} from './droppable_course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";
import Step from "../Step";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { WithContext as ReactTags } from 'react-tag-input';
export class publish_lab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            lab_id:0,
            tags: [],
            suggestions: [
                { id: 'Acids', text: 'Acids' },
                { id: 'Mixtures', text: 'Mixtures' },
                { id: 'Decomposition', text: 'Decomposition' },

            ],

            description: '',
            redirectAcc: false,
            redirectDone:false,
            errors: '',
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }
    handleAddition(tag) {
        //console.log("tag is "+JSON.stringify(tag))
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

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    loadLab(){
        if(this.props.location.state!==undefined)
        {
            // alert(this.props.location.state);

            this.setState(
                {

                    lab_id: this.props.location.state.id,
                    lab_loaded: true,
                }, () => {

                }
            )

        }
        else
        {
            this.setState(
                {

                    lab_loaded: true,
                }, () => {

                }
            )
        }
    }
    handlePublishLabPage= (e) =>{
        if (this.state.description.length>50){

            ToastsStore.error("Please limit description to less than 50 characters.")

        }
        e.preventDefault();

       // alert("tags is "+this.state.tags)
        let tags = [];
        for (let i=0; i<this.state.tags.length; i++){
            if (this.state.tags[i].text.length>40)
                tags[i]=this.state.tags[i].text.substring(0,40);
            else tags[i]=this.state.tags[i].text;
        }
   //    alert("labs are "+JSON.stringify(tags))
        const labpub= {
            labID: this.state.lab_id,
            author: this.props.email,
            description:this.state.description,
            tags:tags,
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };


        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'publish_lab', labpub, axiosConfig)
            .then((response) => {
                this.setState({
                    redirectDone: true
                })

                this.render()
            })
            .catch((error) => {

                }
            );
    }
    renderBanner() {
        return (
            <div className="banner">
                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )
    }
setRedirectAcct = (e)=>{
    this.setState({
        redirectAcc: true
    })
}
    renderNavigation() {
        return (
            <div>
                <Navbar style={{backgroundColor: "lightgray", marginLeft: 100, marginRight: 200}}
                        className={"justify-content-between"}>
                    <Nav>
                        <Button href="instructor_labs" style={{backgroundColor: "#e88f65ff"}} variant="primary">Go
                            Back</Button>
                    </Nav>

                    <Nav>
                        <Image onClick={this.setRedirectAcct} className={"config_image"}
                               src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    handleInstructionChange=(e)=>
    {
        this.setState(
            {
                description:e.target.value
            }
        )
    }

    render() {
        if (this.state.redirectAcc) {
            return <Redirect exact to="/account_settings"/>;
        }

        if (this.state.redirectDone) {
        //    alert("yoter")
            return <Redirect exact to="/instructor_labs" />;
        }
        if(!this.state.lab_loaded)
        {
            this.loadLab();
            return null;
        }else  {
            const { tags, suggestions } = this.state;
            const KeyCodes = {
                comma: 188,
                enter: 13,
            };
            const delimiters = [KeyCodes.comma, KeyCodes.enter];
            return (
                <div>
                    {this.renderBanner()}

                    {this.renderNavigation()}

                    <div className={"lightblue centered"}
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'top', height: '100vh'}}>
                        <br/>
                        <div className="box-container" style={{width: '50vh'}}>
                            <form onSubmit={this.handlePublishLabPage}>
                                <h1 className={"accountH1"}>Publish Lab</h1>



                                <h3 className="accountH3">Description</h3>

                                <div style={{padding: 10,height:'15vh'}}>

                                <textarea
                                    style={{marginLeft:10,resize:"none",height:"100%",width:"100%",borderStyle:"solid",borderWidth:1,color:"black"}}
                                    placeholder="Brifly describe your quality lab in less than 50 characters"
                                    onChange={(e) => this.handleInstructionChange(e)}
                                    value={this.state.description}
                                />

                                </div>
                                <ToastsContainer store={ToastsStore}/>
                                <h3 className="accountH3">Tags</h3>
                                <FormGroup controlId="formBasicText" bsSize="large">

                                    <ReactTags
                                        tags={this.state.tags}
                                               suggestions={this.state.suggestions}
                                               handleDelete={this.handleDelete}
                                               handleAddition={this.handleAddition}
                                               handleDrag={this.handleDrag}
                                              />

                                </FormGroup>

                                <Button style={{backgroundColor: 'orange', color: "white"}} block bsSize="large"
                                        type="submit">
                                    Publish
                                </Button>


                            </form>


                        </div>

                    </div>


                </div>
            );
        }
    }
}

export default publish_lab;