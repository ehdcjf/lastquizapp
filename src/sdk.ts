


export const ACTION={
    QUIZ_START: 'qz_start',
    QUIZ_END: 'qz_end',
    Q_SEND:'q_send',
    A_RECEIVE: 'a_recv'
}


export class SDK{
    private sdk:any
    private static instance:SDK
    private constructor(){
    }

    public static getInstance(){
        SDK.instance ??=new SDK();
        return SDK.instance;
    }

    init(){
        this.sdk = (window as any).AFREECA.ext();
    }

    listen(callback:any){
        this.sdk.broadcast.listen(callback);
    }

    send(action:string, message:any){
        message = typeof message==='string' ? message : JSON.stringify(message)
        this.sdk.broadcast.send(action, message)
    }
}