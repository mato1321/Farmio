import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    comment: "我們提供優質田地多個選擇"
  },
  {
    rating: 5,
    comment: "我發現不了農業主地顧慮"
  },
  {
    rating: 5,
    comment: "平台提升介紹很棒喔！"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-accent border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-foreground">{testimonial.comment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
