import  React from "react";
import  {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import  home from "../views/home/index"
import  notMatch from "../views/notMatch/index"
import  LayOut from "../views/layout/index"
import  SecondPage from "../views/secondPage/index"
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
                                     <Route path="/layout/secondPage" component={SecondPage}></Route>
                                     <Route path=""component={notMatch}></Route>
                                 </Switch>
                            </LayOut>
                        }></Route>
                        <Route component={notMatch}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}