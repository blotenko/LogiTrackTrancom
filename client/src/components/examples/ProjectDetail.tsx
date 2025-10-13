import ProjectDetail from '../ProjectDetail'

const mockProject = {
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
};

export default function ProjectDetailExample() {
  return (
    <ProjectDetail
      project={mockProject}
      onBack={() => console.log('Back clicked')}
      onEdit={() => console.log('Edit clicked')}
    />
  )
}
