import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { GovernatesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { GoogleMapsModule } from '@angular/google-maps'; // Import Google Maps module if needed
import { AddEditGovernateGeoPoint } from '../../components/add-edit-governate-geo-point/add-edit-governate-geo-point.component';

import { Timeline } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';

interface EventItem {
    mainTitle?: string;
    subTitle?: string;
    icon?: string;
    color?: string;
    image?: string;
    url?: string;
    code?: string;
    address?: string;
    map?: boolean;
    coords?: boolean;
    action?: true;
}

@Component({
    selector: 'app-governate-geo-points',
    imports: [RouterModule, GoogleMapsModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, Timeline, ButtonModule],

    templateUrl: './governate-geo-points.component.html',
    styleUrl: './governate-geo-points.component.scss'
})
export class GovernateGeoPoint extends BaseListComponent {
    tableOptions!: TableOptions;
    sideTableOptions!: TableOptions;
    service = inject(GovernatesService);
    formBuilder: FormBuilder = inject(FormBuilder);

    googleMap: Boolean = false;
    center: google.maps.LatLngLiteral = { lat: 24.086053859367915, lng: 32.907119283966175 };
    zoom = 12;
    markers = [
        { lat: 24.086053859367915, lng: 32.907119283966175 },
        { lat: 24.1042282507531, lng: 32.901104905159485 }
    ];

    // Example: If you want to use scaledSize as a property, declare it like this:
    scaledSize = new google.maps.Size(60, 60);
    
    //north - lat ,,, east - lang
    currentLocation: { lat: number; lng: number } = { lat: 24.100942734253373, lng: 32.90134858960123 };

    polygonPointsAswanGov = [
        { lat: 25.295852, lng: 32.678315 },
        { lat: 25.306819, lng: 33.459628 },
        { lat: 25.305746, lng: 33.460313 },
        { lat: 25.305459, lng: 33.460627 },
        { lat: 25.304985, lng: 33.460982 },
        { lat: 25.304679, lng: 33.461145 },
        { lat: 25.30418, lng: 33.461307 },
        { lat: 25.303571, lng: 33.461374 },
        { lat: 25.304875, lng: 33.461048 },
        { lat: 25.304883, lng: 33.461043 },
        { lat: 25.304569, lng: 33.461189 },
        { lat: 25.304156, lng: 33.461314 },
        { lat: 25.303731, lng: 33.461371 },
        { lat: 25.303431, lng: 33.461374 },
        { lat: 25.303217, lng: 33.461353 },
        { lat: 25.302762, lng: 33.461255 },
        { lat: 25.302519, lng: 33.461168 },
        { lat: 25.30221, lng: 33.461019 },
        { lat: 25.301919, lng: 33.460825 },
        { lat: 25.301524, lng: 33.460463 },
        { lat: 25.301349, lng: 33.460416 },
        { lat: 25.301093, lng: 33.4604 },
        { lat: 25.300915, lng: 33.460422 },
        { lat: 25.300617, lng: 33.460532 },
        { lat: 25.300377, lng: 33.460701 },
        { lat: 25.300248, lng: 33.460853 },
        { lat: 25.300123, lng: 33.461061 },
        { lat: 25.300031, lng: 33.461447 },
        { lat: 25.300049, lng: 33.461759 },
        { lat: 25.30017, lng: 33.462064 },
        { lat: 25.300345, lng: 33.462304 },
        { lat: 25.300476, lng: 33.462418 },
        { lat: 25.300767, lng: 33.462576 },
        { lat: 25.301623, lng: 33.464 },
        { lat: 25.303272, lng: 33.466749 },
        { lat: 25.303933, lng: 33.467846 },
        { lat: 25.30409, lng: 33.469635 },
        { lat: 25.304013, lng: 33.470928 },
        { lat: 25.303746, lng: 33.472269 },
        { lat: 25.302834, lng: 33.474073 },
        { lat: 25.301296, lng: 33.475315 },
        { lat: 25.299895, lng: 33.475781 },
        { lat: 25.297974, lng: 33.475921 },
        { lat: 25.296809, lng: 33.476356 },
        { lat: 25.295648, lng: 33.477187 },
        { lat: 25.295047, lng: 33.478195 },
        { lat: 25.294067, lng: 33.479134 },
        { lat: 25.292612, lng: 33.479819 },
        { lat: 25.291032, lng: 33.480488 },
        { lat: 25.289141, lng: 33.482625 },
        { lat: 25.287362, lng: 33.484283 },
        { lat: 25.284543, lng: 33.485675 },
        { lat: 25.283453, lng: 33.485931 },
        { lat: 25.28161, lng: 33.486124 },
        { lat: 25.28045, lng: 33.486587 },
        { lat: 25.279214, lng: 33.487457 },
        { lat: 25.277778, lng: 33.489516 },
        { lat: 25.276686, lng: 33.490637 },
        { lat: 25.275133, lng: 33.491224 },
        { lat: 25.273688, lng: 33.491152 },
        { lat: 25.272189, lng: 33.490599 },
        { lat: 25.26943, lng: 33.489614 },
        { lat: 25.265918, lng: 33.488336 },
        { lat: 25.264283, lng: 33.487773 },
        { lat: 25.261944, lng: 33.48797 },
        { lat: 25.260461, lng: 33.488711 },
        { lat: 25.259779, lng: 33.48913 },
        { lat: 25.255526, lng: 33.489432 },
        { lat: 25.253362, lng: 33.490174 },
        { lat: 25.252046, lng: 33.491429 },
        { lat: 25.250324, lng: 33.492247 },
        { lat: 25.248735, lng: 33.492472 },
        { lat: 25.243317, lng: 33.489995 },
        { lat: 25.240375, lng: 33.488298 },
        { lat: 25.237826, lng: 33.487903 },
        { lat: 25.236689, lng: 33.488133 },
        { lat: 25.234161, lng: 33.487631 },
        { lat: 25.232749, lng: 33.487073 },
        { lat: 25.230675, lng: 33.485758 },
        { lat: 25.225766, lng: 33.480365 },
        { lat: 25.225766, lng: 33.480365 },
        { lat: 25.223639, lng: 33.478087 },
        { lat: 25.219118, lng: 33.472242 },
        { lat: 25.217894, lng: 33.468617 },
        { lat: 25.212041, lng: 33.466095 },
        { lat: 25.210399, lng: 33.465712 },
        { lat: 25.207357, lng: 33.466227 },
        { lat: 25.206392, lng: 33.466021 },
        { lat: 25.204376, lng: 33.464942 },
        { lat: 25.202289, lng: 33.465167 },
        { lat: 25.199568, lng: 33.466545 },
        { lat: 25.19771, lng: 33.46686 },
        { lat: 25.196212, lng: 33.466369 },
        { lat: 25.194634, lng: 33.466606 },
        { lat: 25.191658, lng: 33.46622 },
        { lat: 25.191371, lng: 33.465876 },
        { lat: 25.190852, lng: 33.465769 },
        { lat: 25.190386, lng: 33.466011 },
        { lat: 25.190187, lng: 33.466499 },
        { lat: 25.186575, lng: 33.467867 },
        { lat: 25.184211, lng: 33.467872 },
        { lat: 25.18084, lng: 33.467689 },
        { lat: 25.177984, lng: 33.468238 },
        { lat: 25.17567, lng: 33.468229 },
        { lat: 25.172533, lng: 33.468106 },
        { lat: 25.171887, lng: 33.468589 },
        { lat: 25.170273, lng: 33.469394 },
        { lat: 25.16829, lng: 33.470549 },
        { lat: 25.167284, lng: 33.471322 },
        { lat: 25.166645, lng: 33.471661 },
        { lat: 25.164419, lng: 33.471658 },
        { lat: 25.16077, lng: 33.471475 },
        { lat: 25.159835, lng: 33.471074 },
        { lat: 25.1585, lng: 33.470865 },
        { lat: 25.157698, lng: 33.470451 },
        { lat: 25.156829, lng: 33.470414 },
        { lat: 25.155879, lng: 33.47091 },
        { lat: 25.154932, lng: 33.470867 },
        { lat: 25.153255, lng: 33.470268 },
        { lat: 25.151527, lng: 33.469199 },
        { lat: 25.149917, lng: 33.469487 },
        { lat: 25.14896, lng: 33.469267 },
        { lat: 25.147109, lng: 33.468636 },
        { lat: 25.146662, lng: 33.468813 },
        { lat: 25.145405, lng: 33.468351 },
        { lat: 25.144351, lng: 33.468303 },
        { lat: 25.142867, lng: 33.468474 },
        { lat: 25.141594, lng: 33.468113 },
        { lat: 25.141029, lng: 33.467533 },
        { lat: 25.140179, lng: 33.46749 },
        { lat: 25.13878, lng: 33.466596 },
        { lat: 25.13842, lng: 33.466161 },
        { lat: 25.138081, lng: 33.466048 },
        { lat: 25.137653, lng: 33.465694 },
        { lat: 25.137048, lng: 33.465293 },
        { lat: 25.136091, lng: 33.465374 },
        { lat: 25.134882, lng: 33.465472 },
        { lat: 25.134275, lng: 33.465563 },
        { lat: 25.13303, lng: 33.465402 },
        { lat: 25.13091, lng: 33.465757 },
        { lat: 25.129389, lng: 33.46602 },
        { lat: 25.128408, lng: 33.46601 },
        { lat: 25.12744, lng: 33.465845 },
        { lat: 25.125942, lng: 33.464271 },
        { lat: 25.125039, lng: 33.463193 },
        { lat: 25.123999, lng: 33.463055 },
        { lat: 25.121689, lng: 33.462749 },
        { lat: 25.118335, lng: 33.463221 },
        { lat: 25.1166, lng: 33.463185 },
        { lat: 25.113678, lng: 33.463289 },
        { lat: 25.110657, lng: 33.464897 },
        { lat: 25.109417, lng: 33.465699 },
        { lat: 25.10789, lng: 33.467089 },
        { lat: 25.10448, lng: 33.470227 },
        { lat: 25.099855, lng: 33.474433 },
        { lat: 25.097415, lng: 33.476071 },
        { lat: 25.096599, lng: 33.476543 },
        { lat: 25.095783, lng: 33.476457 },
        { lat: 25.094861, lng: 33.476854 },
        { lat: 25.094337, lng: 33.476682 },
        { lat: 25.093822, lng: 33.476779 },
        { lat: 25.093443, lng: 33.476972 },
        { lat: 25.093103, lng: 33.477187 },
        { lat: 25.092597, lng: 33.477498 },
        { lat: 25.0908, lng: 33.476994 },
        { lat: 25.088166, lng: 33.474903 },
        { lat: 25.086073, lng: 33.47337 },
        { lat: 25.085334, lng: 33.471857 },
        { lat: 25.083887, lng: 33.470795 },
        { lat: 25.082691, lng: 33.469261 },
        { lat: 25.080427, lng: 33.46856 },
        { lat: 25.07744, lng: 33.468711 },
        { lat: 25.073979, lng: 33.464677 },
        { lat: 25.026432, lng: 33.463344 },
        { lat: 25.021454, lng: 33.463945 },
        { lat: 25.019199, lng: 33.461971 },
        { lat: 25.017721, lng: 33.458795 },
        { lat: 25.016399, lng: 33.457422 },
        { lat: 25.014766, lng: 33.457078 },
        { lat: 25.013443, lng: 33.457851 },
        { lat: 25.011888, lng: 33.456735 },
        { lat: 25.008467, lng: 33.457153 },
        { lat: 25.00566, lng: 33.459287 },
        { lat: 25.007877, lng: 33.462849 },
        { lat: 25.009141, lng: 33.46523 },
        { lat: 25.00951, lng: 33.469243 },
        { lat: 25.009432, lng: 33.473728 },
        { lat: 25.005081, lng: 33.476329 },
        { lat: 25.004328, lng: 33.476517 },
        { lat: 25.003555, lng: 33.474543 },
        { lat: 25.002625, lng: 33.473014 },
        { lat: 25.001614, lng: 33.473395 },
        { lat: 25.000476, lng: 33.473668 },
        { lat: 24.998823, lng: 33.472016 },
        { lat: 24.998259, lng: 33.470278 },
        { lat: 24.995361, lng: 33.470278 },
        { lat: 24.992617, lng: 33.47114 },
        { lat: 24.987366, lng: 33.472341 },
        { lat: 24.985499, lng: 33.472213 },
        { lat: 24.983826, lng: 33.473736 },
        { lat: 24.982834, lng: 33.474916 },
        { lat: 24.975968, lng: 33.473049 },
        { lat: 24.935981, lng: 33.473124 },
        { lat: 24.913331, lng: 33.472952 },
        { lat: 24.912163, lng: 33.474068 },
        { lat: 24.891143, lng: 33.473982 },
        { lat: 24.71237, lng: 33.476416 },
        { lat: 24.598157, lng: 33.47774 },
        { lat: 24.59285, lng: 33.46641 },
        { lat: 24.581923, lng: 33.47362 },
        { lat: 24.580674, lng: 33.478083 },
        { lat: 24.55226, lng: 33.478083 },
        { lat: 24.301863, lng: 33.479539 },
        { lat: 24.085655, lng: 33.481479 },
        { lat: 24.063086, lng: 33.482166 },
        { lat: 23.920796, lng: 33.483417 },
        { lat: 23.776403, lng: 33.484632 },
        { lat: 23.628999, lng: 33.485959 },
        { lat: 23.338244, lng: 33.488307 },
        { lat: 23.15024, lng: 33.489875 },
        { lat: 22.940805, lng: 33.493699 },
        { lat: 22.675418, lng: 33.495485 },
        { lat: 22.000648, lng: 33.504053 },
        { lat: 22.001403, lng: 31.153298 },
        { lat: 22.10959, lng: 31.149521 },
        { lat: 22.145254, lng: 31.147652 },
        { lat: 22.187701, lng: 31.158124 },
        { lat: 22.197078, lng: 31.156235 },
        { lat: 22.219964, lng: 31.163789 },
        { lat: 22.252855, lng: 31.172887 },
        { lat: 22.287803, lng: 31.189709 },
        { lat: 22.315131, lng: 31.201428 },
        { lat: 22.336409, lng: 31.214989 },
        { lat: 22.344348, lng: 31.220139 },
        { lat: 22.400384, lng: 31.223057 },
        { lat: 22.425457, lng: 31.223744 },
        { lat: 22.431011, lng: 31.222714 },
        { lat: 22.435612, lng: 31.223057 },
        { lat: 22.43942, lng: 31.225632 },
        { lat: 22.445132, lng: 31.228207 },
        { lat: 22.450844, lng: 31.230267 },
        { lat: 22.460362, lng: 31.222886 },
        { lat: 22.464328, lng: 31.219109 },
        { lat: 22.470039, lng: 31.217736 },
        { lat: 22.483205, lng: 31.215676 },
        { lat: 22.499858, lng: 31.217049 },
        { lat: 22.56661, lng: 31.255845 },
        { lat: 22.598469, lng: 31.287259 },
        { lat: 22.626517, lng: 31.311291 },
        { lat: 22.638083, lng: 31.323994 },
        { lat: 22.639786, lng: 31.320861 },
        { lat: 22.659391, lng: 31.340345 },
        { lat: 22.672024, lng: 31.347426 },
        { lat: 22.686358, lng: 31.350044 },
        { lat: 22.697484, lng: 31.352662 },
        { lat: 22.709814, lng: 31.370033 },
        { lat: 22.718682, lng: 31.383122 },
        { lat: 22.725094, lng: 31.387843 },
        { lat: 22.737098, lng: 31.397936 },
        { lat: 22.746241, lng: 31.407334 },
        { lat: 22.754037, lng: 31.413858 },
        { lat: 22.761635, lng: 31.416433 },
        { lat: 22.767809, lng: 31.417634 },
        { lat: 22.774931, lng: 31.420209 },
        { lat: 22.780313, lng: 31.421582 },
        { lat: 22.785536, lng: 31.419437 },
        { lat: 22.788543, lng: 31.414458 },
        { lat: 22.791945, lng: 31.408536 },
        { lat: 22.797642, lng: 31.400468 },
        { lat: 22.801712, lng: 31.395032 },
        { lat: 22.803196, lng: 31.396298 },
        { lat: 22.805372, lng: 31.398508 },
        { lat: 22.808754, lng: 31.401834 },
        { lat: 22.811009, lng: 31.403979 },
        { lat: 22.813531, lng: 31.40635 },
        { lat: 22.816211, lng: 31.409076 },
        { lat: 22.822856, lng: 31.416242 },
        { lat: 22.825447, lng: 31.428548 },
        { lat: 22.826445, lng: 31.437497 },
        { lat: 22.823861, lng: 31.443326 },
        { lat: 22.822635, lng: 31.446931 },
        { lat: 22.82216, lng: 31.45487 },
        { lat: 22.822566, lng: 31.45605 },
        { lat: 22.82397, lng: 31.456747 },
        { lat: 22.826907, lng: 31.45752 },
        { lat: 22.829992, lng: 31.458314 },
        { lat: 22.851289, lng: 31.460008 },
        { lat: 22.903995, lng: 31.460394 },
        { lat: 22.911901, lng: 31.461595 },
        { lat: 22.920123, lng: 31.464514 },
        { lat: 22.984497, lng: 31.506056 },
        { lat: 22.998404, lng: 31.515154 },
        { lat: 23.014204, lng: 31.517385 },
        { lat: 23.034427, lng: 31.517729 },
        { lat: 23.053382, lng: 31.518072 },
        { lat: 23.099181, lng: 31.523222 },
        { lat: 23.128862, lng: 31.587423 },
        { lat: 23.141491, lng: 31.591543 },
        { lat: 23.167376, lng: 31.611799 },
        { lat: 23.249101, lng: 31.641668 },
        { lat: 23.338972, lng: 31.689047 },
        { lat: 23.451777, lng: 31.747755 },
        { lat: 23.693131, lng: 31.873754 },
        { lat: 23.947848, lng: 32.007307 },
        { lat: 25.099588, lng: 32.565213 },
        { lat: 25.105582, lng: 32.567739 },
        { lat: 25.105932, lng: 32.567763 },
        { lat: 25.106063, lng: 32.567857 },
        { lat: 25.106216, lng: 32.568139 },
        { lat: 25.106759, lng: 32.569629 },
        { lat: 25.107327, lng: 32.571158 },
        { lat: 25.107874, lng: 32.572722 },
        { lat: 25.109054, lng: 32.575326 },
        { lat: 25.113123, lng: 32.582352 },
        { lat: 25.118739, lng: 32.592904 },
        { lat: 25.123645, lng: 32.603868 },
        { lat: 25.126815, lng: 32.61152 },
        { lat: 25.131111, lng: 32.620406 },
        { lat: 25.140673, lng: 32.631577 },
        { lat: 25.154795, lng: 32.641139 },
        { lat: 25.157335, lng: 32.643899 },
        { lat: 25.155898, lng: 32.646646 },
        { lat: 25.16021, lng: 32.650465 },
        { lat: 25.161812, lng: 32.649655 },
        { lat: 25.162778, lng: 32.650937 },
        { lat: 25.163927, lng: 32.652678 },
        { lat: 25.164495, lng: 32.653869 },
        { lat: 25.16551, lng: 32.6547 },
        { lat: 25.167136, lng: 32.656358 },
        { lat: 25.169312, lng: 32.658241 },
        { lat: 25.171681, lng: 32.660236 },
        { lat: 25.173584, lng: 32.662377 },
        { lat: 25.174681, lng: 32.664244 },
        { lat: 25.174981, lng: 32.665168 },
        { lat: 25.174992, lng: 32.665156 },
        { lat: 25.175332, lng: 32.664915 },
        { lat: 25.175579, lng: 32.664582 },
        { lat: 25.175715, lng: 32.664271 },
        { lat: 25.175963, lng: 32.663579 },
        { lat: 25.176079, lng: 32.663002 },
        { lat: 25.176276, lng: 32.662334 },
        { lat: 25.176393, lng: 32.661803 },
        { lat: 25.176475, lng: 32.661527 },
        { lat: 25.176657, lng: 32.661194 },
        { lat: 25.177728, lng: 32.65944 },
        { lat: 25.178142, lng: 32.659326 },
        { lat: 25.178938, lng: 32.659051 },
        { lat: 25.179353, lng: 32.659074 },
        { lat: 25.179528, lng: 32.659182 },
        { lat: 25.179882, lng: 32.659431 },
        { lat: 25.181281, lng: 32.660413 },
        { lat: 25.181625, lng: 32.660595 },
        { lat: 25.182057, lng: 32.660643 },
        { lat: 25.182598, lng: 32.660654 },
        { lat: 25.183266, lng: 32.660656 },
        { lat: 25.184538, lng: 32.660769 },
        { lat: 25.184834, lng: 32.660881 },
        { lat: 25.185693, lng: 32.661219 },
        { lat: 25.186465, lng: 32.66141 },
        { lat: 25.187356, lng: 32.661469 },
        { lat: 25.187511, lng: 32.661407 },
        { lat: 25.18779, lng: 32.66111 },
        { lat: 25.188251, lng: 32.661549 },
        { lat: 25.188856, lng: 32.662003 },
        { lat: 25.190526, lng: 32.662749 },
        { lat: 25.192147, lng: 32.663602 },
        { lat: 25.192764, lng: 32.664187 },
        { lat: 25.192053, lng: 32.66631 },
        { lat: 25.191999, lng: 32.666964 },
        { lat: 25.198173, lng: 32.671749 },
        { lat: 25.199721, lng: 32.668625 },
        { lat: 25.200151, lng: 32.668614 },
        { lat: 25.200434, lng: 32.668894 },
        { lat: 25.200497, lng: 32.669173 },
        // Edfo
        { lat: 25.200764, lng: 32.669731 },
        { lat: 25.204793, lng: 32.673368 },
        // Start Aswan Water
        { lat: 25.205049, lng: 32.673616 },
        { lat: 25.205739, lng: 32.674155 },
        { lat: 25.20662, lng: 32.674826 },
        { lat: 25.207372, lng: 32.675424 },
        { lat: 25.207438, lng: 32.675475 },
        { lat: 25.207833, lng: 32.674912 },
        { lat: 25.208423, lng: 32.67407 },
        { lat: 25.209578, lng: 32.672525 },
        { lat: 25.210617, lng: 32.670894 },
        { lat: 25.2125, lng: 32.667912 },
        { lat: 25.21449, lng: 32.664468 },
        { lat: 25.215917, lng: 32.661721 },
        { lat: 25.217858, lng: 32.657773 },
        { lat: 25.218965, lng: 32.655112 },
        { lat: 25.220702, lng: 32.651089 },
        { lat: 25.222032, lng: 32.647785 },
        { lat: 25.224119, lng: 32.642807 },
        { lat: 25.225643, lng: 32.639159 },
        { lat: 25.22672, lng: 32.636466 },
        { lat: 25.22737, lng: 32.634911 },
        { lat: 25.227439, lng: 32.634523 },
        { lat: 25.228075, lng: 32.634858 },
        { lat: 25.229184, lng: 32.635435 },
        { lat: 25.230208, lng: 32.635971 },
        { lat: 25.229803, lng: 32.636634 },
        { lat: 25.22995, lng: 32.636757 },
        // End Aswan Water
        { lat: 25.230208, lng: 32.636945 },
        { lat: 25.230588, lng: 32.637224 },
        { lat: 25.230958, lng: 32.637488 },
        { lat: 25.231737, lng: 32.638049 },
        { lat: 25.232132, lng: 32.638282 },
        { lat: 25.233258, lng: 32.638792 },
        { lat: 25.24043, lng: 32.642225 },
        { lat: 25.247393, lng: 32.646093 },
        { lat: 25.249697, lng: 32.648405 },
        { lat: 25.248334, lng: 32.649725 },
        { lat: 25.248334, lng: 32.649725 },
        // Start Aswan Road
        { lat: 25.248242, lng: 32.649838 },
        // End Aswan Road
        { lat: 25.248252, lng: 32.649988 },
        { lat: 25.248339, lng: 32.650122 },
        { lat: 25.249722, lng: 32.650707 },
        { lat: 25.251284, lng: 32.651345 },
        { lat: 25.252681, lng: 32.651973 },
        { lat: 25.2542, lng: 32.652858 },
        { lat: 25.256752, lng: 32.654392 },
        { lat: 25.258518, lng: 32.65546 },
        { lat: 25.261793, lng: 32.657439 },
        { lat: 25.295852, lng: 32.678315 }
    ];

    options = {
        strokeColor: '#b51512', // Red line
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#b51512', // Optional: fill color
        fillOpacity: 0.35
    }; // Add this line to define the options property

    polygonPointsAswanGovOptions = {
        strokeColor: '#ffffff', // Red line
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#ffffff', // Optional: fill color
        fillOpacity: 0.25
    }; // Add this line to define the options property

    events!: EventItem[];
    governateInfo: any;

    constructor(activatedRoute: ActivatedRoute, googleText: GoogleMapsModule) {
        console.log('Google Maps Module: ', googleText);

        navigator.geolocation.getCurrentPosition((position) => {
            console.log('Current Position:', position.coords);
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;
        });

        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
        this.initializeSideTableOptions();

        this.googleMap = true;

        this.getGovernateInfo();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'v1/governorates/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/governorates/deletesoft'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SYSTEM-MANAGEMENT-SMART-TESTS',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['code', 'name', 'email']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'code',
                header: 'الكود',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'name',
                header: 'المحافظة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'الموقع الالكترونى',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'EDIT',
                icon: 'pi pi-file-edit',
                color: 'text-middle',
                allowAll: true
            },
            {
                name: 'DELETE',
                icon: 'pi pi-trash',
                color: 'text-error',
                allowAll: true,
                isDelete: true
            }
        ];
    }

    openAdd() {
        this.openDialog(AddEditGovernateGeoPoint, 'اضافة بيانات المحافظة', {
            pageType: 'add'
        });
    }

    openEdit() {
        let rowData;
        rowData = this.governateInfo;

        this.openDialog(AddEditGovernateGeoPoint, 'تعديل بيانات المحافظة', {
            pageType: 'edit',
            row: { rowData },
            googleMap: true
        });
    }

    initializeSideTableOptions() {
        this.sideTableOptions = {
            inputUrl: {
                getAll: 'v1/governorategeopoints/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/governorategeopoints/deletesoft'
            },
            inputCols: this.initializeSideTableColumns(),
            inputActions: this.initializeSideTableActions(),
            permissions: {
                componentName: 'SYSTEM-MANAGEMENT-SMART-TESTS',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['name', 'email']
        };
    }

    initializeSideTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'name',
                header: 'المحافظة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'الموقع الالكترونى',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeSideTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'EDIT',
                icon: 'pi pi-file-edit',
                color: 'text-middle',
                allowAll: true
            },
            {
                name: 'DELETE',
                icon: 'pi pi-trash',
                color: 'text-error',
                allowAll: true,
                isDelete: true
            }
        ];
    }

    getGovernateInfo() {
        this.service.governates().subscribe((gov: any) => {
            console.log('Governate Info:', gov);

            this.governateInfo = gov[0];

            this.events = [
                { mainTitle: 'بيانات المحافظة', subTitle: gov[0].name, image: 'aswanLogo.png', url: gov[0].url, code: gov[0].code, address: gov[0].address, icon: 'pi pi-home', color: '#B4E0F8', action: true },
                { mainTitle: 'الموقع و الحدود', subTitle: 'الخريطة', icon: 'pi pi-map-marker', color: '#AD0A0A', map: true },

                { mainTitle: 'الاحداثيات', subTitle: 'بعض النقاط', icon: 'pi pi-map', color: '#B4E0F8', coords: true }
            ];
        });
    }

    /* when leaving the component */
    override ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
