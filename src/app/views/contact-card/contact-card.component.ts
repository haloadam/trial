import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input() contact!: Partial<Contact>;
  @Input() showMenu!: boolean;
  @Output() removableContact = new EventEmitter<number>();
  public randomNumber: number = 0;

  ngOnInit(): void {
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
  }

  removeContact() {
    this.removableContact.emit(this.contact.id);
  }

  getRandomImage() {
    return `assets/avatar${this.randomNumber}.png`;
  }

  getRandomClass() {
    return `avatar-${this.randomNumber}`;
  }
}
