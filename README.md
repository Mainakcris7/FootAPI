# FootAPI (v1.0.0)

Welcome to the **FootAPI** ⚽!. This public API provides information on various football players, including their names, the teams they played for, nationality, and career stats like goals scored.

![Logo](./client/mern-app/src/images/logo.png)

## API Base URL

The base URL for the API is: https://footapi-mainak.onrender.com


## Features

- Public API with free access.
- Retrieve data about football players including name, goals, teams played for, and nationality.
- Filter and format responses with optional query parameters.

## Data Format

Each football player record contains the following fields:

| Field           | Type    | Description                                        |
|-----------------|---------|----------------------------------------------------|
| `name`          | String  | The name of the football player                    |
| `nationality`   | String  | The nationality of the player                      |
| `age`           | Number  | The age of the player                              |
| `position`      | String  | The position the player plays                      |
| `club`          | String  | The current club of the player                     |
| `goals`         | Number  | Number of career goals scored                      |
| `assists`       | Number  | Number of assists made by the player               |
| `appearances`   | Number  | Total number of appearances made by the player     |
| `yellow_cards`  | Number  | Number of yellow cards received                     |
| `red_cards`     | Number  | Number of red cards received                        |
| `teams`         | Array   | List of teams the player has played for            |
| `image_url`     | String  | (Optional) Image URL for the player’s profile      |


## Getting Started

To access the API, you need to register to receive an API key. Once you have your API key, you can use it in your requests to the API.

### Authentication

You must include your API key in your requests. The API key should be passed as a query parameter like so: 

```bash
https://footapi-mainak.onrender.com/api/v1/data?apiKey=YOUR_API_KEY
```

## Optional Query Parameters

The API supports various optional query parameters to format and filter the response:

| Parameter      | Type    | Description                                        |
|----------------|---------|----------------------------------------------------|
| `sortBy`       | String  | Sort results by a specified field in ascending order. |
| `sortByDesc`   | String  | Sort results by a specified field in descending order. |
| `limitBy`      | Number  | Limit the number of results returned.              |
| `filterBy`     | String  | Filter results based on a regular expression (field name and value). |


## Contact 

If you have any questions, issues, or feedback, feel free to reach out to me via [email](mainakcr72002@gmail.com).

