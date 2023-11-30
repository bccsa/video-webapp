const google = require("./google");

class tickets {
    /**
     * Transform an Excel column name into a number
     * @param {string} column Column name (like 'A', 'B', 'AB')
     * @returns number
     * From https://quickref.me/convert-the-name-of-an-excel-column-to-number
     */
    getColumnNumber(column) {
        return column.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0) - 1
    };

    /**
     * @param {string} personId - The Brunstad SSO person/family id
     */
    getTickets(personId) {
        return google.get("Configuration!A3:H").then(conferencesArray => {
            const conferences = conferencesArray.map(conference => {
                return {
                    name: conference[0],
                    startDate: conference[1],
                    endDate: conference[2],
                    ticketInfoColumns: conference[3].split(",").map(c => this.getColumnNumber(c)),
                    nameColumn: this.getColumnNumber(conference[4]),
                    personIdColumn: this.getColumnNumber(conference[5]),
                    familyIdColumn: this.getColumnNumber(conference[6]),
                    ageColumn: this.getColumnNumber(conference[7]),
                }
            });

            const conferencePromises = [];

            conferences.forEach(conference => {
                conferencePromises.push(new Promise((resolve, reject) => {        
                    return google.get(`${conference.name}!A1:ZZ`).then(sheetData => {
                        const headers = sheetData[0];

                        let event = {
                            controlType: "event",
                            displayName: conference.name,
                        };
    
                        // TODO take family into account
                        let tickets = sheetData.filter(row => row[conference.personIdColumn].includes(personId));

                        // Convert tickets array to modularUI object, with the headers as keys
                        tickets = tickets.map(ticket => {
                            const ticketObject = {
                                controlType: "ticket",
                                name: ticket[conference.nameColumn],
                                age: ticket[conference.ageColumn],
                            };
                
                            conference.ticketInfoColumns.forEach((column) => {
                                ticketObject[column] = {
                                    controlType: "ticketInfo",
                                    title: headers[column],
                                    content: ticket[column],
                                };
                            });

                            return ticketObject;
                        });
    
                        Object.assign(event, tickets);

                        resolve(event);
                    }).catch(err => reject(err));
                }))
            });

            return Promise.all(conferencePromises).then(events => {
                return {
                    controlType: "section",
                    displayName: "Tickets",
                    ...events,
                };
            });
        });
    }
}

module.exports.tickets = tickets;
