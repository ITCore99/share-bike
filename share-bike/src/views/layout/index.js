import  React from "react"
import  Header from "../../commons/header"
import  NavLeft from "../../commons/navLeft"
import  Fooster from "../../commons/fooster"
import  {Row,Col} from "antd"
import "./index.less"
export default  class Layout extends React.Component
{
    render()
    {
        return(
            <div className="layout">
                <Row>
                    <Col span={4}>
                        <NavLeft/>
                    </Col>
                    <Col span={20}>
                        <Header/>
                        <div className="content-wrap">
                             <div className="content">{this.props.children}</div>
                        </div>
                        <Fooster/>
                    </Col>
                </Row>
            </div>
        );
    }
}