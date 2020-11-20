import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, bounceInLeft } from 'ng-animate';
import { HomeIcon } from "../shared/models/models";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 3 }
    }))]),
    trigger('bounceInLeft', [transition('* => *', useAnimation(bounceInLeft, {
      params: { timing : 2 }
    }))])
  ]
})
export class HomeComponent implements OnInit {
  fadeIn: any;
  bounceInLeft; any;
  supported: HomeIcon[] =  [
    {
      imageSrc: "assets/hpo_logo_stacked-white.svg",
      name: "Human Phenotype Ontology",
      dateAdded: "10/07/2020",
      link: "https://hpo.jax.org"
    },
    {
      imageSrc: "assets/maxo_logo_stacked-white.svg",
      name: "Medical Action Ontology",
      dateAdded: "10/07/2020",
      link: "https://github.com/monarch-initiative/MAxO"
    }
  ]
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  signupWithredirect(): void {
    const target = '/portal/dashboard'
    const redirect_uri = window.location.origin + target;
    this.auth.loginWithRedirect(  {
      redirect_uri: redirect_uri,
      appState: {target: target},
      screen_hint: "signup",
    });
  }

}
