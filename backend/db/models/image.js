'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: "userId" });
    Image.hasMany(models.Comment, { as: "comments", foreignKey: "imageId" });
  };
  return Image;
};
