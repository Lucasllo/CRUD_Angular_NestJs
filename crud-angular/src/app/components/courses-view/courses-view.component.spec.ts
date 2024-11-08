import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsViewComponent } from './courses-view.component';

describe('CoursesViewComponent', () => {
  let component: PlaylistsViewComponent;
  let fixture: ComponentFixture<PlaylistsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
