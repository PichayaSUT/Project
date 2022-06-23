import { SearchOutlined } from "@ant-design/icons";
import { Calendar, DatePicker } from "@components/replace-moment";
import Editor from "@components/text-editor/TextEditor";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TimePicker,
} from "antd";
import { useState } from "react";

const { Option } = Select;
const { TextArea, Password } = Input;

const Dashboard = () => {
  const [textEditor, setTextEditor] = useState<string>("");
  return (
    <div className="body-page">
      <Row gutter={[24, 24]}>
        <Col md={6}>
          <Input placeholder="Text" />
        </Col>
        <Col md={6}>
          <InputNumber placeholder="Only Number" />
        </Col>
        <Col md={6}>
          <TextArea placeholder="Text Area" rows={1} />
        </Col>
        <Col md={6}>
          <Password placeholder="Password" />
        </Col>
        <Col md={6}>
          <Select placeholder="Select" className="select-custom">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col md={6}>
          <Select
            className="select-custom"
            showSearch
            placeholder="Select and search"
            filterOption={(input: string, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col md={6}>
          <Select
            placeholder="Select multiple"
            mode="multiple"
            className="select-custom"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col md={6}>
          <AutoComplete placeholder="AutoComplete" className="select-custom">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </AutoComplete>
        </Col>
        <Col md={6}>
          <DatePicker placeholder="DatePicker" />
        </Col>
        <Col md={6}>
          <DatePicker.RangePicker />
        </Col>
        <Col md={6}>
          <TimePicker placeholder="TimePicker" />
        </Col>
        <Col md={6}>
          <DatePicker picker="quarter" />
        </Col>
        <Col md={3}>
          <Button type="primary">Primary Button</Button>
        </Col>
        <Col md={3}>
          <Button type="primary" danger>
            Primary Button
          </Button>
        </Col>
        <Col md={3}>
          <Button>Default Button</Button>
        </Col>
        <Col md={3}>
          <Button type="dashed">Dashed Button</Button>
        </Col>
        <Col md={3}>
          <Button type="text">Text Button</Button>
        </Col>
        <Col md={3}>
          <Button type="link">Link Button</Button>
        </Col>
        <Col md={2}>
          <Button shape="circle" type="primary" icon={<SearchOutlined />} />
        </Col>
        <Col md={2}>
          <Button
            shape="circle"
            type="primary"
            danger
            icon={<SearchOutlined />}
          />
        </Col>
        <Col md={2}>
          <Button shape="circle" icon={<SearchOutlined />} />
        </Col>
        <Col md={3}>
          <Switch defaultChecked />
        </Col>
        <Col md={3}>
          <Radio>Radio</Radio>
        </Col>
        <Col md={3}>
          <Checkbox>Checkbox</Checkbox>
        </Col>
        <Col md={16}>
          <Editor
            onChange={(value) => setTextEditor(value)}
            value={textEditor}
          />
          {console.log(textEditor)}
        </Col>
        <Col md={24}>
          <Calendar />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
