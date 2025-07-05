import './styles/App.css';
import MainPage from './pages/mainpage/MainPage';
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  return (
    <>
      <SnackbarProvider 
        maxSnack={5}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MainPage />
      </SnackbarProvider>
    </>
  );
}

export default App;
