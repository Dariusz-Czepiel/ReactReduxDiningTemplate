import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { UserRole } from './AuthorizeService';
import authService from './AuthorizeService'

interface IRenderIfRoleProps {
    role: UserRole
}

export const RenderIfRole: FC<IRenderIfRoleProps> = ({ role, children }) => {
    const [isAuth, setIsAuth] = useState(false);

    let _subscription: ReturnType<typeof authService.subscribe> | undefined;

    const checkRoleAuth = async () => setIsAuth(await authService.authenticateRoles(role));

    useEffect(() => {
        _subscription = authService.subscribe(() => checkRoleAuth());
        checkRoleAuth();
    }, [])

    useEffect(() => {
        return () => {
            if (_subscription)
                authService.unsubscribe(_subscription);
            else
                console.error('subscription id was undefined')
        }
    }, [_subscription])

    if (isAuth)
        return <>{children}</>;
    else
        return null;
}
