from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Contact Schemas
class ContactBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    role: str

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Location Schemas
class LocationBase(BaseModel):
    county: str
    district: str
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class LocationCreate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id: int
    
    class Config:
        from_attributes = True


# Photo Schemas
class RentalPhotoBase(BaseModel):
    photo_path: str
    is_cover: bool = False
    sort_order: int = 0

class RentalPhotoResponse(RentalPhotoBase):
    id: int
    rental_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Land Status Schemas
class RentalLandStatusBase(BaseModel):
    status: str

class RentalLandStatusResponse(RentalLandStatusBase):
    id: int
    rental_id: int
    
    class Config:
        from_attributes = True


# Land Rental Schemas
class LandRentalCreate(BaseModel):
    # 聯絡資訊
    contact_name: str
    contact_phone: str
    contact_email: Optional[EmailStr] = None
    contact_role: str
    
    # 基本資訊
    title: str
    county: str
    district: str
    address: Optional[str] = None
    area: str
    rent_amount: str
    
    # 土地狀況
    zone_type: str
    land_status: List[str]
    
    # 照片
    cover_photo_path: Optional[str] = None
    photos_paths: Optional[List[str]] = []

class LandRentalResponse(BaseModel):
    id: int
    title: str
    area: str
    zone_type: str
    rent_amount: str
    created_at: datetime
    updated_at: datetime
    
    # 關聯資料
    contact: ContactResponse
    location: LocationResponse
    photos: List[RentalPhotoResponse]
    land_statuses: List[RentalLandStatusResponse]
    
    class Config:
        from_attributes = True

class LandRentalListResponse(BaseModel):
    """列表用的簡化回應"""
    id: int
    title: str
    contact_name: str
    county: str
    district: str
    area: str
    rent_amount: str
    zone_type: str
    land_status: List[str]
    cover_photo_path: Optional[str]
    photos_paths: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True