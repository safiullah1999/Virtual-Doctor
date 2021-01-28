const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const port = 5000;

const route1 = require('./api/getUsers.js');
const route2 = require('./api/getAdminProfile.js');
const route3 = require('./api/updatePasswordAdmin.js');
const route4 = require('./api/createAdmin.js');
const route5 = require('./api/createPatient.js');
const route6 = require('./api/createDoctor.js');
const route7 = require('./api/getPatientProfile.js');
const route8 = require('./api/updatePasswordPatient.js');
const route9 = require('./api/updatePasswordDoctor.js');
const route10 = require('./api/getDoctorProfile.js');
const route11 = require('./api/getAppointmentsPatient.js');
const route12 = require('./api/getReportsPatient.js');
const route13 = require('./api/getPrescriptionsPatient.js');
const route14 = require('./api/getAllDoctors.js');
const route15 = require('./api/getAllMedicines.js');
const route16 = require('./api/postPrescription.js');
const route17 = require('./api/deletePatient.js');
const route18 = require('./api/deleteDoctor.js');
const route19 = require('./api/getBill.js');
const route20 = require('./api/getCountAdmin.js');
const route21 = require('./api/getCountDoctor.js');
const route22 = require('./api/getCountPatient.js');
const route23 = require('./api/postPatientRequest.js');
const route24 = require('./api/postDoctorRequest.js');
const route25 = require('./api/getRequestPatients.js');
const route26 = require('./api/getRequestDoctors.js');
const route27 = require('./api/approveRequestDoctor.js');
const route28 = require('./api/approveRequestPatient.js');
const route29 = require('./api/deleteRequestDoctor.js');
const route30 = require('./api/deleteRequestPatient.js');
const route31 = require('./api/bookAppointment.js');
const route32 = require('./api/getScheduledAppointments.js');
const route33 = require('./api/getAllScheduledAppointments.js');
const route34 = require('./api/checkPasswordAdmin.js');
const route35 = require('./api/login.js');
const route36 = require('./api/checkPasswordDoctor.js');
const route37 = require('./api/checkPasswordPatient.js');
const route38 = require('./api/getHeartReport.js');
const route39 = require('./api/getheartreport_all.js');
const route40 = require('./api/postheartreport.js');
const route41 = require('./api/postReportsPatient.js');
const route42 = require('./api/getReportsPatient.js');
const route43 = require('./api/getPatient.js');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/a', (request, response) => {
  response.json({ info: 'aaaaaa' })
})


app.use('/api', route1)
app.use('/api', route2)
app.use('/api', route3)
app.use('/api', route4)
app.use('/api', route5)
app.use('/api', route6)
app.use('/api', route7)
app.use('/api', route8)
app.use('/api', route9)
app.use('/api', route10)
app.use('/api', route11)
app.use('/api', route12)
app.use('/api', route13)
app.use('/api', route14)
app.use('/api', route15)
app.use('/api', route16)
app.use('/api', route17)
app.use('/api', route18)
app.use('/api', route19)
app.use('/api', route20)
app.use('/api', route21)
app.use('/api', route22)
app.use('/api', route23)
app.use('/api', route24)
app.use('/api', route25)
app.use('/api', route26)
app.use('/api', route27)
app.use('/api', route28)
app.use('/api', route29)
app.use('/api', route30)
app.use('/api', route31)
app.use('/api', route32)
app.use('/api', route33)
app.use('/api', route34)
app.use('/api', route35)
app.use('/api', route36)
app.use('/api', route37)
app.use('/api', route38)
app.use('/api', route39)
app.use('/api', route40)
app.use('/api', route41)
app.use('/api', route42)
app.use('/api', route43)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

