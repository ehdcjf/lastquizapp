// const q: QuizList = {
//         title: "첫번째 퀴즈모음",
//         list: [
//                 { type: "four", question: "kk", answer: 1, choices: ["dd", "dd"], timer: 10000, point: "double" },
//                 { type: "ox", question: "kk", answer: true, timer: 10000, point: "double" },
//         ],
// };

import { QuizList } from "./interfaces";

export class Database {
        private db: IDBDatabase;
        private static instance: Database;
        private constructor() {}

        public static getInstance() {
                Database.instance ??= new Database();
                return Database.instance;
        }

        init() {
                return new Promise((resolve) => {
                        const requeset = window.indexedDB.open("quiz-db", 1);
                        requeset.onerror = (event) => {
                                console.error("Why didn't you allow my web app to use IndexedDB?!");
                        };

                        requeset.onsuccess = (event) => {
                                this.db = (event.target as any).result;
                                resolve(true);
                        };
                        requeset.onupgradeneeded = (event) => {
                                // DB 초기 설정
                                this.db = (event.target as any).result;
                                const objectStore = this.db.createObjectStore("quiz", {
                                        autoIncrement: true,
                                });
                        };
                });
        }

        // home - 퀴즈 목록 불러오기
        getAllQuizWithCursor(): Promise<Array<QuizList>> {
                return new Promise(async (resolve) => {
                        const result = [];

                        const transaction = this.db.transaction(["quiz"], "readonly");

                        const objectStore = transaction.objectStore("quiz");

                        const objectStoreCursorRequest = objectStore.openCursor();

                        objectStoreCursorRequest.onsuccess = (e) => {
                                let cursor = objectStoreCursorRequest.result;
                                if (cursor) {
                                        const key = cursor.primaryKey;
                                        const value = cursor.value as QuizList;
                                        result.push({ key, title: value.title });

                                        cursor.continue();
                                }
                        };

                        transaction.oncomplete = (e: any) => {
                                resolve(result);
                        };
                        transaction.onerror = (e) => {
                                resolve(result);
                        };
                });
        }

        /**
         * 퀴즈만들기
         * @returns
         */
        createNewQuiz(): Promise<IDBValidKey> {
                return new Promise((resolve) => {
                        const transaction = this.db.transaction(["quiz"], "readwrite");

                        const objectStore = transaction.objectStore("quiz");

                        const objectStoreRequest = objectStore.add({ title: "newQuiz", list: [] });

                        objectStoreRequest.onsuccess = (e) => {};

                        transaction.oncomplete = (e: any) => {
                                resolve(objectStoreRequest.result);
                        };
                        transaction.onerror = (e) => {};
                });
        }

        //퀴즈불러오기
        getQuiz(key: IDBValidKey) {
                return new Promise((resolve) => {
                        const transaction = this.db.transaction(["quiz"], "readonly");

                        const objectStore = transaction.objectStore("quiz");

                        const objectStoreRequest = objectStore.get(key);

                        objectStoreRequest.onsuccess = (e) => {
                                console.log(`getQuiz success`);
                        };

                        transaction.oncomplete = (e: any) => {
                                resolve(objectStoreRequest.result);
                        };
                        transaction.onerror = (e) => {};
                });
        }

        //퀴즈 업데이트
        updateQuiz(key: IDBValidKey, data: any) {
                return new Promise((resolve) => {
                        const transaction = this.db.transaction(["quiz"], "readwrite");

                        const objectStore = transaction.objectStore("quiz");

                        const objectStorePutRequest = objectStore.put(data, key);
                        objectStorePutRequest.onsuccess = (e) => {};

                        transaction.oncomplete = (e: any) => {
                                resolve(objectStorePutRequest.result);
                        };
                        transaction.onerror = (e) => {};
                });
        }

        // 퀴즈 삭제
        deleteQuiz(key: IDBValidKey) {
                return new Promise((resolve) => {
                        const transaction = this.db.transaction(["quiz"], "readwrite");

                        const objectStore = transaction.objectStore("quiz");

                        const objectStorePutRequest = objectStore.delete(key);
                        objectStorePutRequest.onsuccess = (e) => {};

                        transaction.oncomplete = (e: any) => {
                                resolve(objectStorePutRequest.result);
                        };
                        transaction.onerror = (e) => {};
                });
        }
}
