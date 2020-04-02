import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';


export class LoginNew extends Component {
    constructor(props) {
        super(props);
        const data = JSON.parse(localStorage.getItem('refId'));
        this.state={
            refId: data,
            name: '',
            email: '',
            scoreList: [
                { name: 'Parvati', score: 10 },
                { name: 'Ritankar', score: 10 },
                { name: 'Jassi', score: 5 }
            ]
        }
        axios.get(`/invite/${data}`)
            .then(res => {
                console.log(res.data);
            })
            .catch( err => {
                console.log(err)
            })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onClick()
    {
        const user = {
            name: this.state.name,
            email: this.state.email
        }
        // Header
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        // Request
        const body = JSON.stringify(user);
        axios.post(`/invite/new/${this.state.refId}`,body,config)
            .then(res => {
                var curUser= res.data.curUser;
                var friendUser= res.data.friendUser;
                localStorage.setItem('user', JSON.stringify(curUser));
                localStorage.setItem('refUser', JSON.stringify(friendUser));
                this.props.history.push(`/invite/form/${curUser._id}/${friendUser._id}`);
            });
            }

    render() {
        return (
            <div>
                <div className="card text-white bg-info mb-5">
                    <div className="card-header" id="center"><h2>Best Buddy Challenge</h2></div>
                    <div className="card-body">
                        <h5 className="card-title">Instructions:</h5>
                        <p className="card-text">
                            <ul>
                                <li>Enter your Name</li>
                                <li>Enter your Email</li>
                                <li>Answer the Questions about your friend.</li>
                                <li>Check your score at the scoreboard.</li>
                            </ul>
                        </p>
                        <div>
                            <Form method='POST' action='/user/new'>
                                <Col md={6}>
                                    <FormGroup className="col-md-12 offset-md-6"> 
                                        <Label>Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="Email" onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup className="col-md-12 offset-md-6">
                                        <Label>Name</Label>
                                        <Input id="name" name="name" type="text" placeholder="Name" onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                                <FormGroup id="submitBtn">
                                    <Button onClick={this.onClick.bind(this)}>Submit</Button>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="scoreResultOf">Scoreboard</div>

                        <Table className="scoreTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody className="resultTable">
                                {
                                    this.state.scoreList.length !== 0
                                        ?
                                        this.state.scoreList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.score}</td>
                                            </tr>
                                        ))
                                        :
                                        null
                                }
                            </tbody>
                        </Table>
                        {
                            this.state.scoreList.length === 0
                                ?
                                <div className="noScore">No one has given this quiz yet.</div>
                                :
                                null
                        }

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(LoginNew);
