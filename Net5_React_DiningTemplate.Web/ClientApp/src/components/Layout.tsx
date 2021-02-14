import React, { FC } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout: FC = ({ children }) =>
    <div>
        <NavMenu />
        <Container>
            {children}
        </Container>
    </div>