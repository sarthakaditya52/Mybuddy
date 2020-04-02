import React, { Component } from 'react'
import Question from './Question'
import { Button } from 'reactstrap';
import axios from 'axios';

export class CreateQuiz extends Component {
    constructor(props) {
        super(props);
        const data = JSON.parse(localStorage.getItem('user'));
        this.state = {
          id: data.id,
          username: data.name,
          email: data.email,
          shareid: data.id,
          QuesA: [null,null,null,null,null,null,null,null,null,null]
        }
    }

    getQuesData(data)
    {
        var Question = {
            ques: data.question.ques,
            ans: data.answer,
            options: data.options.options
        }
        var Qa = this.state.QuesA.slice();
        Qa[data.questionNo - 1] =  Question
        this.setState({
          QuesA: Qa
        });
    }

    onClick()
    {
        let user = {
          username: this.state.username,
          email: this.state.email,
          qa: this.state.QuesA,
          sharelink: this.state.id
        }

        // Header
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        // Request
        const body = JSON.stringify(user);
        console.log(body);
        axios.post(`/user/form/${this.state.id}`,body,config);
    }

    render() {
        return (
            <div>
                <Question
                    index={1}
                    quesNo={1}
                    gradient={'green'}
                    resQ = {this.state.QuesA[0]}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={2}
                    quesNo={2}
                    gradient={'voilet'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={3}
                    quesNo={3}
                    gradient={'indigo'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={4}
                    quesNo={4}
                    gradient={'yellow'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={5}
                    quesNo={5}
                    gradient={'red'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={6}
                    quesNo={6}
                    gradient={'voilet'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={7}
                    quesNo={7}
                    gradient={'yellow'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={8}
                    quesNo={8}
                    gradient={'indigo'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={9}
                    quesNo={9}
                    gradient={'red'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Question
                    index={0}
                    quesNo={10}
                    gradient={'green'}
                    QuesData={this.getQuesData.bind(this)}
                  />
                <Button onClick={this.onClick.bind(this)}>
                    Submit
                </Button>
            </div>
        )
    }
}

export default CreateQuiz;
