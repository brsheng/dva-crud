import React from 'react';

import { Layout } from 'antd';
import { connect, ConnectProps, useIntl } from 'umi';

import { StateType } from '@/models/login';

import GlobalHeader from '@/components/GlobalHeader/index';
import GlobalFooter from '@/components/GlobalFooter/index';

interface CommonLayoutProps extends ConnectProps {
	currentUser?: User;
}

const CommonLayout: React.FC<CommonLayoutProps> = (props) => {
	const intl = useIntl();

	return (
		<Layout>
			<GlobalHeader
				currentUser={props.currentUser}
				logo={intl.formatMessage({ id: 'app.header.project.name' })}
			/>
			<Layout style={{ minHeight: '100vh' }}>{props.children}</Layout>
			<GlobalFooter style={{ textAlign: 'center' }}></GlobalFooter>
		</Layout>
	);
};

export default connect(({ login }: { login: StateType }) => ({
	currentUser: login.currentUser,
}))(CommonLayout);
