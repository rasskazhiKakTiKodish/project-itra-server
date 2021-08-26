module.exports = (sequelize, DataTypes) => {

    const Collections = sequelize.define("Collections", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        typename:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Collections.associate = (models) => {
        Collections.hasMany(models.Comments, {
            onDelete: "cascade"
        })
        Collections.hasMany(models.Likes, {
            onDelete: "cascade"
        })
    }
    return Collections
}