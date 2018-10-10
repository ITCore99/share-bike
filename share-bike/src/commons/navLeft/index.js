import  React from "react"
import {Menu,} from "antd"
import {Link} from "react-router-dom"
import   "./index.less"
const SubMenu=Menu.SubMenu;
const MenuItem=Menu.Item;


export default  class NavLeft extends React.Component
{
    render()
    {
        return(
            <div className="nav-left">
                <Menu mode="vertical"   theme="dark">
                    <MenuItem key="/">
                        <Link to="/layout/home" > 首页 </Link>
                    </MenuItem>
                    <MenuItem key="/second">
                        <Link to="/layout/secondPage" > 第二页 </Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}