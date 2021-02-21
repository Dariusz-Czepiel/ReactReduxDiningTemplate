import * as React from 'react';
import authService from '../components/api-authorization/AuthorizeService';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useState } from 'react';
import { Redirect } from 'react-router';

//add generic types and extract keys for columns
interface TableProps<GenericData> {
	columns: Array<keyof GenericData>,
	modelName: string,
	data: GenericData,
	controllerRoute: string,
	redirectUrl?: string 
}

export function UpdateForm<AvoidShadowedGenericData>({ modelName, columns, data, controllerRoute, redirectUrl }: TableProps<AvoidShadowedGenericData>) {
	const [redirect, setRedirect] = useState(false);

	const UpdateInDatabase = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const form: HTMLFormElement = document.getElementById(`${modelName}UpdateForm`) as HTMLFormElement;
		const formData = new FormData(form);
		const token = await authService.getAccessToken();
		const response = await fetch(controllerRoute, {
			headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
			method: 'PUT',
			body: formData
		});
		if(response.ok)
			setRedirect(true);
	}

	return (
		<Form id={`${modelName}UpdateForm`}>
			<>
			{columns.map(c => {
				if(c === "id")
					return <Input type="hidden" name="id" id="id" value={data[c] as unknown as string} />;
				else
					return <FormGroup>
						<Label for={c as string}>{c}</Label>
						<Input type="text" name={c as string} id={c as string} placeholder={`Update ${modelName} ${c}`} defaultValue={data[c] as unknown as string} />
					</FormGroup>
			})}
			</>
			<Button onClick={UpdateInDatabase}>Submit</Button>
			<>{redirectUrl && redirect && <Redirect to={redirectUrl} />}</>
		</Form>
	)
}