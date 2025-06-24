export interface AttachmentDto {
  id: string;
  fileId: string;
  fileName: string;
  extension: string;
  size: string;
  isPublic: boolean;
  url: string;
  attachmentDisplaySize: string;
}

export interface AddAttachmentDto {
  id: string;
  fileId: string;
  fileName: string;
  extension: string;
  size: string;
  isPublic: boolean;
  url: string;
  attachmentDisplaySize: string;
}

export interface UpdateAttachmentDto {
  id: string;
  fileId: string;
  fileName: string;
  extension: string;
  size: string;
  isPublic: boolean;
  url: string;
  attachmentDisplaySize: string;
}
