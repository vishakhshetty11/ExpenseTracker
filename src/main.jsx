import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import './index.css'
import router from './App';


const root = createRoot(document.getElementById('root'));
root.render(
<SnackbarProvider>
    <RouterProvider router={router} />
</SnackbarProvider>);
