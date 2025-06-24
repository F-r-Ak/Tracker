import { AttachmentDto } from '../attachment/attachment';
import { EnumDto } from '../enum/enum';
import { Lookup, SharedProperties } from '../shared/shared';

export interface OrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    nameAr: string;
    nameEn: string;
    address: string;
    phone: string;
    mobile: string;
    email: string;
    nationalityId: string;
    nationalityNameAr: string;
    nationalityNameEn: string;
    organizationTypeId: string;
    organizationType: EnumDto[];
    inspectionTypeId: string;
    inspectionType: EnumDto[];
    creationDate: string;
    commercialRegistrationNumber: string;
    webSiteAddress: string;
    touristMarinaNumber: number;
    organizationAttachments: AttachmentDto[];
}
export interface AddOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    nameAr: string;
    nameEn: string;
    address: string;
    phone: string;
    mobile: string;
    email: string;
    nationalityId: string;
    organizationTypeId: string;
    inspectionTypeId: string;
    creationDate: string;
    commercialRegistrationNumber: string;
    webSiteAddress: string;
    touristMarinaNumber: number;
    organizationAttachments: AttachmentDto[];
}

export interface UpdateOrganizationDto extends Lookup, Partial<SharedProperties> {
    id: string;
    nameAr: string;
    nameEn: string;
    address: string;
    phone: string;
    mobile: string;
    email: string;
    nationalityId: string;
    organizationTypeId: string;
    inspectionTypeId: string;
    creationDate: string;
    commercialRegistrationNumber: string;
    webSiteAddress: string;
    touristMarinaNumber: number;
    organizationAttachments: AttachmentDto[];
}
