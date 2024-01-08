/**
 * Class with functions to read database data and return it in modular-ui compatible object format
 */
class dataObjects {
    /**
     * @param {Object} db - Postgres database object
     */
    constructor(db) {
        this.db = db;
    }

    // _xxx(method, selector, controlType) {
    //     return new Promise((resolve, reject) =>{
    //         method(selector).then(data => {
    //             Object.values(data).forEach(d => {
    //                 d.controlType = controlType;
    //             });
    //         })
    //     });
    // }


    /**
     * Get sections with linked collections and episodes in object format
     * @param {string} userEmail Email address of the current user
     * @param {boolean} hasMembership Whether the current user has BCC membership
     * @returns Promise
     */
    sections(userEmail, hasMembership) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('No database connection');
            }

            let s;
            this.db.privilegedGuests().then(privilegedGuests => {
                const privilegedGuestsList = Object.keys(privilegedGuests);
                if (!hasMembership && !privilegedGuestsList.includes(userEmail)) {
                    resolve({
                        'noAccess': true,
                    });
                    return;
                }
            }).then(() => {
                const guestOnly = !hasMembership;

                this.db.section().then(sections => {
                    s = sections;
                    let sList = [];
                    Object.values(sections).forEach(section => {
                        section.controlType = "section";

                        sList.push(new Promise((resolve, reject) => {
                            this.db.collection(section.id, guestOnly).then(collections => {
                                Object.assign(section, collections);
        
                                let cList = [];
                                Object.values(collections).forEach(collection => {
                                    collection.controlType = "collection";
        
                                    cList.push(new Promise((resolve, reject) => {
                                        this.db.episode(collection.id, guestOnly).then(episodes => {
                                            Object.assign(collection, episodes);
        
                                            Object.values(episodes).forEach(episode => {
                                                episode.controlType = "episode"
                                            });
        
                                            resolve();
                                        }).catch(err => reject(err));
                                    }));
                                });
                                Promise.all(cList).then(() => { resolve() });
                            }).catch(err => reject(err));
                        }));
                    });
                    Promise.all(sList).then(() => { resolve(s) });
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        })
    }
}

module.exports.dataObjects = dataObjects;