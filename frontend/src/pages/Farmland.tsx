import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus } from "lucide-react";
import RentLandModal from "@/components/RentLandModal";
import { getRentals, createRental } from "@/services/api";

interface Rental {
  id: number;
  title: string;
  contact_name: string;
  county: string;
  district: string;
  area: string;
  rent_amount: string;
  zone_type: string;
  land_status: string[];
  cover_photo_path: string | null;
  photos_paths: string[];
  created_at: string;
}

const Farmland = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [farmlands, setFarmlands] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 載入農地資料
  useEffect(() => {
    loadFarmlands();
  }, []);

  const loadFarmlands = async () => {
    try {
      setLoading(true);
      const data = await getRentals();
      setFarmlands(data);
      console.log('✅ 載入農地資料成功:', data);
    } catch (error) {
      console.error('❌ 載入農地資料失敗:', error);
      alert('載入資料失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    console.log('收到的表單資料:', data);
    
    setIsSubmitting(true);
    
    try {
      const result = await createRental(data);
      console.log('提交成功，伺服器回應:', result);
      alert(`✅ 表單已成功送出！\n\n租賃 ID: ${result.id}\n標題: ${result.title}\n\n我們會盡快審核您的農地資訊。`);
      setIsModalOpen(false);
      
      // 重新載入農地列表
      await loadFarmlands();
    } catch (error: any) {
      console.error('提交失敗:', error);
      alert(`❌ 提交失敗：${error.message}\n\n請檢查：\n1. 後端是否正在運行\n2. 所有必填欄位是否都已填寫\n3. 檔案大小是否過大`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 取得圖片 URL
  const getImageUrl = (path: string | null) => {
    if (!path) {
      return "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop";
    }
    return `http://localhost:8000/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">租用土地</h1>
                <p className="text-lg text-muted-foreground">
                  探索優質農地，開啟您的農業夢想
                </p>
              </div>
              
              <Button 
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="gap-2"
                type="button"
                disabled={isSubmitting}
              >
                <Plus className="w-5 h-5" />
                {isSubmitting ? '提交中...' : '我要出租'}
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-muted-foreground">載入中...</p>
              </div>
            ) : farmlands.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-muted-foreground mb-4">目前還沒有農地資料</p>
                <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                  <Plus className="w-5 h-5" />
                  成為第一個出租農地的人
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {farmlands.map((land) => (
                  <Card key={land.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getImageUrl(land.cover_photo_path)}
                        alt={land.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // 如果圖片載入失敗，使用預設圖片
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop";
                        }}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{land.title}</CardTitle>
                        <Badge variant="default">可租用</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {land.county} {land.district}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold">面積:</span> {land.area} 坪
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold">租金:</span> NT$ {parseInt(land.rent_amount).toLocaleString()} /月
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold">分區:</span> {land.zone_type}
                        </div>
                        {land.land_status.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold">現況:</span>
                            <div className="flex gap-1 flex-wrap">
                              {land.land_status.map((status, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {status}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/farmland/${land.id}`)}
                      >
                        查看詳情
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && farmlands.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                共 {farmlands.length} 筆農地資料
              </div>
            )}
          </div>
        </div>
      </main>
      
      <RentLandModal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Farmland;