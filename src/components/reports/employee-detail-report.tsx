import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const employeeData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    department: "IT",
    position: "Developer",
    onlineRate: 95,
    studyHours: 42,
    targetHours: 40,
    missingSkills: ["React Advanced", "Node.js"],
    completedCourses: 8,
    totalCourses: 12
  },
  {
    id: 2,
    name: "Trần Thị B",
    department: "Sales", 
    position: "Sales Manager",
    onlineRate: 78,
    studyHours: 35,
    targetHours: 40,
    missingSkills: ["Digital Marketing", "CRM Advanced"],
    completedCourses: 6,
    totalCourses: 10
  },
  {
    id: 3,
    name: "Lê Văn C",
    department: "HR",
    position: "HR Specialist",
    onlineRate: 88,
    studyHours: 38,
    targetHours: 40,
    missingSkills: ["Labor Law Update"],
    completedCourses: 9,
    totalCourses: 10
  },
  {
    id: 4,
    name: "Phạm Thị D",
    department: "Marketing",
    position: "Marketing Executive", 
    onlineRate: 92,
    studyHours: 45,
    targetHours: 40,
    missingSkills: ["SEO Advanced", "Google Analytics"],
    completedCourses: 7,
    totalCourses: 12
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    department: "Finance",
    position: "Accountant",
    onlineRate: 85,
    studyHours: 32,
    targetHours: 40,
    missingSkills: ["Tax Regulation", "Financial Analysis"],
    completedCourses: 5,
    totalCourses: 8
  }
];

interface EmployeeDetailReportProps {
  period: string;
}

export function EmployeeDetailReport({ period }: EmployeeDetailReportProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOnlineRateBadge = (rate: number) => {
    if (rate >= 90) return <Badge className="bg-success/10 text-success border-success/20">Xuất sắc</Badge>;
    if (rate >= 80) return <Badge className="bg-warning/10 text-warning border-warning/20">Tốt</Badge>;
    if (rate >= 70) return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Trung bình</Badge>;
    return <Badge variant="destructive">Cần cải thiện</Badge>;
  };

  const getStudyProgressBadge = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return <Badge className="bg-success/10 text-success border-success/20">Hoàn thành</Badge>;
    if (percentage >= 80) return <Badge className="bg-warning/10 text-warning border-warning/20">Gần hoàn thành</Badge>;
    return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Chưa đạt</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết nhân viên</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Tỷ lệ Online</TableHead>
                <TableHead>Thời gian học</TableHead>
                <TableHead>Tiến độ khóa học</TableHead>
                <TableHead>Kỹ năng thiếu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.position} - {employee.department}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{employee.onlineRate}%</span>
                        {getOnlineRateBadge(employee.onlineRate)}
                      </div>
                      <Progress value={employee.onlineRate} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {employee.studyHours}h / {employee.targetHours}h
                        </span>
                        {getStudyProgressBadge(employee.studyHours, employee.targetHours)}
                      </div>
                      <Progress 
                        value={(employee.studyHours / employee.targetHours) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        {employee.completedCourses}/{employee.totalCourses} khóa học
                      </div>
                      <Progress 
                        value={(employee.completedCourses / employee.totalCourses) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {employee.missingSkills.length > 0 ? (
                        employee.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">
                          Hoàn thiện
                        </Badge>
                      )}
                    </div>
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