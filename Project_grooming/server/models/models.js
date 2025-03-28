const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Appointment = sequelize.define("Appointment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "запланировано" },
    schedule_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Schedules', key: 'id' } },
  })

  const AppointmentService = sequelize.define("Appointment_services", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false },
    service_id: { type: DataTypes.INTEGER, allowNull: false },
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
    password: {type: DataTypes.STRING}
  })

  const Schedule = sequelize.define("Schedule", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Employee, key: 'id' } },
    date: { type: DataTypes.DATE, allowNull: false },
  })

  const Service = sequelize.define("Service", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
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


module.exports = {
    Appointment,
    AppointmentService,
    Client,
    Employee,
    Schedule,
    Service
}