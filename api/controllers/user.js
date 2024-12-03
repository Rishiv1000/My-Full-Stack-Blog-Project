//TODO
async function fetchUser() {
    try {
        let response = await fetch('api/user');
        let user = await response.json();

        if (user && user.username) {
            console.log(user.username);
        } else {
            console.log('User or username is null/undefined');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

fetchUser();
