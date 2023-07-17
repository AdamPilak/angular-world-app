import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() backButton: boolean = false;
  @Input() navigate: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(destination: string): void {
    this.router.navigate([destination]);
    
  }

}
