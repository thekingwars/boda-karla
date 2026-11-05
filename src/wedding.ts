export const wedding = {
  names: ["Karla", "María"],
  date: "2027-03-20T16:00:00-04:00",
  dateLabel: "20 de marzo de 2027",
  location: "Caracas, Venezuela",
  venue: "La Arboleda",
  deadline: "1 de marzo",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=El+Hatillo+Caracas+Venezuela",
};

export function downloadCalendar() {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Karla y Maria//Wedding demo//ES",
    "BEGIN:VEVENT",
    "UID:karla-maria-20270320@wedding.demo",
    "DTSTAMP:20261105T120000Z",
    "DTSTART:20270320T200000Z",
    "DTEND:20270321T060000Z",
    "SUMMARY:Boda de Karla y María (demo)",
    "LOCATION:La Arboleda - Caracas (ubicación de ejemplo)",
    "DESCRIPTION:Celebramos el comienzo de nuestra historia. Invitación de demostración.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([event], { type: "text/calendar;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "karla-y-maria.ics";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
