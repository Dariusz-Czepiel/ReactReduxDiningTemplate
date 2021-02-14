import * as React from 'react';
import { FC, useState } from 'react';
import { Table } from 'reactstrap'

interface IDatabaseTableProps {
    columnNames: string[]
}

const RenderColumns = (columnNames: string[]) => {
    return columnNames.map(cn => <th>{cn}</th>);
}

//add generic types and extract keys for columns
export const DatabaseTable: FC<IDatabaseTableProps> = ({ columnNames }) => {

    return (
        <Table responsive>
            <thead>
                <tr>
                    {RenderColumns(columnNames)}
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>Test1</td>
                <td>Test2</td>
                <td>Test3</td>
                <td>Test4</td>
            </tr>
            </tbody>
        </Table>
    );
}
