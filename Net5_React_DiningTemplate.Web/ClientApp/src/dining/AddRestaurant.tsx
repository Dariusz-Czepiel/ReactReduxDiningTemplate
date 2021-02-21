import { FC } from 'react';
import { CreateForm } from '../generic/CreateForm';
import { Restaurant } from './ManagementConsole';

export interface IAddRestaurantProps {
  location: { state: { redirectUrl: string } }
}

export const AddRestaurant: FC<IAddRestaurantProps> = (props) => {
    return (
      <>
        <h1>Add new restaurant</h1>
        <CreateForm<Restaurant> modelName="Restaurant" columns={['id', 'name', 'address']} actionRoute="api/RestaurantManagement/AddRestaurant" redirectUrl={props.location.state.redirectUrl} />
      </>
    );
}
