import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, find, mergeMap, pluck, take, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import Character from '../models/Character';
import Info from '../models/info';

export interface DataResponse{
  characters:APIResponse<Character[]>;
  info:APIResponse<Info[]>;
}
export interface APIResponse<T>{
  results: T;
}

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private userSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.userSubject.asObservable();
  private userSubjectInfo = new BehaviorSubject<Info[]>([]);
  charactersInfo$ = this.userSubjectInfo.asObservable();

  constructor(
    private apollo: Apollo,
  ) { }


  getNames(name: string, page: number) {
    let q = gql`
    query {
      characters(page: ${page}, filter: { name: "${name}" }) {
        info {
          count
        }
        results {
          id
          name      
          image
          status
          gender
          species
        }
      }
    }
    `;
    this.apollo.watchQuery<any>({
      query: q
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters } = data;
        console.log(data);
        this.userSubject.next(characters.results);
        this.userSubjectInfo.next([characters.info]);
      })
    ).subscribe();
  }
}
