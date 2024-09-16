import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public correctans: number = 0;
  public incorrectans: number = 0;
  public attempted: number = 0;
  public unattempted: number = 0;
  public totalPoints: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    this.correctans = state?.correctans || 0;
    this.incorrectans = state?.incorrectans || 0;
    this.attempted = state?.attempted || 0;
    this.unattempted = state?.unattempted || 0;
    this.totalPoints = state?.totalPoints || 0;
  }
}
