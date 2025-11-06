import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Droplets, Plus } from "lucide-react";
import RentLandModal from "@/components/RentLandModal";

const Farmland = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const farmlands = [
    {
      id: 1,
      name: "宜蘭礁溪優質農地",
      location: "宜蘭縣礁溪鄉",
      area: "500平方公尺",
      price: "NT$ 15,000/月",
      features: ["水源充足", "交通便利", "有機認證"],
      status: "可租用",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "台中后里平地農場",
      location: "台中市后里區",
      area: "800平方公尺",
      price: "NT$ 20,000/月",
      features: ["平坦地形", "灌溉系統", "停車空間"],
      status: "可租用",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "苗栗三義山坡農地",
      location: "苗栗縣三義鄉",
      area: "1200平方公尺",
      price: "NT$ 25,000/月",
      features: ["視野良好", "空氣清新", "果樹種植"],
      status: "已租用",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "花蓮壽豐有機農場",
      location: "花蓮縣壽豐鄉",
      area: "600平方公尺",
      price: "NT$ 18,000/月",
      features: ["有機認證", "無污染", "專業輔導"],
      status: "可租用",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop"
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('收到的表單資料:', data);
    alert('表單已送出！我們會盡快審核您的農地資訊。');
    setIsModalOpen(false);
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
              
              {/* 我要出租按鈕 */}
              <Button 
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="gap-2"
                type="button"
              >
                <Plus className="w-5 h-5" />
                我要出租
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {farmlands.map((land) => (
                <Card key={land.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={land.image}
                      alt={land.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{land.name}</CardTitle>
                      <Badge variant={land.status === "可租用" ? "default" : "secondary"}>
                        {land.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {land.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        面積：{land.area}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Droplets className="w-4 h-4" />
                        租金：{land.price}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {land.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={land.status === "已租用"}
                    >
                      {land.status === "可租用" ? "查看詳情" : "已租出"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* 彈出視窗元件 */}
      <RentLandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Farmland;