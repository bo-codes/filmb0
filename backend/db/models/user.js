"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Image, {
      as: "songs",
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    User.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  //----USER MODEL METHODS----//
  /*This method will return an object with only the User instance information
  that is safe to save to a JWT.*/
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  //Should return true if there is a match with the User instance's hashedPassword.
  //If there is no match, it should return false.
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //----STATIC METHODS----//
  //Uses the currentUser scope to return a User with that id
  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  /*
  Should search for one User with the specified credential
  (either a username or an email). If a user is found, then
  the method should validate the password by passing it
  into the instance's .validatePassword method. If the
  password is valid, then the method should return the
  user by using the currentUser scope.*/
  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };


  User.signup = async function ({ username, email, password }) {
    //Hash the password using the bcryptjs package's hashSync method.
    const hashedPassword = bcrypt.hashSync(password);
    //Create a User with the username, email, and hashedPassword
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    //Return the created user using the currentUser scope.
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
