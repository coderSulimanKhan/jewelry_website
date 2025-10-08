import Navbar from "../components/common/Navbar"

const App = () => {
  return (
    // landing page starts
    <div className="max-w-7xl flex flex-col items-center justify-between bg-primary">
      {/* navbar */}
      <Navbar />
      <h1 className="text-secondary text-3xl">Hello</h1>
    </div>
    // landing pages ends
  )
}

export default App