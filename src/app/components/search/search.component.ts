import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith,debounceTime } from 'rxjs/operators';
import { MainServiceService } from '../../services/main-service.service'

export interface User {
  name: string;

/*  created:string;
  episode: Array<string>;
  gender:string;
  id:number;
  image:string;
  location:any;
  origin:any;
  species:string;
  status:string;
  type:any;
  url:string;*/
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = [{ name: 'Lobi' }, { name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }, { name: 'Canela' }];
  //options: User[] =[];
  filteredOptions!: Observable<User[]>;
  image: string = 'assets/images/rick-morty-portal.png'; 
  characterSelected: string = "";

  constructor(
    private mainService: MainServiceService,
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );

      /*this.mainService.getData().subscribe(data =>{
        console.log(data);
      })*/
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  clicked(e: any) {
    console.log(e);
  }

  onEnter(evt: any) {
    if (evt.keyCode === 13) {
      console.log('enter presseed', evt);
      console.log(this.characterSelected);
      //this.image ="https://incyt.url.edu.gt/incyt/api/HashFiles/uploads/lobi.JPG"; 
    }

    else if (evt.source.selected) {
      console.log('selected by click', evt);
    }
  }

}
