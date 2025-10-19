import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Users, Clock } from "lucide-react";

const Training = () => {
  const courses = [
    {
      id: 1,
      title: "有機農業入門課程",
      description: "學習有機農法的基本概念與實作技巧，從零開始打造有機農場。",
      instructor: "李教授",
      duration: "8週",
      students: 45,
      date: "2024/11/01",
      status: "招生中",
      level: "初級"
    },
    {
      id: 2,
      title: "智慧農業科技應用",
      description: "探索物聯網、AI 等科技在現代農業中的應用，提升農場經營效率。",
      instructor: "張博士",
      duration: "6週",
      students: 32,
      date: "2024/11/15",
      status: "招生中",
      level: "中級"
    },
    {
      id: 3,
      title: "農產品行銷與品牌建立",
      description: "學習如何行銷農產品，建立自有品牌，開拓銷售通路。",
      instructor: "王經理",
      duration: "4週",
      students: 28,
      date: "2024/10/20",
      status: "已額滿",
      level: "初級"
    },
    {
      id: 4,
      title: "病蟲害整合管理",
      description: "深入了解農作物病蟲害的識別、預防與有效防治方法。",
      instructor: "陳專家",
      duration: "5週",
      students: 38,
      date: "2024/12/01",
      status: "即將開課",
      level: "中級"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold mb-4">農業培訓課程</h1>
              <p className="text-lg text-muted-foreground">
                提升專業技能，開創農業新視野
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl flex-1">{course.title}</CardTitle>
                      <Badge variant={course.status === "招生中" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {course.level}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {course.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span>講師：{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>課程時長：{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>開課日期：{course.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>已報名：{course.students} 人</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      disabled={course.status === "已額滿"}
                    >
                      {course.status === "已額滿" ? "已額滿" : "立即報名"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Training;
