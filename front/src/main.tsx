import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from './lib/react-query/queryProvider';
createRoot(document.getElementById('root')!).render(


 <StrictMode>
  <BrowserRouter>
    <QueryProvider>
    <App />
    </QueryProvider>
  </BrowserRouter>
  </StrictMode>,
)
