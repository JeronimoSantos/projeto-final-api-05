import sequelize from '../config/database.js';
import Sequelize from 'sequelize';
import UsuarioModel from './usuario.model.js';
import CandidaturaModel from './candidatura.model.js';

const Usuario = UsuarioModel(sequelize, Sequelize.DataTypes);
const Candidatura = CandidaturaModel(sequelize, Sequelize.DataTypes);

Usuario.hasMany(Candidatura, { foreignKey: 'usuarioId' });
Candidatura.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export { Usuario, Candidatura, sequelize };
