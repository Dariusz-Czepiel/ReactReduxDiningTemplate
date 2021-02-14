import { User, Profile, UserManager, WebStorageStateStore } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './ApiAuthorizationConstants';

interface ICallbacks {
    callback: any,
    subscription: number
}

type AuthenticationResultStatusTypes = typeof AuthenticationResultStatus[keyof typeof AuthenticationResultStatus];

interface IIloginResult {
    status: AuthenticationResultStatusTypes,
    state: any,
    message: string | undefined
}

export type UserRole = string | string[]

type ProfileWithRole = Profile & { role?: UserRole };

export class AuthorizeService {
    _callbacks: ICallbacks[] = [];
    _nextSubscriptionId = 0;
    _user: User | null | undefined = null;
    _isAuthenticated = false;

    // By default pop ups are disabled because they don't work properly on Edge.
    // If you want to enable pop up authentication simply set this flag to false.
    _popUpDisabled = true;

    userManager: UserManager | undefined = undefined;

    async isAuthenticated() {
        const user = await this.getUser();
        return !!user;
    }

    async authenticateRoles(role: UserRole) {
        const user = await this.getUser();
        if (!user?.role)
            return false;
        else {
            if (Array.isArray(role))
                return role.every(r => user.role?.includes(r));
            else
                return user.role?.includes(role);
        }
    }

    async getUser(): Promise<ProfileWithRole | null | undefined> {
        if (this._user && this._user.profile) {
            console.log('user from authService', this._user.profile.role);
            return this._user.profile;
        }

        await this.ensureUserManagerInitialized();
        let user;
        if (this.userManager instanceof UserManager) {
            user = await this.userManager.getUser();
        }
        console.log('user from authService', user);
        return user && user.profile;
    }

    async getAccessToken() {
        await this.ensureUserManagerInitialized();
        let user;
        if (this.userManager instanceof UserManager) {
            user = await this.userManager.getUser();
        }
        return user && user.access_token;
    }

    // We try to authenticate the user in three different ways:
    // 1) We try to see if we can authenticate the user silently. This happens
    //    when the user is already logged in on the IdP and is done using a hidden iframe
    //    on the client.
    // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
    //    Pop-Up blocker or the user has disabled PopUps.
    // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
    //    redirect flow.
    async signIn(state?: any) {
        await this.ensureUserManagerInitialized();
        try {
            let silentUser;
            if (this.userManager instanceof UserManager)
                silentUser = await this.userManager.signinSilent(this.createArguments());
            else
                console.error('userManager was null');

            this.updateState(silentUser);
            return this.success(state);
        } catch (silentError) {
            // User might not be authenticated, fallback to popup authentication
            console.log("Silent authentication error: ", silentError);

            try {
                if (this._popUpDisabled) {
                    throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
                }
                let popUpUser;
                if (this.userManager instanceof UserManager)
                    popUpUser = await this.userManager.signinPopup(this.createArguments());
                else
                    console.error('userManager was null');

                this.updateState(popUpUser);
                return this.success(state);
            } catch (popUpError) {
                if (popUpError.message === "Popup window closed") {
                    // The user explicitly cancelled the login action by closing an opened popup.
                    return this.error("The user closed the window.");
                } else if (!this._popUpDisabled) {
                    console.log("Popup authentication error: ", popUpError);
                }

                // PopUps might be blocked by the user, fallback to redirect
                try {
                    if (this.userManager instanceof UserManager)
                        await this.userManager.signinRedirect(this.createArguments(state));
                    else
                        console.error('userManager was null');

                    return this.redirect();
                } catch (redirectError) {
                    console.log("Redirect authentication error: ", redirectError);
                    return this.error(redirectError);
                }
            }
        }
    }

    async completeSignIn(url: string) {
        try {
            await this.ensureUserManagerInitialized();
            let user;
            if (this.userManager instanceof UserManager) {
                user = await this.userManager.signinCallback(url);
                this.updateState(user);
            }
            return this.success(user && user.state);
        } catch (error) {
            console.log('There was an error signing in: ', error);
            return this.error('There was an error signing in.');
        }
    }

    // We try to sign out the user in two different ways:
    // 1) We try to do a sign-out using a PopUp Window. This might fail if there is a
    //    Pop-Up blocker or the user has disabled PopUps.
    // 2) If the method above fails, we redirect the browser to the IdP to perform a traditional
    //    post logout redirect flow.
    async signOut(state?: any) {
        await this.ensureUserManagerInitialized();
        try {
            if (this._popUpDisabled) {
                throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
            }

            if (this.userManager instanceof UserManager)
                await this.userManager.signoutPopup(this.createArguments());
            else
                console.error('userManager was null');

            this.updateState(undefined);
            return this.success(state);
        } catch (popupSignOutError) {
            console.log("Popup signout error: ", popupSignOutError);
            try {
                if (this.userManager instanceof UserManager)
                    await this.userManager.signoutRedirect(this.createArguments(state));
                else
                    console.error('userManager was null');

                return this.redirect();
            } catch (redirectSignOutError) {
                console.log("Redirect signout error: ", redirectSignOutError);
                return this.error(redirectSignOutError);
            }
        }
    }

    async completeSignOut(url: string) {
        await this.ensureUserManagerInitialized();
        try {
            let response;
            if (this.userManager instanceof UserManager) {
                response = await this.userManager.signoutCallback(url);
            }
            this.updateState(null);
            return this.success(response && response.state);
        } catch (error) {
            console.log(`There was an error trying to log out '${error}'.`);
            return this.error(error);
        }
    }

    updateState(user: User | undefined | null) {
        this._user = user;
        this._isAuthenticated = !!this._user;
        this.notifySubscribers();
    }

    subscribe(callback: any) {
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId: number) {
        const subscriptionIndex = this._callbacks
            .map((element, index) => ({ found: element.subscription === subscriptionId, index }))
            .filter(element => element.found === true);
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        this._callbacks.splice(subscriptionIndex[0].index, 1);
    }

    notifySubscribers() {
        for (let i = 0; i < this._callbacks.length; i++) {
            const callback = this._callbacks[i].callback;
            callback();
        }
    }

    createArguments(state?: any) {
        return { useReplaceToNavigate: true, data: state };
    }

    error(message: string): IIloginResult {
        return { status: AuthenticationResultStatus.Fail, message, state: undefined };
    }

    success(state: any): IIloginResult {
        return { status: AuthenticationResultStatus.Success, message: undefined, state };
    }

    redirect(): IIloginResult {
        return { status: AuthenticationResultStatus.Redirect, message: undefined, state: undefined };
    }

    async ensureUserManagerInitialized() {
        if (this.userManager !== undefined) {
            return;
        }

        let response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
        if (!response.ok) {
            throw new Error(`Could not load settings for '${ApplicationName}'`);
        }

        let settings = await response.json();
        settings.automaticSilentRenew = true;
        settings.includeIdTokenInSilentRenew = true;
        settings.userStore = new WebStorageStateStore({
            prefix: ApplicationName
        });

        this.userManager = new UserManager(settings);
        this.userManager.events.addUserSignedOut(async () => {
            if (this.userManager instanceof UserManager)
                await this.userManager.removeUser();
            else
                console.error('userManager was null');

            this.updateState(undefined);
        });
    }

    static get instance() { return authService }
}

const authService = new AuthorizeService();

export default authService;

export const AuthenticationResultStatus = {
    Redirect: 'redirect',
    Success: 'success',
    Fail: 'fail'
} as const;
