import logo from './logo.svg';
import './App.css';
import Timlyy from './Component/timlyy';
import Navbar from './Component/navbar';
import HorizontalCard from './Component/Contact';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Timlyy/>
      <HorizontalCard/>
    </div>
  );
}

export default App;
