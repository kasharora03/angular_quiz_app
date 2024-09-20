import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from '../result/result.component';
import { interval } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultComponent, HeaderComponent],
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public quesList: any = [];
  public currQues: number = 0;
  counter = 30; // Set timer to 30 seconds
  correctans: number = 0;
  incorrectans: number = 0;
  points = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  public name: string = "";
  questionStatuses: string[] = [];
  selectedOption: any = {};
  public totalQuestions: number = 0;
  showAlert: boolean = false; // Alert visibility flag
  timeOutMessage: string = ""; // Message when time is out

  constructor(private quesService: QuestionService) {}

  ngOnInit() {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  goToQuestion(index: number) {
    this.currQues = index;
    this.updateProgress();
    this.resetCounter(); // Reset the timer when navigating to a question
  }

  getAllQuestions() {
    this.quesService.getQuestionJson().subscribe(
      res => {
        this.quesList = res.questions;
        this.totalQuestions = this.quesList.length;
        this.questionStatuses = Array(this.totalQuestions).fill('not-attempted');
        this.selectedOption = {};
        this.updateProgress();
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  selectOption(option: any) {
    this.selectedOption[this.currQues] = option;
    this.questionStatuses[this.currQues] = 'attempted';
    this.showAlert = false; // Hide alert when an option is selected

    // Update points based on selection
    if (option.correct) {
      this.points += 10;
      this.correctans++;
    } else {
      this.incorrectans++;
    }
  }

  saveAndNext() {
    if (this.selectedOption[this.currQues]) {
      this.showAlert = false; // Hide alert if option is selected
      this.questionStatuses[this.currQues] = 'completed';
      this.nextQuestion();
    } else {
      this.showAlert = true; // Show alert if no option selected
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 10 seconds
      }, 10000);
    }
  }

  reviewAndNext() {
    if (this.selectedOption[this.currQues]) {
      this.showAlert = false; // Hide alert if option is selected
      this.questionStatuses[this.currQues] = 'review';
      this.nextQuestion();
    } else {
      this.showAlert = true; // Show alert if no option selected
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 10 seconds
      }, 10000);
    }
  }

  nextQuestion() {
    if (this.currQues < this.quesList.length - 1) {
      this.currQues++;
      this.updateProgress();
      this.resetCounter(); // Reset timer for the next question
    } else {
      this.submitQuiz(); // Submit the quiz if it's the last question
    }
  }

  startCounter() {
    this.counter = 30; // Reset the counter at the start
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.questionStatuses[this.currQues] = 'not-attempted'; // Mark as unattempted
        if (this.isLastQuestion()) {
          this.timeOutMessage = "Out of time! Quiz submitted."; // Set timeout message for last question
          this.submitQuiz(); // Submit the quiz if it's the last question
        } else {
          this.nextQuestion(); // Go to the next question automatically
        }
      }
    });
    setTimeout(() => {
      this.stopCounter();
    }, 600000);
  }

  resetCounter() {
    this.counter = 30; // Reset the counter for the current question
  }

  stopCounter() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
    this.counter = 0;
  }

  updateProgress() {
    this.progress = ((this.currQues / this.quesList.length) * 100).toString();
}


  getNavBgClass(index: number): string {
    const status = this.questionStatuses[index];
    if (index === this.currQues && this.selectedOption[this.currQues]) {
      return 'bg-primary';
    }
    if (status === 'completed') {
      return 'bg-success';
    }
    if (status === 'review') {
      return 'bg-warning';
    }
    return 'bg-danger';
  }

  submitQuiz() {
    this.isQuizCompleted = true;
  }

  isLastQuestion() {
    return this.currQues === this.quesList.length - 1;
  }

  closeAlert() {
    this.showAlert = false; // Close alert manually
  }

  // New method to calculate unattempted questions
  getUnattemptedCount(): number {
    return this.questionStatuses.filter(status => status === 'not-attempted').length;
  }
}
