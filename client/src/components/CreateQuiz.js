import React, { Component } from 'react'
import Question from './Question'
import { Button } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class CreateQuiz extends Component {
    constructor(props) {
        super(props);
        const data = JSON.parse(localStorage.getItem('user'));
        if(!data)
        {
          this.state = {
            id: null,
            username: null,
            email: null,
            shareid: null,
            QuesA: [null,null,null,null,null,null,null,null,null,null]
          }
        }
        else
        {
        this.state = {
          id: data._id,
          username: data.username,
          email: data.email,
          shareid: data.sharelink,
          QuesA: [null,null,null,null,null,null,null,null,null,null]
        }
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
        axios.post(`/user/form/${this.state.id}`,body,config)
          .then(res => {
            if (res.data.msg_id === 0)
            {
              this.props.history.push('/');
            }
            else
            {
              var curUser= res.data.user;
              localStorage.setItem('user', JSON.stringify(curUser));
              this.props.history.push(`/user/share/${curUser._id}`);   
            }     
          });
    }

    componentWillMount()
    {
      if(this.state.id)
      {
        axios.get(`/user/form/${this.state.id}`)
        .then(res => {
          console.log(res.data)
          if(res.data.msg_id === 1)
            {
              var curUser= res.data.user;
              localStorage.setItem('user', JSON.stringify(curUser));
              this.props.history.push(`/user/share/${curUser._id}`);    
            }
          else if (res.data.msg_id === 0)
          {
            this.props.history.push('/');
          }
        });
      }
      else
      this.props.history.push('/');
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

export default withRouter(CreateQuiz);
