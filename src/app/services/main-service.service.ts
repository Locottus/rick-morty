import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {

  url:string = "http://localhost:5000/postendpoint";

  constructor(
    private httpClient: HttpClient

  ) {}


  
  enviaDataChatGPT(chatData: any) {
    return this.httpClient.post(`${this.url}`, chatData).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      })
    )
    
  }


}
