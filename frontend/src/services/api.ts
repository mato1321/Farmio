const API_BASE_URL = 'http://localhost:8000/api';

export interface RentLandFormData {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: string;
  title: string;
  county: string;
  district: string;
  address: string;
  area: string;
  rentAmount: string;
  zoneType: string;
  landStatus: string[];
  coverPhoto: File | null;
  photos: FileList | null;
}

export const createRental = async (formData: RentLandFormData) => {
  const formDataToSend = new FormData();
  
  // 新增文字欄位
  formDataToSend.append('contact_name', formData.contactName);
  formDataToSend.append('contact_phone', formData.contactPhone);
  formDataToSend.append('contact_email', formData.contactEmail || '');
  formDataToSend.append('contact_role', formData.contactRole);
  formDataToSend.append('title', formData.title);
  formDataToSend.append('county', formData.county);
  formDataToSend.append('district', formData.district);
  formDataToSend.append('address', formData.address || '');
  formDataToSend.append('area', formData.area);
  formDataToSend.append('rent_amount', formData.rentAmount);
  formDataToSend.append('zone_type', formData.zoneType);
  formDataToSend.append('land_status', JSON.stringify(formData.landStatus));
  
  // 新增檔案
  if (formData.coverPhoto) {
    formDataToSend.append('cover_photo', formData.coverPhoto);
  }
  
  if (formData.photos) {
    Array.from(formData.photos).forEach(photo => {
      formDataToSend.append('photos', photo);
    });
  }
  
  // 打印發送的資料（除錯用）
  console.log('📤 準備發送到後端的資料:');
  for (let [key, value] of formDataToSend.entries()) {
    if (value instanceof File) {
      console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/rentals`, {
      method: 'POST',
      body: formDataToSend,
    });
    
    if (!response.ok) {
      let errorMessage = '提交失敗';
      
      try {
        const errorData = await response.json();
        console.error('❌ API 錯誤詳情:', errorData);
        
        // 處理 FastAPI 的驗證錯誤格式
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Pydantic 驗證錯誤
            errorMessage = errorData.detail.map((err: any) => 
              `欄位 "${err.loc.join('.')}" 錯誤: ${err.msg}`
            ).join('\n');
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else {
            errorMessage = JSON.stringify(errorData.detail);
          }
        }
      } catch (e) {
        // 無法解析 JSON
        const text = await response.text();
        console.error('❌ 無法解析錯誤回應:', text);
        errorMessage = `HTTP ${response.status}: ${text}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('✅ API 回應成功:', result);
    return result;
    
  } catch (error) {
    console.error('❌ API 錯誤:', error);
    throw error;
  }
};

export const getRentals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rentals`);
    if (!response.ok) {
      throw new Error('取得資料失敗');
    }
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};

export const getRentalById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rentals/${id}`);
    if (!response.ok) {
      throw new Error('取得資料失敗');
    }
    return await response.json();
  } catch (error) {
    console.error('API 錯誤:', error);
    throw error;
  }
};