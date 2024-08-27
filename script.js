document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if ((username === 'admin' && password === '221099') || (username === 'psicologa' && password === '2210')) {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Credenciales incorrectas');
    }
});

let patients = [];
let editIndex = null;

document.getElementById('patientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const patientId = document.getElementById('patientId').value;
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const observations = document.getElementById('observations').value;
    const documentFile = document.getElementById('document').files[0];

    const patient = {
        patientId,
        fullName,
        age,
        admissionDate,
        observations,
        documentFile
    };

    if (editIndex !== null) {
        patients[editIndex] = patient;
        editIndex = null;
    } else {
        patients.push(patient);
    }

    document.getElementById('patientForm').reset();
    renderTable();
});

function renderTable() {
    const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    patients.forEach((patient, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = patient.patientId;
        row.insertCell(1).textContent = patient.fullName;
        row.insertCell(2).textContent = patient.age;
        row.insertCell(3).textContent = patient.admissionDate;
        row.insertCell(4).textContent = patient.observations;

        const documentCell = row.insertCell(5);
        const docLink = document.createElement('a');
        docLink.href = URL.createObjectURL(patient.documentFile);
        docLink.textContent = 'Ver Documento';
        docLink.target = '_blank';
        documentCell.appendChild(docLink);

        const actionsCell = row.insertCell(6);
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function () {
            editPatient(index);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function () {
            deletePatient(index);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function editPatient(index) {
    const patient = patients[index];
    document.getElementById('patientId').value = patient.patientId;
    document.getElementById('fullName').value = patient.fullName;
    document.getElementById('age').value = patient.age;
    document.getElementById('admissionDate').value = patient.admissionDate;
    document.getElementById('observations').value = patient.observations;

    editIndex = index;
}

function deletePatient(index) {
    patients.splice(index, 1);
    renderTable();
}

document.getElementById('printButton').addEventListener('click', function () {
    const selectedPatient = patients[editIndex];
    if (!selectedPatient) {
        alert('Seleccione un paciente para imprimir');
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir</title></head><body>');
    printWindow.document.write('<h2>Detalles del Paciente - IPS Corazón de Arte Terapia</h2>');
    printWindow.document.write('<p><strong>ID:</strong> ' + selectedPatient.patientId + '</p>');
    printWindow.document.write('<p><strong>Nombre Completo:</strong> ' + selectedPatient.fullName + '</p>');
    printWindow.document.write('<p><strong>Edad:</strong> ' + selectedPatient.age + '</p>');
    printWindow.document.write('<p><strong>Fecha de Ingreso:</strong> ' + selectedPatient.admissionDate + '</p>');
    printWindow.document.write('<p><strong>Observaciones:</strong> ' + selectedPatient.observations + '</p>');
    printWindow.document.write('<p><strong>Documento:</strong> <a href="' + URL.createObjectURL(selectedPatient.documentFile) + '" target="_blank">Ver Documento</a></p>');
    printWindow.document.write('<p><strong>Atendido por:</strong> [MICHELL LEIVA CC 1002012405]</p>');
    printWindow.document.write('<br><p>Gracias por confiar en nosotros. ¡Vuelva pronto!</p>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});
