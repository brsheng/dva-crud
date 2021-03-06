import React from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';

import { StateType } from './model';

import Box from '@/components/ComponentContainer';
import SearchUser from './components/SearchUser';
import AddUser from './components/AddUser';
import UserDetail from './components/UserDetails';

import { ColumnsType } from 'antd/es/table';
import { Button, Popconfirm, Table, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { deleteUser, update, removeAndInsert } from '@/services/userService';
interface UserPageState {
  onEdit: boolean;
  onDetails: boolean;
  currenetPageIndex: number;
  pageSize: number;
}

interface UserPageProps extends ConnectProps {
  users: StateType;
  item: User[];
  currentItem?: User;
  dispatch: Dispatch;
  TotalItems: number;
  ItemsPerPage: number;
  CurrentPage: number;
  userRoles: string;
  userDatas: string;
  englishName: string;
  wsAlias: string;
  msAlias: string;
}

class UserPage extends React.Component<UserPageProps, UserPageState> {
  constructor(props: UserPageProps | Readonly<UserPageProps>) {
    super(props);
    this.state = {
      onEdit: false,
      onDetails: false,
      currenetPageIndex: 0,
      pageSize: 20,
    };
  }

  columns: ColumnsType<User> = [
    {
      title: 'WSAlias',
      dataIndex: 'WSAlias',
      key: 'WSAlias',
      render: (WsAlias) => (
        <a
          onClick={() => {
            {
              this.setState({
                onDetails: true,
              });
              this.props.dispatch({
                type: 'users/searchEmployee',
                payload: WsAlias,
              });
            }
          }}
        >
          {WsAlias}
        </a>
      ),
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

  componentDidMount = () => {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        currenetPageIndex: 0,
        isAdministrator: true,
        pageSize: 20,
      },
    });
  };

  handleEdit = (alias: any): void => {
    this.setState({
      onEdit: true,
    });
    this.props.dispatch({
      type: 'users/searchEmployee',
      payload: alias,
    });
  };

  handleDelete = (alias: any): void => {
    deleteUser(alias).then(() => {
      this.props.dispatch({
        type: 'users/fetch',
        payload: {
          currenetPageIndex: 0,
          isAdministrator: true,
          pageSize: 20,
        },
      });
    });
  };

  onSubmit = (user: User) => {
    const service = !user.MSAlias ? update : removeAndInsert;
    service(user).then(() => {
      this.props.dispatch({
        type: 'users/fetch',
        payload: {
          currenetPageIndex: 0,
          isAdministrator: true,
          pageSize: 20,
        },
      });
    });
    this.setState({ onEdit: false });
  };

  onCancle = () => {
    this.setState({ onEdit: false, onDetails: false });
  };

  paginationHandler = (page: number, pageSize?: number) => {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        currenetPageIndex: page,
        pageSize: pageSize ? pageSize : this.props.ItemsPerPage,
        isAdministrator: true,
      },
    });
  };

  pageSizeHandler = (current: number, size: number) => {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        currenetPageIndex: current,
        pageSize: size,
      },
    });
  };

  render() {
    const { onEdit, onDetails } = this.state;
    const {
      item,
      currentItem,
      TotalItems,
      CurrentPage,
      ItemsPerPage,
      dispatch,
    } = this.props;

    return (
      <>
        <Box style={{ margin: '15px 0px' }}>
          <SearchUser
            onReset={() => {}}
            onSearch={(values) => {
              dispatch({
                type: 'users/fetch',
                payload: {
                  englishName: values.englishName,
                  wsAlias: values.wsAlias,
                  msAlias: values.msAlias,
                  currenetPageIndex: 0,
                  isAdministrator: true,
                  pageSize: 20,
                },
              });
            }}
          />
        </Box>
        <Box style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ onEdit: true });
              this.props.dispatch({
                type: 'users/removeAndInsert',
                payload: {
                  wsAlias: this.props.wsAlias,
                  userRoles: this.props.userRoles,
                  userDatas: this.props.userDatas,
                },
              });
            }}
            style={{ marginRight: 15 }}
          >
            ??????
          </Button>
        </Box>
        <Box style={{ margin: '15px 0px' }}>
          <Table<User>
            columns={this.columns}
            dataSource={item}
            sticky={true}
            pagination={false}
            rowKey={(record) => {
              return record.AID + Date.now();
            }}
          />
          <Pagination
            style={{ textAlign: 'right' }}
            total={TotalItems}
            onChange={this.paginationHandler}
            onShowSizeChange={this.pageSizeHandler}
            current={CurrentPage}
            pageSize={ItemsPerPage}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
        </Box>
        <AddUser
          visible={onEdit}
          onSubmit={this.onSubmit}
          onCancel={this.onCancle}
          defaultValue={currentItem}
        />
        <UserDetail
          visible={onDetails}
          onCancel={this.onCancle}
          defaultValue={currentItem}
        />
      </>
    );
  }
}

export default connect(({ users }: { users: StateType }) => ({
  item: users.item,
  TotalItems: users.TotalItems,
  ItemsPerPage: users.ItemsPerPage,
  currenetPageIndex: users.currenetPageIndex,
  isAdministrator: users.isAdministrator,
  CurrentPage: users.CurrentPage,
  currentItem: users.currentItem,
}))(UserPage);
