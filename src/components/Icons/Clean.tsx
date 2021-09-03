import React from 'react';

import { ReactComponent as ResetSvg } from '../../assets/clean.svg';

import IconProps from './IconProps';

const CleanIcon: React.FC<IconProps> = (props) => {
	return (
		<span>
			<ResetSvg {...props} />
		</span>
	);
};

export default CleanIcon;
