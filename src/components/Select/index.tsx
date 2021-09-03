// import React from 'react';

// import { Select, Spin } from 'antd';

// import { debounce } from 'lodash';

// import { SelectProps } from 'antd/es/select';

// interface DebounceSelectProps<VT> extends Omit<SelectProps<VT>, 'options'> {
// 	debounceTimeout?: number;
//     options: Option[]
// }

// const DebounceSelect: React.FC<DebounceSelectProps> = ({
// 	debounceTimeout,
// 	...props
// }) => {
// 	return (
// 		<Select
// 			notFoundContent={loading ? <Spin size="small" /> : null}
// 			{...props}
// 		></Select>
// 	);
// };

// export default DebounceSelect;
