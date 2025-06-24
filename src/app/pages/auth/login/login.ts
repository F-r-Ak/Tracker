import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { PrimeInputTextComponent } from '../../../shared';
import { AccountService } from '../../../shared/services/account/account.service';
import { BaseEditComponent } from '../../../base/components/base-edit-component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, PrimeInputTextComponent],
    templateUrl: './login.html'
})
export class Login extends BaseEditComponent implements OnInit {
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
            Password: ['', Validators.required]
        });
    }

    checkUserPermission(role: any) {
        // return Helper.hasAccessRole(role);
    }

    login() {
        // this.formData = new FormData();
        // this.formData.append('Email', this.loginForm.value.Email);
        // this.formData.append('Password', this.loginForm.value.Password);

        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe({
                next: (res) => {
                   
                    localStorage.setItem('accessToken', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    console.log('post res: ', res);
                    this.alert.success('تم تسجيل الدخول بنجاح');
                    this.router.navigate(['/dashboard']);
                    // if(this.checkUserPermission(PagesEnums.ADMIN)||this.checkUserPermission(PagesEnums.SUPER)){
                    //   this.router.navigate(['/apexchart']);
                    // }
                    // else if(this.checkUserPermission(PagesEnums.ORG)){
                },
                error: (err) => {
                    console.log('post err: ', err);
                    if (err) {
                        this.alert.error('خطا في تسجيل البيانات لا يمكنك الدخول');
                    }
                }
            });
        }
    }
}
