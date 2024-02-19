import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import Character from 'src/app/models/Character';
import { MainServiceService } from '../../services/main-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  dataSet: any = [
    77, 80, 82, 66, 64, 30, 77, 68, 77, 37, 71, 66, 12, 56, 19, 33, 94, 94, 74,
    72, 99, 67, 29, 33, 18, 36, 48, 98, 26, 15, 68, 5, 2, 88, 24, 44, 39, 13,
    94, 7, 73, 3, 72, 28, 15, 18, 8, 57, 6, 7, 11, 52, 86, 37, 55, 45, 8, 1, 0,
    14, 76, 97, 85, 88, 49, 32, 18, 36, 63, 10, 84, 65, 23, 43, 63, 77, 38, 95,
    67, 7, 68, 44, 67
  ];

  question: string = '';
  answer:any ;
  
  constructor(private mainService: MainServiceService) {}

  ngOnInit() {

  }

  consultaChat(){
    let objeto = {
      data: this.dataSet,
      question: this.question
    }
    this.mainService.enviaDataChatGPT(objeto).subscribe(data =>{
      this.answer = data;
    })
  }

}
