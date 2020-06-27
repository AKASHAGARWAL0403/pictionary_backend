export class Database{
    static  sequelize ;
    static  transaction;

    static getSequelize(){
        return this.sequelize;
    }

    static getTransaction(){
        return this.transaction;
    }

    static setSequelize(sequelize){
        this.sequelize = sequelize;
    }

    static setTransaction(transaction){
        this.transaction = transaction;
    }
}