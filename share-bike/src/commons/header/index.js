import React from "react";
import "./index.less"
import {Link} from "react-router-dom"
import "../../style/common.less"
import {formatDate} from "../../utils/index"
import axios from "axios"
import {connect} from "react-redux" //取出
class Header extends  React.Component
{
    time:"";
    constructor(props)
    {
        super(props);
        this.state={
            time:"",
            weather:"",
        }
    }
    componentWillMount()
    {
        this.time=setInterval(()=>{
            let date=+new Date();
            let rs=formatDate(date);
            this.setState({
              time:rs
            });
        },1000);
        this.getWeather();
    }
    componentWillUnmount()
    {
        clearInterval(this.time)
    }
    getWeather()
    {
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res=>{
            let weather=res.data.data.forecast[0];
            let weatherStr=`${weather.low}~${weather.high} ${weather.fx} ${weather.fl}`
            this.setState({
                weather:weatherStr
            });
        })
    }
    render()
    {
        return(
                <div className="header">
                <div className="userinfo clearFix">
                    <div className="out flr">
                        <Link to="/">退出</Link>
                    </div>
                    <div className="detail flr">
                        欢迎，<span className="username">张怡宁</span>
                    </div>
                </div>
                <div className="weather-wrap clearFix">
                    <div className="breadCrumb fll ">{this.props.menuTitle.menuItemTitle}</div>
                    <div className="weather flr">
                        {this.state.weather}
                    </div>
                    <div className="time flr" >
                        {this.state.time}
                    </div>
                 </div>
            </div>
        );
    }

}
function mapSateToProps(state) /**将state映射到组件的props中*/
{
    return{
        menuTitle:state
    }
};
export default connect(mapSateToProps)(Header)
