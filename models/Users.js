module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Comments, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Collections, {
            onDelete: "cascade"
        })

    }
    return Users
}