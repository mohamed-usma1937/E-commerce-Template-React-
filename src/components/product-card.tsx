import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/20",
        className
      )}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition-all duration-300 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive" className="rounded-full text-xs">
                -{discount}%
              </Badge>
            )}
            {product.tags?.map((tag) => (
              <Badge
                key={tag}
                variant={tag === 'new' ? 'default' : 'secondary'}
                className="rounded-full text-xs capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleToggleLike}
              className={cn(
                "h-9 w-9 rounded-full p-0 backdrop-blur-sm",
                isLiked && "bg-red-500 text-white hover:bg-red-600"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-9 w-9 rounded-full p-0 backdrop-blur-sm"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-xl bg-primary/90 backdrop-blur-sm hover:bg-primary"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          {/* Stock indicator */}
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="warning" className="absolute bottom-3 right-3 rounded-full text-xs">
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive" className="rounded-full">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-foreground">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}