export const sendConfirmRegister = ({username,token}) => {
    const url = `http://localhost:3000/confirm-register/${token}`;

    return `
    <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    
        <head>
            <title>Reset Password</title>
        </head>
    
            <body style="margin: 0; padding: 0;">
            <br />
            <br />
            <p>Hello ${username} !</p>
            <div>Click here to finish your registration : 
            <a href="${url}">Confirm Account</a> </div>
            <p>Please don't share this email to anyone for security</p>
            <br />
            <br />
            </body>
    
    </html>
    `;
}