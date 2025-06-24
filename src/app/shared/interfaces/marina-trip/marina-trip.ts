import { Lookup, SharedProperties } from '../shared/shared';

export interface MarinaTripDto extends Lookup, Partial<SharedProperties> {
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
export interface AddMarinaTripDto extends Lookup, Partial<SharedProperties> {
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
export interface UpdateMarinaTripDto extends Lookup, Partial<SharedProperties> {
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
