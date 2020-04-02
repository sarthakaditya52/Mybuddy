import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

class YourResult extends Component {

    constructor(props) {
        super(props);
        const curUser = JSON.parse(localStorage.getItem('user'));
        const friendsUser = JSON.parse(localStorage.getItem('refUser'));
        const result = JSON.parse(localStorage.getItem('result'));
        if(curUser && friendsUser && result)
        {
            this.state = {
                curUser: curUser,
                friendUser: friendsUser,
                result: result,
                user: curUser.username,
                score: result.score,
                scoreList: []
            }
        }
        else
        {
            this.state = {
                curUser: curUser,
                friendUser: friendsUser,
                result: result,
                user: null,
                score: null,
                scoreList: []
            }
        }
    }
    

    componentWillMount()
    {
        if(this.state.curUser && this.state.friendUser && this.state.result)
        {
            console.log(this.state.result)
            axios.get(`/invite/results/${this.state.curUser._id}/${this.state.friendUser._id}/${this.state.result._id}`)
            .then(res => {
                if(res.data.msg_id === 2)
                {
                    this.props.history.push(`/invite/form/${this.state.curUser._id}/${this.state.friendUser._id}`)
                }
                else if (res.data.msg_id === 0)
                    this.props.history.push('/')
                else
                {
                    let scores = res.data.invites;
                    let newScores = [];
                    for(let i = 0; i < scores.length; i++)
                    {
                        let score = { name: scores[i].friendname, score: scores[i].score }
                        newScores.push(score)
                    }
                    this.setState({
                        scoreList: newScores
                    });
                }
            })
        }
        else
            this.props.history.push('/')
    }

    onClick()
    {
        this.props.history.push(`/form`); 
    }

    render() {
        if(this.state.curUser && this.state.friendUser && this.state.result)
        {
            return (
                <div>
                    <div className="resultQuiz">Excellent, you have scored {this.state.score} in the quiz about {this.state.user}</div>

                    <div className="meterContainer">
                        <div className="dial">
                            <ul className="meter">
                                <li className="low"></li>
                                <li className="medium"></li>
                                <li className="high"></li>
                            </ul>
                            <div className="dialInfo">
                                <div className="inner" style={{ transform: "rotate(" + (this.state.score * 17.3) + "deg)" }}>
                                    <div className="arrow"></div>
                                </div>
                                <div className="per">{this.state.score * 10}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="inviteText">Now, it's your turn. Create your own quiz and send it to your friends</div>
                    <div className="inviteLink" onClick={this.onClick.bind(this)}>Create Your Quiz</div>
                    <div className="scoreResultOf">Scoreboard of {this.state.user}</div>

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

                    <div className="inviteLink">Create Your Quiz</div>
                </div>
            );
        }
        else
        {
            return(<div></div>)
        }
    }
}

export default YourResult;