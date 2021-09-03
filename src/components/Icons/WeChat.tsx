import React from 'react';

import { ReactComponent as WeChatSvg } from '../../assets/wechat.svg';

import IconProps from './IconProps';

const WeChatIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<WeChatSvg {...props} />
		</span>
	);
};

export default WeChatIcon;
