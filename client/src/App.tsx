import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";
import ProjectDetail from "@/components/ProjectDetail";
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
    createdAt: "Oct 10, 2025",
    totalPieces: 1250,
    trips: [
      {
        id: "t1",
        tripNumber: "NR-001",
        destination: "Boston, MA",
        pieces: 450,
        status: "delivered" as const,
        departureDate: "Oct 10, 2025",
        expectedArrival: "Oct 11, 2025",
        driver: "John Smith"
      },
      {
        id: "t2",
        tripNumber: "NR-002",
        destination: "Philadelphia, PA",
        pieces: 350,
        status: "in-transit" as const,
        departureDate: "Oct 11, 2025",
        expectedArrival: "Oct 12, 2025",
        driver: "Sarah Johnson"
      },
      {
        id: "t3",
        tripNumber: "NR-003",
        destination: "Buffalo, NY",
        pieces: 250,
        status: "pending" as const,
        departureDate: "Oct 12, 2025",
        expectedArrival: "Oct 13, 2025"
      },
      {
        id: "t4",
        tripNumber: "NR-004",
        destination: "Hartford, CT",
        pieces: 200,
        status: "delayed" as const,
        departureDate: "Oct 10, 2025",
        expectedArrival: "Oct 11, 2025",
        driver: "Mike Davis"
      }
    ]
  },
  {
    id: "2",
    name: "Warehouse Optimization",
    description: "Implementing new inventory management system and layout optimization for increased efficiency.",
    status: "pending",
    priority: "medium",
    location: "Chicago, IL",
    createdAt: "Oct 8, 2025",
    totalPieces: 800,
    trips: [
      {
        id: "t5",
        tripNumber: "WO-001",
        destination: "Milwaukee, WI",
        pieces: 500,
        status: "pending" as const,
        departureDate: "Oct 13, 2025",
        expectedArrival: "Oct 14, 2025"
      },
      {
        id: "t6",
        tripNumber: "WO-002",
        destination: "Indianapolis, IN",
        pieces: 300,
        status: "pending" as const,
        departureDate: "Oct 14, 2025",
        expectedArrival: "Oct 15, 2025"
      }
    ]
  },
  {
    id: "3",
    name: "Fleet Management System",
    description: "Rolling out GPS tracking and route optimization software across the entire vehicle fleet.",
    status: "active",
    priority: "urgent",
    location: "Los Angeles, CA",
    createdAt: "Oct 5, 2025",
    totalPieces: 2100,
    trips: [
      {
        id: "t7",
        tripNumber: "FM-001",
        destination: "San Diego, CA",
        pieces: 700,
        status: "delivered" as const,
        departureDate: "Oct 5, 2025",
        expectedArrival: "Oct 6, 2025"
      },
      {
        id: "t8",
        tripNumber: "FM-002",
        destination: "San Francisco, CA",
        pieces: 800,
        status: "in-transit" as const,
        departureDate: "Oct 8, 2025",
        expectedArrival: "Oct 9, 2025"
      },
      {
        id: "t9",
        tripNumber: "FM-003",
        destination: "Sacramento, CA",
        pieces: 600,
        status: "in-transit" as const,
        departureDate: "Oct 9, 2025",
        expectedArrival: "Oct 10, 2025"
      }
    ]
  },
  {
    id: "4",
    name: "Supply Chain Analytics",
    description: "Developing dashboard for real-time supply chain visibility and performance metrics.",
    status: "completed",
    priority: "low",
    location: "Seattle, WA",
    createdAt: "Sep 28, 2025",
    totalPieces: 500,
    trips: [
      {
        id: "t10",
        tripNumber: "SC-001",
        destination: "Portland, OR",
        pieces: 500,
        status: "delivered" as const,
        departureDate: "Sep 28, 2025",
        expectedArrival: "Sep 29, 2025"
      }
    ]
  },
  {
    id: "5",
    name: "Last Mile Delivery",
    description: "Optimizing final delivery routes in urban areas to reduce delivery times and costs.",
    status: "active",
    priority: "high",
    location: "Boston, MA",
    createdAt: "Oct 1, 2025",
    totalPieces: 950,
    trips: [
      {
        id: "t11",
        tripNumber: "LM-001",
        destination: "Cambridge, MA",
        pieces: 300,
        status: "delivered" as const,
        departureDate: "Oct 1, 2025",
        expectedArrival: "Oct 2, 2025"
      },
      {
        id: "t12",
        tripNumber: "LM-002",
        destination: "Worcester, MA",
        pieces: 350,
        status: "in-transit" as const,
        departureDate: "Oct 3, 2025",
        expectedArrival: "Oct 4, 2025"
      },
      {
        id: "t13",
        tripNumber: "LM-003",
        destination: "Providence, RI",
        pieces: 300,
        status: "pending" as const,
        departureDate: "Oct 5, 2025",
        expectedArrival: "Oct 6, 2025"
      }
    ]
  }
];

type View = "projects" | "create" | "edit" | "view";

function Router() {
  // TODO: Remove mock state management - for design prototype only
  const [currentView, setCurrentView] = useState<View>("projects");
  const [projects, setProjects] = useState(mockProjects);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [viewingProject, setViewingProject] = useState<any>(null);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setCurrentView("create");
  };

  const handleViewProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setViewingProject(project);
    setCurrentView("view");
  };

  const handleEditProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setEditingProject(project);
    setCurrentView("edit");
  };

  const handleEditFromView = () => {
    if (viewingProject) {
      setEditingProject(viewingProject);
      setCurrentView("edit");
    }
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

  return (
    <>
      <AppHeader userName="Sarah Johnson" onLogout={handleLogout} />
      {currentView === "projects" && (
        <ProjectList
          projects={projects}
          onCreateNew={handleCreateProject}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
        />
      )}
      {currentView === "view" && viewingProject && (
        <ProjectDetail
          project={viewingProject}
          onBack={handleBackToProjects}
          onEdit={handleEditFromView}
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
