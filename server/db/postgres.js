const { Client } = require('pg');

/**
 * PostgreSQL connection and communication functions
 */
class postgres {
    /**
     * PostgreSQL connection and communication functions
     * @param {object} config - Database configuration object:
     * {
            user,
            host,
            database,
            password,
            port
        }
     */
    constructor(config) {
        //create a new connection instance
        this._dbClient = new Client(config);
    }

    /**
     * Gets the database connection state
     */
    get isConnected() {
        return this._dbClient._connected;
    }

    /**
     * Connect to the database. If already connected to the database, resolves without reconnecting.
     * @returns promise resolving if the connection is successful and rejecting if unsuccessful
     */
    _connect() {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                this._dbClient.connect(err => {
                    if (err) {
                        reject(err);
                    } else {
                        // Resolve the connection result (true / false)
                        resolve(this._dbClient._connected);
                        console.log('database connected !!!')
                    }
                });
            } else {
                if (this.isConnected) {
                    resolve()
                } else {
                    reject(new Error('Unable to connect to the database: reason unknown'));
                }
            }
        });
    }

    _padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    /** Convert JS date to Postgress Timestamp without timezone */
    _convertDatePS(date) {
        return (
            [
                date.getFullYear(),
                this._padTo2Digits(date.getMonth() + 1),
                this._padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this._padTo2Digits(date.getHours()),
                this._padTo2Digits(date.getMinutes()),
                this._padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    /** Convert Postgress Timestamp without timezone to JS date */
    _convertDateJS(date) {
        return Date.parse(date);
    }

    /**
     * disconnect to the database
     * @returns promise with the connection state (true / false)
     */
    disconnect() {
        return this._dbClient.end();
    }

    /**
     * Return query result as a JavaScript object with column values mapped using the 'KeyColumn' column values as keys 
     * WARNING: Never pass unverified strings as SQL query strings as this opens for database hacking
     * @param {String} QueryString - SQL Query
     * @param {Array} Params - Array of parameter values in the order they are used in the query ($1, $2, etc.)
     * @param {String} KeyColumn - Column used as object keys
     * @returns promise with db query result
     */
    _query(QueryString, Params, KeyColumn) {
        return new Promise((resolve, reject) => {
            this._connect().then(() => {
                let p = [];
                if (Array.isArray(Params)) { p = Params };
                this._dbClient.query(QueryString, p).then(res => {
                    const list = {};
                    // Convert array to object
                    if (res && res.rows) {
                        res.rows.forEach(r => {
                            list[r[KeyColumn]] = r;
                        });
                    }
                    resolve(list);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err)
            });
        });
    }

    /**
     * Return all sections as a promise
     */
    section() {
        return this._query('SELECT * FROM section', [], 'displayName');
    }

    /**
     * Return all collections of a given section that have an available episode, sorted by latest episode event date
     * @param {Number} SectionID 
     * @param {boolean} guestOnly When true, only get collections with episodes that are accessible by privileged guests
     */
    collection(SectionID, guestOnly) {
        return this._query(`SELECT sorted_collection.id, sorted_collection."displayName" FROM (
            SELECT episode."eventDate", episode."expiryDate", episode_collection.collection_id, collection.*,
                rank() OVER (
                    PARTITION BY episode_collection.collection_id
                    ORDER BY "eventDate" DESC
                )
                FROM episode
                JOIN episode_collection ON episode_collection.episode_id = episode.id
                JOIN collection ON episode_collection.collection_id = collection.id
                ${guestOnly ? 'WHERE privileged_guest_access=TRUE AND' : 'WHERE'} ("expiryDate" >= now() OR "expiryDate" IS NULL)
            ) sorted_collection
            WHERE RANK=1 AND section_id=$1
            ORDER BY "eventDate" DESC;`, [SectionID], 'displayName');
    }

    /**
     * Return all episodes in a collection as a promise
     * @param {*} CollectionID 
     * @param {boolean} guestOnly When true, only get episodes that are accessible by privileged guests
     */
    episode(CollectionID, guestOnly) {
        return this._query(`SELECT * FROM episode_collection_view WHERE collection_id=$1 ${guestOnly ? 'AND privileged_guest_access=TRUE' : ''} ORDER BY id DESC`, [CollectionID], 'id');
    }

    /**
     * Return all privileged guests as a promise
     */
    privilegedGuests() {    
        return this._query('SELECT * FROM privileged_guests', [], 'email');
    }
}

module.exports.postgres = postgres;