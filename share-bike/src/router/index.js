import  React from "react";
import  {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import  home from "../views/home/index"
import  notMatch from "../views/notMatch/index"
import  LayOut from "../views/layout/index"
import  SecondPage from "../views/secondPage/index"
import  Order from "../views/order/index"
import  Cloumn from "../views/chart/column"
import  Cake from "../views/chart/cake"
import  Details from "../views/details/index"
export default class router extends React.Component
{
    render()
    {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path="/layout" render={()=>
                           <LayOut>
                                 <Switch>
                                     <Route path="/layout/home" component={home}></Route>
                                     <Route path="/layout/order" component={Order}></Route>
                                     <Route path="/layout/secondPage" component={SecondPage}></Route>
                                     <Route path="/layout/cloumn" component={Cloumn}></Route>
                                     <Route path="/layout/pie" component={Cake}></Route>
                                     <Route path=""component={notMatch}></Route>
                                 </Switch>
                            </LayOut>
                        }></Route>
                        <Route path="/details/:id" component={Details}></Route>
                        <Route component={notMatch}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}