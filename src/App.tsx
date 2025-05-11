import { BrowserRouter as Router } from "react-router-dom"
import { Router as Routing } from './Router';
import { CommonErrorBox as ErrorBoxProvider } from "./components/modalBox/errorBox/commonErrorBox";
const App = () => {

  return (
    <div className="light">
      <ErrorBoxProvider>
        <Router>
          <Routing />
        </Router>
      </ErrorBoxProvider>

    </div>
  )
}

export default App