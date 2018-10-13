import  React from "react"
import {Menu,Icon} from "antd"
import {Link} from "react-router-dom"
import   "./index.less"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actions from "../../redux/action"
const SubMenu=Menu.SubMenu;
const MenuItem=Menu.Item;


class NavLeft extends React.Component
{
    handlerClick=(item, key, keyPath)=>
    {
        let MenuTitle=item.item.props.children.props.children; /**获取菜单名*/
        // this.props.dispatch({type:"CHANGE_MENU_TITLE",text:MenuTitle}) /**不是很又优雅*/
        this.props.action.changeMenu(MenuTitle);
    }
    render()
    {
        return(
            <div className="nav-left">
                <Menu mode="vertical"   theme="dark" onClick={this.handlerClick}>
                    <MenuItem key="/">
                        <Link to="/layout/home" > 首页 </Link>
                    </MenuItem>
                    <MenuItem key="/订单管理">
                        <Link to="/layout/order" > 订单管理 </Link>
                    </MenuItem>
                    <SubMenu key="sub1" title={<span><span>图测</span></span>}>
                        <MenuItem>
                            <Link to="/layout/cloumn">柱状图</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/layout/pie">饼状图</Link>
                        </MenuItem>
                    </SubMenu>
                    <MenuItem key="/second">
                        <Link to="/layout/secondPage" > 第二页 </Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}
function mapActionToProps(dispatch)
{
    return{
        action: bindActionCreators(actions,dispatch)/**实现action与dispatch的自动关联属性名action*//**将所有的动作放这里*/
    }
}
export default connect(null,mapActionToProps)(NavLeft)