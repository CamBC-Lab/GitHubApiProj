const apiToken = import.meta.env.VITE_GITHUB_TOKEN;

if (!apiToken) {
  throw new Error('VITE_GITHUB_TOKEN is not defined');
}
const baseUrl = import.meta.env.VITE_GITHUB_URL;

const searchGithub = async () => {
  try {
    // const start = Math.floor(Math.random() * 100000000) + 1; 
    const start = Math.floor(Math.random() * 100000000) + 1; 
    const response = await fetch(
      `${baseUrl}/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log('searchGithub()  Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log(`searchGithub() Data:`,data);
    return data;
  } catch (err) {
   console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        // Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log(`searchGithubUser() Data: ${data}`);
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log(`searchGithubUser() response: ${response}`);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return {};
  }
};

 export { searchGithub, searchGithubUser};