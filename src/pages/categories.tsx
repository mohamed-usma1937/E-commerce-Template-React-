import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import categoriesData from '@/data/categories.json';
import categoriesHeroImage from '@/assets/categories-hero.jpg';
import { cn } from '@/lib/utils';

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img
            src={categoriesHeroImage}
            alt="Product categories"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of product categories and find exactly what you're looking for
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => (
            <Card
              key={category.id}
              className={cn(
                "group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:scale-105",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="rounded-full">
                      {category.productCount}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>{category.productCount} products available</span>
                  </div>
                  
                  <Button asChild className="w-full group/btn">
                    <Link to={`/catalog?category=${category.id}`}>
                      Browse Category
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {categoriesData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground">
              Categories will appear here once they are added to the system.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our complete product catalog or use our advanced search to find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-2xl h-12 px-8">
              <Link to="/catalog">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl h-12 px-8">
              <Link to="/catalog">
                Advanced Search
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}