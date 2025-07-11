import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O nome é obrigatório.' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este e-mail já está cadastrado.'
      },
      validate: {
        isEmail: { msg: 'Formato de e-mail inválido.' },
        notEmpty: { msg: 'O e-mail é obrigatório.' }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'A senha deve ter no mínimo 6 caracteres.'
        },
        notEmpty: { msg: 'A senha é obrigatória.' }
      }
    },
    tipo: {
      type: DataTypes.ENUM('PCD', 'empresa'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['PCD', 'empresa']],
          msg: 'O tipo deve ser PCD ou empresa.'
        }
      }
    },
    deficiencia: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.senha) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      }
    }
  });

  return Usuario;
};
