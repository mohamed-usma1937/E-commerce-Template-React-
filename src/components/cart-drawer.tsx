import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/store/useCartStore';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  children: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background/95 backdrop-blur-lg border-l-2">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge variant="default" className="rounded-full">
                {totalItems}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-120px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Start shopping to add items to your cart.
                </p>
              </div>
              <Button asChild className="rounded-xl">
                <Link to="/catalog">
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-card border border-border/50">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold text-primary mb-2">
                        ${item.price}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 p-0 rounded-full"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="h-7 w-7 p-0 rounded-full"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="h-7 w-7 p-0 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button asChild className="w-full rounded-xl h-12 text-base">
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full rounded-xl h-10"
                  >
                    <Link to="/cart">
                      View Cart Details
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}