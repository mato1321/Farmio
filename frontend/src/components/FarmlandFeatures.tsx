import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "讓土地重新發揮價值",
    benefits: [
      "避免土地閒置、雜草叢生",
      "讓土地成為穩定收益來源",
      "提升地區農業活力"
    ]
  },
  {
    title: "增加退休與生活收入",
    benefits: [
      "出租農地即可獲得租金回饋",
      "老人家不必辛苦耕作也能有收入",
      "也可讓附近居民代為經營、管理土地"
    ]
  },
  {
    title: "安全透明、信任保障",
    benefits: [
      "系統提供合法契約模板與紀錄",
      "所有交易與收益皆可線上查詢",
      "平台審核租客身分，降低風險"
    ]
  },
  {
    title: "支持永續與在地農業",
    benefits: [
      "鼓勵環保、有機、綠能用途",
      "讓土地使用更具社會價值",
      "一同推動友善農業與循環經濟"
    ]
  }
];

const FarmlandFeatures = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          為甚麼要出租給你的？
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-secondary border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmlandFeatures;
