import React from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';

import { StateType } from './model';

import Box from '@/components/ComponentContainer';
import SearchUser from './components/SearchUser';
import AddUser from './components/AddUser';
import UserDetail from './components/details';

import { ColumnsType } from 'antd/es/table';
import { Button, Popconfirm, Table, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
interface UserPageState {
  onEdit: boolean;
  onDetails: boolean;
}

interface UserPageProps extends ConnectProps {
  users: StateType;
  item: User[];
  currentItem?: User;
  dispatch: Dispatch;
  TotalItems: number;
  ItemsPerPage: number;
  CurrentPage: number;
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
    };
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: 'tableTry/fetch',
      payload: {
        currenetPageIndex: this.props.CurrentPage,
        isAdministrator: true,
        pageSize: this.props.ItemsPerPage,
      },
    });
  };

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
                type: 'tableTry/searchEmployee',
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

  handleDelete = (alias: any) => {
    this.props.dispatch({
      type: 'tableTry/deleteUser',
      payload: alias,
    });
    // this.props.dispatch({
    //   type: 'tableTry/fetch',
    //   payload: {
    //     wsAlias: this.props.wsAlias,
    //     currenetPageIndex: this.props.CurrentPage,
    //     isAdministrator: true,
    //     pageSize: this.props.ItemsPerPage,
    //   },
    // });
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
    if (!user.MSAlias) {
      this.props.dispatch({
        type: 'tableTry/update',
        payload: user,
      });
    } else {
      this.props.dispatch({
        type: 'tableTry/removeAndInsert',
      });
    }
    this.setState({ onEdit: false });
  };

  onCancle = () => {
    this.setState({ onEdit: false, onDetails: false });
  };

  paginationHandler = (page: number, pageSize?: number) => {
    this.props.dispatch({
      type: 'tableTry/fetch',
      payload: {
        currenetPageIndex: page,
        pageSize: pageSize ? pageSize : this.props.ItemsPerPage,
        isAdministrator: true,
      },
    });
  };

  render() {
    const { onEdit, onDetails } = this.state;
    const { item, currentItem } = this.props;

    return (
      <>
        <Box style={{ margin: '15px 0px' }}>
          <SearchUser
            onReset={() => {}}
            onSearch={(values) => {
              this.props.dispatch({
                type: 'tableTry/fetch',
                payload: {
                  englishName: values.englishName,
                  wsAlias: values.wsAlias,
                  msAlias: values.msAlias,
                  currenetPageIndex: this.props.CurrentPage,
                  isAdministrator: true,
                  pageSize: this.props.ItemsPerPage,
                },
              });
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
            pagination={false}
            rowKey={(record) => {
              return record.AID + Date.now(); //在这里加上一个时间戳就可以了
            }}
          />
          <Pagination
            style={{ textAlign: 'right' }}
            total={this.props.TotalItems}
            onChange={this.paginationHandler}
            // onShowSizeChange={this.pageSizeHandler}
            current={this.props.CurrentPage}
            pageSize={this.props.ItemsPerPage}
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

export default connect(({ tableTry }: { tableTry: StateType }) => ({
  item: tableTry.item,
  TotalItems: tableTry.TotalItems,
  ItemsPerPage: tableTry.ItemsPerPage,
  currenetPageIndex: tableTry.currenetPageIndex,
  pageSize: tableTry.pageSize,
  isAdministrator: tableTry.isAdministrator,
  CurrentPage: tableTry.CurrentPage,
  currentItem: tableTry.currentItem,
}))(UserPage);
