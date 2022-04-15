import { AfterViewInit, Component, ElementRef,  ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Character from 'src/app/models/Character';
import { MainServiceService } from '../../services/main-service.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements  AfterViewInit {

  @ViewChild('mortyForm') form!: FormGroup;
  @ViewChild('inputElement') inputElementSearch!: ElementRef;


  myControl = new FormControl();
  characterInfo: Character | undefined = undefined;

  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 20;
  fixSize: number = 20;

  characterSelected: string = "";

  data$ = this.mainService.store$;
  
  constructor(
    private mainService: MainServiceService,
  ) {
  }


  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(200))
      .subscribe(({ characterSelected }) => {
        this.resetPagination();
        this.mainService.findCharacter(characterSelected);
        this.characterInfo = undefined;
      });
  }

  /**
   * calculates the pages to be displayed
   */
  calculatePage() {
    this.resetPagination();
  }

  /**
   * resets pagination when enter is pressed
   */
  resetPagination() {
    this.currentPage = 1;
    this.mainService.changePage(this.currentPage);
  }

  /**
   * moves a page before
   */
  previousPage() {
    this.currentPage--;
    this.mainService.changePage(this.currentPage);
  }

  /**
   * moves to next page
   */
  nextPage() {
    this.currentPage++;
    this.mainService.changePage(this.currentPage);
  }

  /**
   * loads the data of the selected character
   * @param character keyboard event
   */
  optionSelected(character: Character) {
    this.characterInfo = character;
  }

  /**
 * when enter is pressed, the selected name will be processed
 * @param event keyboard event
 */
  async onEnter(event: any, data: any) {
    if (event.keyCode === 13) {
      let val = this.inputElementSearch.nativeElement.value;
      if (data.result) {
        if (val.toString().toLocaleLowerCase() === data.result[0].name.toString().toLocaleLowerCase())
          this.optionSelected(data.result[0]);
      }
    }
  }

}
