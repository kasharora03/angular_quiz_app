import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomecompComponent } from './welcomecomp.component';

describe('WelcomecompComponent', () => {
  let component: WelcomecompComponent;
  let fixture: ComponentFixture<WelcomecompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomecompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
