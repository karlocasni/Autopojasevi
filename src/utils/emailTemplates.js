export const emailTemplates = {
    confirmation: (booking) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #141414; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Autopojasevi.hr</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <h2>Hvala na vašem povjerenju!</h2>
          <p>Poštovani/a <strong>${booking.ime} ${booking.prezime}</strong>,</p>
          <p>Vaša rezervacija za uslugu <strong>${booking.service_name}</strong> je uspješno završena.</p>
          <p>Nadamo se da ste zadovoljni našom uslugom. Ako imate trenutak, cijenili bismo vašu recenziju na našoj web stranici.</p>
          <br>
          <p>Srdačan pozdrav,</p>
          <p>Tim Autopojasevi.hr</p>
        </div>
      </div>
    `,

    adminAlert: (booking) => `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Nova završena rezervacija</h2>
        <p><strong>Klijent:</strong> ${booking.ime} ${booking.prezime}</p>
        <p><strong>Usluga:</strong> ${booking.service_name}</p>
        <p><strong>Vozilo:</strong> ${booking.marka} ${booking.model} (${booking.godina})</p>
        <p><strong>Datum:</strong> ${booking.appointment_date} u ${booking.appointment_time}</p>
        <p><strong>Status:</strong> Završeno</p>
      </div>
    `,

    reminder: (booking) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #141414; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Podsjetnik na termin</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <p>Poštovani/a <strong>${booking.ime} ${booking.prezime}</strong>,</p>
          <p>Podsjećamo vas na vaš termin sutra:</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #0098FF;">
            <p style="margin: 5px 0;"><strong>Usluga:</strong> ${booking.service_name}</p>
            <p style="margin: 5px 0;"><strong>Datum:</strong> ${booking.appointment_date}</p>
            <p style="margin: 5px 0;"><strong>Vrijeme:</strong> ${booking.appointment_time}</p>
            <p style="margin: 5px 0;"><strong>Lokacija:</strong> Vranplaninska ulica 1, Zagreb</p>
          </div>
          <p>Veselimo se vašem dolasku!</p>
          <br>
          <p>Tim Autopojasevi.hr</p>
        </div>
      </div>
    `
};
