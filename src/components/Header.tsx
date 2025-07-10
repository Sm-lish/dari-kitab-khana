
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cart: any[];
  onCartOpen: () => void;
}

const Header = ({ cart, onCartOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-teal-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <img 
              src="/lovable-uploads/b8506947-de07-433b-9b4a-e9946d6d1b78.png" 
              alt="خانه‌ی کتاب" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold gradient-text">خانه‌ی کتاب</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              خانه
            </Button>
            <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              دسته‌بندی‌ها
            </Button>
            <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              درباره ما
            </Button>
            <Button variant="ghost" className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              تماس
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* User Account */}
            <Button variant="outline" size="sm" className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50">
              <User className="w-4 h-4 ml-2" />
              حساب کاربری
            </Button>

            {/* Cart */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              سبد خرید
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -left-2 bg-teal-700 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden border-teal-200 text-teal-700">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" className="justify-start text-teal-700 hover:bg-teal-50">
                    خانه
                  </Button>
                  <Button variant="ghost" className="justify-start text-teal-700 hover:bg-teal-50">
                    دسته‌بندی‌ها
                  </Button>
                  <Button variant="ghost" className="justify-start text-teal-700 hover:bg-teal-50">
                    درباره ما
                  </Button>
                  <Button variant="ghost" className="justify-start text-teal-700 hover:bg-teal-50">
                    تماس
                  </Button>
                  <hr className="my-4" />
                  <Button variant="outline" className="justify-start border-teal-200 text-teal-700 hover:bg-teal-50">
                    <User className="w-4 h-4 ml-2" />
                    حساب کاربری
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
