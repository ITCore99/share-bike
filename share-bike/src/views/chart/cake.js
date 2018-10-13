import  React from "react";
import {Card} from "antd"
import ReactEcharts from "echarts-for-react";
import echarts from "echarts/lib/echarts"; //引入echarts核心包
//引入组件
import 'echarts/lib/chart/pie';   //引入饼图组件
import 'echarts/lib/component/title'
import "echarts/lib/component/legend"
//导入主题
import echartsTheme from "./themeLight"
export default class Cake extends React.Component
{
    componentWillMount()
    {
        echarts.registerTheme("theme",echartsTheme)
    }
    render()
    {
        let option = {
            title : {
                text: '用户骑行订单',
                subtext: '饼状展示图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top:'20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '用户骑行订单',
                    type: 'pie',
                    radius : '70%', /**大小*/
                    center: ['50%', '60%'],/**相对中间点的偏移量*/
                    data:[
                        {value:3350, name:'周一'},
                        {value:3100, name:'周二'},
                        {value:2340, name:'周三'},
                        {value:1350, name:'周四'},
                        {value:15480, name:'周五'},
                        {value:10480, name:'周六'},
                        {value:12480, name:'周日'},
                    ],
                    itemStyle: {  /**显示item的相关配置*/
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        let option2 = {
            title : {
                text: '用户骑行订单',
                subtext: '环状展示图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top:'20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '用户骑行订单',
                    type: 'pie',
                    radius :["50%","80%"], /**大小*/
                    center: ['50%', '60%'],/**相对中间点的偏移量*/
                    data:[
                        {value:3350, name:'周一'},
                        {value:3100, name:'周二'},
                        {value:2340, name:'周三'},
                        {value:1350, name:'周四'},
                        {value:15480, name:'周五'},
                        {value:10480, name:'周六'},
                        {value:12480, name:'周日'},
                    ],
                    itemStyle: {  /**显示item的相关配置*/
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return (
            < div className = "cake-warper" >
                <Card title="饼状图一">
                    <ReactEcharts option={option} theme="theme"></ReactEcharts>
                </Card>
                <Card title="饼状图二">
                <ReactEcharts option={option2} theme="theme"></ReactEcharts>
                </Card>
            < /div>

    );
    }

}