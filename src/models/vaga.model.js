import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vaga = sequelize.define('Vaga', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false, // Ex: Remoto, Híbrido, Presencial
  },
});

export default Vaga;
