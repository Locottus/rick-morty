import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import Character from 'src/app/models/Character';
import { MainServiceService } from '../../services/main-service.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  image: string = 'assets/images/rick-morty-portal.png';
  characterSelected: string = "";

  characters$ = this.mainService.characters$;
  charactersInfo$ = this.mainService.charactersInfo$;

  constructor(
    private mainService: MainServiceService,
  ) { }

  ngOnInit() {

  }


  onEnter(event: any) {
    console.log(this.characterSelected)
    if (event.keyCode === 13) {
      console.log('enter presseed', event);
      console.log(event.target.value);
      this.mainService.getNames(event.target.value, 1);
    }
    else {
      console.log('selected by click', event);
    }
  }

  optionSelected(event: Character) {
    console.log(this.characterSelected);
    console.log(event);
    this.image = event.image;
  }

}
