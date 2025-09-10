import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Clock, BookOpen, Award, TrendingUp } from "lucide-react";

const studyTimeData = [
  { period: "T2", hours: 4.2, target: 5.0 },
  { period: "T3", hours: 3.8, target: 5.0 },
  { period: "T4", hours: 5.5, target: 5.0 },
  { period: "T5", hours: 4.7, target: 5.0 },
  { period: "T6", hours: 6.2, target: 5.0 },
  { period: "T7", hours: 3.1, target: 5.0 },
  { period: "CN", hours: 2.5, target: 5.0 },
];

const departmentStudyTime = [
  { department: "IT", hours: 6.8, courses: 12 },
  { department: "Sales", hours: 3.2, courses: 8 },
  { department: "HR", hours: 4.5, courses: 10 },
  { department: "Marketing", hours: 5.1, courses: 9 },
  { department: "Finance", hours: 4.8, courses: 7 },
];

const courseTypeData = [
  { name: "Kỹ thuật", value: 35, color: "hsl(var(--primary))" },
  { name: "Quản lý", value: 25, color: "hsl(var(--success))" },
  { name: "Soft Skills", value: 20, color: "hsl(var(--warning))" },
  { name: "Tuân thủ", value: 15, color: "hsl(var(--muted-foreground))" },
  { name: "Khác", value: 5, color: "hsl(var(--accent-foreground))" },
];

const chartConfig = {
  hours: {
    label: "Giờ học",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Mục tiêu",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

interface StudyTimeReportProps {
  period: string;
}

export function StudyTimeReport({ period }: StudyTimeReportProps) {
  const periodLabel = period === "day" ? "ngày" : period === "week" ? "tuần" : "tháng";
  const totalHours = studyTimeData.reduce((acc, curr) => acc + curr.hours, 0);
  const avgHours = totalHours / studyTimeData.length;
  const completedCourses = departmentStudyTime.reduce((acc, curr) => acc + curr.courses, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Thời gian học TB</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgHours.toFixed(1)}h</div>
          <p className="text-xs text-muted-foreground">
            +0.8h so với {periodLabel} trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Khóa học hoàn thành</CardTitle>
          <Award className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCourses}</div>
          <p className="text-xs text-muted-foreground">
            Trong {periodLabel} này
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng thời gian</CardTitle>
          <BookOpen className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHours.toFixed(0)}h</div>
          <p className="text-xs text-muted-foreground">
            Tất cả nhân viên
          </p>
        </CardContent>
      </Card>

      {/* Study Time Trend Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Thời gian học theo {periodLabel}</CardTitle>
          <CardDescription>
            So sánh thời gian học thực tế với mục tiêu đề ra
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Course Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Phân bố loại khóa học</CardTitle>
          <CardDescription>
            Thời gian học theo từng lĩnh vực
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 space-y-2">
            {courseTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Study Time */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Thời gian học theo phòng ban</CardTitle>
          <CardDescription>
            So sánh hiệu suất học tập giữa các phòng ban
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStudyTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}