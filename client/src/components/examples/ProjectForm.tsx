import ProjectForm from '../ProjectForm'

export default function ProjectFormExample() {
  return (
    <ProjectForm 
      onBack={() => console.log('Back clicked')}
      onSave={(project) => console.log('Project saved:', project)}
    />
  )
}
