import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string ="";
  public questionList:any = [];
  public currentQuestion:number=0;
  public points:number=0;
  counter = 20;
  correctAnswer:number = 0;
  inCorrectAnswer:number= 0;
  interval$:any;
  progress:string="0"
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })

  }
  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }
  answer(currentQno:number,option:any){
    if(option.correct){
      this.points+=20;
      this.correctAnswer++;
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();

    }else{
      this.currentQuestion++;
      this.inCorrectAnswer++;
      this.resetCounter(); 
      this.getProgressPercent();
      this.points-=10;
    }
  }
  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=20;
        this.points-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },300000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=20;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=20;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    console.log(this.progress);
    
    return this.progress;
  }
}
