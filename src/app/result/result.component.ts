import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts'; // Import BaseChartDirective

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [BaseChartDirective], // Add BaseChartDirective here
})
export class ResultComponent implements OnInit {
  @Input() totalQuestions: number = 0;
  @Input() correctAnswers: number = 0;
  @Input() incorrectAnswers: number = 0;
  @Input() score: number = 0;
  @Input() unattemptedQuestions: number = 0;

  public attemptedData: number[] = [];
  public correctnessData: number[] = [];

  public attemptedLabels: string[] = ['Attempted', 'Unattempted'];
  public correctnessLabels: string[] = ['Correct', 'Incorrect'];

  ngOnInit() {
    this.attemptedData = [this.totalQuestions - this.unattemptedQuestions, this.unattemptedQuestions];
    this.correctnessData = [this.correctAnswers, this.incorrectAnswers];
  }
}
