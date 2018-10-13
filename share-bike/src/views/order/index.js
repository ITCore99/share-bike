import React from "react";
import {Form,Card,Select,DatePicker,Button,Table,Modal,message} from "antd";
import "./index.less";
import {xhr as axios} from "../../utils/index"
const  FormItem=Form.Item;
const  Option = Select.Option;
const { RangePicker} = DatePicker;
const columns=[{title:"订单编号",dataIndex:"order_sn",key:"order_sn"},
              {title:"车辆编号",dataIndex:"bike_sn",key:"bike_sn"},
              {title:"用户",dataIndex:"user_name",key:"user_name"},
              {title:"手机号",dataIndex:"mobile",key:"mobile"},
              {title:"里程",dataIndex:"distance",render(distance){return distance/1000 +"km"},key:"distance"},
              {title:"行驶时长",dataIndex:"total_time",key:"total_time"},
              {title:"状态",dataIndex:"status",key:"status"},
              {title:"开始时间",dataIndex:"start_time",key:"start_time"},
              {title:"结束时间",dataIndex:"end_time",key:"end_time"},
              {title:"订单金额",dataIndex:"total_fee",key:"total_fee"},
              {title:"实付金额",dataIndex:"user_pay",key:"user_pay"}]
class Order extends  React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            city:[{label:"北京", value:"0"}, {label:"上海",value:"1"},{label:"广州",value:"2"}],
            status:[{label:"全部",value:"0"},{label:"进行中",value:"1"},{label:"行程结束",value:"2"}],
            data:[],
            totalData:"",
            isLoading:false,
            selectedData:"",
            selectedIndex:"",
            visible:false,
            endItem:"" /**结束点*/
        }
    };
    getData(param)
    {
        this.setState({
            isLoading:true,
        });
        axios.get("/order/list",param).then(res=>{
            if(res.data.code==0)
            {
                this.setState({
                    data:res.data.result.item_list.map((item,index)=>{
                     item.key=index;
                     return item; /**注意return的是item*/
                }),
                    isLoading:false,
                    totalData:res.data.result.total_count,
                })
            }else
            {
                Modal.error({
                    title: '错误提示',
                    content: '数据获取失败',
                });
                this.setState({
                    isLoading:false,
                });
            }
        })

    };
    componentWillMount()
    {
        this.getData({pn:1});
    };
    //显示订单列表
    handleClick=()=>  /**注意原始函数的this指向window*/
    {
        let item=this.state.selectedData;
        let _this=this;
        if(item)
        {
            axios.get("/order/ebike_info").then(res=>{
                console.log(res.data);
                if(res.data.code==0)
                {
                    _this.setState({
                        endItem:res.data.result,
                        visible:true
                    })
                }
        })
        } else
        {
             message.info("请选择一条订单");/**注意message不能是一个对象只能是字符串*/
        }
    };
    //请求服务器去结束订单
    confrimHandle=()=>{
        axios.get("/order/finish_order",this.state.endItem.id).then(res=>{
            console.log(res.data);
        if(res.data.code=="0")
        {
          this.getData({pn:1});
          this.setState({
            visible:false,
            selectedIndex:""
        });
          message.success("结束行程成功");
        }
    })
    };
    //查询
    searchHandle=()=>{
        console.log(this.props.form.getFieldsValue());
    };
    //重置
    ResetHandle=()=>{
        this.props.form.resetFields();
    };
    handlerDetail=()=>
    {
        let item=this.state.selectedData;
        if(item)
        {
            window.open(`/details/${item[0].id}`,'_blank')

        }else
        {
            message.info("请选择一条订单");
        }
    };
    render(){
        const { getFieldDecorator }=this.props.form;
        let _this=this;
        let paginationOptions={
            total:this.state.totalData,
            pageSize:10,
            onChange:(index)=>{
                _this.getData({pn:index});
            }
        };
        let rowSelection={
            type:"radio",
            selectedRowKeys:this.state.selectedIndex,
            onChange:(selectedRowKeys, selectedRows)=>
            {
                this.setState({   /**异步的*/
                    selectedData:selectedRows,
                    selectedIndex:selectedRowKeys
                },()=>{
            });
            }
        };
        return (
            <div className="order-wraper">
            <Card>
                <Form layout="inline">
                    <FormItem label="城市">
                            {getFieldDecorator("city",{rules:[{}],})(
                        <Select style={{width:"230px"}} placeholder="请选择城市">
                            {this.state.city.map((item,index)=><Option value={item.value} key={index}>{item.label}</Option>)}
                        </Select>
                         )}
                    </FormItem>
                    <FormItem label="选择日期">
                        {getFieldDecorator("date",{})(
                            <RangePicker></RangePicker>
                    )}
                    </FormItem>
                    <FormItem label="选择状态">
                        {getFieldDecorator("status",{rules:[{}],})(
                        <Select style={{width:"230px"}} placeholder="请选择状态">
                             { this.state.status.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>
                    )}
                    </FormItem>
                </Form>
            </Card>
            <Card style={{marginTop:"-1px"}}>
                <Button type="primary" className="search" onClick={this.searchHandle}>查询</Button>
                <Button onClick={this.ResetHandle}>重置</Button>
            </Card>
            <Card style={{marginTop:"-1px"}}>
                <Button type="primary" className="search" onClick={this.handlerDetail}>订单详情</Button>
                <Button onClick={this.handleClick}>结束订单</Button>
            </Card>
            <Card style={{marginTop:"-1px"}}>
                <Table
                        columns={columns}
                        bordered={true}
                        loading={this.state.isLoading}
                        pagination={paginationOptions}
                        rowSelection={rowSelection}
                        dataSource={this.state.data} />
            </Card>
            <Modal
            title="结束行程的订单信息"
            visible={this.state.visible}
            onCancel={()=>{this.setState({visible:false})}}
            onOk={this.confrimHandle}
            okText="确认"
            cancelText="取消">
                <ul className='ul-data'>
                     <li>
                        <span className='car-num li-title'>车辆编号：</span>
                                {this.state.endItem.bike_sn}
                     </li>
                     <li>
                        <span className='car-num li-title'>剩余电量：</span>
                                {this.state.endItem.battery}
                     </li>
                    <li>
                        <span className='car-num li-title'>行程开始时间：</span>
                                {this.state.endItem.start_time}
                    </li>
                    <li>
                        <span className='car-num li-title'>当前位置：</span>
                                {this.state.endItem.location}
                    </li>
                </ul>
            </Modal>
            </div>
        );
    }
}
export default Form.create()(Order)