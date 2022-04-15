import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, find, map, mergeMap, pluck, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import Character from '../models/Character';
import Info from '../models/Info';

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {

  private inputSearch$ = new BehaviorSubject<string>('');
  private pagination$ = new BehaviorSubject<number>(1);

  store$ = combineLatest([this.inputSearch$, this.pagination$]).pipe(switchMap(([name, page]) => {
    const query = gql`
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
    return this.apollo.watchQuery<any>({
      query: query
    }).valueChanges.pipe(
      take(1),
      map(({ data }) => ({
        info: {
          pages: Math.floor(data.characters.info.count / 20) + 1,
        },
        result: data.characters.results
      })),
      catchError(() => of({
        info: {
          pages: 1,
        },
        result: []
      }))
    );
  }));


  private chSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.chSubject.asObservable();
  private chSubjectInfo = new BehaviorSubject<Info[]>([]);
  charactersInfo$ = this.chSubjectInfo.asObservable();
  
  constructor(
    private apollo: Apollo,
  ) { }

  /**
   * finds the first character in the list of characters
   * @param name name of the first iteration to find
   * @returns 
   */
  findCharacter(name: string): Character {
    let character: Character = new Character();
    for (let i = 0; i < this.chSubject.value.length; i++) {
      if (name.toLocaleLowerCase() === this.chSubject.value[0].name.toLocaleLowerCase()) {
        character = this.chSubject.value[0];
        break;
      }
    }
    return character;
  }

  /**
   * gets the total count of characters to calculate pagination
   * @returns the total count of the list characters
   */
  getTotalCharacters(): number {
    return this.chSubjectInfo.value[0].count;
  }

  /**
   * gets the names of the characters.
   * @param name name of the character to retrieve
   * @param page number of page to fetch
   */
  getNames(name: string, page: number) {
    const q = gql`
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
