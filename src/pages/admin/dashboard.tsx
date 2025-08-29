import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  Activity,
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for demo
const stats = [
  {
    title: "Tổng người dùng",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Khóa học đang hoạt động",
    value: "47",
    change: "+3",
    changeType: "positive" as const,
    icon: BookOpen,
  },
  {
    title: "Doanh thu tháng",
    value: "₫45,231,890",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Học viên hoạt động",
    value: "1,329",
    change: "+5.4%",
    changeType: "positive" as const,
    icon: Activity,
  },
];

const recentActivities = [
  {
    action: "Người dùng mới đăng ký",
    user: "nguyenvana@email.com",
    time: "5 phút trước",
    type: "user" as const,
  },
  {
    action: "Khóa học được hoàn thành",
    user: "lethib@email.com",
    time: "10 phút trước", 
    type: "course" as const,
  },
  {
    action: "Thanh toán thành công",
    user: "trancong@email.com",
    time: "15 phút trước",
    type: "payment" as const,
  },
  {
    action: "Khóa học mới được tạo",
    user: "Admin",
    time: "1 giờ trước",
    type: "course" as const,
  },
];

const topCourses = [
  { name: "Lập trình React từ cơ bản", students: 234, rating: 4.8 },
  { name: "Thiết kế UX/UI chuyên nghiệp", students: 189, rating: 4.9 },
  { name: "Marketing Digital hiệu quả", students: 156, rating: 4.7 },
  { name: "Python cho người mới bắt đầu", students: 143, rating: 4.6 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi hoạt động và hiệu suất của nền tảng
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-1">
                <Badge 
                  variant={stat.changeType === "positive" ? "default" : "destructive"}
                  className="text-xs"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === "user" && <Users className="w-4 h-4 text-primary" />}
                    {activity.type === "course" && <BookOpen className="w-4 h-4 text-primary" />}
                    {activity.type === "payment" && <DollarSign className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Khóa học phổ biến
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-foreground leading-tight">
                      {course.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <UserCheck className="w-3 h-3 mr-1" />
                      {course.students} học viên
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ⭐ {course.rating}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}