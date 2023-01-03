import { createContext, useEffect, useState } from "react";
import { getRepositories, getUserData } from "../../services/GithubServices";

import initialValue from "./Data";

export const DataContext = createContext();


function DataProvider({children}) {

    const [data, setData] = useState(initialValue);

    useEffect(() => {

        Promise.allSettled([getUserData(), getRepositories()])
        .then(value => {
            const [userData, repositories] = value;

            setData(data => {

                return {
                    ...data, 
                    github: {
                        ...userData.value,
                        repositories: repositories.value
                    }
                }
            });
        })
        
        
    }, []);



    return (<DataContext.Provider value={data}>
        {children}
    </DataContext.Provider>);
}

export default DataProvider;