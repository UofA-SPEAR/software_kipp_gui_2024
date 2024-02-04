import MapComponent from "./components/MapComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div style={{ height: "50px", background: "green" }}>Menu</div>
          <div style={{ height: "50px", background: "purple" }}>
            Battery, Speed, etc
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <div style={{ background: "red", height: "50%" }}>Camera</div>
              <div style={{ background: "black", height: "50%" }}>
                Function buttons
              </div>
            </div>
            <MapComponent />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
