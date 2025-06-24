import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-prime-autocomplete',
  imports: [ AutoCompleteModule, FormsModule, ReactiveFormsModule],
  templateUrl: './p-autocomplete.component.html',
  styleUrl: './p-autocomplete.component.scss'
})
export class PrimeAutoCompleteComponent {
  @Input() formGroup!: FormGroup;
  @Input() selectedOption!: any;
  @Input() suggestions: any[] = [];
  @Input() dropdown: boolean = true;
  @Input() showClear: boolean = true;
  @Input() forceSelection: boolean = true;
  @Input() field!: any; // by default = name
  @Input() lazy: boolean = true;
  @Input() virtualScroll: boolean = true;
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() getMethod!: (body: any) => Observable<any[]>; // Function that accepts a body object
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();
  @Output() handleMethod: EventEmitter<any> = new EventEmitter();

  selectedCategoryTypes: any[] = [];
  selectedCategoryType: any;
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  isFirstLoad: boolean = true;
  query: string = '';
  searchSubject = new Subject<string>();
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(query => {
      this.query = query;
      this.loadData();
    });
  }

  get getBindLabel() {
    if (!this.field) {
      return 'name';
    }
    return this.field;
  }


  handleCompleteMethod(event: any) {
    if (this.lazy) {
      this.query = event.query;
      this.pageNumber = 1; // Reset page on new search
      this.loadData();
    }
    this.handleMethod.emit(event);
     
  }

  handleSelect(event: any) {
    this.onSelect.emit(event);
  }

  handleClear() {
    this.onClear.emit(event);
  }

  onLazyLoad(event: any) {
    console.log('onLazyLoad: ', event);
    // debugger
    const currentLoaded = event.first + event.last;
    console.log('this.suggestions.length: ', this.suggestions.length);

    if (currentLoaded >= this.suggestions.length && this.suggestions.length < this.totalCount && !this.isFirstLoad) {
      this.loadData();
    }
  }
  loadData() {
    if (this.isLoading) return;
    this.isLoading = true;
    const body = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      filter: { searchCriteria: this.query },
      orderBy: [{ col: 'id', sort: 'asc' }]
    };
    if (this.getMethod) {
      return this.getMethod(body).subscribe((response: any) => {
        this.totalCount = response.totalCount;
        if (this.pageNumber === 1) {
          this.suggestions = response.data;
        } else {
          this.suggestions = [...this.suggestions, ...response.data];
        }
        // No results found, inject a "No results" object
        if (this.suggestions.length === 0 && this.query.length > 0) {
          this.suggestions = [
            {
              name: 'لا يوجد بيانات',
            }
          ];
        }
        if (this.suggestions.length < this.totalCount) {
          this.pageNumber++;
        }
        this.isLoading = false;
        this.isFirstLoad = false;
      });
    }
    return;
  }
}
