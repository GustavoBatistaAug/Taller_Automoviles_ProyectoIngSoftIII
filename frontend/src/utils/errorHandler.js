export function getErrorMessage(error) {
  if (!error) {
    return "Ha ocurrido un error inesperado.";
  }

  // Lista de errores de validación (prioridad)
  if (
    Array.isArray(error.response?.data?.errors) &&
    error.response.data.errors.length > 0
  ) {
    return error.response.data.errors
      .map((err) => `• ${err.message}`)
      .join("\n");
  }

  // Error personalizado enviado por el backend
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Error como texto plano
  if (typeof error.response?.data === "string") {
    return error.response.data;
  }

  // Sin respuesta del servidor
  if (error.request) {
    return "No fue posible conectar con el servidor.";
  }

  // Error generado en el frontend
  if (error.message) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado.";
}