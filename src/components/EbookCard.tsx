
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Download, ShoppingCart, Eye } from "lucide-react";

interface EbookProps {
  ebook: {
    id: number;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    cover: string;
    description: string;
    category: string;
    rating: number;
    pages: number;
    language: string;
    format: string;
  };
  onAddToCart: (ebook: any) => void;
  isInCart: boolean;
}

const EbookCard = ({ ebook, onAddToCart, isInCart }: EbookProps) => {
  const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100);

  return (
    <Card className="book-card group overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-persian-100 to-persian-200 relative overflow-hidden">
          <img
            src={ebook.cover}
            alt={ebook.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white">
              {discount}% تخفیف
            </Badge>
          )}
          
          {/* Format Badge */}
          <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-persian-700">
            {ebook.format}
          </Badge>

          {/* Preview Button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          >
            <Eye className="w-4 h-4 ml-1" />
            پیش‌نمایش
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs border-persian-200 text-persian-600">
            {ebook.category}
          </Badge>
          <div className="flex items-center space-x-1 space-x-reverse">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{ebook.rating}</span>
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-persian-900 mb-1 line-clamp-2">
          {ebook.title}
        </CardTitle>
        
        <p className="text-sm text-persian-600 mb-2">نویسنده: {ebook.author}</p>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {ebook.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{ebook.pages} صفحه</span>
          <span>{ebook.language}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-2xl font-bold text-persian-600">
              ${ebook.price}
            </span>
            {ebook.originalPrice > ebook.price && (
              <span className="text-sm text-gray-400 line-through">
                ${ebook.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(ebook)}
          disabled={isInCart}
          className={`w-full ${
            isInCart 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-persian-600 hover:bg-persian-700 text-white"
          }`}
        >
          {isInCart ? (
            <>
              <Download className="w-4 h-4 ml-2" />
              در سبد خرید
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 ml-2" />
              افزودن به سبد
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EbookCard;
