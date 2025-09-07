import{createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import { GrResources } from 'react-icons/gr'
import Resources from '../pages/Resources'
import NursingSchoolAdmin from '../pages/NursingSchoolAdmin'
import AllProducts from '../pages/AllProducts'
import AllChannelingAppointments from '../pages/AllChannelingAppointments'
import AllHomeVisitAppointments from '../pages/AllHomeVisitAppointments'
import AllGeneralNotices from '../pages/AllGeneralNotices'
import NursingSchool from '../pages/NursingSchool'
import PharmacyPanel from '../pages/PharmacyLabPanel'
import LaboratoryItemFormPage from '../pages/LaboratoryItemFormPage'
import AllItemsPage from '../pages/AllItemsPage'
import EditItemPage from '../pages/EditItemPage'
import AllStockPage from '../pages/AllStockPage'
import EditStockPage from '../pages/EditStockPage'
import LaboratoryTestForm from '../pages/LaboratoryTestForm'
import AllTestPage from '../pages/AllTestPage'
import EditTestPage from '../pages/EditTestPage'
import ViewTestPage from '../pages/ViewTestPage'
import PharmacyStockFormPage from '../pages/PharmacyStockForm'
import PharmacyLabPanel from '../pages/PharmacyLabPanel'




const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "signup",
                element : <SignUp/>
            },
            {
                path : "all-channelings",
                element : <AllChannelingAppointments/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-channelings",
                        element : <AllChannelingAppointments/>
                    },
                    {
                        path : "Resuorces",
                        element : <Resources/>
                    },
                    {
                        path : "Nursing-School",
                        element : <NursingSchoolAdmin/>
                    }
                ]
            },
            {
                path : "all-homevisits",
                element : <AllHomeVisitAppointments/>
            },
            {
                path : "all-generalnotices",
                element : <AllGeneralNotices/>
            },
            {
                path : "nursing-school",
                element : <NursingSchool/>
            },
            {
                path : "pharmacy-lab-panel",
                element : <PharmacyLabPanel/>,
                children : [
                    {
                        path : "lab-itemiform",
                        element : <LaboratoryItemFormPage/>
                    },
                    {
                        path: "all-items",
                        element: <AllItemsPage/>
                    },
                    {
                        path: "edit-item/:id",
                        element: <EditItemPage/>
                    },
                    {
                        path : "pharmacy-stockform",
                        element : <PharmacyStockFormPage/>
                    },
                    {
                        path: "all-stocks",
                        element: <AllStockPage/>
                    },
                    {
                        path: "edit-stock/:id",
                        element: <EditStockPage/>
                    },
                    {
                        path : "lab-testform",
                        element : <LaboratoryTestForm/>
                    },
                    {
                        path : "all-tests",
                        element : <AllTestPage/>
                    },
                    {
                        path: "edit-test/:id",
                        element: <EditTestPage/>
                    },
                    {
                        path :"view-test/:id",
                        element : <ViewTestPage/>
                    }
        
                ]
            }

        ]
    }
])

export default router
