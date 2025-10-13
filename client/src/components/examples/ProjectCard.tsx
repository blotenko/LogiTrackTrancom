import ProjectCard from '../ProjectCard'

export default function ProjectCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="max-w-sm">
        <ProjectCard
          id="1"
          name="North Region Delivery"
          description="Coordinating deliveries across the northern region with multiple distribution centers and optimized routing."
          status="active"
          priority="high"
          location="New York, NY"
          createdAt="Oct 10, 2025"
          onView={(id) => console.log('View project:', id)}
          onEdit={(id) => console.log('Edit project:', id)}
        />
      </div>
    </div>
  )
}
