import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, MessageCircle, Users, Star, Sparkles } from "lucide-react";
import { PortfolioCard } from "@/components/PortfolioCard";
import { mockPortfolios } from "@/lib/mockData";
import heroBackground from "@assets/generated_images/abstract_portfolio_hero_background.png";

export default function Home() {
  const featuredPortfolios = mockPortfolios.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Where creativity meets feedback
            </Badge>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up"
            style={{ fontFamily: 'var(--font-display)', animationDelay: '0.1s' }}
          >
            Get{" "}
            <span className="text-gradient">professional feedback</span>
            {" "}on your creative work
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Upload your portfolio and receive constructive, threaded reviews from 
            industry professionals. Elevate your work through meaningful critique.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link href="/upload">
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-hero-upload">
                <Upload className="w-5 h-5" />
                Upload Your Portfolio
              </Button>
            </Link>
            <Link href="/portfolios">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8" data-testid="button-hero-browse">
                Browse Portfolios
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Upload Your Work
              </h3>
              <p className="text-muted-foreground">
                Share your portfolio with images, PDFs, and videos. Showcase your best projects.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Get Expert Reviews
              </h3>
              <p className="text-muted-foreground">
                Receive detailed, constructive feedback from verified industry professionals.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Join Discussions
              </h3>
              <p className="text-muted-foreground">
                Engage in threaded conversations and learn from community insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                Featured Work
              </Badge>
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Discover exceptional portfolios
              </h2>
            </div>
            <Link href="/portfolios">
              <Button variant="ghost" className="gap-2 hidden md:flex" data-testid="button-view-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPortfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} {...portfolio} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/portfolios">
              <Button variant="outline" className="gap-2">
                View All Portfolios
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to level up your portfolio?
          </h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
            Join thousands of designers, developers, and artists who use Folio Review 
            to get meaningful feedback and grow their skills.
          </p>
          <Link href="/upload">
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2 text-base px-8 bg-background text-foreground hover:bg-background/90"
              data-testid="button-cta-upload"
            >
              <Upload className="w-5 h-5" />
              Upload Your First Portfolio
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Folio<span className="text-gradient">Review</span>
            </span>
            <p className="text-sm text-muted-foreground">
              © 2026 Folio Review. Where creativity meets feedback.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
