import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const Member = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">會員資訊</h1>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">高碩辰</h2>
                      <Button className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        編輯個人資料
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本資料</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">電子郵件</p>
                        <p className="font-medium">12156229@mss.scu.edu.tw</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">聯絡電話</p>
                        <p className="font-medium">0912-345-678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">地址</p>
                        <p className="font-medium">100 臺北市中正區貴陽街一段56號</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>租用記錄</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h3 className="font-semibold">宜蘭礁溪農地 - A區</h3>
                        <p className="text-sm text-muted-foreground">租期：2024/01 - 2024/12</p>
                        <p className="text-sm text-muted-foreground">面積：500平方公尺</p>
                      </div>
                      <div className="border-l-4 border-muted pl-4 py-2">
                        <h3 className="font-semibold">台中后里農地 - B區</h3>
                        <p className="text-sm text-muted-foreground">租期：2023/06 - 2024/05（已結束）</p>
                        <p className="text-sm text-muted-foreground">面積：300平方公尺</p>
                      </div>
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

export default Member;