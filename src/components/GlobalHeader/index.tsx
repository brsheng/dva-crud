import React from 'react';

import { Menu, Dropdown, Layout, Button, Avatar, Badge } from 'antd';

import { ConnectProps, Link, useIntl } from 'umi';

import { Localization } from '@/components/Localization/index';

import styles from './index.less';

import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface GlobalHeaderProps extends ConnectProps {
	currentUser?: User;
	logo?: string;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
	const intl = useIntl();
	const { currentUser, logo } = props;

	return (
		<Header className={styles.header}>
			{logo && <div>{logo}</div>}
			<div
				style={{
					display: 'flex',
					float: 'right',
					minWidth: 150,
					justifyContent: 'space-between',
				}}
			>
				<div>
					{currentUser && (
						<Dropdown
							overlay={
								<Menu>
									<Menu.Item>
										<Link to="/change-password">
											{intl.formatMessage({ id: 'menu.change.password' })}
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="/logout">
											{intl.formatMessage({ id: 'menu.logout' })}
										</Link>
									</Menu.Item>
								</Menu>
							}
						>
							<Badge count={1}>
								<Avatar icon={<UserOutlined />} />
							</Badge>
						</Dropdown>
					)}
				</div>
				<div>
					<Localization />
				</div>
			</div>
		</Header>
	);
};

export default GlobalHeader;
