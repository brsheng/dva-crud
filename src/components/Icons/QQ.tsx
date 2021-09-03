import React from 'react';

import { ReactComponent as QqSvg } from '../../assets/QQ.svg';

import IconProps from './IconProps';

const QqIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<QqSvg {...props} />
		</span>
	);
};

export default QqIcon;
