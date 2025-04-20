const { Liquibase, MariaDBDatabase } = require('liquibase');


(Liquibase)
const myConfig = {
    changeLogFile: 'database/db.changelog-master.xml',
    url: 'jdbc:mariadb://localhost:3306/splitwise',
    username: 'user',
    password: 'password',
    classpath : 'liquibase/mariadb-java-client-3.5.3.jar',
    driver: "org.mariadb.jdbc.Driver",
    logLevel: 'info'
};

const liquibase = new Liquibase(myConfig);

module.exports = liquibase;
