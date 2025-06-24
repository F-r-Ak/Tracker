import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('streetViewContainer', { static: false }) streetViewContainer!: ElementRef;
  streetView: any; // Use any for simplicity, consider a more specific type
  latitude: number = 37.7749; // Example latitude
  longitude: number = -122.4194; // Example longitude

  ngOnInit() {
    console.log('Google Maps Component Initialized');
    // this.loadStreetView();
  }

  loadStreetView() {
    const streetViewContainer = this.streetViewContainer.nativeElement;

    // this.streetView = new google.maps.StreetViewPanorama(
    //   streetViewContainer,
    //   {
    //     position: { lat: this.latitude, lng: this.longitude },
    //     pov: {
    //       heading: 0,
    //       pitch: 0
    //     }
    //   }
    // );

    // Optionally, you can add event listeners to the StreetViewPanorama
    this.streetView.addListener('position_changed', () => {
      // Handle position changes if needed
    });
  }

  // Function to change the POV to view from the east
  setViewFromEast() {
    this.streetView.setPov({
      heading: 90, // East
      pitch: 0
    });
  }
}