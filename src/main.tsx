import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Declaración para TypeScript de la propiedad dataLayer en window
declare global {
  interface Window {
    dataLayer: any[];
  }
}
// Inicialización de Google Tag Manager dataLayer para analítica
window.dataLayer = window.dataLayer || [];

createRoot(document.getElementById("root")!).render(<App />);
