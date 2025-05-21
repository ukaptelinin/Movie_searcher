import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/globals.css';
import { HeroUIProvider } from '@heroui/system';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </BrowserRouter>,
);
