import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule {
}
