function recomendar(){
    const tamano=document.getElementById("tamano").value;
    const frecuencia=document.getElementById("frecuencia").value;
    const colaboracion=document.getElementById("colaboracion").value;
    const microsoft=document.getElementById("microsoft").value;
    const ia=document.getElementById("ia").value;

    let recomendacion="";
    let explicacion="";

    // Lógica de decisión simplificada
    if (colaboracion === "si" && tamano === "pequeño") {
        recomendacion = "Dropbox Business";
        explicacion = "Es la mejor opción cuando la prioridad es la colaboración sencilla y la sincronización entre dispositivos.";
    } else if (microsoft === "si") {
        recomendacion = "Azure Blob Storage";
        explicacion = "Encaja perfectamente con ecosistemas empresariales basados en Microsoft 365 y Azure.";
    } else if (ia === "si") {
        recomendacion = "Google Cloud Storage";
        explicacion = "Ofrece gran integración con herramientas de análisis e inteligencia artificial como BigQuery o Vertex AI.";
    } else if (tamano === "grande" || frecuencia === "baja") {
        recomendacion = "Amazon S3";
        explicacion = "Es ideal para almacenamiento masivo, datos fríos y arquitecturas muy escalables y flexibles.";
    } else {
        recomendacion = "Google Cloud Storage";
        explicacion = "Es una opción equilibrada para la mayoría de empresas, con buena relación coste-rendimiento.";
    }


    document.getElementById("resultado").innerHTML = `
        <div class="resultado">
        <h3>Recomendación: ${recomendacion}</h3>
        <p>${explicacion}</p>
        </div>
    `;

    
}