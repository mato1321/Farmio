import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sprout, Droplets, Bug } from "lucide-react";

const Knowledge = () => {
  const categories = [
    {
      icon: Sprout,
      title: "作物種植",
      articles: [
        "水稻種植完整指南",
        "蔬菜栽培技術",
        "果樹管理要點",
        "季節性作物選擇"
      ]
    },
    {
      icon: Droplets,
      title: "灌溉與施肥",
      articles: [
        "智慧灌溉系統介紹",
        "有機肥料使用指南",
        "土壤改良方法",
        "水資源管理"
      ]
    },
    {
      icon: Bug,
      title: "病蟲害防治",
      articles: [
        "常見病蟲害識別",
        "生物防治技術",
        "農藥安全使用",
        "預防性管理策略"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold mb-4">知識庫</h1>
              <p className="text-lg text-muted-foreground">
                農業知識與實用技術資源中心
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.articles.map((article, idx) => (
                          <li key={idx}>
                            <a
                              href="#"
                              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {article}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Knowledge;
