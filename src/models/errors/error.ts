class GenericError{
    ok:boolean = false;
    ErrorObj:any = [];
    value: String;
    msg: String; 
    
    constructor(value:string, msg:String){
        this.value = value; 
        this.msg = msg;
        this.ErrorObj.push({
            ok: this.ok,
            value: this.value, 
            msg: this.msg
        })
    }

    get ErrorObjt(){
        return this.ErrorObj;
    }
}

export default GenericError;