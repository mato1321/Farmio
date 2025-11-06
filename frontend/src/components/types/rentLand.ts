export interface RentLandFormData {
  // 基本資訊
  title: string;
  county: string;
  district: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  area: string;
  areaUnit: string;
  landNumber: string;
  
  // 土地狀況
  zoneType: string;
  landStatus: string[];
  currentCrop: string;
  
  // 設施與環境
  waterSource: string[];
  powerStatus: string;
  transportation: string;
  facilities: string[];
  surroundings: string[];
  
  // 租賃條件
  rentAmount: string;
  rentUnit: string;
  deposit: string;
  minLeaseTerm: string;
  utilitiesIncluded: string[];
  allowSubsidy: string;
  restrictions: string[];
  additionalNotes: string;
  
  // 聯絡方式
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: string;
  
  // 照片
  coverPhoto: File | null;
  photos: File[];
  documents: File[];
}