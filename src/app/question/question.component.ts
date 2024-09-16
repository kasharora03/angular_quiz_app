import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public quesList: any = [];
  public currQues: number = 0;
  counter = 60;
  correctans: number = 0;
  incorrectans: number = 0;
  points = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted:boolean=false;
  public name: string = "";
  questionStatuses: string[] = []; // Array to hold question statuses
  selectedOption: any = {}; // Track selected options for each question

  constructor(private quesService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.quesService.getQuestionJson().subscribe(
      res => {
        this.quesList = res.questions;
        this.questionStatuses = Array(this.quesList.length).fill('not-attempted'); // Initialize statuses
        this.selectedOption = {}; // Initialize selected options
        this.updateProgress();
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  nextQuestion() {
    if (this.currQues < this.quesList.length - 1) {
      this.currQues++;
      this.updateProgress();
    }
  }

  prevQuestion() {
    if (this.currQues > 0) {
      this.currQues--;
      this.updateProgress();
    }
  }

  selectOption(option: any) {
    // Track the selected option
    const prevOption = this.selectedOption[this.currQues];
    
    if (prevOption) {
      // Deduct points if the previously selected option was incorrect
      if (!prevOption.correct) {
        this.points -= 10;
        this.incorrectans--;
      }
    }
    
    // Update the selected option
    this.selectedOption[this.currQues] = option;
    
    // Add points if the newly selected option is correct
    if (option.correct) {
      this.points += 10;
      this.correctans++;
      // this.incorrectans--;
    } else {
      this.incorrectans++;
      // this.incorrectans++;
    }
    
    // Mark the question as attempted
    this.questionStatuses[this.currQues] = 'attempted';
    
    console.log(`Selected Option: ${option.text}, Is Correct: ${option.correct}`);
    console.log(`Points: ${this.points}, Correct Answers: ${this.correctans}, Incorrect Answers: ${this.incorrectans}`);
  }

  saveAndNext() {
    // Mark the question as completed and move to the next question
    this.questionStatuses[this.currQues] = 'completed';
    this.nextQuestion();
  }

  reviewAndNext() {
    // Mark the question as reviewed and move to the next question
    this.questionStatuses[this.currQues] = 'review';
    this.nextQuestion();
  }

  goToQuestion(index: number) {
    this.currQues = index;
    this.updateProgress();
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.saveAndNext(); // Move to next question when time is up
        this.counter = 60; // Reset the counter
      }
    });
    setTimeout(() => {
      this.stopCounter();
    }, 600000); // Stop counter after 10 minutes
  }

  stopCounter() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.startCounter();
    this.counter = 60;
  }

  resetQuiz() {
    this.getAllQuestions();
    this.resetCounter();
    this.counter = 60;
    this.currQues = 0;
    this.updateProgress();
  }

  updateProgress() {
    this.progress = ((this.currQues / this.quesList.length) * 100).toString();
  }

  getNavBgClass(index: number): string {
    const status = this.questionStatuses[index];
    if (index === this.currQues && this.selectedOption[this.currQues]) {
      return 'bg-primary'; // Blue for selected options
    }
    if (status === 'completed') {
      return 'bg-success'; // Green for completed questions
    }
    if (status === 'review') {
      return 'bg-warning'; // Yellow for reviewed questions
    }
    return 'bg-danger'; // Red for not attempted questions
  }

  submitQuiz() {
    // let attempted = 0;
    // let unattempted = 0;

    // this.questionStatuses.forEach(status => {
    //   if (status === 'completed' || status === 'review') {
    //     attempted++;
    //   } else if (status === 'not-attempted') {
    //     unattempted++;
    //   }
    // });

    // // Calculate the score based on selected options
    // this.correctans = 0;
    // this.incorrectans = 0;
    // this.points = 0;

    // this.quesList.forEach((question: any, index: number) => {
    //   if (this.selectedOption[index]) {
    //     if (this.selectedOption[index].correct) {
    //       this.correctans++;
    //       this.points += 10;
    //     } else {
    //       this.incorrectans++;
    //       this.points -= 10;
    //     }
    //   }
 
    // });
    this.isQuizCompleted=true;
    // console.log('Attempted:', attempted);
    // console.log('Unattempted:', unattempted);
    // console.log('Correct:', this.correctans);
    // console.log('Incorrect:', this.incorrectans);
    // console.log('Points:', this.points);

    // Navigate to result component with calculated data
    // this.router.navigate(['/result'], { 
    //   state: { 
    //     correctans: this.correctans,
    //     incorrectans: this.incorrectans,
    //     attempted: attempted,
    //     unattempted: unattempted,
    //     totalPoints: this.points // Pass total points to the result component
    //   }
    // });
  }

  isLastQuestion() {
    return this.currQues === this.quesList.length - 1;
  }
}
