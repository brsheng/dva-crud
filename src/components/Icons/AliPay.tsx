import React from 'react';

import { ReactComponent as AliPaySvg } from '../../assets/alipay.svg';

import IconProps from './IconProps';

const AliPayIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<AliPaySvg {...props} />
		</span>
	);
};

export default AliPayIcon;
