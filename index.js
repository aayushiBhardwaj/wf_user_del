const request = require("request");
const fs = require("fs");
const csvParser = require("csv-parser");

// Define the URL for the DELETE request
const url = `https://api.browserstack.com/user/revoke_user`;

// Read the CSV file and process each email
const emailArray = [];

fs.createReadStream("temp.csv")
    .pipe(csvParser(["email"]))
    .on("data", (row) => {
        emailArray.push(row.email);
    })
    .on("end", () => {
        // Make the DELETE requests for each email
        emailArray.forEach((email) => {
            var options = {
                url: url,
                auth: {
                    user:
                        process.env.BROWSERSTACK_USERNAME ||
                        "aayushib_T4hCqr",
                    pass:
                        process.env.BROWSERSTACK_ACCESS_KEY ||
                        "4nAyDrnTU2ahUaKD1gaH",
                },
                qs: {
                    email: email,
                },
            };

            // Make the API call
            request.delete(options, (error, response, body) => {
                if (error) {
                    console.error("Error:", error);
                } else {
                    console.log("Response:", body);
                }
            });
        });
    });
