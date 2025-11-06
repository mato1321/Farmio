import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface RentLandFormData {
  // 基本資訊
  title: string;
  county: string;
  district: string;
  address: string;
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
}

interface RentLandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RentLandFormData) => void;
}

const RentLandModal: React.FC<RentLandModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RentLandFormData>({
    title: '',
    county: '',
    district: '',
    address: '',
    area: '',
    areaUnit: '分',
    landNumber: '',
    zoneType: '',
    landStatus: [],
    currentCrop: '',
    waterSource: [],
    powerStatus: '',
    transportation: '',
    facilities: [],
    surroundings: [],
    rentAmount: '',
    rentUnit: '元/年',
    deposit: '無',
    minLeaseTerm: '至少一年',
    utilitiesIncluded: [],
    allowSubsidy: '不清楚',
    restrictions: [],
    additionalNotes: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactRole: '地主本人',
  });

  const totalSteps = 6;

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
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第一部分：基本資訊</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">物件標題 <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="例如：宜蘭員山｜方正美田，臨路有水電，適合有機耕作"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
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
                  required
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">土地面積 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  id="area"
                  type="number"
                  placeholder="輸入面積"
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  required
                  className="col-span-2"
                />
                <Select value={formData.areaUnit} onValueChange={(value) => handleChange('areaUnit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="坪">坪</SelectItem>
                    <SelectItem value="分">分</SelectItem>
                    <SelectItem value="甲">甲</SelectItem>
                    <SelectItem value="平方公尺">平方公尺</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landNumber">
                地段 / 地號 <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">填寫可獲驗證標章</span>
              </Label>
              <Input
                id="landNumber"
                placeholder="例如：員山段 123-4 地號"
                value={formData.landNumber}
                onChange={(e) => handleChange('landNumber', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第二部分：土地狀況</h3>

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
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">? 這會影響可容許的農業活動</p>
            </div>

            <div className="space-y-2">
              <Label>土地現況 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 gap-3">
                {['目前耕作中', '休耕中', '荒地/需整理', '有雜草'].map(status => (
                  <div key={status} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50">
                    <Checkbox
                      id={status}
                      checked={formData.landStatus.includes(status)}
                      onCheckedChange={() => handleArrayToggle('landStatus', status)}
                    />
                    <label htmlFor={status} className="text-sm cursor-pointer">{status}</label>
                  </div>
                ))}
              </div>
            </div>

            {formData.landStatus.includes('目前耕作中') && (
              <div className="space-y-2">
                <Label htmlFor="currentCrop">目前種植作物</Label>
                <Input
                  id="currentCrop"
                  placeholder="例如：水稻、蔬菜、果樹"
                  value={formData.currentCrop}
                  onChange={(e) => handleChange('currentCrop', e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第三部分：設施與環境</h3>

            <div className="space-y-2">
              <Label>水源狀況 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 gap-3">
                {['灌溉溝渠', '井水', '自來水', '無'].map(source => (
                  <div key={source} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50">
                    <Checkbox
                      id={`water-${source}`}
                      checked={formData.waterSource.includes(source)}
                      onCheckedChange={() => handleArrayToggle('waterSource', source)}
                    />
                    <label htmlFor={`water-${source}`} className="text-sm cursor-pointer">{source}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="powerStatus">電力狀況 <span className="text-red-500">*</span></Label>
              <Select value={formData.powerStatus} onValueChange={(value) => handleChange('powerStatus', value)}>
                <SelectTrigger id="powerStatus">
                  <SelectValue placeholder="請選擇" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="有（農用電）">有（農用電）</SelectItem>
                  <SelectItem value="有（民生電）">有（民生電）</SelectItem>
                  <SelectItem value="無（可申請）">無（可申請）</SelectItem>
                  <SelectItem value="無（申請困難）">無（申請困難）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportation">交通狀況 <span className="text-red-500">*</span></Label>
              <Select value={formData.transportation} onValueChange={(value) => handleChange('transportation', value)}>
                <SelectTrigger id="transportation">
                  <SelectValue placeholder="請選擇" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="大貨車可達">大貨車可達</SelectItem>
                  <SelectItem value="小貨車可達">小貨車可達</SelectItem>
                  <SelectItem value="汽車可達">汽車可達</SelectItem>
                  <SelectItem value="僅機車或農機可達">僅機車或農機可達</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>地上物</Label>
              <div className="grid grid-cols-2 gap-3">
                {['有農舍（合法）', '有農舍（非法）', '有資材室', '有溫室/網室', '有圍籬', '空地'].map(facility => (
                  <div key={facility} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50">
                    <Checkbox
                      id={`facility-${facility}`}
                      checked={formData.facilities.includes(facility)}
                      onCheckedChange={() => handleArrayToggle('facilities', facility)}
                    />
                    <label htmlFor={`facility-${facility}`} className="text-sm cursor-pointer">{facility}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>周邊環境</Label>
              <div className="grid grid-cols-2 gap-3">
                {['鄰近住宅區', '鄰近其他農場（可交流）', '偏遠安靜', '有遮蔭（如林地邊）'].map(surrounding => (
                  <div key={surrounding} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50">
                    <Checkbox
                      id={`surrounding-${surrounding}`}
                      checked={formData.surroundings.includes(surrounding)}
                      onCheckedChange={() => handleArrayToggle('surroundings', surrounding)}
                    />
                    <label htmlFor={`surrounding-${surrounding}`} className="text-sm cursor-pointer">{surrounding}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第四部分：租賃條件</h3>

            <div className="space-y-2">
              <Label htmlFor="rentAmount">租金 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  id="rentAmount"
                  type="number"
                  placeholder="輸入金額"
                  value={formData.rentAmount}
                  onChange={(e) => handleChange('rentAmount', e.target.value)}
                  required
                  className="col-span-2"
                />
                <Select value={formData.rentUnit} onValueChange={(value) => handleChange('rentUnit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="元/月">元/月</SelectItem>
                    <SelectItem value="元/年">元/年</SelectItem>
                    <SelectItem value="元/每分地/年">元/每分地/年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit">押金 <span className="text-red-500">*</span></Label>
              <Select value={formData.deposit} onValueChange={(value) => handleChange('deposit', value)}>
                <SelectTrigger id="deposit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="無">無</SelectItem>
                  <SelectItem value="1個月租金">1個月租金</SelectItem>
                  <SelectItem value="2個月租金">2個月租金</SelectItem>
                  <SelectItem value="面議">面議</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minLeaseTerm">最短租期 <span className="text-red-500">*</span></Label>
              <Select value={formData.minLeaseTerm} onValueChange={(value) => handleChange('minLeaseTerm', value)}>
                <SelectTrigger id="minLeaseTerm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="至少一年">至少一年</SelectItem>
                  <SelectItem value="至少兩年">至少兩年</SelectItem>
                  <SelectItem value="可短租/試種">可短租/試種</SelectItem>
                  <SelectItem value="面議">面議</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>費用說明</Label>
              <div className="space-y-2">
                {['水費包含在租金內', '電費包含在租金內', '無水電'].map(utility => (
                  <div key={utility} className="flex items-center space-x-2">
                    <Checkbox
                      id={`utility-${utility}`}
                      checked={formData.utilitiesIncluded.includes(utility)}
                      onCheckedChange={() => handleArrayToggle('utilitiesIncluded', utility)}
                    />
                    <label htmlFor={`utility-${utility}`} className="text-sm cursor-pointer">{utility}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowSubsidy">可否申請農業補助</Label>
              <Select value={formData.allowSubsidy} onValueChange={(value) => handleChange('allowSubsidy', value)}>
                <SelectTrigger id="allowSubsidy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="可">可</SelectItem>
                  <SelectItem value="否">否</SelectItem>
                  <SelectItem value="不清楚">不清楚</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">? 這對許多農民很重要，牽涉到休耕補助</p>
            </div>

            <div className="space-y-2">
              <Label>使用限制（不允許的項目）</Label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  '不可搭建溫室/網室',
                  '不可搭建資材室',
                  '不可養殖（雞鴨、豬、魚）',
                  '不可使用除草劑/化肥',
                  '不可回填廢土或營建廢棄物',
                  '不可作為露營區'
                ].map(restriction => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={`restriction-${restriction}`}
                      checked={formData.restrictions.includes(restriction)}
                      onCheckedChange={() => handleArrayToggle('restrictions', restriction)}
                    />
                    <label htmlFor={`restriction-${restriction}`} className="text-sm cursor-pointer">{restriction}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">補充說明</Label>
              <Textarea
                id="additionalNotes"
                rows={4}
                placeholder="請描述您的農地特色、優點，或任何您想讓承租者知道的資訊..."
                value={formData.additionalNotes}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第五部分：聯絡方式</h3>

            <div className="space-y-2">
              <Label htmlFor="contactName">稱謂 / 姓名 <span className="text-red-500">*</span></Label>
              <Input
                id="contactName"
                placeholder="例如：陳先生、林小姐、XX農場"
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">聯絡電話 <span className="text-red-500">*</span></Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="請輸入手機或市話"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                required
              />
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

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2">第六部分：照片上傳</h3>

            <div className="space-y-2">
              <Label htmlFor="coverPhoto">封面照片 <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Input
                  id="coverPhoto"
                  type="file"
                  accept="image/*"
                  required
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-2">? 上傳一張最能代表您農地的照片</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">農地實況照片（最多6張）</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-2">?? 包含全景、水源、電力、道路、地上物等</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">
                地籍圖 / 權狀 <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">上傳後獲驗證標章</span>
              </Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Input
                  id="documents"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-2">? 提高可信度（選填）</p>
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
          <h2 className="text-2xl font-bold">? 我要出租農地</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="px-6 py-2 text-sm text-muted-foreground text-right">
          第 {currentStep} / {totalSteps} 步
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {renderStep()}
        </form>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t bg-gray-50">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={handlePrev}>
              ← 上一步
            </Button>
          )}
          <div className="flex-1" />
          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNext}>
              下一步 →
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              ? 送出刊登
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentLandModal;