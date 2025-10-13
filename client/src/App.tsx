import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginForm from "@/components/LoginForm";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";
import AppHeader from "@/components/AppHeader";

// TODO: Remove mock data - for design prototype only
const mockProjects = [
  {
    id: "1",
    name: "North Region Delivery",
    description: "Coordinating deliveries across the northern region with multiple distribution centers and optimized routing.",
    status: "active",
    priority: "high",
    location: "New York, NY",
    createdAt: "Oct 10, 2025"
  },
  {
    id: "2",
    name: "Warehouse Optimization",
    description: "Implementing new inventory management system and layout optimization for increased efficiency.",
    status: "pending",
    priority: "medium",
    location: "Chicago, IL",
    createdAt: "Oct 8, 2025"
  },
  {
    id: "3",
    name: "Fleet Management System",
    description: "Rolling out GPS tracking and route optimization software across the entire vehicle fleet.",
    status: "active",
    priority: "urgent",
    location: "Los Angeles, CA",
    createdAt: "Oct 5, 2025"
  },
  {
    id: "4",
    name: "Supply Chain Analytics",
    description: "Developing dashboard for real-time supply chain visibility and performance metrics.",
    status: "completed",
    priority: "low",
    location: "Seattle, WA",
    createdAt: "Sep 28, 2025"
  },
  {
    id: "5",
    name: "Last Mile Delivery",
    description: "Optimizing final delivery routes in urban areas to reduce delivery times and costs.",
    status: "active",
    priority: "high",
    location: "Boston, MA",
    createdAt: "Oct 1, 2025"
  }
];

type View = "login" | "projects" | "create" | "edit";

function Router() {
  // TODO: Remove mock state management - for design prototype only
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("login");
  const [projects, setProjects] = useState(mockProjects);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("projects");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setCurrentView("create");
  };

  const handleEditProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setEditingProject(project);
    setCurrentView("edit");
  };

  const handleSaveProject = (projectData: any) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...projectData } : p));
    } else {
      // Create new project
      const newProject = {
        id: String(projects.length + 1),
        ...projectData,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setProjects([newProject, ...projects]);
    }
    setCurrentView("projects");
  };

  const handleBackToProjects = () => {
    setCurrentView("projects");
  };

  if (!isAuthenticated && currentView === "login") {
    return <LoginForm />;
  }

  return (
    <>
      <AppHeader userName="Sarah Johnson" onLogout={handleLogout} />
      {currentView === "projects" && (
        <ProjectList
          projects={projects}
          onCreateNew={handleCreateProject}
          onViewProject={(id) => console.log('View project:', id)}
          onEditProject={handleEditProject}
        />
      )}
      {currentView === "create" && (
        <ProjectForm
          onBack={handleBackToProjects}
          onSave={handleSaveProject}
        />
      )}
      {currentView === "edit" && editingProject && (
        <ProjectForm
          onBack={handleBackToProjects}
          onSave={handleSaveProject}
          initialData={editingProject}
        />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
