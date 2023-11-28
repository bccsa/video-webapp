// ========================================
// External libraries 
// ========================================

const { google } =  require('googleapis');

module.exports = {
    /**
     * Init
     * @param {Object} env - environment
     */
    init (sheetId, keysPath) {
        if (!sheetId || !keysPath) {
            throw new Error("No sheet id or keys path given");
        }
        
        const keys = require(keysPath)
        this.sheetId = sheetId
        this.client = new google.auth.JWT(
            keys.client_email,
            null, 
            keys.private_key,
            ['https://www.googleapis.com/auth/spreadsheets'],
        );
        this.auth();
    },


    // -------------------
    // Authentication
    // -------------------

    auth(){
        this.client.authorize((err) => {
            if(err) {
                console.log(err);
                setTimeout(auth , 60000);
                return;
            } else {
                console.log('Google Sheets Authenticated');
            }
        });
    },

    // -------------------
    // Functions
    // -------------------
    /**
     * get from sheet range
     * @param {string} range
     */
    get(range) { 
        const gsapi = google.sheets({ version:'v4', auth: this.client });
        const options = {
            spreadsheetId: this.sheetId,
            range: range,
        };

        return gsapi.spreadsheets.values.get(options)
            .then((res) => {
                return res.data.values;
            })
            .catch(err => {
                console.log(err);
            });
    },
}