import * as React from 'react';
import authService from '../components/api-authorization/AuthorizeService';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useState } from 'react';
import { Redirect } from 'react-router';

//add generic types and extract keys for columns
interface TableProps<GenericData> {
	columns: Array<keyof GenericData>,
	modelName: string,
	actionRoute: string,
	redirectUrl?: string 
}

export function CreateForm<AvoidShadowedGenericData>({ modelName, columns, actionRoute, redirectUrl }: TableProps<AvoidShadowedGenericData>) {
	const [redirect, setRedirect] = useState(false);

	const AddToDatabase = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const form: HTMLFormElement = document.getElementById(`${modelName}AddForm`) as HTMLFormElement;
		const formData = new FormData(form);
		const token = await authService.getAccessToken();
		const response = await fetch(actionRoute, {
			headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
			method: 'POST',
			body: formData
		});
		if(response.ok)
			setRedirect(true);
	}

	return (
		<Form id={`${modelName}AddForm`}>
			<>
			{columns.map(c => {
				if(c === "id")
					return <Input type="hidden" name="id" id="id" value={0} />;
				else
					return <FormGroup>
						<Label for={c as string}>{c}</Label>
						<Input type="text" name={c as string} id={c as string} placeholder={`Write ${modelName} ${c}`} />
					</FormGroup>
			})}
			</>
			<Button onClick={AddToDatabase}>Submit</Button>
			<>{redirectUrl && redirect && <Redirect to={redirectUrl} />}</>
		</Form>
	)
}