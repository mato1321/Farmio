from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class LandRentalCreate(BaseModel):
    contact_name: str
    contact_phone: str
    contact_email: Optional[EmailStr] = None
    contact_role: str
    title: str
    county: str
    district: str
    address: Optional[str] = None
    area: str
    rent_amount: str
    zone_type: str
    land_status: List[str]
    cover_photo_path: Optional[str] = None
    photos_paths: Optional[List[str]] = []

class LandRentalResponse(LandRentalCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True