import bcrypt from 'bcrypt'
import mailer from 'nodemailer'

export const cryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const matchPassword = async (plainPassword, encryptPassword) => {
    const validPassword = await bcrypt.compare(plainPassword, encryptPassword);
    return validPassword;
}

export const generarCodigo = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    }

    return codigo;
}

const transporter = mailer.createTransport({
    service: 'gmail', // Puedes cambiar a otro servicio como 'Outlook', 'Yahoo', etc.
    auth: {
        user: 'proyectoimplementacion103@gmail.com', // Tu dirección de correo
        pass: 'mzvg udqw pgdu npyj' // Contraseña generada para la aplicación (recomendado)
    }
});

export const enviarCorreo = async (asunto, texto, html,destinatario) => {
    const mailOptions = {
        from: 'proyectoimplementacion103@gmail.com', // Correo del emisor
        to: destinatario, // Correo del destinatario
        subject: asunto,
        text: texto,
        html: html 
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar el correo: ' + error);
    }
};