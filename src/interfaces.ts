export interface Quiz {
        type: "four" | "ox" | "typing";
        question: string;
        timer: number;
        point: "standard" | "double" | "none";
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
        type: "ox";
        answers: string[];
}

export interface QuizList {
        title: string;
        key?: IDBValidKey;
        list: (FourChoiceQuiz | OXQuiz | TypingQuiz)[];
}
