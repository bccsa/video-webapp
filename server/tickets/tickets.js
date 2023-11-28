const google = require("./google");

class tickets {
    /**
     * @param {string} personId - The Brunstad SSO person/family id
     */
    getTickets(personId) {
        return google.get("Summer Conference 2023!A1:AI1").then(headerRows => {
            const headers = headerRows[0];

            return google.get("Summer Conference 2023!A2:AI").then(sheetData => {
                let event = {
                    controlType: "event",
                    displayName: "Summer Conference 2023", // TODO dynamically set event
                };

                // TODO take family into account
                let tickets = sheetData.filter(row => row[3].includes(personId)); // row 3 = D = person id

                // Convert tickets array to object
                tickets = tickets.map(ticket => {
                    const obj = {
                        controlType: "ticket",
                    };
                    headers.forEach((header, index) => {
                        obj[header] = ticket[index];
                    });
                    return obj;
                });

                Object.assign(event, tickets);
                
                // Return a ModularUI section for tickets
                return {
                    controlType: "section",
                    displayName: "Tickets",
                    '0': event, // TODO dynamically set event
                };
            });
        });
    }
}

module.exports.tickets = tickets;
