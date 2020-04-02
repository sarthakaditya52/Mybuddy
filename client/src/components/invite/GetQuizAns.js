import React, { Component } from 'react';
import Question from './Question';
import { Form, Button } from 'reactstrap';

export class GetQuizAns extends Component {
    state = {
        Style: { background: 'linear-gradient(#FF5F6D, #FFC371)' },
        user: "Kripa",
        index: 0,
        questionOptions: [],
        answerOptions: [],
        answers: []
    }
    componentWillMount() {
        let questionOptions =
            [
                { ques: `Which is ${this.state.user} favourite smartphone brand?`, id: 1 },
                { ques: `Who is ${this.state.user}'s favourite superhero`, id: 2 },
                { ques: `How many kids does ${this.state.user} want ?`, id: 3 },
                { ques: `What is ${this.state.user}'s dream car?`, id: 4 },
                { ques: `What is ${this.state.user}'s favourite show?`, id: 5 },
                { ques: `What is most important for ${this.state.user} ?`, id: 6 },
                { ques: `What does ${this.state.user} use the most ?`, id: 7 },
                { ques: `What type of person is ${this.state.user} ?`, id: 8 },
                { ques: `If ${this.state.user} meets a genie, what would be ${this.state.user}'s wish ?`, id: 9 },
                { ques: `What type of movies does ${this.state.user} like the most?`, id: 10 }
            ];

        let answerOptions =
            [
                { id: 1, options: [{ key: 0, option: 'Apple' }, { key: 1, option: 'Nokia' }, { key: 2, option: 'Oneplus' }, { key: 3, option: 'Samsung' }] },
                { id: 2, options: [{ key: 0, option: 'Batman' }, { key: 1, option: 'Thor' }, { key: 2, option: 'Spider-Man' }, { key: 3, option: 'Iron Man' }, { key: 4, option: 'Aquaman' }] },
                { id: 3, options: [{ key: 0, option: 'None' }, { key: 1, option: 'One' }, { key: 2, option: 'Two' }, { key: 3, option: 'Three' }, { key: 4, option: 'I want to adopt kids' }] },
                { id: 4, options: [{ key: 0, option: 'Audi' }, { key: 1, option: 'Jaguar' }, { key: 2, option: 'BMW' }, { key: 3, option: 'Lamborghini' }] },
                { id: 5, options: [{ key: 0, option: 'Prison Break' }, { key: 1, option: 'Breaking Bad' }, { key: 2, option: 'Game of Thrones' }, { key: 3, option: 'Friends' }] },
                { id: 6, options: [{ key: 0, option: 'Money' }, { key: 1, option: 'Love' }, { key: 2, option: 'Friends & Family' }, { key: 3, option: 'Career' }] },
                { id: 7, options: [{ key: 0, option: 'Whatsapp' }, { key: 1, option: 'Facebook' }, { key: 2, option: 'Instagram' }, { key: 3, option: 'Reddit' }] },
                { id: 8, options: [{ key: 0, option: 'Funny' }, { key: 1, option: 'Cool' }, { key: 2, option: 'Calm' }, { key: 3, option: 'Impatient' }] },
                { id: 9, options: [{ key: 0, option: 'Loads of Money' }, { key: 1, option: 'Perfect life partner' }, { key: 2, option: 'Perfect job' }, { key: 3, option: 'A huge house' }] },
                { id: 10, options: [{ key: 0, option: 'Action' }, { key: 1, option: 'Thriller' }, { key: 2, option: 'Comedy' }, { key: 3, option: 'Horror' }, { key: 4, option: 'Drama' }, { key: 5, option: 'Sci-Fi' }, { key: 6, option: 'Romance' }] },
            ];

        this.setState({
            questionOptions,
            answerOptions
        });
    }

    answerHandler = (event) => {
        // console.log(event.target.getAttribute("index"));
        let index = this.state.index;
        if (index < 9) {
            let answer = this.state.answerOptions[index].options[event.target.getAttribute("index")].option;
            let answers = [...this.state.answers, answer];
            index += 1;
            // console.log(answers);

            this.setState({
                index,
                answers
            });
        }
    }

    render() {
        return (
            <div>
                <div className="quizHeader">
                    <span>{this.state.user}'s Quiz</span>
                </div>
                <div className="progressContainer">
                    <div className="progressBar" style={{ width: 10 * this.state.index + "%" }}></div>
                </div>
                <Form>
                    <div id="question-card" style={this.state.Style}>
                        <h1 className="question-heading">
                            Question {this.state.index+1}
                        </h1>
                        <div className="triangle-up"></div>
                        <div className="question-text">
                            <textarea className="form-control" name="question" onChange={this.qOnChange} rows="2" value={this.state.questionOptions[this.state.index].ques} />
                        </div>
                        <div className="option_enclosure">
                            {
                                this.state.answerOptions[this.state.index].options.map((items, index) => (
                                    <div key={items.key} className="input-group">
                                        <div className="input-group-text">
                                            <label className="radio-container">
                                                <input type="radio" index={index} onClick={(e) => this.answerHandler(e)} checked={false} className="option-input radio" />
                                            </label>
                                        </div>
                                        <textarea maxLength="56" spellCheck="false" type="text" className="form-control textarea-form textarea-form-user" rows="1" cols="60" value={items.option} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Form>
                <div className="quizHeader">
                    <span>Choose an answer!</span>
                </div>
            </div>
        );
    }
}

export default GetQuizAns;