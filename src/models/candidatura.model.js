import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Candidatura = sequelize.define('Candidatura', {
        status: {
            type: DataTypes.ENUM('pendente', 'aprovado', 'rejeitado'),
            allowNull: false,
            defaultValue: 'pendente',
            validate: {
                isIn: {
                    args: [['pendente', 'aprovado', 'rejeitado']],
                    msg: 'Status deve ser pendente, aprovado ou rejeitado.'
                }
            }
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vagaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Candidatura;
};
