import { FC } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// interface IAddRestaurantProps {
  
// }

export const AddRestaurant: FC = () => {
    return (
      <>
      <div style={{marginBottom: "10px"}}>
        <h1>Add new restaurant</h1>
      </div>
        <Form action="api/RestaurantManagement/AddRestaurant" method="post">
          <Input type="hidden" name="id" id="id" value={0} />
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Write restaurant name" />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" placeholder="Write restaurant address" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </>
    );
}
