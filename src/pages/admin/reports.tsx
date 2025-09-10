import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnlineRateReport } from "@/components/reports/online-rate-report";
import { StudyTimeReport } from "@/components/reports/study-time-report";
import { SkillGapReport } from "@/components/reports/skill-gap-report";
import { EmployeeDetailReport } from "@/components/reports/employee-detail-report";
import { CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

export default function AdminReports() {
  const [period, setPeriod] = useState("month");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo & Phân tích</h1>
          <p className="text-muted-foreground">
            Theo dõi hiệu suất học tập và phát triển kỹ năng của nhân viên
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Theo ngày</SelectItem>
              <SelectItem value="week">Theo tuần</SelectItem>
              <SelectItem value="month">Theo tháng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="online-rate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="online-rate" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Tỷ lệ Online
          </TabsTrigger>
          <TabsTrigger value="study-time" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Thời gian học
          </TabsTrigger>
          <TabsTrigger value="skill-gap" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Kỹ năng thiếu
          </TabsTrigger>
          <TabsTrigger value="employee-detail" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Chi tiết NV
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online-rate">
          <OnlineRateReport period={period} />
        </TabsContent>

        <TabsContent value="study-time">
          <StudyTimeReport period={period} />
        </TabsContent>

        <TabsContent value="skill-gap">
          <SkillGapReport period={period} />
        </TabsContent>

        <TabsContent value="employee-detail">
          <EmployeeDetailReport period={period} />
        </TabsContent>
      </Tabs>
    </div>
  );
}