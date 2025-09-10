import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Users, Activity } from "lucide-react";

const onlineData = [
  { period: "T2", online: 85, offline: 15, total: 100 },
  { period: "T3", online: 78, offline: 22, total: 100 },
  { period: "T4", online: 92, offline: 8, total: 100 },
  { period: "T5", online: 88, offline: 12, total: 100 },
  { period: "T6", online: 95, offline: 5, total: 100 },
  { period: "T7", online: 72, offline: 28, total: 100 },
  { period: "CN", online: 45, offline: 55, total: 100 },
];

const departmentData = [
  { department: "IT", online: 95, offline: 5 },
  { department: "Sales", online: 78, offline: 22 },
  { department: "HR", online: 82, offline: 18 },
  { department: "Marketing", online: 88, offline: 12 },
  { department: "Finance", online: 85, offline: 15 },
];

const chartConfig = {
  online: {
    label: "Online",
    color: "hsl(var(--success))",
  },
  offline: {
    label: "Offline", 
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

interface OnlineRateReportProps {
  period: string;
}

export function OnlineRateReport({ period }: OnlineRateReportProps) {
  const periodLabel = period === "day" ? "ngày" : period === "week" ? "tuần" : "tháng";
  const avgOnlineRate = onlineData.reduce((acc, curr) => acc + curr.online, 0) / onlineData.length;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tỷ lệ Online trung bình</CardTitle>
          <Activity className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{avgOnlineRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            +2.5% so với {periodLabel} trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nhân viên hoạt động</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">248</div>
          <p className="text-xs text-muted-foreground">
            Trong {departmentData.length} phòng ban
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Phòng ban tốt nhất</CardTitle>
          <TrendingUp className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">IT</div>
          <p className="text-xs text-muted-foreground">
            95% tỷ lệ online
          </p>
        </CardContent>
      </Card>

      {/* Online Rate Trend Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Xu hướng tỷ lệ Online theo {periodLabel}</CardTitle>
          <CardDescription>
            Biểu đồ thể hiện tỷ lệ nhân viên online và offline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={onlineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="online"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Department Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh phòng ban</CardTitle>
          <CardDescription>
            Tỷ lệ online theo từng phòng ban
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="department" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="online" fill="hsl(var(--success))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}