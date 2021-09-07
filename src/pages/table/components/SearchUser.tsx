import { Form, Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CleanIcon from '@/components/Icons/Clean';

import { Component } from 'react';

class SearchUser extends Component<SearchUserProps<any>> {
  render() {
    const { onReset, onSearch } = this.props;
    return (
      <>
        <Form
          onFinish={(values: any) => {
            if (typeof onSearch === 'function') {
              onSearch(values);
            }
          }}
          onReset={() => {
            if (typeof onReset === 'function') {
              onReset();
            }
          }}
        >
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item name="wsAlias" label="WSAlias">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="englishName" label="English Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="msAlias" label="MSAlias">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button
              htmlType="reset"
              shape="circle"
              style={{ marginRight: 15 }}
              placeholder="Reset"
              size="large"
              icon={<CleanIcon style={{ width: 16, height: 16, fill: '#4259c1' }} />}
            />
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              placeholder="Search"
              size="large"
              icon={<SearchOutlined />}
            />
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default SearchUser;
