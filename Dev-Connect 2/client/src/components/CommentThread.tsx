import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, ChevronDown, ChevronUp, Reply, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
    isExpert?: boolean;
  };
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

interface CommentThreadProps {
  comments: Comment[];
  onAddComment?: (content: string, parentId?: string) => void;
}

function SingleComment({
  comment,
  depth = 0,
  onReply,
}: {
  comment: Comment;
  depth?: number;
  onReply?: (commentId: string, content: string) => void;
}) {
  const [showReplies, setShowReplies] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSubmitReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 pl-4 border-l-2 border-border/50' : ''}`}>
      <div className="py-4">
        <div className="flex gap-3">
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {comment.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm" data-testid={`text-comment-author-${comment.id}`}>
                {comment.author.name}
              </span>
              {comment.author.isExpert && (
                <Badge variant="secondary" className="text-[10px] py-0 px-1.5 bg-primary/10 text-primary border-0">
                  Expert Reviewer
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {comment.author.role}
              </span>
              <span className="text-xs text-muted-foreground">
                · {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>

            <p className="text-sm text-foreground/90 mt-2 leading-relaxed" data-testid={`text-comment-content-${comment.id}`}>
              {comment.content}
            </p>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                data-testid={`button-like-${comment.id}`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                {likeCount}
              </button>
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`button-reply-${comment.id}`}
              >
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>
            </div>

            {showReplyInput && (
              <div className="mt-3 animate-fade-in">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                  data-testid={`input-reply-${comment.id}`}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim()}
                    className="gap-1.5"
                    data-testid={`button-submit-reply-${comment.id}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mb-2 ml-12"
            data-testid={`button-toggle-replies-${comment.id}`}
          >
            {showReplies ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>
          {showReplies && (
            <div className="animate-fade-in">
              {comment.replies.map((reply) => (
                <SingleComment
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CommentThread({ comments, onAddComment }: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Reviews & Feedback
        </h3>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
        <Textarea
          placeholder="Share your constructive feedback..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] text-sm resize-none border-0 bg-transparent p-0 focus-visible:ring-0"
          data-testid="input-new-comment"
        />
        <div className="flex justify-end mt-3 pt-3 border-t border-border/50">
          <Button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="gap-1.5"
            data-testid="button-submit-comment"
          >
            <Send className="w-4 h-4" />
            Post Review
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {comments.map((comment) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            onReply={(commentId, content) => {
              if (onAddComment) {
                onAddComment(content, commentId);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
