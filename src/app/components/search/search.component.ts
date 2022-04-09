import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = [{name: 'Lobi'},{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'},{name: 'Canela'}];
  filteredOptions!: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clicked(e:any){
    console.log(e);
  }

  onEnter(evt: any){
    //console.log(evt);
    if (evt.keyCode === 13 )
      console.log('enter presseed',evt);
    else if (evt.source.selected)
      console.log('selected',evt);
    /*if (evt.source.selected) {
    alert("hello ");
    }*/
  }

}
