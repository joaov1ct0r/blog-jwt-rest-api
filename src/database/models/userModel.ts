import DB from "../config/database";

import { DataTypes, ModelStatic } from "sequelize";

import IUser from "../../types/userInterface";

const User: ModelStatic<IUser> = DB.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
    tableName: "users",
    timestamps: false
  }
);

User.sync();

export default User;
