import { Link } from "wouter";
import { MessageCircle, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PortfolioCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  thumbnail: string;
  category: string;
  reviewCount: number;
  viewCount: number;
  rating?: number;
  featured?: boolean;
}

export function PortfolioCard({
  id,
  title,
  author,
  thumbnail,
  category,
  reviewCount,
  viewCount,
  rating,
  featured = false,
}: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${id}`} data-testid={`card-portfolio-${id}`}>
      <article className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
          {featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {title}
              </h3>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {category}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-card-foreground">{author.name}</span>
                  <span className="text-[10px] text-muted-foreground">{author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1 text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {reviewCount}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  {viewCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
