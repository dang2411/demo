/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import * as React from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import fetchProducts from './ProductsApi';

function ProductsTable() {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		// Simulate fetching data (replace with actual API call)
		const fetchData = async () => {
			try {
				const response = await fetchProducts();
				console.log(response);
				setData(response);
			} catch (error) {
				console.error('load ko dc');
			}
		};

		fetchData();
	}, []);

	const columns = useMemo(
		() => [
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
				accessorFn: (row) => row.id,
				id: 'id',
				header: 'ID'
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
				accessorFn: (row) => row.name,
				id: 'name',
				header: 'Name',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				Cell: ({ row }) => <Typography variant="body1">{row.name}</Typography>
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
				accessorFn: (row) => row.trainer.name,
				id: 'trainer',
				header: 'Trainer',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				Cell: ({ row }) => <Typography variant="body1">{row.trainer.name}</Typography>
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
				accessorFn: (row) => row.participant,
				id: 'participant',
				header: 'Participant Count',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				Cell: ({ row }) => <Typography variant="body1">{row.participant}</Typography>
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				accessorFn: (row) => new Date(row.from).toLocaleString(),
				id: 'from',
				header: 'Start Time',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				Cell: ({ row }) => <Typography variant="body1">{new Date(row.from).toLocaleString()}</Typography>
			},
			{
				accessorFn: (row) => new Date(row.to).toLocaleString(),
				id: 'to',
				header: 'End Time',
				Cell: ({ row }) => <Typography variant="body1">{new Date(row.to).toLocaleString()}</Typography>
			},
			{
				accessorFn: (row) => row.status,
				id: 'status',
				header: 'Status',
				Cell: ({ row }) => (
					<div className="flex items-center">
						{row.status === 'Active' ? (
							<FuseSvgIcon
								className="text-green"
								size={20}
							>
								heroicons-outline:check-circle
							</FuseSvgIcon>
						) : (
							<FuseSvgIcon
								className="text-red"
								size={20}
							>
								heroicons-outline:minus-circle
							</FuseSvgIcon>
						)}
						<Typography
							variant="body1"
							className={clsx('ml-8', row.status === 'Active' ? 'text-green' : 'text-red')}
						>
							{row.status}
						</Typography>
					</div>
				)
			}
		],
		[data] // Dependency array for useMemo
	);

	return (
		<div className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full">
			<table>
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={column.id}>{column.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.id}>
							{columns.map((column) => (
								<td key={`${row.id}-${column.id}`}>
									{column.Cell ? <column.Cell row={row} /> : column.accessorFn(row)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductsTable;
