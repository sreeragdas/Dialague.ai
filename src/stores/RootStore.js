import axios from 'axios';
import { config } from 'dotenv';

// import { AuthStore } from './AuthStore';
// import { DomainStore } from './DomainStore';
// import { AddFileStore } from './AddFileStore';
// import { VerifyModelStore } from './VerifyModelStore';
// import { SubdomainStore } from './SubdomainStore';
import { observable, action, reaction } from 'mobx';
// import { OrganizationStore } from './OrganizationStore';
import { UserStore } from './UserStore';
config();

export class RootStore {
    // authStore;
    // domainStore;
    // addFileStore;
    // verifyModelStore;
    // subdomainStore;
    // organizationStore;
    userStore;

    constructor() {
        // this.authStore = new AuthStore();
        // this.domainStore = new DomainStore();
        // this.addFileStore = new AddFileStore();
        // this.verifyModelStore = new VerifyModelStore();
        // this.subdomainStore = new SubdomainStore();
        // this.organizationStore = new OrganizationStore();
        this.userStore = new UserStore();
        reaction(
            () => this.authStore.user?.token,
            (accessToken) => {
                if (accessToken) {
                    axios.defaults.headers.common['Authorization'] = `token ${accessToken}`;
                } else {
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
        );
    }
}
 const rootStore = new RootStore();
