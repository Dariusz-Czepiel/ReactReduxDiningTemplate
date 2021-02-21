import { FC } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import authService from '../components/api-authorization/AuthorizeService';
import { CreateForm } from '../generic/CreateForm';
import { Restaurant } from './ManagementConsole';

// interface IAddRestaurantProps {
  
// }

// const AddToDatabase = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     const form: HTMLFormElement = document.getElementById('AddRestaurantForm') as HTMLFormElement;
//     const formData = new FormData(form);
//     const token = await authService.getAccessToken();
//     const response = await fetch('api/RestaurantManagement/AddRestaurant', {
//         headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
//         method: 'POST',
//         body: formData
//     });
// }

export const AddRestaurant: FC = () => {
    return (
      <>
      <CreateForm<Restaurant> modelName="Restaurant" columns={['id', 'name', 'address']} headerText="Add new restaurant" actionRoute="api/RestaurantManagement/AddRestaurant" />
      {/* <div style={{marginBottom: "10px"}}>
        <h1>Add new restaurant</h1>
      </div>
        <Form id="AddRestaurantForm">
          <Input type="hidden" name="id" id="id" value={0} />
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Write restaurant name" />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" placeholder="Write restaurant address" />
          </FormGroup>
            <Button onClick={AddToDatabase}>Submit</Button>
        </Form> */}
      </>
    );
}
