import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Target, Users, TrendingDown } from "lucide-react";

const skillGapData = [
  { skill: "React.js", required: 45, completed: 32, gap: 13, priority: "high" },
  { skill: "Node.js", required: 38, completed: 28, gap: 10, priority: "high" },
  { skill: "Python", required: 25, completed: 18, gap: 7, priority: "medium" },
  { skill: "Data Analysis", required: 30, completed: 25, gap: 5, priority: "medium" },
  { skill: "Project Management", required: 20, completed: 16, gap: 4, priority: "low" },
  { skill: "UI/UX Design", required: 15, completed: 12, gap: 3, priority: "low" },
];

const departmentGaps = [
  { department: "IT", criticalGaps: 8, totalSkills: 20 },
  { department: "Sales", criticalGaps: 12, totalSkills: 15 },
  { department: "Marketing", criticalGaps: 6, totalSkills: 18 },
  { department: "HR", criticalGaps: 4, totalSkills: 12 },
  { department: "Finance", criticalGaps: 5, totalSkills: 14 },
];

const priorityDistribution = [
  { name: "Cao", value: 23, color: "hsl(var(--destructive))" },
  { name: "Trung bình", value: 17, color: "hsl(var(--warning))" },
  { name: "Thấp", value: 10, color: "hsl(var(--success))" },
];

const chartConfig = {
  required: {
    label: "Yêu cầu",
    color: "hsl(var(--muted-foreground))",
  },
  completed: {
    label: "Hoàn thành",
    color: "hsl(var(--success))",
  },
  gap: {
    label: "Thiếu",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

interface SkillGapReportProps {
  period: string;
}

export function SkillGapReport({ period }: SkillGapReportProps) {
  const totalGaps = skillGapData.reduce((acc, curr) => acc + curr.gap, 0);
  const criticalGaps = skillGapData.filter(skill => skill.priority === "high").length;
  const avgCompletionRate = skillGapData.reduce((acc, curr) => acc + (curr.completed / curr.required), 0) / skillGapData.length * 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng kỹ năng thiếu</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{totalGaps}</div>
          <p className="text-xs text-muted-foreground">
            Cần đào tạo bổ sung
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ưu tiên cao</CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{criticalGaps}</div>
          <p className="text-xs text-muted-foreground">
            Kỹ năng cần gấp
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
          <Target className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{avgCompletionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Trung bình tất cả kỹ năng
          </p>
        </CardContent>
      </Card>

      {/* Skill Gap Analysis */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Phân tích kỹ năng thiếu</CardTitle>
          <CardDescription>
            So sánh yêu cầu và thực tế của từng kỹ năng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillGapData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="hsl(var(--success))" radius={2} />
                <Bar dataKey="gap" fill="hsl(var(--destructive))" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Phân bố ưu tiên</CardTitle>
          <CardDescription>
            Mức độ ưu tiên các kỹ năng thiếu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 space-y-2">
            {priorityDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Skill List */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Chi tiết kỹ năng thiếu</CardTitle>
          <CardDescription>
            Danh sách chi tiết các kỹ năng cần đào tạo bổ sung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillGapData.map((skill) => {
              const completionRate = (skill.completed / skill.required) * 100;
              const priorityColor = skill.priority === "high" ? "destructive" : skill.priority === "medium" ? "secondary" : "outline";
              
              return (
                <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{skill.skill}</h4>
                      <Badge variant={priorityColor as any}>
                        {skill.priority === "high" ? "Cao" : skill.priority === "medium" ? "TB" : "Thấp"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Tiến độ: {skill.completed}/{skill.required} người</span>
                        <span>{completionRate.toFixed(0)}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-destructive">{skill.gap}</div>
                    <div className="text-sm text-muted-foreground">người thiếu</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Department Gaps */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Kỹ năng thiếu theo phòng ban</CardTitle>
          <CardDescription>
            Số lượng kỹ năng quan trọng còn thiếu ở mỗi phòng ban
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {departmentGaps.map((dept) => {
              const gapRate = (dept.criticalGaps / dept.totalSkills) * 100;
              
              return (
                <Card key={dept.department}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{dept.department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-destructive mb-2">
                        {dept.criticalGaps}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        / {dept.totalSkills} kỹ năng
                      </div>
                      <Progress value={gapRate} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {gapRate.toFixed(0)}% thiếu
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}