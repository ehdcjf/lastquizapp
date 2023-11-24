export class Memory {
        private static instance: Memory;
        private nowQuizKey: IDBValidKey;
        private constructor() {
                this.nowQuizKey = null;
        }

        public static getInstance() {
                Memory.instance ??= new Memory();
                return Memory.instance;
        }

        getNowQuizKey() {
                return this.nowQuizKey;
        }

        setNowQuizKey(key: IDBValidKey) {
                this.nowQuizKey = key;
        }
}
