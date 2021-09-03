import React from 'react';

import { Layout } from 'antd';

import GlobalHeader from '@/components/GlobalHeader/index';
import GlobalFooter from '@/components/GlobalFooter/index';

import styles from './index.css';

const { Content } = Layout;

const LoginLayout: React.FC = (props) => {
	return (
		<Layout>
			<GlobalHeader {...props} />
			<Content className={styles.login_layout_container}>
				<div>{props.children}</div>
			</Content>
		</Layout>
	);
};

export default LoginLayout;
