import  React from "react"
import  ImgSrc from"./404.jpg"
import {Link} from "react-router-dom"
import "../../style/common.less"
import "./index.less"
export default  class NotMatch extends React.Component
{
    render()
    {
        return(
            <div className="notFound clearFix">
               <div className="left fll">
                    <h1 className="title">Oh my god !</h1>
                    <h2>404,你的页面走丢了~</h2>
                    <ul>
                        <li>请重新刷新页面！</li>
                        <li>请重检查你的网络问题！</li>
                        <li><Link to="/layout/home">回首页</Link></li>
                    </ul>

               </div>
               <div className="right fll">
                    <img src={ImgSrc} className="img"/>
               </div>
            </div>
        );
    }
}