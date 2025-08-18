import { useState } from "react";
import { Bell, Check, X, Clock, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "course" | "system" | "achievement";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "course",
    title: "Bài học mới có sẵn",
    message: "Bài học 'JavaScript Advanced' đã được thêm vào khóa học Web Development",
    time: "2 phút trước",
    read: false,
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: "2",
    type: "achievement",
    title: "Hoàn thành thành tích",
    message: "Chúc mừng! Bạn đã hoàn thành 10 bài học đầu tiên",
    time: "1 giờ trước",
    read: false,
    icon: <User className="w-4 h-4" />
  },
  {
    id: "3",
    type: "system",
    title: "Cập nhật hệ thống",
    message: "Hệ thống sẽ bảo trì từ 2:00 AM đến 4:00 AM ngày mai",
    time: "3 giờ trước",
    read: true,
    icon: <Clock className="w-4 h-4" />
  }
];

export const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course": return "text-blue-500";
      case "achievement": return "text-green-500";
      case "system": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Thông báo</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Không có thông báo nào
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-3 mb-2 cursor-pointer transition-colors hover:bg-accent ${
                    !notification.read ? 'border-primary/20 bg-primary/5' : ''
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium truncate">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm">
              Xem tất cả thông báo
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};