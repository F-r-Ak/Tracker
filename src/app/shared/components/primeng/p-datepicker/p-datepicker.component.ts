import { Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationHandlerPipe } from '../../../pipes';
import { formatDate, NgClass } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
// import { DateRangeValidatorDirective } from '../../../directives';

@Component({
  selector: 'app-prime-datepicker',
  standalone: true,
  imports: [
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    ValidationHandlerPipe,
    
  ],
  templateUrl: './p-datepicker.component.html',
  styleUrl: './p-datepicker.component.scss'
})
export class PrimeDatepickerComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Input() timeOnly = false;
  @Input() showTime = true;
  @Input() referenceControlName = '';

  @Input() set disabled(value: boolean) {
    if (this.formGroup && this.controlName) {
      const control = this.formGroup.get(this.controlName);
      if (control) {
        value ? control.disable() : control.enable();
      }
    }
  }

  @Input() label = 'Date';
  format: string = '';
  placeHolderValue: string = '';

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    this.setFormat();
    this.setPlaceholder();
    this.setupValidation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['formGroup'] || changes['controlName']) && this.formGroup && this.controlName) {
      const control = this.formGroup.get(this.controlName);
      if (control && control.disabled !== this.disabled) {
        this.disabled ? control.disable() : control.enable();
      }
    }

    if (changes['timeOnly'] || changes['showTime']) {
      this.setFormat();
      this.setPlaceholder();
    }

    if (changes['referenceControlName']) {
      this.setupValidation();
    }
  }

  private setupValidation(): void {
    if (this.formGroup && this.controlName && this.referenceControlName) {
      const control = this.formGroup.get(this.controlName);
      const referenceControl = this.formGroup.get(this.referenceControlName);

      if (control && referenceControl) {
        // Trigger validation when either date changes
        control.valueChanges.subscribe(() => {
          control.updateValueAndValidity({ emitEvent: false });
          referenceControl.updateValueAndValidity({ emitEvent: false });
        });

        referenceControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity({ emitEvent: false });
          referenceControl.updateValueAndValidity({ emitEvent: false });
        });
      }
    }
  }

  private setFormat(): void {
    if (this.timeOnly) {
      this.format = 'hh:mm aa';
    } else if (this.showTime) {
      this.format = 'dd/MM/yyyy hh:mm aa';
    } else {
      this.format = 'dd/MM/yyyy';
    }
  }

  private setPlaceholder(): void {
    if (this.formGroup?.get(this.controlName)?.value) {
      const dateValue = this.formGroup.get(this.controlName)?.value;
      const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      this.placeHolderValue = formatDate(dateObj, this.format, this.locale);
    } else {
      this.placeHolderValue = '';
    }
  }
}
