export const END_POINTS = {

    USER: 'https://api.github.com/users/FrancoJavierGadea',

    REPOS: 'https://api.github.com/users/FrancoJavierGadea/repos'
}


export async function getUserData(){

    try {
        
        const response = await fetch(END_POINTS.USER);
    
        if(response.ok){

            const {name, bio: description, location, email, html_url: url, avatar_url: perfilImage} = await response.json();
    
            return {name, description, location, email, url, perfilImage};
        }
        else {

            const {ok, status, statusText} = response;

            return Promise.reject({ok, status, statusText});
        }
    }
    catch (error) {
       
        console.log(error);
    }
}

export async function getRepositories(){

    try {

        const response = await fetch(END_POINTS.REPOS);
    
        if(response.ok){

            const repos = await response.json();

            return repos.map(value => {

                const {name, description, html_url: url, homepage: gh_pages} = value;

                return {name, description, url, gh_pages}
            });
        }
        else {

            const {ok, status, statusText} = response;

            return Promise.reject({ok, status, statusText});
        }

        
    } catch (error) {
     
        console.log(error);
    }
}