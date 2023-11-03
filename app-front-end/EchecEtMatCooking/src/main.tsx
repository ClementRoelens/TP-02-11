import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from "./config/app-routing.tsx";
import { Provider } from "react-redux";
import { store } from "./config/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>



)
