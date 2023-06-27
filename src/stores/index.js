import { createContext, useContext } from 'react';

import { RootStore } from './RootStore';

const Context = createContext({});
const Provider = Context.Provider;

const StoreProvider = ({ children }) => {
    const store = new RootStore();
    return <Provider value={store}>{children}</Provider>;
};

const useStore = () => useContext(Context);

export { StoreProvider, useStore };
