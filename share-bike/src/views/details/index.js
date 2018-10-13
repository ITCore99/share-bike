import React from "react";
import "./index.less"
import DH from "../../commons/header/detailHeader"
import {Card} from "antd"
import {xhr as axios} from "../../utils/index"
export default  class Details extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            info:""
        }
    }
    componentDidMount()
    {
        this.getData();
    }
    initMap=(result)=>{  /***初始化地图*/
        const BMap=window.BMap;
        /**将地图实例存储起来*/
        this.map =  new BMap.Map("bmap-container");          // 创建地图实例
        // const point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        // this.map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.addControl();
        this.drawPloyLine(result.position_list);
        this.drawServiesArea(result.area);
    };
    drawPloyLine=(position_list)=> /**绘制骑行路线的折线图*/
    {
        let BMap=window.BMap;
        let map=this.map;
        let startPoint=position_list[0]; //起点
        let endPoint=position_list[position_list.length-1]; //终点
        let startBMapPoint=new BMap.Point(startPoint.lon,startPoint.lat); //绘制一个百度地图上起点
        let endBMapPoint=new BMap.Point(endPoint.lon,endPoint.lat); //绘制一个百度地图上终点
        //新建一个起点icon
        let myStartIcon = new BMap.Icon("./images/start_point.png", new BMap.Size(36, 42), {
            imageSize:new BMap.Size(36, 42)
        });
        //新建一个终点icon
        let myEndIcon = new BMap.Icon("./images/end_point.png", new BMap.Size(36, 42), {
            imageSize:new BMap.Size(36, 42)
        });
        var Startmarker = new BMap.Marker(startBMapPoint,);        // 创建开始标注
        var Endtmarker = new BMap.Marker(endBMapPoint,);        // 创建结束标注
        map.addOverlay(Startmarker);                            // 将开始标注添加到地图中
        map.addOverlay(Endtmarker);                           //将结束标注添加到地图上
        map.centerAndZoom(startBMapPoint, 11);         //以起始点点为中心设置地图
         //绘制折线
        var polyline = new BMap.Polyline(
                position_list.map(item=>{                 /**将数组点变为百度地图点*/
                    return new BMap.Point(item.lon,item.lat);
                })
            ,
            {strokeColor:"#f00", strokeWeight:3, strokeOpacity:0.8}
        );
        map.addOverlay(polyline);
    };
    drawServiesArea=(area)=>  /**绘制骑行覆盖区域*/
    {
       let BMap=window.BMap;
       let map=this.map;
       let 	Polygon=new BMap.Polygon(
           area.map(item=>{
               return new BMap.Point(item.lon,item.lat);
           }),{
               strokeColor:"#f00",
               fillColor:"#ff6700",
               strokeOpacity:0.5,
               strokeWeight:3,
           }
       );
       map.addOverlay(Polygon);
    };
    getData=()=> /**获取骑行的数据*/
    {
        let {id}=this.props.match.params;
        console.log(this.props);
        axios.get("/order/detail",{"id":id}).then(res=>{
            console.log(res.data);
            if(res.data.code==0)
            {
                this.initMap(res.data.result); /**注意是这个钩子函数中因为他们使用了页面HTML**/
                this.setState({
                    info:res.data.result
                })
            }
        })
    }
    addControl=()=>{ /**添加地图上的空间**/

        const BMap=window.BMap;
        const map=this.map;
        map.addControl(new BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new BMap.OverviewMapControl({anchor:window.BMAP_ANCHOR_BOTTOM_RIGHT}));
        map.addControl(new BMap.MapTypeControl({anchor:window.BMAP_ANCHOR_BOTTOM_RIGHT}));
        // map.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    };
    render()
    {
        let info=this.state.info;
        return(
            <div className="detail-wrap">
               <DH></DH>
               <Card>
                    <div className="bmap-wraper" id="bmap-container">
                    </div>
                    <div className="detail-info">
                        <div className="title">基础信息:</div>
                        <ul>
                            <li>
                                <span className="info-left">用车模式:</span>
                                <span className="info-right">{info.mode == 1 ? '服务区': '停车点'}</span>
                            </li>
                            <li>
                                <span className="info-left">订单编号:</span>
                                <span className="info-right">{info.order_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">车辆编号:</span>
                                <span className="info-right">{info.bike_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">用户姓名:</span>
                                <span className="info-right">{info.user_name}</span>
                            </li>
                            <li>
                                <span className="info-left">手机号码</span>
                                <span className="info-right">{info.mobile}</span>
                            </li>
                        </ul>
                    </div>
               </Card>
            </div>
        );
    }
}