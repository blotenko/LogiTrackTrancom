import ProjectList from '../ProjectList'

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
  }
];

export default function ProjectListExample() {
  return (
    <ProjectList
      projects={mockProjects}
      onCreateNew={() => console.log('Create new project')}
      onViewProject={(id) => console.log('View project:', id)}
      onEditProject={(id) => console.log('Edit project:', id)}
    />
  )
}
