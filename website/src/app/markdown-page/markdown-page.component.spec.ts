import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPageComponent } from './markdown-page.component';

describe('MarkdownPageComponent', () => {
  let component: MarkdownPageComponent;
  let fixture: ComponentFixture<MarkdownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
