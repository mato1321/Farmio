import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Mail, User, FileText, Calendar } from "lucide-react";
import { getRentalById, RentalDetail } from "@/services/api";

const FarmlandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [farmland, setFarmland] = useState<RentalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadFarmlandDetail(parseInt(id));
    }
  }, [id]);

  const loadFarmlandDetail = async (rentalId: number) => {
    try {
      setLoading(true);
      const data = await getRentalById(rentalId);
      setFarmland(data);
      console.log('✅ 載入農地詳情成功:', data);
    } catch (error) {
      console.error('❌ 載入農地詳情失敗:', error);
      setError('找不到此農地資訊');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path: string | null) => {
    if (!path) {
      return "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop";
    }
    return `http://localhost:8000/${path.replace(/\\/g, '/')}`;
  };

  const handleContact = () => {
    if (farmland?.contact.phone) {
      window.location.href = `tel:${farmland.contact.phone}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-muted-foreground">載入中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !farmland) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center py-12">
              <h2 className="text-2xl font-bold mb-4">找不到農地資訊</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => navigate('/farmland')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回農地列表
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 取得封面照片
  const coverPhoto = farmland.photos.find(p => p.is_cover);
  // 取得其他照片
  const otherPhotos = farmland.photos.filter(p => !p.is_cover).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/farmland')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回農地列表
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* 左側：圖片區域 */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{farmland.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{farmland.location.county} {farmland.location.district}</span>
                      {farmland.location.address && <span>• {farmland.location.address}</span>}
                    </div>
                  </div>
                  <Badge className="bg-green-600">可租用</Badge>
                </div>

                <Card className="overflow-hidden">
                  <img
                    src={getImageUrl(coverPhoto?.photo_path || null)}
                    alt={farmland.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop";
                    }}
                  />
                </Card>

                {otherPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {otherPhotos.map((photo) => (
                      <Card key={photo.id} className="overflow-hidden">
                        <img
                          src={getImageUrl(photo.photo_path)}
                          alt={`照片 ${photo.sort_order}`}
                          className="w-full aspect-video object-cover hover:scale-105 transition-transform cursor-pointer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop";
                          }}
                        />
                      </Card>
                    ))}
                  </div>
                )}

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">土地資訊</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">土地面積</p>
                          <p className="font-semibold">{farmland.area} 坪</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">租金</p>
                          <p className="font-semibold text-green-600">
                            NT$ {parseInt(farmland.rent_amount).toLocaleString()} /月
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">土地使用分區</p>
                          <p className="font-semibold">{farmland.zone_type}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">刊登時間</p>
                          <p className="font-semibold">
                            {new Date(farmland.created_at).toLocaleDateString('zh-TW')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {farmland.land_statuses && farmland.land_statuses.length > 0 && (
                      <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-2">土地現況</p>
                        <div className="flex gap-2 flex-wrap">
                          {farmland.land_statuses.map((statusObj) => (
                            <Badge key={statusObj.id} variant="outline">
                              {statusObj.status}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 右側：聯絡資訊 */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">聯絡資訊</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">聯絡人</p>
                          <p className="font-semibold">{farmland.contact.name}</p>
                          <p className="text-sm text-muted-foreground">({farmland.contact.role})</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">聯絡電話</p>
                          <p className="font-semibold">{farmland.contact.phone}</p>
                        </div>
                      </div>

                      {farmland.contact.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <p className="text-sm text-muted-foreground">電子郵件</p>
                            <p className="font-semibold break-all">{farmland.contact.email}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={handleContact}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        立即聯絡
                      </Button>
                      {farmland.contact.email && (
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => window.location.href = `mailto:${farmland.contact.email}`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          發送郵件
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default FarmlandDetail;