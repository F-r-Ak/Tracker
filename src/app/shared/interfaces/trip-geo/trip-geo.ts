import { Lookup, SharedProperties } from '../shared/shared';

export interface TripGeoDto extends Lookup, Partial<SharedProperties> {
    id: string;
    nameAr: string;
    nameEn: string;
    code: string;
     tripInformationId:string,
    geoPointId:string
}
export interface AddTripGeoDto extends Lookup, Partial<SharedProperties> {
    tripInformationId:string,
    geoPointId:string
}
export interface UpdateTripGeoDto extends Lookup, Partial<SharedProperties> {
    id: string;
    nameAr: string;
    nameEn: string;
    code: string;
    licenseNumber: string;
    length: number;
    width: number;
    passengerNumber: number;
    roomNumber: number;
    manufactureYear: string;
    lastMaintenanceDate: string;
    nextMaintenanceDate: string;
    unitCategory: string;
    unitTypeId: string;
}
