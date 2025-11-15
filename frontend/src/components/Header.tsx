import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  logoUrl?: string;
}

const Header = ({ logoUrl }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={logoUrl || "/logo.ico"} 
              alt="Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-primary">Farmio</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                首頁
              </Link>
              <Link to="/member" className="text-foreground hover:text-primary transition-colors">
                會員
              </Link>
              <Link to="/forum" className="text-foreground hover:text-primary transition-colors">
                討論區
              </Link>
              <Link to="/knowledge" className="text-foreground hover:text-primary transition-colors">
                知識庫
              </Link>
            </nav>
            
            <Button variant="ghost" className="gap-2 bg-gray-100 hover:bg-gray-200">
              <LogOut className="w-4 h-4" />
              登出
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;