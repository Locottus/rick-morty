import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(
    private http : HttpClient
  ) { }

  /*getData() {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }*/
  
}
