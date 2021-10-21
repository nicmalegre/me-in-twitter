import "./App.css";
import { Navbar } from "./components/Navbar";
import { Input } from "./components/Input";
import { Card } from "./components/Card";

function App() {
  return (
    <>
      <Navbar />

      {/* <div>
        <h1 className="text-center">
          Te gustaria ver información interesante sobre tu actividad en Twitter?
        </h1>
      </div> */}

      <Card className="">
        <Input label="Usuario" placeholder="Usuario" />
        <div class="flex items-center justify-center">
          <button
            class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Buscar
          </button>
        </div>
      </Card>
    </>
  );
}

export default App;
