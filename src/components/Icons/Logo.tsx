import React from 'react';

import Icon from '@ant-design/icons';
import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

import IconProps from './IconProps';

const Logo: React.FC<IconProps> = (props) => {
	return (
		<span>
			<LogoSvg {...props} />
		</span>
	);
};

export default Logo;
