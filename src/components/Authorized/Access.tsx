import React from 'react';

import { ConnectProps, connect } from 'umi';

import { StateType } from '@/models/login';

import { intersection } from 'lodash';

import { PermissionType } from '@/models/common.d';

interface AccessProps extends ConnectProps {
	accessible?: boolean;
	checkPermissions?: PermissionType[];
	permissions?: PermissionType[];
}

const Access: React.FC<AccessProps> = (props) => {
	const { children, checkPermissions, permissions, accessible } = props;

	const canAccess = (): boolean => {
		if (
			(permissions == undefined || checkPermissions == undefined) &&
			accessible == undefined
		)
			return false;

		return (
			intersection(permissions, checkPermissions).length > 0 ||
			accessible === true
		);
	};

	return canAccess() ? <>{children}</> : null;
};

export default connect(({ login }: { login: StateType }) => {
	return {
		permissions: login.currentUser?.permissions?.map((item) => item.id),
	};
})(Access);
