const google = require("./google");

class tickets {
    cache = {
        age: null,
        conferences: null,
        sheetData: {},
    }

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
        const oneMinuteAgo = new Date(new Date().getTime() - 60 * 1000)
        if (!this.cache.age || this.cache.age < oneMinuteAgo) {
            google.init(process.env.TICKETS_GOOGLE_SHEET_ID, process.env.TICKETS_GOOGLE_API_KEY);

            return this.getTicketsFromGoogle(personId);
        }

        return this.getTicketsFromCache(personId);
    }

    getTicketsFromCache(personId) {
        if (!this.cache.conferences || this.cache.conferences.length == 0) {
            return new Promise((resolve, reject) => {
                return resolve(this.createNoEventsResponse());
            });
        }

        const events = this.cache.conferences.map(conference => {
            const sheetData = this.cache.sheetData[conference.name];
            return this.createEventFromData(conference, sheetData, personId);
        });

        const ticketSection = this.createTicketSection(events);

        return new Promise((resolve, reject) => {
            return resolve(ticketSection);
        });
    }

    getTicketsFromGoogle(personId) {
        return google.get("Configuration!A11:H").then(conferencesArray => {
            if (!conferencesArray || conferencesArray.length == 0) {
                return this.createNoEventsResponse();
            }

            const conferences = conferencesArray.map(conference => {
                return {
                    name: conference[0],
                    startDate: conference[1],
                    endDate: conference[2],
                    ticketInfoColumns: conference[3].split(",").map(c => this.getColumnNumber(c)),
                    nameColumn: this.getColumnNumber(conference[4]),
                    personIdColumn: this.getColumnNumber(conference[5]),
                    familyIdColumn: this.getColumnNumber(conference[6]),
                }
            }).filter(conference => {
                const endDate = new Date(conference.endDate);

                // Only keep events that end on a date after yesterday
                return endDate >= new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
            });

            this.cache.conferences = conferences;

            const conferencePromises = [];

            conferences.forEach(conference => {
                conferencePromises.push(new Promise((resolve, reject) => {        
                    return google.get(`${conference.name}!A1:ZZ`).then(sheetData => {
                        this.cache.age = new Date();
                        this.cache.sheetData[conference.name] = sheetData;

                        const event = this.createEventFromData(conference, sheetData, personId);

                        resolve(event);
                    }).catch(err => reject(err));
                }))
            });

            return Promise.all(conferencePromises).then(events => {
                return this.createTicketSection(events);
            });
        });
    }

    createEventFromData(conference, sheetData, personId) {
        const headers = sheetData[0];

        let event = {
            controlType: "event",
            displayName: conference.name,
            startDate: conference.startDate,
            endDate: conference.endDate,
            noTickets: false,
        };

        const person = sheetData.find(row => row[conference.personIdColumn].includes(personId));

        if (!person) {
            return this.createNoTicketsResponse(event);
        }

        const familyId = person[conference.familyIdColumn];

        let tickets = [person];

        // Only search for family members if the user has a family
        if (familyId || familyId.trim() != "") {
            tickets = sheetData.filter(row => row[conference.familyIdColumn].includes(familyId));
        }

        if (tickets.length == 0) {
            return this.createNoTicketsResponse(event);
        }

        // Convert tickets array to modularUI object, with the headers as keys
        tickets = tickets.map(ticket => {
            const ticketObject = {
                controlType: "ticket",
                name: ticket[conference.nameColumn],
                isCurrentUser: ticket[conference.personIdColumn].includes(personId),
            };

            conference.ticketInfoColumns.forEach((column) => {
                if (ticket[column] && ticket[column] !== "0" && ticket[column].toLowerCase() !== "no") {
                    ticketObject[column] = {
                        controlType: "ticketInfo",
                        title: headers[column],
                        content: ticket[column],
                    };
                }
            });

            return ticketObject;
        });

        tickets.sort((a, b) => {
            if (a.isCurrentUser) {
                return -1;
            }
            if (b.isCurrentUser) {
                return 1;
            }
            return a.name.localeCompare(b.name);
        });

        Object.assign(event, tickets);

        return event;
    }

    createTicketSection(events) {
        return {
            controlType: "section",
            displayName: "Tickets",
            ...events,
        };
    }

    createNoEventsResponse() {
        return this.createTicketSection([
            {
                controlType: "event",
                displayName: "No events found",
                startDate: null,
                endDate: null,
            }
        ]);
    }

    createNoTicketsResponse(event) {
        event.noTickets = true;
        return event;
    }
}

module.exports.tickets = tickets;
