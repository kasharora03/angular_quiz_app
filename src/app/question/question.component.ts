import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone:true,
  imports: [CommonModule,FormsModule],
  styleUrls: ['./question.component.css']  // Changed to styleUrls for consistency
})
export class QuestionComponent implements OnInit {
  public quesList:any=[];
  public currQues:number=0;
  public points:number=0;
  counter=60;
  correctans:number=0;
  incorrectans:number=0;
  public name: string = "";

  constructor(private quesService: QuestionService) {}

  ngOnInit() {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.quesService.getQuestionJson().subscribe(
      res => {
        this.quesList=res.questions
        console.log(res.questions);
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  nextQuestion(){
    this.currQues++;
  }
  prevQuestion(){
    this.currQues--;
  }
  answer(currquesnumber:number,option:any){
    if(option.correct){
      this.points+=10;
      this.correctans++;
      this.currQues++; //to go to next ques
    }
    else{
      this.points-=10;
      this.incorrectans++;
      this.currQues++; //to go to next ques
    }
    }
  }

