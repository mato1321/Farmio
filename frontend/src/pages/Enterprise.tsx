import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Enterprise = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">企業合作資訊</h1>
              <p className="text-muted-foreground">
                與 Farmio 攜手合作，共創農業新未來
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    合作方案
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">企業包場方案</h3>
                      <p className="text-sm text-muted-foreground">
                        提供企業大面積農地租用，可用於團隊建設或是員工福利。
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">農產品採購合作</h3>
                      <p className="text-sm text-muted-foreground">
                        直接向農場採購新鮮有機農產品，建立穩定供應鏈。
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">品牌聯名合作</h3>
                      <p className="text-sm text-muted-foreground">
                        與 Farmio 品牌聯名，共同推廣永續農業理念。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>聯絡資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Farmio 農地租借平台</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">公司地址</p>
                      <p className="text-sm text-muted-foreground">
                        100 臺北市中正區貴陽街一段56號
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">聯絡電話</p>
                      <p className="text-sm text-muted-foreground">
                        02-2371-2482
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">電子郵件</p>
                      <p className="text-sm text-muted-foreground">
                        charleskao811@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>合作諮詢表單</CardTitle>
                <p className="text-sm text-muted-foreground">
                  填寫以下資訊，我們將在 24 小時內回覆您
                </p>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <div 
                    className="rounded-lg overflow-hidden border border-border"
                    style={{ 
                      position: 'relative',
                      height: '800px',
                      overflow: 'hidden'
                    }}
                  >
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://forms.office.com/Pages/ResponsePage.aspx?id=aUIlhtPkU0y8mGQHUlZtMWI77Tbe7oFBhppuvXOwa3FUMEhSM1NOSjNQNzgzMDNHUE1IQ01ISzg0QS4u&embed=true" 
                      frameBorder="0" 
                      marginWidth={0}
                      marginHeight={0}
                      style={{ 
                        border: 'none',
                        display: 'block',
                        width: '100%',
                        height: '100%'
                      }}
                      scrolling="yes"
                      allowFullScreen
                      title="Farmio 企業合作諮詢表單"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      如果表單無法正常顯示，請點擊下方按鈕在新視窗開啟
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=aUIlhtPkU0y8mGQHUlZtMWI77Tbe7oFBhppuvXOwa3FUMEhSM1NOSjNQNzgzMDNHUE1IQ01ISzg0QS4u', '_blank')}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      在新視窗開啟表單
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Enterprise;