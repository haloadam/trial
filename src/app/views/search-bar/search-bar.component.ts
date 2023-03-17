import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() searchTerm = new EventEmitter<string>();
  public focused = false;
  public valueControl = new FormControl('');
  private onDestroy$ = new Subject<void>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private fm: FocusMonitor,
  ) { }

  ngOnInit(): void {
    this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => this.focused = !!origin);
    this.valueControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      debounceTime(200),
      startWith('')
    ).subscribe((searchTerm) => this.searchTerm.emit(searchTerm!));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.subscribe();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
