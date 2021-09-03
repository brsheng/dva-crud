import React, { PureComponent } from 'react';

import { Menu } from 'antd';

import { pathToRegexp } from 'path-to-regexp';

import { Link, ConnectProps, useIntl, FormattedMessage } from 'umi';
import { urlToList } from '../_utils/pathTools';

const { SubMenu } = Menu;

interface MenuItem {
	name: string;
	path: string;
	icon?: string;
	target?: string;
	hideInMenu?: boolean;
	key: string;
	children?: MenuItem[];
}

interface SiderMenuProps extends ConnectProps {
	menus: MenuItem[];
	isMobile?: boolean;
	location: any;
	onCollapse?: (collapse: boolean) => void;
}

interface SiderMenuState {
	openKeys: string[];
}

interface FormattedMenuProps {
	menuKey: string;
	name: string;
}

const FormattedMenu: React.FC<FormattedMenuProps> = (props) => {
	const intl = useIntl();

	return (
		<span>
			{intl.formatMessage({
				id: `menu.${props.menuKey}`,
				defaultMessage: props.name,
			})}
		</span>
	);
};

export const getMenuMatchKeys = (
	flatMenuKeys: string[],
	path: string
): string[] => {
	return flatMenuKeys.filter((item) => {
		return pathToRegexp(item).test(path);
	});
};

export default class SiderMenu extends PureComponent<
	SiderMenuProps,
	SiderMenuState
> {
	menus: MenuItem[];
	flatMenuKeys: string[];

	constructor(props: SiderMenuProps) {
		super(props);

		this.menus = this.props.menus;
		this.flatMenuKeys = this.getFlatMenuKeys(this.props.menus);
		this.state = { openKeys: this.getDefaultCollapsedSubMenus(props) };
	}

	UNSAFE_componentWillReceiveProps(nextProps: SiderMenuProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			this.setState({
				openKeys: this.getDefaultCollapsedSubMenus(nextProps),
			});
		}
	}

	getDefaultCollapsedSubMenus(props: SiderMenuProps): string[] {
		const {
			location: { pathname },
		} = props || this.props;

		return urlToList(pathname)
			.map((item) => getMenuMatchKeys(this.flatMenuKeys, item)[0])
			.filter((item) => item);
	}

	getFlatMenuKeys(menus: MenuItem[]): string[] {
		let keys: string[] = [];

		menus.forEach((item) => {
			if (item.children) {
				keys = keys.concat(this.getFlatMenuKeys(item.children));
			}
			keys.push(item.path);
		});

		return keys;
	}

	getMenuItemPath = (item: MenuItem): React.ReactNode => {
		const itemPath = this.conversionPath(item.path);
		const { target, name, key } = item;

		if (/^https?:\/\//.test(itemPath)) {
			return (
				<a href={itemPath} target={target}>
					{/* {icon} */}
					<FormattedMenu menuKey={key} name={name} />
				</a>
			);
		}

		return (
			<Link
				to={itemPath}
				target={target}
				replace={itemPath === this.props.location.pathname}
				onClick={
					this.props.isMobile
						? () => {
								this.props.onCollapse && this.props.onCollapse(true);
						  }
						: undefined
				}
			>
				{/* {icon} */}
				<FormattedMenu menuKey={key} name={name} />
			</Link>
		);
	};

	getSubMenuOrItem = (item: MenuItem): React.ReactNode => {
		if (item.children && item.children.some((child) => child.name)) {
			const childrenItems = this.getNavMenuItems(item.children);

			if (childrenItems && childrenItems.length > 0) {
				return (
					<SubMenu
						title={
							item.icon ? (
								<span>
									{/* {getIcon(item.icon)} */}
									<FormattedMenu menuKey={item.key} name={item.name} />
								</span>
							) : (
								<FormattedMenu menuKey={item.key} name={item.name} />
							)
						}
						key={item.path}
					>
						{childrenItems}
					</SubMenu>
				);
			}
			return null;
		} else {
			return (
				<Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
			);
		}
	};

	getNavMenuItems = (menus: MenuItem[]): React.ReactNode[] => {
		if (!menus) {
			return [];
		}

		return menus
			.filter((item) => item.name && !item.hideInMenu)
			.map((item) => {
				const itemDom = this.getSubMenuOrItem(item);

				return itemDom;
				// return this.checkPermissionItem(item.authority, itemDom);
			})
			.filter((item) => item);
	};

	getSelectedMenuKeys = (): string[] => {
		const {
			location: { pathname },
		} = this.props;

		return urlToList(pathname).map(
			(itemPath) => getMenuMatchKeys(this.flatMenuKeys, itemPath).pop() || ''
		);
	};

	checkPermissionItem = () => {};

	isMainMenu = (key: string) => {
		return this.menus.some(
			(item) => key && (item.key === key || item.path === key)
		);
	};

	handleOpenChange = (openKeys: string[]): void => {
		const lastOpenKey: string = openKeys[openKeys.length - 1];

		const moreThanOne =
			openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;

		this.setState({
			openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
		});
	};

	conversionPath = (path: string): string => {
		if (path && path.indexOf('http') === 0) {
			return path;
		} else {
			return `/${path || ''}`.replace(/\/+/g, '/');
		}
	};

	render() {
		const { openKeys } = this.state;
		const menuProps = { openKeys };

		let selectedKeys: string[] = this.getSelectedMenuKeys();
		if (!selectedKeys.length) {
			selectedKeys = [openKeys[openKeys.length - 1]];
		}

		return (
			<Menu
				key="menu"
				theme="light"
				mode="inline"
				{...menuProps}
				triggerSubMenuAction={'click'}
				openKeys={openKeys}
				onOpenChange={this.handleOpenChange}
			>
				{this.getNavMenuItems(this.menus)}
			</Menu>
		);
	}
}
