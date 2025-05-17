const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Appointment = sequelize.define("Appointment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status: { 
        type: DataTypes.ENUM("запланировано", "подтверждено", "завершено"), 
        allowNull: false, 
        defaultValue: "запланировано" 
      },
  })

  const AppointmentService = sequelize.define("Appointment_service", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  })
  const Client = sequelize.define("Client", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false,unique: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: {type: DataTypes.STRING},
  }, {
    timestamps: true, 
  })

  const Employee = sequelize.define("Employee", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false,unique: true },
    email: { type: DataTypes.STRING, allowNull: false,unique: true },
    // password: {type: DataTypes.STRING}
  })

  const Schedule = sequelize.define("Schedule", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
  }, {
    timestamps: true
  })

  const Service = sequelize.define("Service", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Длительность услуги в минутах'
    },
    img: { type: DataTypes.STRING, allowNull: true },
  })

  const InvalidToken = sequelize.define("InvalidToken", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
  })

const RefreshToken = sequelize.define('refresh_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false},
    clientId: {type: DataTypes.INTEGER, allowNull: false}
})

Employee.hasMany(Appointment, { foreignKey: "employee_id", onDelete: "CASCADE" });
Appointment.belongsTo(Employee, { foreignKey: "employee_id" });

Employee.hasMany(Schedule, { foreignKey: "employee_id", onDelete: "CASCADE" });
Schedule.belongsTo(Employee, { foreignKey: "employee_id" });

Schedule.hasMany(Appointment, { foreignKey: "schedule_id", onDelete: "CASCADE" });
Appointment.belongsTo(Schedule, { foreignKey: "schedule_id" });

Appointment.belongsToMany(Service, { through: AppointmentService, foreignKey: "appointment_id" });
Service.belongsToMany(Appointment, { through: AppointmentService, foreignKey: "service_id" });

Client.hasMany(Appointment, { foreignKey: "client_id", onDelete: "CASCADE" });
Appointment.belongsTo(Client, { foreignKey: "client_id" });

RefreshToken.belongsTo(Client)
Client.hasMany(RefreshToken)

module.exports = {
    Appointment,
    AppointmentService,
    Client,
    Employee,
    Schedule,
    Service,
    InvalidToken,
    RefreshToken
}