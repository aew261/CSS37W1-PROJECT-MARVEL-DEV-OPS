import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store.js'
import { AuthProvider } from '../authentication/AuthProvider.jsx'
import '../styles/shared/global.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
              <App />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)