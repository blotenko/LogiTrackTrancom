import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ProjectList from "@/components/ProjectList";
import ProjectFormFull from "@/components/ProjectFormFull";
import ProjectDetail from "@/components/ProjectDetail";
import AppHeader from "@/components/AppHeader";
import LoginForm from "@/components/LoginForm";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

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
        pieceName: "Pallets",
        status: "delivered" as const,
        departureDate: "Oct 10, 2025",
        expectedArrival: "Oct 11, 2025",
        driver: "John Smith",
        truckNumber: "TRK-101",
        trailerNumber: "TRL-501"
      },
      {
        id: "t2",
        tripNumber: "NR-002",
        destination: "Philadelphia, PA",
        pieces: 350,
        pieceName: "Boxes",
        status: "in-transit" as const,
        departureDate: "Oct 11, 2025",
        expectedArrival: "Oct 12, 2025",
        driver: "Sarah Johnson",
        truckNumber: "TRK-102",
        trailerNumber: "TRL-502"
      },
      {
        id: "t3",
        tripNumber: "NR-003",
        destination: "Buffalo, NY",
        pieces: 250,
        status: "pending" as const,
        departureDate: "Oct 12, 2025",
        expectedArrival: "Oct 13, 2025",
        truckNumber: "TRK-103",
        trailerNumber: "TRL-503"
      },
      {
        id: "t4",
        tripNumber: "NR-004",
        destination: "Hartford, CT",
        pieces: 200,
        status: "delayed" as const,
        departureDate: "Oct 10, 2025",
        expectedArrival: "Oct 11, 2025",
        driver: "Mike Davis",
        truckNumber: "TRK-104",
        trailerNumber: "TRL-504"
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

function ProjectsPage({ projects, setProjects }: any) {
  const navigate = useNavigate();
  return (
    <ProjectList
      projects={projects}
      onCreateNew={() => navigate("/create")}
      onViewProject={(id: string) => navigate(`/projects/${id}`)}
      onEditProject={(id: string) => navigate(`/edit/${id}`)}
    />
  );
}

function ProjectDetailPage({ projects }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p: any) => p.id === id);
  if (!project) return <NotFound />;

  return <ProjectDetail project={project} onBack={() => navigate("/projects")} onEdit={() => navigate(`/edit/${id}`)} />;
}

function ProjectFormPage({ projects, setProjects }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const editingProject = projects.find((p: any) => p.id === id);

  const handleSave = (projectData: any) => {
    if (editingProject) {
      setProjects(projects.map((p: any) => (p.id === editingProject.id ? { ...p, ...projectData } : p)));
    } else {
      const newProject = {
        id: String(projects.length + 1),
        ...projectData,
        totalPieces: projectData.totalPieces || 0,
        trips: projectData.trips || [],
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setProjects([newProject, ...projects]);
    }
    navigate("/projects");
  };

  return <ProjectFormFull onBack={() => navigate("/projects")} onSave={handleSave} initialData={editingProject} />;
}

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [projects, setProjects] = useState(mockProjects);

  if (isLoading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isAuthenticated ? (
          <BrowserRouter>
            <AppHeader userName={user?.name || "Manager"} />
            <Routes>
              <Route path="/" element={<Navigate to="/projects" />} />
              <Route path="/projects" element={<ProjectsPage projects={projects} setProjects={setProjects} />} />
              <Route path="/projects/:id" element={<ProjectDetailPage projects={projects} />} />
              <Route path="/create" element={<ProjectFormPage projects={projects} setProjects={setProjects} />} />
              <Route path="/edit/:id" element={<ProjectFormPage projects={projects} setProjects={setProjects} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <div className="flex flex-col items-center mt-20">
            <LoginForm />
            <button
              onClick={() => loginWithRedirect()}
              className="bg-primary text-white px-4 py-2 rounded mt-4"
            >
              Login with Auth0
            </button>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;