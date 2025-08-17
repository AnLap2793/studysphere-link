import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Target,
  Settings,
  Camera,
  Save,
  Edit2
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.user_metadata?.display_name || "",
    bio: user?.user_metadata?.bio || "",
    location: user?.user_metadata?.location || "",
  });

  // Mock data for courses and achievements
  const enrolledCourses = [
    {
      id: 1,
      title: "React Development Mastery",
      progress: 85,
      totalLessons: 24,
      completedLessons: 20,
      instructor: "John Doe",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      progress: 60,
      totalLessons: 18,
      completedLessons: 11,
      instructor: "Jane Smith",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      progress: 95,
      totalLessons: 15,
      completedLessons: 14,
      instructor: "Mike Johnson",
      thumbnail: "/placeholder.svg"
    }
  ];

  const achievements = [
    { id: 1, title: "First Course Completed", icon: "🎓", date: "2024-01-15" },
    { id: 2, title: "Speed Learner", icon: "⚡", date: "2024-02-01" },
    { id: 3, title: "Quiz Master", icon: "🧠", date: "2024-02-15" },
    { id: 4, title: "Community Helper", icon: "🤝", date: "2024-03-01" }
  ];

  const stats = {
    totalCourses: enrolledCourses.length,
    completedCourses: enrolledCourses.filter(course => course.progress === 100).length,
    totalHours: 127,
    streak: 15
  };

  const handleSaveProfile = () => {
    // Here you would typically save to Supabase
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin profile đã được lưu",
    });
    setIsEditing(false);
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Vui lòng đăng nhập để xem profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="text-lg">
                  {getInitials(user.email || "")}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {profileData.displayName || user.email?.split("@")[0] || "User"}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Tham gia từ {new Date(user.created_at).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Tên hiển thị</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      placeholder="Nhập tên hiển thị"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Tiểu sử</Label>
                    <Input
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Giới thiệu về bản thân"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Địa điểm</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      placeholder="Thành phố, Quốc gia"
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {profileData.bio && (
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  )}
                  {profileData.location && (
                    <p className="text-sm text-muted-foreground">📍 {profileData.location}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.totalCourses}</p>
            <p className="text-sm text-muted-foreground">Khóa học</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">{stats.completedCourses}</p>
            <p className="text-sm text-muted-foreground">Hoàn thành</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold">{stats.totalHours}</p>
            <p className="text-sm text-muted-foreground">Giờ học</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-destructive text-xl">🔥</div>
            <p className="text-2xl font-bold">{stats.streak}</p>
            <p className="text-sm text-muted-foreground">Ngày liên tiếp</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Khóa học</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Khóa học đang theo học</CardTitle>
              <CardDescription>
                Tiến độ học tập của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor} • {course.completedLessons}/{course.totalLessons} bài học
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thành tích</CardTitle>
              <CardDescription>
                Những cột mốc bạn đã đạt được
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt tài khoản</CardTitle>
              <CardDescription>
                Quản lý thông tin và tùy chọn của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo email</h4>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo về khóa học và cập nhật mới
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Cấu hình
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Chế độ tối</h4>
                    <p className="text-sm text-muted-foreground">
                      Thay đổi giao diện của ứng dụng
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Cấu hình
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ngôn ngữ</h4>
                    <p className="text-sm text-muted-foreground">
                      Chọn ngôn ngữ hiển thị
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Tiếng Việt
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Xóa tài khoản</h4>
                    <p className="text-sm text-muted-foreground">
                      Xóa vĩnh viễn tài khoản và tất cả dữ liệu
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Xóa tài khoản
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;