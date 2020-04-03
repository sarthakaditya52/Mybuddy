import React, { Component } from 'react'
import Question from './Question'
import { Button } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class CreateQuiz extends Component {
    constructor(props) {
        super(props);
        const data = this.props.user;
        if(!data)
        {
          this.state = {
            user: null,
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
          user: data,
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

        let go = false;
        let flag = true;
        for(let i = 0; i < user.qa.length; i++)
        {
          if(!user.qa[i])
            flag = false
          else
          {
            if(!user.qa[i].ques)
              flag = false
            for(let j = 0; j < user.qa[i].options.length; j++)
            {
              if(!user.qa[i].options[j])
                flag = false
            }
          }
        }

        go = flag

        if(go)
        {
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
                const userdata = {
                  user: curUser,
                  msg_id: 2
                }
                this.props.sendId(userdata);
              }     
            });
        }
    }

    componentWillMount()
    {
      if(this.state.id)
      {
        axios.get(`/user/form/${this.state.id}`)
        .then(res => {
          if(res.data.msg_id === 1)
            {
              var curUser= res.data.user;
              const userdata = {
                user: curUser,
                msg_id: 2
              }
              this.props.sendId(userdata); 
            }
          else if (res.data.msg_id === 0)
            {
              this.props.history.push('/');
            }
          else{
            this.setState({
              user: res.data.user
            });
          }
        });
      }
      else
        this.props.history.push('/');
    }

    render() {
      if(this.state.user)
      {
        return (
          <div>
              <Question
                  index={1}
                  quesNo={1}
                  gradient={'green'}
                  resQ = {this.state.QuesA[0]}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={2}
                  quesNo={2}
                  gradient={'voilet'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={3}
                  quesNo={3}
                  gradient={'indigo'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={4}
                  quesNo={4}
                  gradient={'yellow'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={5}
                  quesNo={5}
                  gradient={'red'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={6}
                  quesNo={6}
                  gradient={'voilet'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={7}
                  quesNo={7}
                  gradient={'yellow'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={8}
                  quesNo={8}
                  gradient={'indigo'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={9}
                  quesNo={9}
                  gradient={'red'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Question
                  index={0}
                  quesNo={10}
                  gradient={'green'}
                  QuesData={this.getQuesData.bind(this)}
                  username = {this.state.user.username}
                />
              <Button onClick={this.onClick.bind(this)}>
                  Submit
              </Button>
          </div>
      )
      }
      else
      {
        return (<div></div>)
      }
  
    }
}

export default withRouter(CreateQuiz);
