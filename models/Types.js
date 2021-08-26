module.exports = (sequelize, DataTypes) => {

    const Types = sequelize.define("Types", {
        typename:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Types.associate = (models) => {
        Types.hasMany(models.Collections, {
            onDelete: "cascade"
        })
    }
    return Types
}