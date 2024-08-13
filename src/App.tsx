
import './App.css'

import WebApp from '@twa-dev/sdk'

function App() {


  return (
    <>

      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
      </div>
    </>
  )
}

export default App
