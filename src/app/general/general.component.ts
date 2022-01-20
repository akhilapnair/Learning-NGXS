import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/states/app.state';
import { GetUsers } from '../action/app.action';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  userForm: FormGroup ;
  userInfo;
  @Select(AppState.selectStateData) userInfo$: Observable<any>;
  constructor(private store:Store,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: ['']
    });
    this.store.dispatch(new GetUsers);
    this.userInfo$.subscribe(data=>{
      this.userInfo = data;
    })
  }

}
