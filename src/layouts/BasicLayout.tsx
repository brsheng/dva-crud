import React from 'react';
import styles from './index.css';

import { connect, ConnectProps } from 'umi';

import { Layout, Menu, Breadcrumb } from 'antd';

import GlobalHeader from '@/components/GlobalHeader/index';
import GlobalFooter from '@/components/GlobalFooter/index';
import SiderMenu from '@/components/SiderMenu/index';

import Box from '@/components/ComponentContainer';

import { getMenuData } from '../common/menu';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import CommonLayout from './CommonLayout';
import { StateType } from '@/models/login';

interface BasicLayoutProps extends ConnectProps {
	currentUser?: User;
}

class BasicLayout extends React.Component<BasicLayoutProps> {
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed: boolean) => {
		this.setState({ collapsed });
	};

	buildMenuItems = () => {
		const { currentUser } = this.props;

		return (
			currentUser &&
			currentUser.modules &&
			currentUser.modules.map((item) => ({
				name: item.name,
				path: '',
				key: item.key,
				children: getMenuData(item.menus),
			}))
		);
	};

	render() {
		const { collapsed } = this.state;
		const { children, location } = this.props;

		return (
			<CommonLayout>
				<Sider collapsed={collapsed} onCollapse={this.onCollapse}>
					<SiderMenu menus={this.buildMenuItems()} location={location} />
				</Sider>
				<Layout className="site-layout">
					<Content style={{ margin: '0 16px' }}>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							{children}
						</div>
					</Content>
				</Layout>
			</CommonLayout>
		);
	}
}

export default connect(({ login }: { login: StateType }) => ({
	currentUser: login.currentUser,
}))(BasicLayout);
