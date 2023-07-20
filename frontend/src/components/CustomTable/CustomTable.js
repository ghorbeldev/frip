import React from 'react';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './custom-table.scss';
const CustomTable = ({ data }) => {
	return (
		<Table className='custom-table'>
			<Thead>
				<Tr>
					{data.columns.map(column => (
						<Th key={column.label}>{column.label}</Th>
					))}
				</Tr>
			</Thead>
			<Tbody>
				{data.rows.map(row => (
					<Tr key={row.id}>
						{Object.values(row).map((v, i) => (
							<Td key={i}>{v}</Td>
						))}
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default CustomTable;
