import AppHeader from '../AppHeader'

export default function AppHeaderExample() {
  return (
    <AppHeader 
      userName="Sarah Johnson"
      onLogout={() => console.log('Logout clicked')}
    />
  )
}
