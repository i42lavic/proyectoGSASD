function recomendar() {

    // ===========================
    // 1. LECTURA DE VALORES
    const tamano = document.getElementById("tamano").value;
    const frecuencia = document.getElementById("frecuencia").value;
    const colaboracion = document.getElementById("colaboracion").value;
    const microsoft = document.getElementById("microsoft").value;
    const ia = document.getElementById("ia").value;

    const tipoDatos = document.getElementById("tipoDatos").value;
    const seguridadReq = document.getElementById("seguridad").value;
    const presupuesto = document.getElementById("presupuesto").value;
    const latencia = document.getElementById("latencia").value;
    const hibrido = document.getElementById("hibrido").value;
    const cumplimiento = document.getElementById("cumplimiento").value;
    const versionado = document.getElementById("versionado").value;
    const region = document.getElementById("region").value;
    const cicd = document.getElementById("cicd").value;
    const api = document.getElementById("api").value;

    // ===========================
    // 2. CONVERTIR RESPUESTAS EN PUNTUACIONES (1–5)
    const criterios = {
        volumen_datos: tamano === "pequeño" ? 2 : tamano === "medio" ? 4 : 5,
        uso_colaborativo: colaboracion === "si" ? 5 : 2,
        seguridad: 4,
        presupuesto_base: frecuencia === "baja" ? 5 : 3,
        integracion_apps: ia === "si" ? 5 : 3,
        entorno_tecnologico: microsoft === "si" ? 5 : 2,
        acceso_latencia: frecuencia === "alta" ? 5 : frecuencia === "media" ? 3 : 2,
        tipos_datos_base: tamano === "grande" ? 5 : 3,

        // Nuevos criterios
        tipo_datos: tipoDatos === "multimedia" ? 5 : tipoDatos === "archivado" ? 4 : 3,
        seguridad_requerida: seguridadReq === "alta" ? 5 : seguridadReq === "media" ? 3 : 2,
        presupuesto_disp: presupuesto === "bajo" ? 5 : presupuesto === "medio" ? 3 : 2,
        latencia_necesaria: latencia === "baja" ? 5 : latencia === "media" ? 3 : 2,
        entorno_hibrido: hibrido === "si" ? 5 : 2,
        cumplimiento_norm: cumplimiento === "ninguno" ? 2 : cumplimiento === "gdpr" ? 4 : 5,
        versionado_av: versionado === "si" ? 5 : 2,
        region_ue: region === "eu" ? 5 : 2,
        cicd_req: cicd === "si" ? 5 : 2,
        api_avanzada: api === "si" ? 5 : 2
    };


    // ===========================
    // 3. PESOS DE CADA CRITERIO
    const pesos = {
        volumen_datos: 0.12,
        uso_colaborativo: 0.12,
        seguridad: 0.10,
        presupuesto_base: 0.05,
        integracion_apps: 0.08,
        entorno_tecnologico: 0.08,
        acceso_latencia: 0.05,
        tipos_datos_base: 0.05,
        tipo_datos: 0.08,
        seguridad_requerida: 0.12,
        presupuesto_disp: 0.08,
        latencia_necesaria: 0.05,
        entorno_hibrido: 0.05,
        cumplimiento_norm: 0.08,
        versionado_av: 0.04,
        region_ue: 0.05,
        cicd_req: 0.05,
        api_avanzada: 0.05
    };


    // ===========================
    // 4. PUNTUACIÓN DE CADA PLATAFORMA
    const plataformas = {
        "Dropbox Business": {
            volumen_datos: 2, uso_colaborativo: 5, seguridad: 3, presupuesto_base: 4,
            integracion_apps: 4, entorno_tecnologico: 3, acceso_latencia: 3, tipos_datos_base: 3,
            tipo_datos: 3, seguridad_requerida: 3, presupuesto_disp: 4, latencia_necesaria: 3,
            entorno_hibrido: 2, cumplimiento_norm: 3, versionado_av: 4, region_ue: 4,
            cicd_req: 2, api_avanzada: 3
        },

        "Azure Blob Storage": {
            volumen_datos: 5, uso_colaborativo: 3, seguridad: 5, presupuesto_base: 3,
            integracion_apps: 5, entorno_tecnologico: 5, acceso_latencia: 5, tipos_datos_base: 5,
            tipo_datos: 5, seguridad_requerida: 5, presupuesto_disp: 3, latencia_necesaria: 5,
            entorno_hibrido: 5, cumplimiento_norm: 5, versionado_av: 5, region_ue: 5,
            cicd_req: 5, api_avanzada: 5
        },

        "Amazon S3": {
            volumen_datos: 5, uso_colaborativo: 3, seguridad: 5, presupuesto_base: 4,
            integracion_apps: 5, entorno_tecnologico: 3, acceso_latencia: 5, tipos_datos_base: 5,
            tipo_datos: 5, seguridad_requerida: 5, presupuesto_disp: 4, latencia_necesaria: 5,
            entorno_hibrido: 4, cumplimiento_norm: 5, versionado_av: 5, region_ue: 5,
            cicd_req: 5, api_avanzada: 5
        },

        "Google Cloud Storage": {
            volumen_datos: 5, uso_colaborativo: 3, seguridad: 5, presupuesto_base: 4,
            integracion_apps: 5, entorno_tecnologico: 4, acceso_latencia: 5, tipos_datos_base: 5,
            tipo_datos: 5, seguridad_requerida: 5, presupuesto_disp: 4, latencia_necesaria: 5,
            entorno_hibrido: 3, cumplimiento_norm: 5, versionado_av: 5, region_ue: 5,
            cicd_req: 5, api_avanzada: 5
        }
    };


    // ===========================
    // 5. Cálculo de puntuaciones ponderadas
    let resultados = {};

    for (const plataforma in plataformas) {
        let total = 0;
        for (const criterio in pesos) {
            total += plataformas[plataforma][criterio] * pesos[criterio] * (criterios[criterio] / 5);
        }
        resultados[plataforma] = total;
    }


    // ===========================
    // 6. REGLAS ESPECIALES DE PRIORIDAD
    let recomendacion = "";
    let explicacion = "";

    if (colaboracion === "si" && tamano !== "grande") {
        recomendacion = "Dropbox Business";
        explicacion = "Excelente para sincronización rápida y colaboración entre equipos.";
    }

    if (microsoft === "si") {
        recomendacion = "Azure Blob Storage";
        explicacion = "La mejor opción para empresas con ecosistema Microsoft 365 o Azure AD.";
    }

    if (ia === "si") {
        recomendacion = "Google Cloud Storage";
        explicacion = "Destaca por su integración con BigQuery, Vertex AI y herramientas de análisis.";
    }

    if (region === "eu") {
        recomendacion = "Amazon S3";
        explicacion = "Ofrece gran variedad de regiones europeas y cumplimiento robusto.";
    }

    // si aún no se eligió por reglas → usar puntuación
    if (recomendacion === "") {
        recomendacion = Object.keys(resultados).sort((a, b) => resultados[b] - resultados[a])[0];

        switch (recomendacion) {
            case "Amazon S3":
                explicacion = "Ideal para almacenamiento masivo, escalabilidad y datos fríos.";
                break;
            case "Azure Blob Storage":
                explicacion = "Muy seguro, robusto y perfecto para ecosistemas Microsoft.";
                break;
            case "Google Cloud Storage":
                explicacion = "Equilibrado y potente, especialmente con inteligencia artificial.";
                break;
            case "Dropbox Business":
                explicacion = "Perfecto para colaboración simple y sincronización entre dispositivos.";
                break;
        }
    }

    document.getElementById("resultado").innerHTML = `
        <div class="resultado">
            <h3>Recomendación: ${recomendacion}</h3>
            <p>${explicacion}</p>
        </div>
    `;
}
