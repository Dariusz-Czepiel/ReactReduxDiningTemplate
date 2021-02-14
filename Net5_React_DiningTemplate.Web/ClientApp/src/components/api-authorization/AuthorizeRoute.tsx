import { useState, useEffect, FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'

interface IAuthInfo {
    ready: boolean,
    authenticated: boolean
}

interface IAuthorizeRouteProps {
    path: any,
    component: any,
}

//TODO to moze zle dzialac przez _subscription albo drugi useEffect?
export const AuthorizeRoute: FC<IAuthorizeRouteProps> = (props) => {
    let _subscription: any;

    const [authInfo, setAuthInfo] = useState<IAuthInfo>({ ready: false, authenticated: false });

    const populateAuthenticationState = async () => {
        const authenticated = await authService.isAuthenticated();
        setAuthInfo(ai => ({ ...ai, ready: true, authenticated }));
    }

    const authenticationChanged = async () => {
        setAuthInfo(ai => ({ ...ai, ready: false, authenticated: false }));
        await populateAuthenticationState();
    }

    useEffect(() => {
        _subscription = authService.subscribe(() => authenticationChanged());
        populateAuthenticationState();
    },[])

    useEffect(() => {
        return () => {
            authService.unsubscribe(_subscription);
        }
    }, [_subscription])

    const { ready, authenticated } = authInfo;
    var link = document.createElement("a");
    link.href = props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`
    if (!ready) {
        return <div></div>;
    } else {
        const { component: Component, ...rest } = props;
        return <Route {...rest}
            render={(props) => {
                if (authenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={redirectUrl} />
                }
            }} />
    }
}
export default AuthorizeRoute;
//export default class AuthorizeRoute extends Component {
//    constructor(props) {
//        super(props);

//        this.state = {
//            ready: false,
//            authenticated: false
//        };
//    }

//    componentDidMount() {
//        this._subscription = authService.subscribe(() => this.authenticationChanged());
//        this.populateAuthenticationState();
//    }

//    componentWillUnmount() {
//        authService.unsubscribe(this._subscription);
//    }

//    render() {
//        const { ready, authenticated } = this.state;
//        var link = document.createElement("a");
//        link.href = this.props.path;
//        const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
//        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`
//        if (!ready) {
//            return <div></div>;
//        } else {
//            const { component: Component, ...rest } = this.props;
//            return <Route {...rest}
//                render={(props) => {
//                    if (authenticated) {
//                        return <Component {...props} />
//                    } else {
//                        return <Redirect to={redirectUrl} />
//                    }
//                }} />
//        }
//    }

//    async populateAuthenticationState() {
//        const authenticated = await authService.isAuthenticated();
//        this.setState({ ready: true, authenticated });
//    }

//    async authenticationChanged() {
//        this.setState({ ready: false, authenticated: false });
//        await this.populateAuthenticationState();
//    }
//}
