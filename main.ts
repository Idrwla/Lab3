
interface Bank{                                 //  тут дожно было быть класс(  
    creditCardId?:number;
    AtmId?:number;
    [propName: string]: any;
}
class Clien implements Bank{                    // extends   вместо implements 
    private _PIN :number = Math.floor(Math.random()*10000);
    readonly creditCardId:number = Math.floor(Math.random()*100000);
    private _Balance:number=0;
    private greeter:string="Thank you for using our bank.\nYour Credit Cars number is :"+this.creditCardId+"\n" +
        "Your PIN (Dont tell it to someone):"+this._PIN;
    constructor(firstname:string,lastname :string ) {

        console.log(this.greeter);
    }
    get Balance():number{
        return this._Balance;
    }
    changeBalance(sum:number,action:string){
        if(action==="add"){
            this._Balance+=sum;
        }else if (action==="sub"){
            this._Balance-=sum;
        }else{
            throw new Error("Не указана опреация");
        }
    }
    CheckPin(){
        return this._PIN;
    }
}
interface Actions{                                          // изменить имя на IAction
    AddBalance(sum:number);
    WithdrawMoney(sum:number);
    CheckBalance();
}

class ATM implements  Actions,Bank{                         //  тут class ATM extends Bank implements IAction
    readonly AtmId:number =Math.floor(1000000 * Math.random());
    readonly _client:Clien;
    private _accepted:boolean =false;
    constructor(client:Clien ,pin:number) {
        if(pin===client.CheckPin()){
            this._client=client;
            this._accepted =true;
        }else{

            console.log("Your have entired wrong pin please try again");
        }
    }
    AddBalance(sum:number):void{
        if(this._client&&this._accepted){
            this._client.changeBalance(sum,"add");
        }
    }
    WithdrawMoney(sum:number){
        if(!this._accepted){
            console.log("You arent accepted")
        }
        else if(this._client.Balance>0&&(this._client.Balance-sum>0)){
            this._client.changeBalance(sum,"sub");
        }else{
            console.log("lol You dont have money");
        }
    }
    CheckBalance(){
        if(!this._accepted){
            console.log("You arent accepted")
        }else{
            console.log("Your current balance is " +this._client.Balance);
        }
    }
}


let ilyar:Clien = new Clien("ilyar","Makhsumov");



let atm :ATM = new ATM(ilyar,1534);
atm.AddBalance(5000);
atm.WithdrawMoney(60000);
atm.CheckBalance();
console.log(ilyar.creditCardId)
