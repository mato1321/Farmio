import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sprout, Droplets, Bug, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Knowledge = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: Sprout,
      title: "作物種植",
      description: "從選種到收成的完整栽培技術",
      color: "from-green-500 to-emerald-600",
      articles: [
        { id: "1", title: "水稻種植完整指南" },
        { id: "2", title: "蔬菜栽培技術" },
        { id: "3", title: "果樹管理要點" },
        { id: "4", title: "季節性作物選擇" }
      ]
    },
    {
      icon: Droplets,
      title: "灌溉與施肥",
      description: "水資源管理與土壤改良技術",
      color: "from-blue-500 to-cyan-600",
      articles: [
        { id: "5", title: "智慧灌溉系統介紹" },
        { id: "6", title: "有機肥料使用指南" },
        { id: "7", title: "土壤改良方法" },
        { id: "8", title: "水資源管理" }
      ]
    },
    {
      icon: Bug,
      title: "病蟲害防治",
      description: "識別與防治作物病蟲害",
      color: "from-red-500 to-orange-600",
      articles: [
        { id: "9", title: "常見病蟲害識別" },
        { id: "10", title: "生物防治技術" },
        { id: "11", title: "農藥安全使用" },
        { id: "12", title: "預防性管理策略" }
      ]
    },
    {
      icon: Wrench,
      title: "農機工具教學",
      description: "農機操作、保養與選購指南",
      color: "from-gray-600 to-slate-700",
      articles: [
        { id: "13", title: "常見農機具介紹" },
        { id: "14", title: "農機安全操作教學" },
        { id: "15", title: "日常保養與維修技巧" },
        { id: "16", title: "如何依作物選擇合適農機" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* 頁面標題區 */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                農業知識庫
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                探索農業技術資源，從栽培到管理，從理論到實務
              </p>
            </div>

            {/* 分類卡片 */}
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => {
                return (
                  <Card 
                    key={index} 
                    className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group"
                  >
                    {/* 卡片頭部 - 漸層背景（移除 icon）*/}
                    <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                      
                      <div className="relative">
                        <CardTitle className="text-2xl font-bold text-white mb-2">
                          {category.title}
                        </CardTitle>
                        <p className="text-white/90 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* 卡片內容 - 文章列表 */}
                    <CardContent className="p-6 bg-white">
                      <div className="space-y-2">
                        {category.articles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => navigate(`/knowledge/${article.id}`)}
                            className="w-full text-left p-4 rounded-lg hover:bg-green-50 transition-all duration-200 flex items-center justify-between group/item border border-transparent hover:border-green-200"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 group-hover/item:scale-150 transition-transform"></div>
                              <span className="text-foreground group-hover/item:text-green-600 font-medium transition-colors">
                                {article.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/item:text-green-600 group-hover/item:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
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