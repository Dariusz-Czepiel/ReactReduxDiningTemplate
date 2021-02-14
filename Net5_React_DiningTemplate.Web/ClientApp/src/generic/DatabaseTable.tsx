import * as React from 'react';
import { FC, useState } from 'react';
import { Table } from 'reactstrap'

//add generic types and extract keys for columns
interface TableProps<GenericData> {
	columns: Array<keyof GenericData>,
	data: GenericData[]
}

export function DatabaseTable<AvoidShadowedGenericData>({ data, columns }: TableProps<AvoidShadowedGenericData>) {
	return (
		<Table>
			<thead>
			{columns.map((c, i) => (
				<th key={i}>{c}</th>
			))}
			</thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map((c, i) => (
                            <th key={i}>{row[c]}</th>
                        ))}
                    </tr>
                ))}
            </tbody>
		</Table>
	)
}