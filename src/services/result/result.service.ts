import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private result: any;

  setResult(result: any) {
    this.result = result;
  }

  getResult() {
    return this.result;
  }
}
