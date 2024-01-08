# Tickets
The app supports a ticket feature, where it can fetch data from a Google Sheet to display on the tickets tab.

The Google Sheet needs to be structured in this way:
- A `Configuration` sheet, containing a line for each event/conference. Refer to the [code](../server/tickets/tickets.js) for the structure of this sheet.
- A sheet for each event/conference. The structure doesn't matter, but it needs to contain the columns that are set in the Configuration sheet.

With the data from the configuration sheet, columns such as name, start/end date, and ticket information are fetched. Data from `ticketInformationColumns` is displayed with the column header as a ticket in the interface.

## Environment variables
These two environment variables need to be set:
- `TICKETS_GOOGLE_SHEET_ID`: The ID of the Google Sheet. You can get this from the URL of the sheet in the browser.
- `TICKETS_GOOGLE_API_KEY`: A base64 encoded JSON key file for a Google service account.

## API limits
The Google Sheet API has a limit of 300 requests per minute, but is otherwise free. To make sure we're not hitting the limit, the sheet data is cached for all users and refreshed every minute.
