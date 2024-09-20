import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { WelcomecompComponent } from '../welcomecomp/welcomecomp.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [WelcomecompComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  welcomeMessage: string = "Welcome to Coding Quiz\nScroll Down to Start!";
  displayText: string = '';
  typingIndex: number = 0;
  typingSpeed: number = 100; // Adjust typing speed here

  ngOnInit() {
    this.startTypingEffect();
    window.scrollTo(0, 0); // Scroll to top on init
  }

  startTypingEffect() {
    const typingInterval = setInterval(() => {
      if (this.typingIndex < this.welcomeMessage.length) {
        const currentChar = this.welcomeMessage[this.typingIndex];

        // Check for line breaks
        if (currentChar === '\n') {
          this.displayText += '<br>'; // Add line break in HTML
        } else {
          this.displayText += currentChar; // Append current character
        }

        // Update the display text
        const welcomeTextElement = document.getElementById('welcome-text');
        if (welcomeTextElement) {
          welcomeTextElement.innerHTML = this.displayText; // Update the display text
        }

        this.typingIndex++;
      } else {
        clearInterval(typingInterval); // Stop when done
        this.hideCursor(); // Hide cursor when done
      }
    }, this.typingSpeed);
  }

  hideCursor() {
    const cursorElement = document.getElementById('cursor');
    if (cursorElement) {
      cursorElement.style.display = 'none'; // Hide cursor
    }
  }
}
