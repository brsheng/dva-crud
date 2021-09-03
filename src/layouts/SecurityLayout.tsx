import React from 'react';

import { connect, ConnectProps, Redirect } from 'umi';

import { Spin } from 'antd';

import { StateType } from '@/models/login';
interface SecurityLayoutProps extends ConnectProps {
	loading: boolean;
	currentUser: User;
}

interface SecurityLayoutState {
	isReady: boolean;
}

class SecurityLayout extends React.Component<
	SecurityLayoutProps,
	SecurityLayoutState
> {
	render() {
		const { children, currentUser } = this.props;

		if (!!!currentUser) return <Redirect to={`/login`} />;

		return children;
	}
}

export default connect(
	({
		login,
		loading,
	}: {
		login: StateType;
		loading: { models: { [key: string]: boolean } };
	}) => ({
		currentUser: login.currentUser,
		loading: loading,
	})
)(SecurityLayout);
