import { ROUTH_PATHS} from "./Route_Paths";
import Login from "../components/pages/Login/login";
import  Layout from '../components/pages/Layout';
import Register from "../components/pages/Login/Rigster";
import Landing from "../components/pages/Landing";
import Category from '../components/pages/categories/categories'
import Subcategories from "../components/pages/categories/subcategories";
import Product_List from "../components/pages/Products/Product_List";
import Product_Details_Page from "../components/pages/Products/Product_Details";
import Business from "../components/pages/Login/business";
export const routes =[
    {
        path:ROUTH_PATHS.LAYOUT_PATH,
        element :<Layout/>,
        children :[{
            path:ROUTH_PATHS.LANDING_PATH,
            element : <Landing/>
            
        },{
            path: ROUTH_PATHS.CATEGORY_PATH,
            element:<Category/>
        },
        {
           path:ROUTH_PATHS.SUBCATEGORY_PATH,
           element:<Subcategories/>
        },
        {
            path: ROUTH_PATHS.PRODUCT_PATH,
            element:<Product_List/>
        },
        {
            path:ROUTH_PATHS.PRODUCT_DETAILs_PATH,
            element:<Product_Details_Page/>
        }
    ] 
    },
{
    path:ROUTH_PATHS.LOGIN_PATH,
    element :<Login/>
},
{
    path:ROUTH_PATHS.REGISTER_PATH,
    element :<Register/>
},
{
  path:ROUTH_PATHS.BUSINESS_PATH,
  element:<Business/>
},

{
    path: ROUTH_PATHS.NO_MATCH,
    element: <div>404: Page Not Found</div>,
},

]