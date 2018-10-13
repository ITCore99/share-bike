import  React from "react";
import {Card} from "antd";
import echarts from "echarts/lib/echarts"; //引入echarts核心包
import ReactEcharts from "echarts-for-react";//引入第三方封装好的react库
//引入bar模块
import 'echarts/lib/chart/bar'; //引入条形图组件
//导入主题
import echartsTheme from "./echartTheme"
//引入组件
import 'echarts/lib/component/title'
import "echarts/lib/component/legend" //引入legend组件
export  default  class Column extends  React.Component
{
    componentWillMount()
    {
        echarts.registerTheme("theme",echartsTheme);
    }
    render()
    {
       let option1= {
            title:{
                text:"ofo周单车骑行情况"
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'ofo单车周骑行情况',
                    type:'bar',
                    barWidth: '40%',
                    data:[1000, 2500, 5000, 4000, 4500, 2000, 2500]
                }
            ]
        };
        let option2 = {
            title: {
                text: "共享单车骑行情况"
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            legend: {
                data: ["OFO", "摩拜", "小蓝单车"]
            } ,
            series: [
                {
                    name:'OFO',
                    type:'bar',
                    data:[500, 1000, 1600, 3000, 2800, 2600, 2870]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [600, 1200, 1800, 5000, 6000, 8000, 10000]
                },
                {
                    name: '小蓝单车',
                    type: 'bar',
                    data: [300, 600, 800, 1800, 2000, 1500, 1000]
                }
            ]

        };
        return(
            <div>
                <Card title="柱状图1">
                    <ReactEcharts option={option1} theme="theme"></ReactEcharts>
                </Card>
                <Card title="柱状图2" style={{marginTop:"20px"}}>
                    <ReactEcharts option={option2} theme="theme"></ReactEcharts>
                </Card>
            </div>
        );
    }
}
