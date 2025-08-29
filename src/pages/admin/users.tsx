import { useState } from "react";
import { 
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demo
const users = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyenvana@email.com",
    role: "Học viên",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-28",
    coursesEnrolled: 3,
    coursesCompleted: 1,
  },
  {
    id: 2,
    name: "Lê Thị Bình",
    email: "lethib@email.com", 
    role: "Giảng viên",
    status: "active",
    joinDate: "2023-12-10",
    lastActive: "2024-01-27",
    coursesEnrolled: 0,
    coursesCompleted: 0,
  },
  {
    id: 3,
    name: "Trần Công Danh",
    email: "trancong@email.com",
    role: "Học viên",
    status: "inactive",
    joinDate: "2024-01-20",
    lastActive: "2024-01-25",
    coursesEnrolled: 2,
    coursesCompleted: 0,
  },
  {
    id: 4,
    name: "Phạm Thị Hoa",
    email: "phamthihoa@email.com",
    role: "Học viên", 
    status: "active",
    joinDate: "2023-11-05",
    lastActive: "2024-01-28",
    coursesEnrolled: 5,
    coursesCompleted: 3,
  },
  {
    id: 5,
    name: "Hoàng Văn Nam",
    email: "hoangvannam@email.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-10-01",
    lastActive: "2024-01-28",
    coursesEnrolled: 0,
    coursesCompleted: 0,
  },
];

const userStats = [
  {
    title: "Tổng người dùng",
    value: "2,847",
    icon: UserPlus,
    trend: "+12.5%"
  },
  {
    title: "Hoạt động trong tháng",
    value: "1,329",
    icon: CheckCircle,
    trend: "+8.2%"
  },
  {
    title: "Người dùng mới",
    value: "234",
    icon: Calendar,
    trend: "+23.1%"
  },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="w-3 h-3 mr-1" />
        Hoạt động
      </Badge>
    ) : (
      <Badge variant="outline" className="text-muted-foreground">
        <XCircle className="w-3 h-3 mr-1" />
        Không hoạt động
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      "Admin": "bg-destructive/10 text-destructive border-destructive/20",
      "Giảng viên": "bg-warning/10 text-warning border-warning/20", 
      "Học viên": "bg-primary/10 text-primary border-primary/20",
    };
    
    return (
      <Badge className={roleColors[role as keyof typeof roleColors] || "bg-secondary"}>
        {role}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý tất cả người dùng trong hệ thống
        </p>
      </div>

      {/* User Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {userStats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.trend} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Danh sách người dùng</CardTitle>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Giảng viên">Giảng viên</SelectItem>
                <SelectItem value="Học viên">Học viên</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Khóa học</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.joinDate}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{user.coursesEnrolled} đăng ký</div>
                      <div className="text-muted-foreground">{user.coursesCompleted} hoàn thành</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastActive}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Gửi email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}