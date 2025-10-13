import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, MapPin, Calendar } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  location?: string;
  createdAt: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const statusColors = {
  active: "bg-chart-2 text-white",
  pending: "bg-chart-4 text-white",
  completed: "bg-chart-3 text-white",
  "on-hold": "bg-muted text-muted-foreground",
};

const priorityColors = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-chart-2/20 text-chart-2",
  high: "bg-chart-4/20 text-chart-4",
  urgent: "bg-destructive/20 text-destructive",
};

export default function ProjectCard({
  id,
  name,
  description,
  status,
  priority,
  location,
  createdAt,
  onView,
  onEdit,
}: ProjectCardProps) {
  return (
    <Card className="shadow-md hover-elevate transition-all duration-200" data-testid={`card-project-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-medium truncate" data-testid={`text-project-name-${id}`}>{name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={statusColors[status as keyof typeof statusColors] || "bg-secondary"} data-testid={`badge-status-${id}`}>
              {status}
            </Badge>
            <Badge variant="outline" className={priorityColors[priority as keyof typeof priorityColors]} data-testid={`badge-priority-${id}`}>
              {priority} priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>{description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{createdAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onView?.(id)} data-testid={`button-view-${id}`}>
          <Eye className="h-4 w-4" />
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onEdit?.(id)} data-testid={`button-edit-${id}`}>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
