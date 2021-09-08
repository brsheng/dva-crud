import React, { useEffect } from 'react';
import { Modal, Input, Form, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';

interface AddUserProps {
  visible: boolean;
  onSubmit: (user: User) => void;
  onCancel: () => void;
  defaultValue: User | undefined;
}

const AddUser: React.FC<AddUserProps> = (props: AddUserProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    const { defaultValue } = props;
    form.setFieldsValue({
      ...defaultValue,
      //将defaultValue展开，使用moment方法重写agentJoindate&agentProductionDate
      agentJoinDate: moment(defaultValue?.AgentJoinDate),
      agentProductionDate: moment(defaultValue?.AgentProductionDate),
    });
  }, [props.defaultValue]);

  const mapToUserModel = (values: any): User => {
    return {
      ...values,
    };
  };

  return (
    <Modal
      forceRender
      title="Employee"
      width="auto"
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
        form.resetFields();
      }}
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={(values: any) => {
          props.onSubmit(mapToUserModel(values));
        }}
        form={form}
      >
        <Row>
          <Col span={12}>
            <Form.Item label="EmployeeID" name="employeeID" rules={[]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="ManagerID" name="managerID" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="ChineseName" name="chineseName" rules={[]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="EnglishName" name="englishName" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="WSAlias" name="wsAlias" rules={[]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="MSAlias" name="msAlias" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="AgentJoinDate" name="agentJoinDate" rules={[]}>
              <DatePicker showTime />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="AgentProductionDate"
              name="agentProductionDate"
              rules={[]}
            >
              <DatePicker showTime />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="WorkStatus" name="workStatus" rules={[]}>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Segment" name="segment" rules={[]}>
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Modality" name="modality" rules={[]}>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Program" name="program" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="DeliveryCount" name="deliveryCountry" rules={[]}>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="DeliveryCompany"
              name="deliveryCompany"
              rules={[]}
            >
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Delivery City" name="deliveryCity" rules={[]}>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="DeliverySite" name="deliverySite" rules={[]}>
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="RoleDescription"
              name="roleDescription"
              rules={[]}
            >
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="PrimarySupportLanguage"
              name="primarySupportLanguage"
              rules={[]}
            >
              <Select />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="SecondarySupportLanguage"
              name="secondarySupportLanguage"
              rules={[]}
            >
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Business" name="business" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Group" name="group" rules={[]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="PlanningCategory"
              name="planningCategoryID"
              rules={[]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Team" name="team" rules={[]}>
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="IsFrontLine" name="isFrontLine" rules={[]}>
              <Select />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddUser;
