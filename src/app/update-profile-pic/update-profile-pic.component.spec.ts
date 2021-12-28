import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePicComponent } from './update-profile-pic.component';

describe('UpdateProfilePicComponent', () => {
  let component: UpdateProfilePicComponent;
  let fixture: ComponentFixture<UpdateProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfilePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
