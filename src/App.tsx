
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
      <Navbar username=""/>
      <Sidebar activeView={"dashboard"} onNavigate={() => {}}/>
    </>
  )
}

export default App
