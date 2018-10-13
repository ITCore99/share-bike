import  React from "react";
import "../../style/common.less";
import "./detailHeader.less"
export default class DetailHeader extends  React.Component
{
    render()
    {
        return(
            <div className="dh-wrap clearFix">
                <div className="title fll">
                    <h2>共享单车平台系统</h2>
                </div>
                <div className="info flr">
                    <span className="name">欢迎，江疏影</span>
                    <div className="logout flr" >退出</div>
                </div>
            </div>
        );
    }
}