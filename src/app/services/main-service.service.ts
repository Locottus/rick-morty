import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';

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

  constructor(
    private apollo: Apollo,
  ) { }

  
  /**
   * changes the page number
   * @param page page to be changed
   */
   changePage(page: number) {
    this.pagination$.next(page);
  }
  
  /**
   * finds the first character in the list of characters
   * @param name name of the first iteration to find
   */
  findCharacter(name: string) {
    this.inputSearch$.next(name);
  }

}
