import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  characterInfo: Character = new Character();

  characters$ = this.mainService.characters$;
  charactersInfo$ = this.mainService.charactersInfo$;

  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 20;
  fixSize: number = 20;


  constructor(
    private mainService: MainServiceService,
  ) { }

  ngOnInit() {
    this.characterInfo.id = 0;
    this.characterInfo.name = 'Portal';
    this.characterInfo.gender = 'N/A';
    this.characterInfo.image = this.image;
    this.characterInfo.species = 'N/A';
    this.characterInfo.status = 'N/A';

    this.mainService.getNames(this.characterSelected, this.currentPage);
  }

  /**
   * when enter is pressed, the selected name will be processed
   * @param event keyboard event
   */
  onEnter(event: any) {
    if (event.keyCode === 13 || event.key === 'Backspace') {
      this.mainService.getNames(event.target.value, this.currentPage);
      this.optionSelected(this.mainService.findCharacter(this.characterSelected));
      this.calculatePage();
    }
    else {
      this.mainService.getNames(event.target.value, 1);
    }
  }

  /**
   * calculates the pages to be displayed
   */
  calculatePage() {
    this.resetPagination();
    setTimeout(() => {
      this.totalCount = this.mainService.getTotalCharacters();
      this.totalPages = Math.floor(this.totalCount / this.fixSize) + 1;
    }, 300);
  }

  /**
   * resets pagination when enter is pressed
   */
  resetPagination() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalCount = 20;
    this.fixSize = 20;
  }

  /**
   * moves a page before
   */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.mainService.getNames(this.characterSelected, this.currentPage);
    }
  }

  /**
   * moves to next page
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.mainService.getNames(this.characterSelected, this.currentPage);
    }
  }

  /**
   * loads the data of the selected character
   * @param event keyboard event
   */
  optionSelected(event: Character) {
    this.characterInfo.id = event.id;
    this.characterInfo.name = event.name;
    this.characterInfo.gender = event.gender;
    this.characterInfo.image = event.image;
    this.characterInfo.species = event.species;
    this.characterInfo.status = event.status;
    this.image = event.image;
  }

}
