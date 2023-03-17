import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, combineLatest, first, map, shareReplay, Subject, takeUntil } from 'rxjs';
import { CONTACT_FIELDS } from 'src/app/contants/constants';
import { Contact } from 'src/app/models/contact';
import { Field } from 'src/app/models/field';
import { ContactInfoService } from 'src/app/services/contact-info.service';

@Component({
  selector: 'app-contact-overview',
  templateUrl: './contact-overview.component.html',
  styleUrls: ['./contact-overview.component.scss']
})
export class ContactOverviewComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  public fields: Field[] = CONTACT_FIELDS;
  public contactForm: FormGroup;
  public searchTerm = '';
  public isError: boolean = false;
  private selectedTabIdx: number = 0;

  private displayedSampleContacts = new BehaviorSubject<Contact[]>([]);
  public displayedSampleContacts$ = this.displayedSampleContacts.asObservable();
  private displayedContacts = new BehaviorSubject<Partial<Contact>[]>([]);
  public displayedContacts$ = this.displayedContacts.asObservable().pipe(shareReplay(1));

  //Fallback data
  public sampleContacts = new BehaviorSubject<Contact[]>([]);
  private filteredSampleContacts = new BehaviorSubject<Contact[]>([]);
  private contacts = new BehaviorSubject<Partial<Contact>[]>([]);
  private filteredContacts = new BehaviorSubject<Partial<Contact>[]>([]);

  get showContactCount() {
    const isAddContactSelected = this.selectedTabIdx === 0;
    return isAddContactSelected && this.contactCount > 0;
  }

  get contactCount() {
    return this.contacts.getValue().length;
  }

  constructor(
    private contactInfoService: ContactInfoService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.contactInfoService.getSampleData().pipe(
      first(),
    ).subscribe({
      next: (list) => {
        this.isError = false;
        this.sampleContacts.next(list)
      },
      error: (error) => {
        this.isError = true;
        console.error('Error:', error);
      },
    })

    combineLatest([
      this.sampleContacts,
      this.filteredSampleContacts,
    ]).pipe(
      takeUntil(this.onDestroy$),
    ).subscribe(([sample, filteredSample]) => this.displayedSampleContacts.next(filteredSample ? filteredSample : sample));

    combineLatest([
      this.contacts,
      this.filteredContacts
    ]).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(([contacts, filteredContacts]) => this.displayedContacts.next(filteredContacts ? filteredContacts : contacts))
  }

  public searchContacts(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.sampleContacts.pipe(
      takeUntil(this.onDestroy$),
      map((list) => this.filterBySearchTerm(searchTerm, list))
    ).subscribe((filteredList: Contact[]) => this.filteredSampleContacts.next(filteredList));

    this.contacts.pipe(
      takeUntil(this.onDestroy$),
      map((list) => this.filterBySearchTerm(searchTerm, list as Contact[]))
    ).subscribe((filteredList: Contact[]) => this.filteredContacts.next(filteredList));
  }

  private filterBySearchTerm(searchTerm: string, list: Contact[]) {
    return list.filter(contact => contact.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  public addNewContact() {
    const contact: Partial<Contact> = {
      id: this.contacts.getValue().length,
      name: this.contactForm.get('name')?.value,
      phone: this.contactForm.get('phone')?.value,
      email: this.contactForm.get('email')?.value,
      address: { city: this.contactForm.get('city')?.value },
      company: { name: 'NASA' },
      website: 'www.google.com'
    }
    this.contacts.next([...this.contacts.getValue(), contact]);
  }

  tabChange(event: MatTabChangeEvent) {
    this.selectedTabIdx = event.index;
  }

  public removeContact(id: number) {
    const filteredArr = this.contacts.getValue().filter(contact => contact.id !== id);
    this.contacts.next(filteredArr);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.subscribe();
  }
}