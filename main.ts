
class Bank {
    public creditCardId?: number;
    public AtmId?: number;

    [propName: string]: any;
    protected constructor() {
    }

}
class Client implements Bank{
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
interface IOperation{
    AddBalance(sum:number);
    WithdrawMoney(sum:number);
    CheckBalance();
}

class AtmSession implements Bank,IOperation{
    readonly AtmId:number =Math.floor(1000000 * Math.random());
    private _client:Client;
    private readonly _accepted:boolean =false;
    constructor(client:Client ,pin:number) {
        if(pin===client.CheckPin()){
            this._client=client;
            this._accepted =true;
        }else{
            console.log("Your have texted wrong pin please try again");
        }
    }
    AddBalance(sum:number):void{
        if(this._client&&this._accepted){
            this._client.changeBalance(sum,"add");
        }
        console.log("Спасибо что используете наш банк!");
        this._client=null;
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
        console.log("Спасибо что используете наш банк!");
        this._client=null;
    }
    CheckBalance(){
        if(!this._accepted){
            console.log("You arent accepted")
        }else{
            console.log("Your current balance is " +this._client.Balance);
        }
        console.log("Спасибо что используете наш банк!");
        this._client=null;
    }
}


let Ilyar:Client = new Client("Ilyar","Makhsumov");



let atm :AtmSession = new AtmSession(Ilyar,1534);
//atm.AddBalance(5000);
//atm.WithdrawMoney(60000);
//atm.CheckBalance();
console.log(Ilyar.creditCardId)
