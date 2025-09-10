import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resource {
  name: string;
  type: string;
  url: string;
}

interface CourseResourcesProps {
  resources: Resource[];
}

export function CourseResources({ resources }: CourseResourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Downloadable Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {resources && resources.length > 0 ? (
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    <p className="text-sm text-muted-foreground uppercase">{resource.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No resources available for this lesson.</p>
        )}
      </CardContent>
    </Card>
  );
}