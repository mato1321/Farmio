import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          快速連結
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 h-32 text-xl flex flex-col gap-2"
            onClick={() => navigate('/forum')}
          >
            <MessageCircle className="w-8 h-8" />
            討論區
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 h-32 text-xl flex flex-col gap-2"
            onClick={() => navigate('/training')}
          >
            <GraduationCap className="w-8 h-8" />
            培訓區
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
