import { Dashboard } from "pages/Dashboard";

export default function App() {
  
  return (
    <>
      <div className="header">
        <div>
          <div>
            Simple Todo App
          </div>

          <button>
            Log Out
          </button>
        </div>
      </div>
      <div className="pagebody">
        <Dashboard />
      </div>    
    </>
  );
}
