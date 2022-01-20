import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetUsers } from "src/app/action/app.action";
import { DesignutilityService } from "src/app/designutility.service";
import { tap } from 'rxjs/operators';

export class UserStateModel{
    users:any;
}
@State<UserStateModel>({
name:'appstate',defaults:{users:[]}
})
@Injectable()
export class AppState{
    constructor(private _du: DesignutilityService) { }

    @Selector()
    static selectStateData(state:UserStateModel){
        return state.users;
    }
    @Action(GetUsers)
    getDataFromState(ctx:StateContext<UserStateModel>){
        return  this._du.fetchUsers().pipe(tap(returndata=>{
            const state = ctx.getState();
            ctx.setState({...state,
            users:returndata})
        }))
    }

}