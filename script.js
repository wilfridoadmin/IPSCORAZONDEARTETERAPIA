document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if ((username === 'admin' && password === '221099') || (username === 'psicologa' && password === 'michell2210')) {
        window.location.href = 'admin.html';
    } else {
        document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos.';
    }
});

// Aquí iría la lógica para manejar el panel de control en admin.html
document.addEventListener('DOMContentLoaded', function() {
    // Esto es un ejemplo; en la realidad, los datos vendrían de un servidor
    var patientList = document.getElementById('patientList');
    var patientData = [
        { id: '001', name: 'Juan Pérez', observations: 'Paciente con ansiedad', age: 30, admissionDate: '2024-08-25', document: 'documento1.jpg' }
        // Aquí podrías añadir más pacientes
    ];
    
    patientData.forEach(function(patient) {
        var patientDiv = document.createElement('div');
        patientDiv.className = 'patient';
        patientDiv.innerHTML = `
            <p><strong>ID:</strong> ${patient.id}</p>
            <p><strong>Nombre Completo:</strong> ${patient.name}</p>
            <p><strong>Observaciones:</strong> ${patient.observations}</p>
            <p><strong>Edad:</strong> ${patient.age}</p>
            <p><strong>Fecha de Ingreso:</strong> ${patient.admissionDate}</p>
            <p><strong>Documento:</strong> <img src="${patient.document}" alt="Documento" style="max-width: 100px;"></p>
        `;
        patientList.appendChild(patientDiv);
    });
    
    document.getElementById('printReport').addEventListener('click', function() {
        window.print();
    });
});
