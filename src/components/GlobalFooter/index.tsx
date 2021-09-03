import React from 'react';

import { ConnectProps, FormattedMessage } from 'umi';

import { Layout } from 'antd';

const { Footer } = Layout;

interface GlobalFooterProps extends ConnectProps {
	style?: React.CSSProperties;
}

class GlobalFooter extends React.Component<GlobalFooterProps> {
	render() {
		return (
			<Footer {...this.props}>
				<FormattedMessage
					id="app.footer.copyright"
					defaultMessage="Project template"
				/>
			</Footer>
		);
	}
}

export default GlobalFooter;
