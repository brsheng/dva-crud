const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string): boolean {
	return reg.test(path);
}

function formatter(
	menus: Menu[],
	parentPath: string = '/',
	parentAuthority: boolean = true
): Menu[] {
	return (menus || []).map((item) => {
		let { path } = item;

		if (!isUrl(path)) {
			path = `${parentPath}${item.path}`;
		}

		const result = {
			...item,
			path,
			authority: item.authority || parentAuthority,
		};
		if (item.children) {
			result.children = formatter(
				item.children,
				`${parentPath}${item.path}/`,
				item.authority
			);
		}
		return result;
	});
}

export const getMenuData = (
	menus: Menu[],
	parentPath: string = '/',
	parentAuthority: boolean = true
) => formatter(menus, parentPath, parentAuthority);
