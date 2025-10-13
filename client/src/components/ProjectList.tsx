import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { Plus, Search, LayoutGrid, List as ListIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  location?: string;
  createdAt: string;
}

interface ProjectListProps {
  projects: Project[];
  onCreateNew?: () => void;
  onViewProject?: (id: string) => void;
  onEditProject?: (id: string) => void;
}

const statusColors = {
  active: "bg-chart-2 text-white",
  pending: "bg-chart-4 text-white",
  completed: "bg-chart-3 text-white",
  "on-hold": "bg-muted text-muted-foreground",
};

export default function ProjectList({ projects, onCreateNew, onViewProject, onEditProject }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-normal">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your logistics projects</p>
          </div>
          <Button onClick={onCreateNew} className="gap-2 w-full sm:w-auto" data-testid="button-create-project">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              data-testid="button-view-grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              data-testid="button-view-list"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <LayoutGrid className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search query" : "Get started by creating your first project"}
            </p>
            {!searchQuery && (
              <Button onClick={onCreateNew} className="gap-2" data-testid="button-create-first-project">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onView={onViewProject}
                onEdit={onEditProject}
              />
            ))}
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Project Name</TableHead>
                  <TableHead className="w-[25%]">Location</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[15%]">Created</TableHead>
                  <TableHead className="w-[15%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} data-testid={`row-project-${project.id}`}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{project.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{project.location || "-"}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[project.status as keyof typeof statusColors] || "bg-secondary"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => onViewProject?.(project.id)} data-testid={`button-view-${project.id}`}>
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onEditProject?.(project.id)} data-testid={`button-edit-${project.id}`}>
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
