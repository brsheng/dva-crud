import React from 'react';

import { ReactComponent as TaoBaoSvg } from '../../assets/taobao.svg';

import IconProps from './IconProps';

const TaoBaoIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<TaoBaoSvg {...props} />
		</span>
	);
};

export default TaoBaoIcon;
