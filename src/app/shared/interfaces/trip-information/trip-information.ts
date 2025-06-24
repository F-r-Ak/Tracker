import { Lookup, SharedProperties } from '../shared/shared';

export interface TripInformationDto extends Lookup, Partial<SharedProperties> {
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
export interface AddTripInformationDto extends Lookup, Partial<SharedProperties> {
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
export interface UpdateTripInformationDto extends Lookup, Partial<SharedProperties> {
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
