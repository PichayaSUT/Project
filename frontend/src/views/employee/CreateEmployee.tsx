import { Form, Input, Button, Select, Divider } from 'antd';
import { Link} from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const { Option } = Select;

const CreateEmployee = () => {
    return (
      <div>
        <h1>เพิ่มข้อมูลพนักงาน</h1>
        <Divider style={{margin: "-5px 0px 40px 0px" }}/>
       <Form {...layout}>
       <Form.Item name="gender" label="เพศ">
          <Select
            style={{ width: '50%' }}
            placeholder="กรุณาเลือก เพศ"
            allowClear
          >
            <Option value="female">หญิง</Option>
            <Option value="male">ชาย</Option>
            <Option value="other">อื่นๆ</Option>
          </Select>
        </Form.Item>
      <Form.Item name={['user', 'firstname']} label="ชื่อ" >
        <Input placeholder="กรุณากรอก ชื่อ"/>
      </Form.Item>
      <Form.Item name={['user', 'lastname']} label="นามสกุล" >
        <Input placeholder="กรุณากรอก นามสกุล"/>
      </Form.Item>
      <Form.Item name={['user', 'IDcardNum']} label="เลขบัตรประชาชน" >
        <Input placeholder="กรุณากรอก เลขบัตรประชาชน"/>
      </Form.Item>
      <Form.Item name={['user', 'nickname']} label="ชื่อเล่น">
        <Input style={{ width: '50%' }} placeholder="กรุณากรอก ชื่อเล่น"/>
      </Form.Item>
      <Form.Item name="position" label="ตำแหน่ง" >
          <Select
            style={{ width: '50%'}}
            placeholder="กรุณาเลือก ตำแหน่ง"
            allowClear
          >
            <Option value="A">ผู้จัดการ</Option>
            <Option value="B">พนักงานขาย</Option>
            <Option value="C">พนักงานบัญชี</Option>
          </Select>
        </Form.Item>
      <Form.Item name={['user', 'address']} label="ที่อยู่" >
        <Input.TextArea placeholder="กรุณากรอก ที่อยู่"/>
      </Form.Item>
      <Form.Item name="sub-district" label="ตำบล" >
          <Select
            style={{ width: '50%'}}
            placeholder="กรุณาเลือก ตำบล"
            allowClear
          >
            <Option value="บางใหญ่">บางใหญ่</Option>
            <Option value="สองสาม">สองสาม</Option>
            <Option value="คลองน้อย">คลองน้อย</Option>
          </Select>
        </Form.Item>
        <Form.Item name="district" label="อำเภอ">
          <Select
            style={{ width: '50%' }}
            placeholder="กรุณาเลือก อำเภอ"
            allowClear
          >
            <Option value="บางใหญ่">บางใหญ่</Option>
            <Option value="สองสาม">สองสาม</Option>
            <Option value="คลองน้อย">คลองน้อย</Option>
          </Select>
        </Form.Item>
        <Form.Item name="province" label="จังหวัด">
          <Select
            style={{ width: '50%' }}
            placeholder="กรุณาเลือก จังหวัด"
            allowClear
          >
            <Option value="บางใหญ่">กรุงเทพมหานคร</Option>
            <Option value="สองสาม">สมาุทรปราการ</Option>
            <Option value="คลองน้อย">นนทบุรี</Option>
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'ZIPcode']} label="รหัสไปรษณีย์" >
          <Input style={{ width: '50%' }} placeholder="กรุณากรอก รหัสไปรษณีย์"/>
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="เบอร์โทร" >
          <Input style={{ width: '50%' }} placeholder="กรุณากรอก เบอร์โทร"/>
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" >
          <Input placeholder="กรุณากรอก Email"/>
        </Form.Item>
        <Form.Item name={['user', 'lineID']} label="LineID" >
          <Input placeholder="กรุณากรอก LineID" />
        </Form.Item>
        <Form.Item name={['user', 'salary']} label="เงินเดือน" >
          <Input style={{ width: '50%' }} placeholder="กรุณากรอก เงินเดือน"/>
        </Form.Item>
        <Form.Item name="access-right" label="ประเภทสิทธิ์การเข้าถึง">
          <Select
            placeholder="กรุณาเลือก สิทธิ์การเข้าถึง"
            allowClear
          >
            <Option value="superadmin">super admin</Option>
            <Option value="admin">admin</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{marginTop: "300px" }} name={['user', 'password']} label="รหัสผ่าน" >
          <Input  placeholder="กรุณากรอก รหัสผ่าน"/>
        </Form.Item>
        <Form.Item  name={['user', 'confirm-password']} label="ยืนยันรหัสผ่าน" >
          <Input  placeholder="กรุณายืนยันรหัสผ่าน"/>
        </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button 
          style={{ float: "right",  width: '20%', marginLeft: 5,borderRadius: "5px"}} 
          type="primary" 
          >
          บันทึก
        </Button>
        <Link to={"/employee"}>
        <Button  style={{ float: "right",  width: '20%',borderRadius: "5px"}}>
          ย้อนกลับ
        </Button>
        </Link>
      </Form.Item>
    </Form>
      </div>
    );
  };
  
  export default  CreateEmployee;