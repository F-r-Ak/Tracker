import { Lookup, SharedProperties } from '../shared/shared';
import { EnumDto } from '../enum/enum';

export interface MarinaOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    name: string;
    job: string;
    phone: string;
    mobile: string;
    email: string;
    gender: EnumDto[];
    idType: EnumDto[];
    identity: string;
    nationalityId: string;
    nationalityNameAr: string;
    nationalityNameEn: string;
    floatingUnitId: string;
    floatingUnitNameAr: string;
    floatingUnitNameEn: string;
}
export interface AddMarinaOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    name: string;
    job: string;
    phone: string;
    mobile: string;
    email: string;
    gender: EnumDto[];
    idType: EnumDto[];
    identity: string;
    nationalityId: string;
    floatingUnitId: string;
}
export interface UpdateMarinaOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    name: string;
    job: string;
    phone: string;
    mobile: string;
    email: string;
    gender: EnumDto[];
    idType: EnumDto[];
    identity: string;
    nationalityId: string;
    floatingUnitId: string;
}
