import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Eye, 
  MessageCircle, 
  Star, 
  Share2, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { CommentThread } from "@/components/CommentThread";
import { mockPortfolios, mockComments } from "@/lib/mockData";

export default function PortfolioDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const portfolio = mockPortfolios.find(p => p.id === params?.id);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [comments, setComments] = useState(mockComments);
  const [bookmarked, setBookmarked] = useState(false);

  if (!portfolio) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio not found</h1>
          <Link href="/portfolios">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolios
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: {
        name: "You",
        avatar: "",
        role: "Community Member",
        isExpert: false,
      },
      content,
      createdAt: new Date(),
      likes: 0,
      replies: [] as typeof mockComments[0]["replies"],
    };

    if (parentId) {
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { ...newComment, replies: undefined }],
          };
        }
        return comment;
      }));
    } else {
      setComments(prev => [newComment, ...prev]);
    }
  };

  const currentFile = portfolio.files?.[currentFileIndex];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <Link href="/portfolios">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolios
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/10] mb-4">
              {currentFile && (
                <img
                  src={currentFile.url}
                  alt={currentFile.name}
                  className="w-full h-full object-cover"
                  data-testid="image-portfolio-main"
                />
              )}

              {portfolio.files && portfolio.files.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentFileIndex(prev => Math.max(0, prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors disabled:opacity-50"
                    disabled={currentFileIndex === 0}
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentFileIndex(prev => Math.min(portfolio.files!.length - 1, prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors disabled:opacity-50"
                    disabled={currentFileIndex === portfolio.files.length - 1}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {portfolio.files.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFileIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentFileIndex 
                            ? "bg-white w-6" 
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        data-testid={`button-image-dot-${index}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {portfolio.files && portfolio.files.length > 1 && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {portfolio.files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFileIndex(index)}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentFileIndex
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <Separator className="my-8" />

            <CommentThread comments={comments} onAddComment={handleAddComment} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                <Badge variant="secondary" className="mb-4">
                  {portfolio.category}
                </Badge>

                <h1 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                  data-testid="text-portfolio-title"
                >
                  {portfolio.title}
                </h1>

                <p className="text-muted-foreground mb-6" data-testid="text-portfolio-description">
                  {portfolio.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {portfolio.viewCount.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    {portfolio.reviewCount} reviews
                  </span>
                  {portfolio.rating && (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {portfolio.rating}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => setBookmarked(!bookmarked)}
                    data-testid="button-bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                    {bookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2" data-testid="button-share">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Created by</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={portfolio.author.avatar} alt={portfolio.author.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {portfolio.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold" data-testid="text-author-name">{portfolio.author.name}</h4>
                    <p className="text-sm text-muted-foreground">{portfolio.author.role}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2" data-testid="button-view-profile">
                  <ExternalLink className="w-4 h-4" />
                  View Full Profile
                </Button>
              </div>

              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-6">
                <h3 
                  className="font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Want expert feedback?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get your portfolio reviewed by verified industry professionals.
                </p>
                <Button size="sm" className="w-full" data-testid="button-request-review">
                  Request Expert Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
