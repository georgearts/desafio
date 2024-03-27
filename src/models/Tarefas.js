const sequelize = require('sequelize');

const Tarefas = (sequelize, DataTypes) => {
  const Tarefas = sequelize.define('Tarefas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  return Tarefas;
};