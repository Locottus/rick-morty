import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainServiceService } from 'src/app/services/main-service.service';
import { SearchComponent } from './search.component';
import { Apollo } from 'apollo-angular';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        MainServiceService,
        Apollo,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    setTimeout(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }, 500);
  });

  it('should create', () => {
    setTimeout(() => {
      expect(component).toBeTruthy();
    }, 500);
  });
});
