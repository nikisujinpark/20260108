import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Upload, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Folio<span className="text-gradient">Review</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/portfolios" data-testid="link-portfolios">
              <span className={`text-sm font-medium transition-colors hover:text-primary ${location === '/portfolios' ? 'text-primary' : 'text-muted-foreground'}`}>
                Browse Portfolios
              </span>
            </Link>
            <Link href="/upload" data-testid="link-upload">
              <span className={`text-sm font-medium transition-colors hover:text-primary ${location === '/upload' ? 'text-primary' : 'text-muted-foreground'}`}>
                Upload Work
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/upload">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-upload-nav">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </Link>
            <Button size="sm" className="gap-2" data-testid="button-signin">
              <User className="w-4 h-4" />
              Sign In
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link href="/portfolios" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-sm font-medium text-muted-foreground hover:text-primary">Browse Portfolios</span>
              </Link>
              <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-sm font-medium text-muted-foreground hover:text-primary">Upload Work</span>
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-2 flex-1">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
                <Button size="sm" className="gap-2 flex-1">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
