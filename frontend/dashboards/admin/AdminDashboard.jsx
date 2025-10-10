const AdminDashboard = ({ role }) => {
  if(role !== "admin") {
    return <div>Only for admins</div>
  }
  
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard