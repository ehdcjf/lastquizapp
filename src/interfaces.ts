export type QuizType = "four" | "ox" | "typing";
export type QuizPoint = "standard" | "double" | "none";
export interface Quiz {
        type: QuizType;
        question: string;
        timer: number;
        point: QuizPoint;
}

export interface FourChoiceQuiz extends Quiz {
        type: "four";
        answer: number;
        choices: string[];
}

export interface OXQuiz extends Quiz {
        type: "ox";
        answer: boolean;
}
export interface TypingQuiz extends Quiz {
        type: "typing";
        answers: string[];
}


export type QuizItemType = FourChoiceQuiz| OXQuiz| TypingQuiz

export interface QuizList {
        title: string;
        key?: IDBValidKey;
        list: QuizItemType[];
}
