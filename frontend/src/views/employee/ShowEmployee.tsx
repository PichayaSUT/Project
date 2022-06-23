import { Layout, Divider, Descriptions, Button } from "antd";
import { Link } from "react-router-dom";

const ShowEmployee = () => {
    return (
      <div>
        <Divider orientation="left"  style={{margin: "0px 0px 30px 0px", fontSize: "40px"}}>ข้อมูลพนักงานรายบุคคล</Divider>
        <Layout.Content
          style={{
            minHeight: "100%",
            margin: "25px 100px 30px 100px", //top right bottom left
            height: "100%",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "5px",
            boxShadow: "#AFACAC 0px 5px 10px",
          }}
        >
          <Link to={"/employee"}>
            <Button style={{left: "900px"}} >ย้อนกลับ</Button>
          </Link>
          <Divider orientation="left" plain style={{margin: "-5px 0px 30px 0px", fontSize: "20px"}}>ข้อมูลส่วนตัว</Divider>
          <Descriptions style={{margin: "0px 0px 0px 80px"}}>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="ชื่อ">นาย สมชาย</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="นามสกุล">ใจดี</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="ชื่อเล่น">แบงค์</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="เพศ">ชาย</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="เลขบัตรประจำตัวประชาชน" span={2}>1234567890123</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="ตำแหน่ง">พนักงานขาย</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="เงินเดือน">2,0000</Descriptions.Item>
          </Descriptions>
          <Divider orientation="left" plain style={{marginBottom: "30px",fontSize: "20px"}}>ที่อยู่</Divider>  
          <Descriptions style={{marginLeft: "80px"}}>
            <Descriptions.Item span={3}>114/300 หมู่บ้าน พฤกษา74 ซอย11 ถนนศรีนคริทร์</Descriptions.Item>
            <Descriptions.Item label="ตำบล" labelStyle={{color: "#03769B"}}>บางเมือง</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="อำเภอ">เมืองสมุทรปราการ</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="จังหวัด">สมุทรปราการ</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="รหัสไปรษณีย์">10270</Descriptions.Item>
          </Descriptions>
          <Divider orientation="left" plain style={{marginBottom: "30px",fontSize: "20px"}}>ช่องทางการติดต่อ</Divider>
          <Descriptions style={{marginLeft: "80px"}}>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="เบอร์โทร">0123456789</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="LineID">somchai555</Descriptions.Item>
            <Descriptions.Item labelStyle={{color: "#03769B"}} label="Email">SomchaiDee@mail.com</Descriptions.Item>
          </Descriptions>
        </Layout.Content>
      </div>
      
    );
  };
  
  export default ShowEmployee;