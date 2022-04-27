import dbConnection from '../config/database.js';

import { DataTypes } from 'sequelize';

let Post = dbConnection.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
});
