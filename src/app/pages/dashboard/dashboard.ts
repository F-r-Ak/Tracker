import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CarouselModule, CommonModule],
    template: `
        <p-carousel [value]="tutorials" [autoplayInterval]="5000">
            <ng-template let-item pTemplate="item">
                <!-- <div class="landingPhoto">
                    <h1 class="animated-title">
                        <span>S</span><span>o</span><span>n</span><span>o</span>
                        <span>&nbsp;</span>
                        <span>T</span><span>r</span><span>a</span><span>c</span><span>k</span><span>e</span><span>r</span>
                    </h1>
                </div> -->

                <div [class]="item.mainClass">
                    <h1 [class]="item.subClass">
                        <span>S</span><span>o</span><span>n</span><span>o</span>
                        <span>&nbsp;</span>
                        <span>T</span><span>r</span><span>a</span><span>c</span><span>k</span><span>e</span><span>r</span>
                    </h1>

                    <p [class]="item.paragraphClass" *ngIf="item.paragraph">
                        {{ item.paragraphText }}
                    </p>
                </div>
            </ng-template>
        </p-carousel>
   
        <!-- <div class="landingPhoto">
            <h1 class="animated-title">
                <span>S</span><span>o</span><span>n</span><span>o</span>
                <span>&nbsp;</span>
                <span>T</span><span>r</span><span>a</span><span>c</span><span>k</span><span>e</span><span>r</span>
            </h1>
        </div> -->

    `
})
export class Dashboard {
    tutorials!: any[];
    ngOnInit() {
        this.tutorials = [
            {
                mainClass: 'landingPhoto',
                subClass: 'animated-title',
                paragraph: false,
                paragraphClass: '',
                paragraphText: ''
            },
            {
                mainClass: 'aboutPhoto',
                subClass: 'animated-title rightText',
                paragraph: true,
                paragraphClass: 'rightText introduction',
                paragraphText:
                    'مشروع التتبع يهدف إلى توفير معلومات عن الوحدات العائمة (فندق سيــــاحى عائم - ذهبية .... )   بنهر النيل تستند عليها القيادات فى إتخاذ القرارات المناسبة فى حال وجود مخالفة أو حادثة من خلال تتبع مسار الوحــدة العائمــة بحيث يتـــم رسم مســـــار كل رحــــلة وحفظها داخل قاعدة البيانات ليتم الرجوع إليه وقــــــت الحـــاجة من قبل المسئولين .'
            }
        ];
    }
}
