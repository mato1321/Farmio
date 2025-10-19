import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.ico" 
                alt="Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-lg font-bold text-primary">Farmio</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/member" className="text-muted-foreground hover:text-primary transition-colors">
                  會員資料
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-muted-foreground hover:text-primary transition-colors">
                  討論區
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="text-muted-foreground hover:text-primary transition-colors">
                  知識庫
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">聯絡資訊</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: 12156229@mss.scu.edu.tw
              </li>
              <li className="text-muted-foreground">
                聯絡電話: 0912345678
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;