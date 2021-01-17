import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show log in', () => {
    component.logged = false;
    fixture.detectChanges();
    const display = element.querySelector('app-login');
    expect(display).toBeTruthy();
  });

  it('should show log out', () => {
    component.logged = true;
    fixture.detectChanges();
    const display = element.querySelector('.nav-link');
    expect(display.textContent).toContain('Logout');
  });

  it('should have', () => {
    const display = element.querySelector('.navbar-brand');
    expect(display.textContent).toContain('Decide Bailon');
  });
});
