import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactOverviewComponent } from './contact-overview/contact-overview.component';
import { DividerComponent } from './divider/divider.component';
import { SearchBarModule } from './search-bar/search-bar.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ContactOverviewComponent,
    ContactCardComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    SearchBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    DividerComponent,
    MatMenuModule,
  ],
  exports: [ContactOverviewComponent]
})
export class SharedModule { }
