import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../shared';
import { AccountService } from '../../../shared/services/account/account.service';
import { BaseEditComponent } from '../../../base/components/base-edit-component';
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, PrimeInputTextComponent],
    templateUrl: './register.html'
})
export class Register extends BaseEditComponent implements OnInit {
    email: string = '';
    password: string = '';
    formData: any;
    checked: boolean = false;
    loginForm!: FormGroup;
    auth = inject(AccountService);

    override ngOnInit(): void {
        super.ngOnInit();
        this.initFormGroup();
    }

    initFormGroup() {
        this.loginForm = this.fb.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required],
            Username: ['', Validators.required],
            RoleId: [null]
        });
    }
    checkUserPermission(role: any) {
        // return Helper.hasAccessRole(role);
    }

    register() {
        this.formData = new FormData();
        this.formData.append('Email', this.loginForm.value.Email);
        this.formData.append('Password', this.loginForm.value.Password);
        this.formData.append('Username', this.loginForm.value.Username);
        if (this.formData) {
            this.auth.register(this.formData).subscribe({
                next: (res) => {
                    this.alert.success('تم تسجيل مستخدم جديد بنجاح');
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    console.log('post err: ', err.status);
                    if (err.status==409) {
                        this.alert.error('م تتم أضافة مستخدم بنجاح و يرجى التحقق من الإيميل أو الدور المسند له');
                    }else{
                     this.alert.error('خطا في تسجيل مستخدم');

                    }
                }
            });
        }
    }
}
