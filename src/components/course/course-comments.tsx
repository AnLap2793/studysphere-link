import { useState } from "react";
import { MessageCircle, Send, Heart, Reply, MoreVertical, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

interface CourseCommentsProps {
  courseId: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    content: "Khóa học này rất hay! Tôi đã học được rất nhiều điều bổ ích. Cảm ơn giảng viên đã chia sẻ kiến thức quý báu.",
    timestamp: "2 giờ trước",
    likes: 12,
    liked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Dr. Angela Yu",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
          role: "instructor"
        },
        content: "Cảm ơn bạn! Tôi rất vui khi khóa học này hữu ích với bạn.",
        timestamp: "1 giờ trước",
        likes: 5,
        liked: true,
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Trần Thị B",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    content: "Mình có thể hỏi về phần JavaScript không? Tôi gặp khó khăn ở bài DOM manipulation.",
    timestamp: "5 giờ trước",
    likes: 3,
    liked: true,
  },
  {
    id: "3",
    author: {
      name: "Lê Văn C",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    content: "Video quality rất tốt, âm thanh rõ ràng. Tốc độ giảng dạy vừa phải, dễ theo dõi.",
    timestamp: "1 ngày trước",
    likes: 8,
    liked: false,
  }
];

export const CourseComments = ({ courseId }: CourseCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Bạn",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      },
      content: newComment,
      timestamp: "Vừa xong",
      likes: 0,
      liked: false,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: "Bạn",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      },
      content: replyContent,
      timestamp: "Vừa xong",
      likes: 0,
      liked: false,
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyTo(null);
  };

  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (isReply && parentId === comment.id) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                liked: !reply.liked,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: string; 
  }) => (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{comment.author.name}</span>
          {comment.author.role === "instructor" && (
            <Badge variant="secondary" className="text-xs">Giảng viên</Badge>
          )}
          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
        </div>
        
        <p className="text-sm mb-2">{comment.content}</p>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={() => toggleLike(comment.id, isReply, parentId)}
          >
            <ThumbsUp className={`w-3 h-3 mr-1 ${comment.liked ? 'fill-current text-primary' : ''}`} />
            {comment.likes}
          </Button>
          
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              <Reply className="w-3 h-3 mr-1" />
              Trả lời
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-0 w-4 h-4">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Báo cáo</DropdownMenuItem>
              <DropdownMenuItem>Chia sẻ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Reply Form */}
        {replyTo === comment.id && (
          <div className="mt-3 space-y-2">
            <Textarea
              placeholder="Viết trả lời..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[60px] text-sm"
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                Trả lời
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setReplyTo(null);
                  setReplyContent("");
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                isReply 
                parentId={comment.id} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Bình luận ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <div className="space-y-3">
          <Textarea
            placeholder="Viết bình luận về khóa học này..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Gửi bình luận
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        
        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};