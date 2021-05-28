import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHotelsComponent } from './image-hotels.component';

describe('ImageHotelsComponent', () => {
  let component: ImageHotelsComponent;
  let fixture: ComponentFixture<ImageHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
