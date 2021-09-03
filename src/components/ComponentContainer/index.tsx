import React from 'react';

import styles from './index.css';

interface ComponentContainerProps {
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Box: React.FC<ComponentContainerProps> = (props) => {
	const { children, style } = props;

	return (
		<div className={styles.component_box} style={style}>
			{children}
		</div>
	);
};

export default Box;
