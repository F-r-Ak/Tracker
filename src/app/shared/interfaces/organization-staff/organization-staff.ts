import { Lookup, SharedProperties } from '../shared/shared';
import { EnumDto } from '../enum/enum';

export interface OrganizationStaffDto extends Lookup, Partial<SharedProperties> {
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
    organizationId: string;
    organizationNameAr: string;
    organizationNameEn: string;
}
export interface AddOrganizationStaffDto extends Lookup, Partial<SharedProperties> {
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
    organizationId: string;
}
export interface UpdateOrganizationStaffDto extends Lookup, Partial<SharedProperties> {
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
    organizationId: string;
}
