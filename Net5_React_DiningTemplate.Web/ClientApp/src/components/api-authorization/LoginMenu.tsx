import { useEffect, useState } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

interface IAuthInfo {
    isAuthenticated: boolean,
    userName: null | string | undefined
}

interface ILogoutPath {
    pathname: string,
    state: { local: boolean }
}

export const LoginMenu = () => {
    let _subscription: ReturnType<typeof authService.subscribe> | undefined;

    const [authInfo, setAuthInfo] = useState<IAuthInfo>({ isAuthenticated: false, userName: null });

    const populateState = async () => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        console.log(user);
        setAuthInfo({
            isAuthenticated,
            userName: user && user.name
        });
    }

    useEffect(() => {
        _subscription = authService.subscribe(() => populateState());
        populateState();
    }, [])

    useEffect(() => {
        return () => {
            if (_subscription)
                authService.unsubscribe(_subscription);
            else
                console.error('subscription id was undefined')
        }
    }, [_subscription])
    
    const anonymousView = (registerPath: string, loginPath: string) =>
        <>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem>
        </>;

    const authenticatedView = (userName: string | null | undefined, profilePath: string, logoutPath: ILogoutPath) =>
        <>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem>
        </>;

    const { isAuthenticated, userName } = authInfo;
    if (!isAuthenticated) {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return anonymousView(registerPath, loginPath);
    } else {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath: ILogoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
        return authenticatedView(userName, profilePath, logoutPath);
    }
}


//export class LoginMenu extends Component {
//    constructor(props) {
//        super(props);

//        this.state = {
//            isAuthenticated: false,
//            userName: null
//        };
//    }

//    componentDidMount() {
//        this._subscription = authService.subscribe(() => this.populateState());
//        this.populateState();
//    }

//    componentWillUnmount() {
//        authService.unsubscribe(this._subscription);
//    }

//    async populateState() {
//        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
//        this.setState({
//            isAuthenticated,
//            userName: user && user.name
//        });
//    }

//    render() {
//        const { isAuthenticated, userName } = this.state;
//        if (!isAuthenticated) {
//            const registerPath = `${ApplicationPaths.Register}`;
//            const loginPath = `${ApplicationPaths.Login}`;
//            return this.anonymousView(registerPath, loginPath);
//        } else {
//            const profilePath = `${ApplicationPaths.Profile}`;
//            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
//            return this.authenticatedView(userName, profilePath, logoutPath);
//        }
//    }

//    authenticatedView(userName, profilePath, logoutPath) {
//        return (<Fragment>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
//            </NavItem>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
//            </NavItem>
//        </Fragment>);

//    }

//    anonymousView(registerPath, loginPath) {
//        return (<Fragment>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
//            </NavItem>
//            <NavItem>
//                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
//            </NavItem>
//        </Fragment>);
//    }
//}
