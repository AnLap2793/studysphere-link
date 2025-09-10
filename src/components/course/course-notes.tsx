import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CourseNotesProps {
  lessonId: number;
}

export function CourseNotes({ lessonId }: CourseNotesProps) {
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    // TODO: Implement save functionality with lesson-specific notes
    console.log("Saving notes for lesson:", lessonId, notes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Take notes while you learn..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-40"
        />
        <Button className="mt-3" onClick={handleSaveNotes}>
          Save Notes
        </Button>
      </CardContent>
    </Card>
  );
}