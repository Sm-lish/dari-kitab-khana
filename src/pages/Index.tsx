import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Download, Star, Search, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import EbookCard from "@/components/EbookCard";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import AnimatedBook3D from "@/components/AnimatedBook3D";

// Sample ebook data in Dari
const sampleEbooks = [
  {
    id: 1,
    title: "تاریخ افغانستان",
    author: "احمد علی کوهزاد",
    price: 15.99,
    originalPrice: 19.99,
    cover: "/placeholder.svg",
    description: "تاریخ کامل افغانستان از دوران باستان تا عصر حاضر",
    category: "تاریخ",
    rating: 4.8,
    pages: 350,
    language: "دری",
    format: "PDF"
  },
  {
    id: 2,
    title: "ادب کلاسیک فارسی",
    author: "دکتور محمد حسن",
    price: 12.99,
    originalPrice: 16.99,
    cover: "/placeholder.svg",
    description: "مجموعه‌ای از بهترین اشعار و نثر کلاسیک فارسی",
    category: "ادبیات",
    rating: 4.9,
    pages: 280,
    language: "دری",
    format: "EPUB"
  },
  {
    id: 3,
    title: "آشپزی سنتی افغانی",
    author: "فاطمه احمدی",
    price: 9.99,
    originalPrice: 12.99,
    cover: "/placeholder.svg",
    description: "دستور پخت غذاهای سنتی و محلی افغانستان",
    category: "آشپزی",
    rating: 4.7,
    pages: 200,
    language: "دری",
    format: "PDF"
  },
  {
    id: 4,
    title: "اقتصاد مدرن",
    author: "پروفیسور علی رضا",
    price: 18.99,
    originalPrice: 24.99,
    cover: "/placeholder.svg",
    description: "اصول اقتصاد مدرن و کاربرد آن در جهان امروز",
    category: "اقتصاد",
    rating: 4.6,
    pages: 420,
    language: "دری",
    format: "PDF"
  },
  {
    id: 5,
    title: "داستان‌های کوتاه",
    author: "نسرین احمد",
    price: 8.99,
    originalPrice: 11.99,
    cover: "/placeholder.svg",
    description: "مجموعه داستان‌های کوتاه معاصر",
    category: "داستان",
    rating: 4.5,
    pages: 150,
    language: "دری",
    format: "EPUB"
  },
  {
    id: 6,
    title: "علم و تکنولوژی",
    author: "دکتور کریم نوری",
    price: 21.99,
    originalPrice: 27.99,
    cover: "/placeholder.svg",
    description: "آخرین پیشرفت‌های علمی و تکنولوژیک",
    category: "علم",
    rating: 4.8,
    pages: 380,
    language: "دری",
    format: "PDF"
  }
];

const categories = ["همه", "تاریخ", "ادبیات", "آشپزی", "اقتصاد", "داستان", "علم"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (ebook: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === ebook.id);
      if (existing) {
        return prev;
      }
      return [...prev, { ...ebook, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredEbooks = sampleEbooks.filter(ebook => {
    const matchesSearch = ebook.title.includes(searchTerm) || ebook.author.includes(searchTerm);
    const matchesCategory = selectedCategory === "همه" || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-persian-50 to-orange-50">
      <Header cart={cart} onCartOpen={() => setIsCartOpen(true)} />
      
      {/* Hero Section with 3D Book */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-persian-600 via-persian-500 to-orange-500 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                خانه کتاب
              </h1>
              <p className="text-xl text-persian-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                هزاران کتاب الکترونیک در دسترس شما - از تاریخ و ادبیات تا علم و تکنولوژی
              </p>
              <div className="relative max-w-md mx-auto lg:mx-0">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="جستجوی کتاب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 py-3 text-lg border-2 border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:bg-white focus:text-gray-900 transition-all"
                />
              </div>
            </div>
            
            {/* 3D Animated Book */}
            <div className="flex justify-center lg:justify-start">
              <AnimatedBook3D />
            </div>
          </div>
        </div>
        
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: (Math.random() * 3 + 2) + 's'
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 transition-all ${
                  selectedCategory === category 
                    ? "bg-persian-600 hover:bg-persian-700 text-white" 
                    : "border-persian-200 text-persian-700 hover:bg-persian-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            کتاب‌های پیشنهادی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEbooks.map((ebook) => (
              <EbookCard
                key={ebook.id}
                ebook={ebook}
                onAddToCart={addToCart}
                isInCart={cart.some(item => item.id === ebook.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-persian-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">چرا ما را انتخاب کنید؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">کتاب الکترونیک</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-lg opacity-90">مشتری راضی</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">پشتیبانی</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/b8506947-de07-433b-9b4a-e9946d6d1b78.png" 
              alt="خانه کتاب" 
              className="w-8 h-8 ml-2 object-contain"
            />
            <span className="text-2xl font-bold">خانه کتاب</span>
          </div>
          <p className="text-gray-400 mb-6">
            بهترین کتاب‌های الکترونیک را با ما کشف کنید
          </p>
          <div className="text-sm text-gray-500">
            © 2024 خانه کتاب. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>

      <CartSheet
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default Index;
