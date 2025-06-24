import { EnumDto } from '../enum/enum';
import { Lookup, SharedProperties } from '../shared/shared';

export interface FloatingUnitOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    organizationId: string;
    organizationNameAr: string;
    organizationNameEn: string;
    organizationType: EnumDto[];
    floatingUnitId: string;
    floatingUnitNameAr: string;
    floatingUnitNameEn: string;
}
export interface AddFloatingUnitOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    organizationId: string;
    floatingUnitId: string;
}
export interface UpdateFloatingUnitOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    organizationId: string;
    floatingUnitId: string;
}
