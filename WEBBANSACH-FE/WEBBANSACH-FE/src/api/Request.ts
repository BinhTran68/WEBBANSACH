
export  async function getRequest(url: string) {
    const response = await fetch(url);
    return response.json();
}