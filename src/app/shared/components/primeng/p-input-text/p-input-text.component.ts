// import { NgClass } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InputTextModule } from 'primeng/inputtext';
// @Component({
//     selector: 'app-prime-input-text',
//     imports: [NgClass, FormsModule, ReactiveFormsModule, InputTextModule],
//     templateUrl: './p-input-text.component.html',
//     styleUrl: './p-input-text.component.scss'
// })
// export class PrimeInputTextComponent implements OnInit {
//   @Input() formGroup!: FormGroup;
//   @Input() controlName = '';
//   @Input() label = '';
//   @Input() validatorLanguageType = '';
//   @Input() inputType = 'textbox';
//   @Input() contentType = 'text';
//   @Input() appearance = 'outline';
//   @Input() readonly = false;

//   constructor() {}

//   ngOnInit(): void {
//     console.log('enter pInputText', this.formGroup.get(this.controlName)?.errors);
//   }
// }



import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SpecificLanguageDirective } from '../../../directives';
@Component({
    selector: 'app-prime-input-text',
    imports: [NgClass, FormsModule, ReactiveFormsModule, InputTextModule, SpecificLanguageDirective],
    templateUrl: './p-input-text.component.html',
    styleUrl: './p-input-text.component.scss'
})
export class PrimeInputTextComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() validatorLanguageType = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() appearance = 'outline';
  @Input() readonly = false;

  constructor() {}

  ngOnInit(): void {
    console.log('enter pInputText');
  }
}
