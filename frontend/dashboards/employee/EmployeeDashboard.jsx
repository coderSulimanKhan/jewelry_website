const EmployeeDashboard = ({role}) => {
  if(role !== "employee") {
    return <h1>Only for employees</h1>
  }
  return (
    <div>EmployeeDashboard</div>
  )
}

export default EmployeeDashboard