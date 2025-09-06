import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
// import { QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';



// export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          {/* <QueryClientProvider client={queryClient}> */}
            {/* <ReactQueryDevtools/> */}
              <App />
          {/* </QueryClientProvider> */}
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
)
