import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './assets/css/fludicial.css';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
