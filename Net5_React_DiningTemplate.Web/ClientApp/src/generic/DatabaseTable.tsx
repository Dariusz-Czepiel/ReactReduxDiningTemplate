import * as React from 'react';
import { FC, useState } from 'react';
import { Table } from 'reactstrap'

interface TableProps<GenericData> {
	columns: Array<keyof GenericData>,
	data: GenericData[],
	actions?: (data: GenericData) => JSX.Element
}

//add actions to this EDIT DELETE

export function DatabaseTable<AvoidShadowedGenericData>({ data, columns, actions }: TableProps<AvoidShadowedGenericData>) {
	return (
		<Table>
			<thead>
				<tr>
				<>{columns.map((c, i) => (
					<th key={i}>{c}</th>
				))}</>
				<>{actions && <th />}</>
				</tr>
			</thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        <>{columns.map((c, i) => {
							if(i == 0)
								return <th key={i}>{row[c]}</th>;
							else
								return <td key={i}>{row[c]}</td>;
						})}</>
						<>{actions && actions(row)}</>
                    </tr>
                ))}
            </tbody>
		</Table>
	)
}