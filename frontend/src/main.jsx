import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignalRProvider } from './contexts/SignalRContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SignalRProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SignalRProvider>
  </Provider>
)
