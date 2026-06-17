const WHATSAPP_NUMBER = "50588027299";

function getFormData(form) {
  const data = new FormData(form);
  return {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    service: data.get("service"),
    message: data.get("message"),
  };
}

function buildWhatsAppMessage(data) {
  return (
    "*Nuevo contacto - Energy Ingeniería*%0A%0A" +
    "*Nombre:* " + encodeURIComponent(data.name) + "%0A" +
    "*Correo:* " + encodeURIComponent(data.email) + "%0A" +
    "*Teléfono:* " + encodeURIComponent(data.phone) + "%0A" +
    "*Servicio:* " + encodeURIComponent(data.service) + "%0A" +
    "*Mensaje:* " + encodeURIComponent(data.message)
  );
}

export function sendToWhatsApp(event) {
  event.preventDefault();

  const form = event.target;
  const data = getFormData(form);
  const message = buildWhatsAppMessage(data);
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

  window.open(url, "_blank");
}
