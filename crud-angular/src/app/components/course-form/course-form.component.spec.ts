import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFormComponent } from './course-form.component';

describe('CourseFormComponent', () => {
  let component: PlaylistFormComponent;
  let fixture: ComponentFixture<PlaylistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
