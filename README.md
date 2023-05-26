# Project Name: vue-river-data-nimh

## Description

The `vue-river-data-nimh` is a Vue.js application designed to fetch and display river data from the National Institute of Meteorology and Hydrology (NIMH) in Bulgaria. It provides real-time updates on water levels, flow rates, and other relevant information for various rivers.

## Main URL: [http://nimh.cattleya.store/](http://nimh.cattleya.store/)

## Features

- **Data Fetching**: The application fetches river data from the NIMH website using Axios, allowing users to access the latest information.
- **Real-time Updates**: Users can view up-to-date river data, ensuring they have the most recent information on water levels and flow rates.
- **Pagination**: The application utilizes the `jw-vue-pagination` package to provide pagination functionality for efficient navigation through large datasets.
- **Date Picker**: Users can select specific dates using the `vue-datepicker` package to retrieve river data for a desired time period.
- **Data Export**: The `@json2csv/plainjs` package enables users to export river data in CSV format, facilitating further analysis or integration with other systems.
- **Bootstrap Styling**: The application is styled using Bootstrap, ensuring a responsive and visually appealing user interface.

## Installation

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Navigate to the project directory: `cd project-directory`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run serve`
5. Open your browser and visit `http://localhost:8080` to access the application.

## Dependencies

The application relies on the following dependencies:

- `@json2csv/plainjs`: version 6.1.3
- `axios`: version 1.4.0
- `bootstrap`: version 5.2.3
- `core-js`: version 3.8.3
- `jw-vue-pagination`: version 1.0.3
- `vue`: version 3.2.13
- `vue-datepicker`: version 1.3.0
- `vue-router`: version 4.1.6

The development dependencies include:

- `@babel/core`: version 7.12.16
- `@babel/eslint-parser`: version 7.12.16
- `@vue/cli-plugin-babel`: version 5.0.0
- `@vue/cli-plugin-eslint`: version 5.0.0
- `@vue/cli-service`: version 5.0.0
- `eslint`: version 7.32.0
- `eslint-plugin-vue`: version 8.0.3

You can find more detailed information about the dependencies and their usage in the project's `package.json` file.

## Contributing

Contributions to enhance the functionality and user experience of this application are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request to the main repository's `develop` branch.

Please ensure that your code follows the project's coding conventions and includes appropriate documentation where necessary.

## License

You are free to use, modify, and distribute the code for personal and commercial purposes.

## Contact

If you have any questions, suggestions, or feedback regarding this application, please reach out to our team at office@cattleya.store. We appreciate your valuable input and strive to continuously improve the application.

Thank you for using our Vue.js application, and we hope it provides valuable river data insights from the National Institute of Meteorology and Hydrology in Bulgaria.