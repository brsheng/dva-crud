import React, { useEffect } from 'react';
import { Modal, Input, Form, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';

interface AddUserProps {
  visible: boolean;
  onCancel: () => void;
  defaultValue: User | undefined;
}

const UserDetail: React.FC<AddUserProps> = (props: AddUserProps) => {
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

  return (
    <Modal
      forceRender
      footer={null}
      title="Employee"
      width="auto"
      visible={props.visible}
      maskClosable={false}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} form={form}>
        {/* <Form  form={form}> */}
        <Row>
          <Col span={12}>
            <Form.Item label="EmployeeID" name="employeeID" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="ManagerID" name="managerID" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="ChineseName" name="chineseName" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="EnglishName" name="englishName" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="WSAlias" name="wsAlias" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="MSAlias" name="msAlias" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="AgentJoinDate" name="agentJoinDate" rules={[]}>
              <DatePicker showTime disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="AgentProductionDate"
              name="agentProductionDate"
              rules={[]}
            >
              <DatePicker showTime disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="WorkStatus" name="workStatus" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Segment" name="segment" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Modality" name="modality" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Program" name="program" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="DeliveryCount" name="deliveryCountry" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="DeliveryCompany"
              name="deliveryCompany"
              rules={[]}
            >
              <Select disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Delivery City" name="deliveryCity" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="DeliverySite" name="deliverySite" rules={[]}>
              <Select disabled={true} />
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
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="PrimarySupportLanguage"
              name="primarySupportLanguage"
              rules={[]}
            >
              <Select disabled={true} />
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
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Business" name="business" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Group" name="group" rules={[]}>
              <Input disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="PlanningCategory"
              name="planningCategoryID"
              rules={[]}
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Team" name="team" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="IsFrontLine" name="isFrontLine" rules={[]}>
              <Select disabled={true} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserDetail;
