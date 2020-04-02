import React, { Component } from 'react';
import { Table } from 'reactstrap';

class YourResult extends Component {
    state = {
        user: 'Kripa',
        score: 5,
        scoreList: [
            { name: 'Parvati', score: 10 },
            { name: 'Ritankar', score: 10 },
            { name: 'Jassi', score: 5 }
        ]
    }

    render() {

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
                <div className="inviteLink">Create Your Quiz</div>
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
}

export default YourResult;