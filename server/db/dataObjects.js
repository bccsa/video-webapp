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
     * Get sections with linked colletions and episodes in object format
     * @returns Promise
     */
    sections() {
        return new Promise((resolve, reject) => {
            if (!this.db) reject('No database connection');

            let s;
            this.db.section().then(sections => {
                s = sections;
                let sList = [];
                Object.values(sections).forEach(section => {
                    section.controlType = "section";

                    sList.push(new Promise((resolve, reject) => {
                        this.db.collection(section.id).then(collections => {
                            Object.assign(section, collections);
    
                            let cList = [];
                            Object.values(collections).forEach(collection => {
                                collection.controlType = "collection";
    
                                cList.push(new Promise((resolve, reject) => {
                                    this.db.episode(collection.id).then(episodes => {
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
        })
    }
}

module.exports.dataObjects = dataObjects;