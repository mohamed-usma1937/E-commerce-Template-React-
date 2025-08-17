import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product-card';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { cn } from '@/lib/utils';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get featured products
    const featured = productsData.filter(product => product.featured).slice(0, 4);
    setFeaturedProducts(featured);
  }, []);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $99"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your payment information is safe"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help when you need it"
    },
    {
      icon: ShoppingBag,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="rounded-full px-4 py-1">
                  🎉 New Products Available
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Discover the Latest
                  <span className="bg-gradient-primary bg-clip-text text-transparent block">
                    Tech Innovation
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Shop the newest and most innovative tech products from top brands. 
                  Quality guaranteed, fast shipping, and exceptional customer service.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-2xl h-12 px-8">
                  <Link to="/catalog">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl h-12 px-8">
                  View Categories
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-2">4.9/5</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">50K+</span> Happy Customers
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative z-10">
                <img
                  src="/api/placeholder/600/500"
                  alt="Hero Product"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "text-center p-6 rounded-2xl bg-gradient-card border border-border/50 transition-all duration-300 hover:shadow-lg hover:scale-105",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.slice(0, 6).map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog?category=${category.id}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:scale-105",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="rounded-full">
                    {category.productCount}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/categories">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the best products available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.images[0],
                  rating: product.rating,
                  reviews: product.reviews,
                  stock: product.stock,
                  tags: product.tags,
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild className="rounded-xl">
            <Link to="/catalog">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and tech news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-xl px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}