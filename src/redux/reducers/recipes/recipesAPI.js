// A mock function to mimic making an async request for data
export async function fetchRecipesAPI(userID = 1) {
    const response = await fetch('/data/recipes.json');
    return response.json();
}