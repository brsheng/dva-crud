import React from 'react';

import { ReactComponent as ResetSvg } from '../../assets/reset.svg';

import IconProps from './IconProps';

const ResetIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<ResetSvg {...props} />
		</span>
	);
};

export default ResetIcon;
