import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class DividerComponent { @Input() text!: string; }
