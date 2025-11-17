import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface RentLandFormData {
  // 聯絡方式
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: string;
  
  // 基本資訊
  title: string;
  county: string;
  district: string;
  address: string;
  area: string;
  rentAmount: string;
  
  // 土地狀況
  zoneType: string;
  landStatus: string[];
  
  // 照片
  coverPhoto: File | null;
  photos: FileList | null;
}

interface RentLandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RentLandFormData) => void;
}

const RentLandModal: React.FC<RentLandModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RentLandFormData>({
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactRole: '地主本人',
    title: '',
    county: '',
    district: '',
    address: '',
    area: '',
    rentAmount: '',
    zoneType: '',
    landStatus: [],
    coverPhoto: null,
    photos: null,
  });

  const totalSteps = 4;

  if (!isOpen) return null;

  const handleChange = (field: keyof RentLandFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof RentLandFormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🎯 表單提交被觸發！');
    console.log('📝 表單資料:', formData);
    
    // ===== 驗證所有必填欄位 =====
    
    // 第一部分：聯絡方式
    if (!formData.contactName.trim()) {
      alert('❌ 請填寫稱謂/姓名');
      setCurrentStep(1);
      return;
    }
    
    if (!formData.contactPhone.trim()) {
      alert('❌ 請填寫聯絡電話');
      setCurrentStep(1);
      return;
    }
    
    // 第二部分：基本資訊
    if (!formData.title.trim()) {
      alert('❌ 請填寫物件標題');
      setCurrentStep(2);
      return;
    }
    
    if (!formData.county) {
      alert('❌ 請選擇縣市');
      setCurrentStep(2);
      return;
    }
    
    if (!formData.district.trim()) {
      alert('❌ 請填寫鄉鎮市區');
      setCurrentStep(2);
      return;
    }
    
    if (!formData.area.trim()) {
      alert('❌ 請填寫土地面積');
      setCurrentStep(2);
      return;
    }
    
    if (!formData.rentAmount.trim()) {
      alert('❌ 請填寫租金');
      setCurrentStep(2);
      return;
    }
    
    // 第三部分：土地狀況
    if (!formData.zoneType) {
      alert('❌ 請選擇土地使用分區');
      setCurrentStep(3);
      return;
    }
    
    if (formData.landStatus.length === 0) {
      alert('❌ 請至少選擇一個土地現況');
      setCurrentStep(3);
      return;
    }
    
    // 第四部分：照片上傳
    if (!formData.coverPhoto) {
      alert('❌ 請上傳封面照片');
      setCurrentStep(4);
      return;
    }
    
    console.log('✅ 驗證通過，準備提交');
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // 第一部分：聯絡方式
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第一部分：聯絡方式</h3>

            <div className="space-y-2">
              <Label htmlFor="contactName">稱謂 / 姓名 <span className="text-red-500">*</span></Label>
              <Input
                id="contactName"
                placeholder="例如：陳先生、林小姐、XX農場"
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
              />
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">聯絡電話 <span className="text-red-500">*</span></Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="請輸入手機或市話"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
              />
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">電子郵件</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="example@email.com"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactRole">出租人身份</Label>
              <Select value={formData.contactRole} onValueChange={(value) => handleChange('contactRole', value)}>
                <SelectTrigger id="contactRole">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="地主本人">地主本人</SelectItem>
                  <SelectItem value="地主代理人">地主代理人</SelectItem>
                  <SelectItem value="二房東/代管人">二房東/代管人</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        // 第二部分：基本資訊
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第二部分：基本資訊</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">物件標題 <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="例如：宜蘭員山｜方正美田，臨路有水電，適合有機耕作"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="county">縣市 <span className="text-red-500">*</span></Label>
                <Select value={formData.county} onValueChange={(value) => handleChange('county', value)}>
                  <SelectTrigger id="county">
                    <SelectValue placeholder="請選擇" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="台北市">台北市</SelectItem>
                    <SelectItem value="新北市">新北市</SelectItem>
                    <SelectItem value="桃園市">桃園市</SelectItem>
                    <SelectItem value="台中市">台中市</SelectItem>
                    <SelectItem value="台南市">台南市</SelectItem>
                    <SelectItem value="高雄市">高雄市</SelectItem>
                    <SelectItem value="宜蘭縣">宜蘭縣</SelectItem>
                    <SelectItem value="新竹縣">新竹縣</SelectItem>
                    <SelectItem value="苗栗縣">苗栗縣</SelectItem>
                    <SelectItem value="彰化縣">彰化縣</SelectItem>
                    <SelectItem value="南投縣">南投縣</SelectItem>
                    <SelectItem value="雲林縣">雲林縣</SelectItem>
                    <SelectItem value="嘉義縣">嘉義縣</SelectItem>
                    <SelectItem value="屏東縣">屏東縣</SelectItem>
                    <SelectItem value="花蓮縣">花蓮縣</SelectItem>
                    <SelectItem value="台東縣">台東縣</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">鄉鎮市區 <span className="text-red-500">*</span></Label>
                <Input
                  id="district"
                  placeholder="請輸入鄉鎮市區"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">詳細地址 / 鄰近地標</Label>
              <Input
                id="address"
                placeholder="例如：XX路123號旁、XX國小附近"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">土地面積 <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                <Input
                  id="area"
                  type="number"
                  placeholder="輸入面積"
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  className="flex-1"
                />
                <span className="flex items-center px-3 border rounded-md bg-gray-50">坪</span>
              </div>
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentAmount">租金 <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                <Input
                  id="rentAmount"
                  type="number"
                  placeholder="輸入金額"
                  value={formData.rentAmount}
                  onChange={(e) => handleChange('rentAmount', e.target.value)}
                  className="flex-1"
                />
                <span className="flex items-center px-3 border rounded-md bg-gray-50">元/月</span>
              </div>
              <p className="text-sm text-muted-foreground"></p>
            </div>
          </div>
        );

      case 3:
        // 第三部分：土地狀況
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第三部分：土地狀況</h3>

            <div className="space-y-2">
              <Label htmlFor="zoneType">土地使用分區 <span className="text-red-500">*</span></Label>
              <Select value={formData.zoneType} onValueChange={(value) => handleChange('zoneType', value)}>
                <SelectTrigger id="zoneType">
                  <SelectValue placeholder="請選擇" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="特定農業區">特定農業區</SelectItem>
                  <SelectItem value="一般農業區">一般農業區</SelectItem>
                  <SelectItem value="山坡地保育區">山坡地保育區</SelectItem>
                  <SelectItem value="森林區">森林區</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                  <SelectItem value="不清楚">不清楚</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <div className="space-y-2">
              <Label>土地現況 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 gap-3">
                {['目前耕作中', '休耕中', '荒地/需整理', '有雜草'].map(status => (
                  <div key={status} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50 cursor-pointer">
                    <Checkbox
                      id={status}
                      checked={formData.landStatus.includes(status)}
                      onCheckedChange={() => handleArrayToggle('landStatus', status)}
                    />
                    <label htmlFor={status} className="text-sm cursor-pointer flex-1">{status}</label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground"></p>
            </div>
          </div>
        );

      case 4:
        // 第四部分：照片上傳
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第四部分：照片上傳</h3>

            <div className="space-y-2">
              <Label htmlFor="coverPhoto">封面照片 <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Input
                  id="coverPhoto"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e) => handleChange('coverPhoto', e.target.files?.[0] || null)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {formData.coverPhoto ? `✅ 已選擇: ${formData.coverPhoto.name}` : '請選擇一張封面照片'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">農地實況照片（最多6張）</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="cursor-pointer"
                  onChange={(e) => handleChange('photos', e.target.files)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {formData.photos ? `✅ 已選擇 ${formData.photos.length} 張照片` : '請選擇農地照片（選填）'}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">我要出租農地</h2>
            <p className="text-sm text-muted-foreground mt-1">請填寫以下資訊，我們會盡快為您刊登</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="px-6 py-3 text-sm text-muted-foreground flex items-center justify-between bg-gray-50">
          <span className="font-medium">第 {currentStep} / {totalSteps} 步</span>
          <span className="text-xs">
            {currentStep === 1 && '聯絡方式'}
            {currentStep === 2 && '基本資訊'}
            {currentStep === 3 && '土地狀況'}
            {currentStep === 4 && '照片上傳'}
          </span>
        </div>

        {/* Form - 包住 Content 和 Footer */}
        <form onSubmit={handleSubmit} className="contents">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 p-6 border-t bg-gray-50">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePrev();
                }}
              >
                ← 上一步
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNext();
                }} 
                className="bg-green-600 hover:bg-green-700"
              >
                下一步 →
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                送出刊登
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentLandModal;