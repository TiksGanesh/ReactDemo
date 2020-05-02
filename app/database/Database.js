import SQLite from 'react-native-sqlite-storage';

export class Database {


    /**
     * Initialise Database
     */
    initialiseDatabase = async () => {

        SQLite.DEBUG(true);
        SQLite.enablePromise(true);

        try {
            console.log('Initialise Database');

            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {

                db.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS User ( _id INTEGER PRIMARY KEY AUTOINCREMENT,'
                        + ' firstname TEXT NOT NULL, '
                        + ' lastname TEXT NOT NULL, '
                        + ' email TEXT NOT NULL, '
                        + ' password TEXT NOT NULL, '
                        + ' gender TEXT NOT NULL )');
                }, (err) => {
                    console.log('error while creating table', err)
                }, (result) => {
                    console.log('table created success fully', result)
                })

                //db.close();
            });
        } catch (e) {
            console.log('Error', e)
        }
    }

    isUserAlreadyExist = (email) => {
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT _id FROM User WHERE email = ?',
                        [email],
                        (tx, result) => {
                            let numberOfRows = result.rows.length
                            resolve(numberOfRows)
                        }, (tx, error) => {
                            reject(error)
                        });
                });
            });
        });
    }

    insertUser = (userObject) => {
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO User (firstname, lastname, email, password, gender) VALUES (?,?,?,?,?)',
                        [userObject.firstname, userObject.lastname, userObject.email, userObject.password, userObject.gender],
                        (tx, result) => {
                            let numberOfRows = result.rowsAffected
                            if (numberOfRows === 1) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        }, (tx, error) => {
                            reject(error)
                        });
                });
                //db.close();
            });
        });
    }

    updateUser = (userObject) => {
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE User SET firstname = ?, lastname = ?, gender = ? WHERE email = ?',
                        [userObject.firstname, userObject.lastname, userObject.gender, userObject.email],
                        (tx, result) => {
                            let numberOfRows = result.rowsAffected
                            if (numberOfRows === 1) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        }, (tx, error) => {
                            reject(error)
                        });
                });
                //db.close();
            });
        });
    }


    authenticateUser = (email, password) => {

        return new Promise((resolve, reject) => {

            let query = 'SELECT _id FROM User WHERE email = ? AND password = ?'

            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql(query,
                        [email, password],
                        (tx, results) => {
                            let length = results.rows.length
                            console.log('Length:', results.rows.length)
                            if (length == 1) {
                                resolve(true)
                            } else {
                                resolve(false);
                            }
                        }, (tx, error) => {
                            reject(error);
                        })
                })
            })
        })
    }

    getUserInfo = (email) => {
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM User WHERE email = ?',
                        [email],
                        (tx, result) => {
                            let numberOfRows = result.rows.length
                            console.log(numberOfRows);
                            let profile = undefined
                            if (numberOfRows > 0) {
                                let row = result.rows.item(0);
                                profile = {
                                    firstname: row.firstname,
                                    lastname: row.lastname,
                                    email: row.email,
                                    gender: row.gender
                                };
                            } else {
                                profile = {
                                    firstname: undefined,
                                    lastname: undefined,
                                    email: undefined,
                                    gender: undefined
                                };
                            }
                            resolve(profile);
                        }, (tx, error) => {
                            reject(error)
                        });
                });
            });
        });
    }

    deleteUser = (email) => {
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM User WHERE email = ?',
                        [email],
                        (tx, result) => {
                            let numberOfRows = result.rowsAffected

                            if (numberOfRows > 0) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        }, (tx, error) => {
                            reject(error)
                        });
                });
            });
        });
    }

    getAllUsers = () => {

        let query = "SELECT * FROM User";
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: database_name, location: "Documents" }).then(db => {
                db.transaction((tx) => {
                    tx.executeSql(query, [], (tx, results) => {
                        let users = [];
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            users.push({
                                firstname: row.firstname,
                                lastname: row.lastname,
                                email: row.email,
                                gender: row.gender
                            })
                        }
                        resolve(users);
                    }, (tx, error) => {
                        reject(error);
                    })
                })
            })
        })
    }
}

const database_name = "TestDatabase.db";

const dbManager = new Database();
export default dbManager;

/**
 * if (numberOfRows > 0) {
                                let row = results.rows.item(0);
                                console.log('Fristname',row.firstname);
                                let profile = {
                                    firstname: row.firstname,
                                    lastname: row.lastname,
                                    email: row.email,
                                    gender: row.gender
                                }
                                console.log('Profile: ', profile);
                                resolve(profile)
                            } else {
                                let profile = {
                                    firstname: '',
                                    lastname: '',
                                    email: '',
                                    gender: ''
                                }
                                resolve(numberOfRows)
                            }
 */