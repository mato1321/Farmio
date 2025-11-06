import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RentLandModal from "@/components/RentLandModal";

const Hero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: any) => {
    console.log('收到的表單資料:', data);
    alert('表單已送出！我們會盡快審核您的農地資訊。');
    setIsModalOpen(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(/farm.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'high-quality'
        }}
      />
      
      {/* 半透明黑色遮罩，降低背景亮度 */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
          農地租用平台
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow-xl max-w-2xl mx-auto" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>
          我們結合經濟與AI，讓農地能夠被更有效率的使用，幫助農民朋友們提升生產力，同時促進農業資源的永續發展。
        </p>
        
        {/* 按鈕區域 */}
        <div className="flex flex-col gap-4 items-center">
          <Button 
            variant="default" 
            size="lg" 
            className="text-xl px-40 py-8 shadow-xl bg-amber-300 hover:bg-amber-400 text-gray-800 min-w-[300px]"
            onClick={() => navigate('/farmland')}
          >
            我要租地
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="lg" 
            className="text-xl px-40 py-8 shadow-xl bg-amber-300 hover:bg-amber-400 text-gray-800 min-w-[300px]"
            onClick={() => setIsModalOpen(true)}
          >
            我要出租
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 彈出視窗元件 */}
      <RentLandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default Hero;