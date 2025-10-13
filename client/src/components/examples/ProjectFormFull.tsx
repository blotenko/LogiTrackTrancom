import ProjectFormFull from '../ProjectFormFull'

const mockProject = {
  name: "North Region Delivery",
  description: "Coordinating deliveries across the northern region with multiple distribution centers and optimized routing.",
  status: "active",
  priority: "high",
  location: "New York, NY",
  totalPieces: 1250,
  trips: [
    {
      id: "t1",
      tripNumber: "NR-001",
      destination: "Boston, MA",
      pieces: 450,
      status: "delivered" as const,
      departureDate: "2025-10-10",
      expectedArrival: "2025-10-11",
      driver: "John Smith"
    },
    {
      id: "t2",
      tripNumber: "NR-002",
      destination: "Philadelphia, PA",
      pieces: 350,
      status: "in-transit" as const,
      departureDate: "2025-10-11",
      expectedArrival: "2025-10-12",
      driver: "Sarah Johnson"
    }
  ]
};

export default function ProjectFormFullExample() {
  return (
    <ProjectFormFull
      initialData={mockProject}
      onBack={() => console.log('Back clicked')}
      onSave={(project) => console.log('Project saved:', project)}
    />
  )
}
