import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthConfig, AuthModule } from "@auth0/auth0-angular";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const authConfig: AuthConfig  = {
    domain: "fake",
    clientId: "fake"
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AuthModule.forRoot(authConfig), NoopAnimationsModule, SharedModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
