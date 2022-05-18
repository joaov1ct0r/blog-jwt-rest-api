import DB from "../config/database";

import User from './userModel.js';

import { DataTypes } from 'sequelize';

let Post = dbConnection.define(
    'posts',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'posts',
        timestamps: false
    }
);

Post.belongsTo(User, {
    constraints: true,
    foreignKey: 'userId'
});

User.hasMany(Post, {
    foreignKey: 'userId'
});

Post.sync();

export default Post;
