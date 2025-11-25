import boto3
import os
import datetime

# ---------------- CONFIGURACIÓN ----------------
BUCKET_NAME = "backup-empresa-gsasd"  # Cambia por tu bucket
FOLDER_TO_UPLOAD = r"C:\Backup\Informes"  # Carpeta principal
LOG_FOLDER = os.path.join(FOLDER_TO_UPLOAD, "logs")  # Carpeta donde se guardarán logs
# ------------------------------------------------

# Crear carpeta de logs si no existe
os.makedirs(LOG_FOLDER, exist_ok=True)

# Nombre de log diario
today_str = datetime.datetime.now().strftime("%Y-%m-%d")
LOG_FILE = os.path.join(LOG_FOLDER, f"backup_log_{today_str}.txt")

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")

def upload_files(s3_client, local_folder, s3_prefix=""):
    """
    Recursivo: sube archivos de local_folder a S3 bajo s3_prefix.
    Mantiene la estructura de subcarpetas.
    """
    for item in os.listdir(local_folder):
        local_path = os.path.join(local_folder, item)

        # Construir la clave S3 respetando subcarpetas
        s3_key = f"{s3_prefix}{item}" if s3_prefix == "" else f"{s3_prefix}/{item}"

        if os.path.isfile(local_path):
            try:
                # Comprobar si existe en S3
                try:
                    obj = s3_client.head_object(Bucket=BUCKET_NAME, Key=s3_key)
                    s3_last_modified = obj['LastModified']
                except s3_client.exceptions.ClientError as e:
                    if e.response['Error']['Code'] == "404":
                        s3_last_modified = None
                    else:
                        raise

                local_mtime = datetime.datetime.fromtimestamp(os.path.getmtime(local_path))

                # Subir si no existe o si se modificó
                if s3_last_modified is None or local_mtime > s3_last_modified.replace(tzinfo=None):
                    log(f"Subiendo archivo: {s3_key}")
                    s3_client.upload_file(local_path, BUCKET_NAME, s3_key)
                    log(f"✔ Archivo subido correctamente: {s3_key}")
                else:
                    log(f"Archivo no modificado, se omite: {s3_key}")

            except Exception as e:
                log(f"❌ ERROR subiendo {s3_key}: {str(e)}")

        elif os.path.isdir(local_path):
            # Recursividad para subcarpetas
            upload_files(s3_client, local_path, s3_key)

def main():
    log("---- INICIO DE BACKUP ----")
    s3_client = boto3.client("s3")
    upload_files(s3_client, FOLDER_TO_UPLOAD)
    log("---- FIN DE BACKUP ----\n")
    print("Backup completado. Revisa el log para detalles.")

if __name__ == "__main__":
    main()
