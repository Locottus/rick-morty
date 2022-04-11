import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, find, mergeMap, pluck, take, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import Character from '../models/Character';
import Info from '../models/Info';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private chSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.chSubject.asObservable();
  private chSubjectInfo = new BehaviorSubject<Info[]>([]);
  charactersInfo$ = this.chSubjectInfo.asObservable();

  constructor(
    private apollo: Apollo,
  ) { }


  /**
   * gets the names of the characters.
   * @param name name of the character to retrieve
   * @param page number of page to fetch
   */
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
        this.chSubject.next(characters.results);
        this.chSubjectInfo.next([characters.info]);
      })
    ).subscribe();
  }
}
