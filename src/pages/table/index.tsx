import React from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';

import { StateType } from './model';

import Box from '@/components/ComponentContainer';
import SearchUser from './components/SearchUser';
import AddUser from './components/AddUser';

import { ColumnsType } from 'antd/es/table';
import { Button, Popconfirm, Table, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetch } from './model';
interface UserPageState {
  onEdit: boolean;
  pageSize: number;
}

interface UserPageProps extends ConnectProps {
  item: User[];
  currentItem?: User;
  dispatch: Dispatch<any>;
  currenetPageIndex: number;
  TotalItems: number;
}

class UserPage extends React.Component<UserPageProps, UserPageState> {
  constructor(props: UserPageProps | Readonly<UserPageProps>) {
    super(props);
    this.state = {
      onEdit: false,
      pageSize: 20,
    };
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: 'tableTry/fetch',
      payload: {
        currenetPageIndex: this.props.currenetPageIndex,
        isAdministrator: true,
        pageSize: 20,
      },
    });
  };

  columns: ColumnsType<User> = [
    {
      title: 'WSAlias',
      dataIndex: 'WSAlias',
      key: 'WSAlias',
    },
    {
      title: 'EnglishName',
      dataIndex: 'EnglishName',
      key: 'EnglishName',
    },
    {
      title: 'ChineseName',
      dataIndex: 'ChineseName',
      key: 'ChineseName',
    },
    {
      title: 'DeliverySite',
      dataIndex: 'DeliverySite',
      key: 'DeliverySite',
    },
    {
      title: 'WorkStatus',
      dataIndex: 'WorkStatus',
      key: 'WorkStatus',
    },
    {
      title: 'RoleDescription',
      dataIndex: 'RoleDescription',
      key: 'RoleDescription',
    },
    {
      title: 'MSAlias',
      dataIndex: 'MSAlias',
      key: 'MSAlias',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: User) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => {
              this.handleEdit(record.WSAlias);
            }}
            style={{ marginRight: 5 }}
          />
          <Popconfirm
            title="Are you sure to delete this information?"
            onCancel={() => {}}
            okType="primary"
            onConfirm={() => {
              this.handleDelete(record.WSAlias);
            }}
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              shape="circle"
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  handleDelete = (alias: any) => {
    this.props.dispatch({
      type: 'tableTry/deleteUser',
      payload: alias,
    });
    this.props.dispatch({
      type: 'tableTry/fetch',
    });
  };

  handleEdit = (alias: any): void => {
    this.setState({
      onEdit: true,
    });
    this.props.dispatch({
      type: 'tableTry/searchEmployee',
      payload: alias,
    });
  };

  onSubmit = (user: User) => {
    if (user.MSAlias) {
      this.props.dispatch({
        type: 'tableTry/update',
        payload: user,
      });
    } else {
      this.props.dispatch({
        type: 'tableTry/removeAndInsert',
      });
    }

    this.props.dispatch({
      type: 'tableTry/fetch',
    });

    this.setState({ onEdit: false });
  };

  onCancle = () => {
    this.setState({ onEdit: false });
  };

  onChange = (payload:User) => {
    fetch(payload).then(()=>{
      this.props.dispatch({
        type: 'tableTry/fetch',
      });
    })
  };

  render() {
    const { onEdit } = this.state;
    const { item, currentItem, TotalItems } = this.props;
    

    return (
      <>
        <Box style={{ margin: '15px 0px' }}>
          <SearchUser
            onReset={() => {}}
            onSearch={(values) => {
              this.handleEdit(values.wsAlias);
            }}
          />
        </Box>
        <Box style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              this.props.dispatch({
                type: 'tableTry/removeAndInsert',
                payload: {},
              });
              this.setState({ onEdit: true });
            }}
            style={{ marginRight: 15 }}
          >
            新建
          </Button>
        </Box>
        <Box style={{ margin: '15px 0px' }}>
          <Table<User>
            columns={this.columns}
            dataSource={item}
            sticky={true}
            // pagination={false}
            rowKey={(record) => {
              return record.AID + Date.now(); //在这里加上一个时间戳就可以了
            }}
          />
          {/* <Pagination
            current={this.props.currenetPageIndex}
            onChange={this.onChange}
            total={TotalItems}
            pageSize={5}
          /> */}
        </Box>
        <AddUser
          visible={onEdit}
          onSubmit={this.onSubmit}
          onCancel={this.onCancle}
          defaultValue={currentItem}
        />
      </>
    );
  }
}

export default connect(({ tableTry }: { tableTry: StateType }) => ({
  item: tableTry.item,
  currentItem: tableTry.currentItem,
}))(UserPage);
