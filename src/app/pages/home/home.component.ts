import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(MatStepper) stepper?: MatStepper;

  steps: Gamedle[] = [
    {
      title: 'Wordle',
      src: 'https://wordlegame.org/',
    },
    {
      title: 'Heardle',
      src: 'https://www.heardle.app/',
    },
    {
      title: 'Worldle',
      src: 'https://worldle.teuteuf.fr/',
    },
    {
      title: 'Framed',
      src: 'https://framed.wtf/',
    },
  ];

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private title: Title,
    private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngAfterViewInit() {
    this.stepper?.selectionChange
      .pipe(
        map((selection) => selection.selectedIndex),
        startWith(0),
        map((index) => this.steps[index].title)
      )
      .subscribe((title) => this.title.setTitle(`Alldle - ${title}`));
  }
}

interface Gamedle {
  title: string;
  src: string;
}
