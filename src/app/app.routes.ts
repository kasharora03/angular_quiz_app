import { Routes } from '@angular/router';
import { WelcomecompComponent } from './welcomecomp/welcomecomp.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    { path: "", redirectTo: 'welcome', pathMatch: "full" },
    { path: "welcome", component: WelcomecompComponent },
    { path: "question", component: QuestionComponent },
    { path: "header", component: HeaderComponent },
];
