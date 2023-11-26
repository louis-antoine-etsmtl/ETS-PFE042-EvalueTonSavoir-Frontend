// StudentModeQuiz.tsx
import React, { useEffect, useState } from 'react';
import QuestionComponent from '../Questions/Question';

import '../../pages/Student/JoinRoom/joinRoom.css';
import { QuestionType } from '../../Types/QuestionType';
import { QuestionService } from '../../services/QuestionService';
import { Button } from '@mui/material';
import QuestionNavigation from '../QuestionNavigation/QuestionNavigation';

interface StudentModeQuizProps {
    questions: QuestionType[];
    submitAnswer: (answer: string | number | boolean, idQuestion: string) => void;
    disconnectWebSocket: () => void;
}

const StudentModeQuiz: React.FC<StudentModeQuizProps> = ({
    questions,
    submitAnswer,
    disconnectWebSocket
}) => {
    const [questionInfos, setQuestion] = useState<QuestionType>(questions[0]);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const previousQuestion = () => {
        setQuestion(questions[Number(questionInfos.question?.id) - 2]);
        setIsAnswerSubmitted(false);
    };

    useEffect(() => {
        setImageUrl(QuestionService.getImageSource(questionInfos.image));
    }, [questionInfos]);

    const nextQuestion = () => {
        setQuestion(questions[Number(questionInfos.question?.id)]);
        setIsAnswerSubmitted(false);
    };

    const handleOnSubmitAnswer = (answer: string | number | boolean) => {
        const idQuestion = questionInfos.question.id || '-1';
        submitAnswer(answer, idQuestion);
        setIsAnswerSubmitted(true);
    };

    return (
        <div className="overflow-auto">
            <div className="question-component-container">
                <div className="quit-btn">
                    <Button variant="outlined" onClick={disconnectWebSocket}>
                        Déconnexion
                    </Button>
                </div>
                <div className="mb-5">
                    <QuestionNavigation
                        currentQuestionId={Number(questionInfos.question.id)}
                        questionsLength={questions.length}
                        previousQuestion={previousQuestion}
                        nextQuestion={nextQuestion}
                    />
                </div>
                <QuestionComponent
                    handleOnSubmitAnswer={handleOnSubmitAnswer}
                    question={questionInfos.question}
                    showAnswer={isAnswerSubmitted}
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    );
};

export default StudentModeQuiz;
