import { FC } from 'react';
import { UpdateForm } from '../generic/UpdateForm';
import { Restaurant } from './ManagementConsole';

export interface IUpdateRestaurantProps {
  location: { state: { redirectUrl: string, data: Restaurant } }
}

export const UpdateRestaurant: FC<IUpdateRestaurantProps> = (props) => {
  console.log('update restaurant props', props);
  const { redirectUrl, data } = props.location.state;

    return (
      <>
        <h1>Edit restaurant</h1>
        <UpdateForm modelName="Restaurant" columns={['id', 'name', 'address']} data={data} controllerRoute="api/RestaurantManagement/UpdateRestaurant" redirectUrl={redirectUrl} />
      </>
    );
}
