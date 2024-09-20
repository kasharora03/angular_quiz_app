import { Component, OnInit, viewChild, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-welcomecomp',
  standalone: true,
  imports:[HeaderComponent],
  templateUrl: './welcomecomp.component.html',
  styleUrls: ['./welcomecomp.component.css']
})
export class WelcomecompComponent {
  constructor(private router: Router) {}
  @ViewChild('name') nameKey!:ElementRef;
 

  startQuiz() {
    console.log("Hello World");
    this.router.navigate(['/question']);
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }
}
