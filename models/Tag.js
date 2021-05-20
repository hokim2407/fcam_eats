const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        vaildate: {
          len: [0, 50],
        },
        allowNull: false,
      },
    },
    {
      tableName: "Tag",
    }
  );

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Shops, {
      through: {
        //교차테이블
        model: "TagShop",
        unique: false,
      },
      as: "Shop",
      foreignKey: "tag_id",
      sourceKey: "id",
      constraints: false,
    });
  };

  return Tag;
};
