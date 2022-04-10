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

  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  fixSize: number = 20;


  constructor(
    private mainService: MainServiceService,
  ) { }

  ngOnInit() {
  }


  onEnter(event: any) {
    if (event.keyCode === 13) {
      this.mainService.getNames(event.target.value, this.currentPage);
      //this.characterSelected = "";
      this.calculatePate();
    }
    else {
      console.log('selected by click', event);
    }
  }

  calculatePate() {
    this.charactersInfo$.subscribe(val => {
      this.totalCount = val[0].count;
      this.totalPages = Math.floor(this.totalCount / this.fixSize) + 1;
      //console.log(this.totalCount, this.totalPages);
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.mainService.getNames(this.characterSelected, this.currentPage);

    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.mainService.getNames(this.characterSelected, this.currentPage);
    }
  }

  optionSelected(event: Character) {
    //console.log(this.characterSelected);
    //console.log(event);
    this.image = event.image;
  }

}
