import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  Image, 
  FileText, 
  Film, 
  X, 
  Plus,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { categories } from "@/lib/mockData";
import { Link } from "wouter";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "pdf" | "video";
  size: string;
  preview?: string;
}

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => {
      let type: "image" | "pdf" | "video" = "image";
      if (file.type.includes("pdf")) type = "pdf";
      if (file.type.includes("video")) type = "video";

      return {
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type,
        size: formatFileSize(file.size),
        preview: type === "image" ? URL.createObjectURL(file) : undefined,
      };
    });

    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="w-5 h-5" />;
      case "video": return <Film className="w-5 h-5" />;
      default: return <Image className="w-5 h-5" />;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Portfolio Submitted!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your portfolio "{title}" has been uploaded successfully. 
            It will be visible to reviewers shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/portfolios">
              <Button variant="outline" className="gap-2">
                Browse Portfolios
              </Button>
            </Link>
            <Button onClick={() => setSubmitted(false)} className="gap-2">
              Upload Another
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Upload Your Portfolio
          </h1>
          <p className="text-lg text-muted-foreground">
            Share your work and get valuable feedback from industry professionals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*,.pdf,video/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="input-file-upload"
            />
            
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UploadIcon className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Drag and drop your files
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, PDFs, and videos up to 50MB each
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <Label>Uploaded Files ({files.length})</Label>
              <div className="grid gap-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50"
                    data-testid={`file-item-${file.id}`}
                  >
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.type.toUpperCase()} · {file.size}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      data-testid={`button-remove-file-${file.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Portfolio Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Brand Identity for Tech Startup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-12"
              data-testid="input-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your project, the process, and what kind of feedback you're looking for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[120px] resize-none"
              data-testid="input-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="h-12" data-testid="select-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c !== "All").map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags (optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add up to 5 tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                disabled={tags.length >= 5}
                className="h-12"
                data-testid="input-tags"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={addTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                className="h-12"
                data-testid="button-add-tag"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1.5 px-3 py-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                      data-testid={`button-remove-tag-${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-base gap-2"
              disabled={!title || !description || !category || files.length === 0}
              data-testid="button-submit-portfolio"
            >
              <UploadIcon className="w-5 h-5" />
              Submit Portfolio for Review
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to our community guidelines for constructive feedback.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
