
export const verificationTemplate = (token) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>

  <body
    style=" 
      font-family: Verdana, Geneva, Tahoma, sans-serif, sans-serif;
      line-height: 1.6;
      max-width: 600px;
      color: light-dark(black, white);
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div style="padding: 10px; text-align: center">
      <h2 style="color: #38bdf8; margin: 0">VERIFY YOUR EMAIL</h2>
    </div>
    <div style="padding: 20px">
      <p>Hello,</p>
      <p>Thank you for signing up!</p>
      <p style="font-weight: 600">Verification code</p>
      <div style="text-align: center; margin: 20px 0">
        <span
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #38bdf8;
          "
          >${token}</span
        >
      </div>
      <p>
        Enter this code on the verification page to complete your registration.
      </p>
      <p>This code will expire in 15 minutes</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <div>
        <span> Best regards </span>
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
          "
        >
          <p style="color: #38bdf8; font-weight: 600">Product Store</p>
        </div>
      </div>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>`;

export const sendWelcomeTemplate = (name) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
  </head>
  <body
    style="
      font-family: Verdana, Geneva, Tahoma, sans-serif, sans-serif;
      line-height: 1.6;
      color: light-dark(black, white);
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div style="padding: 10px; text-align: center">
      <h2 style="color: #38bdf8; margin: 0">Welcome</h2>
    </div>
    <div style="padding: 20px">
      <p>Hi , ${name}</p>
      <p style="font-weight: 600">Welcome on</p>
      <div style="text-align: center; margin: 20px 0">
        <span style="font-size: 32px; font-weight: bold; color: #38bdf8"
          >PRODUCT STORE</span
        >
      </div>
      <p>Thanks for registration.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
  
      <div>
        <span> Best regards </span>
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
          "
        >
          <p style="color: #38bdf8; font-weight: 600">Product Store</p>
        </div>
      </div>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>
`;

export const forgotPasswordTemplate = (link) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
  </head>
  <body
    style="
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div style="padding: 20px; text-align: center">
      <h1 style="color: #38bdf8; margin: 0">RESET PASSWORD</h1>
    </div>
    <div style="padding: 20px">
      <p>Hello,</p>
      <p>
        We received a request to reset your password. If you didn't make this
        request, please ignore this email.
      </p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0">
        <a
          href="${link}"
          style="
            background-color: #38bdf8;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
          "
          >Reset Password</a
        >
      </div>
      <p>This link will expire in 1 hour.</p>

      <div>
        <span> Best regards </span>
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
          "
        >
          <p style="color: #38bdf8; font-weight: 600">Product Store</p>
        </div>
      </div>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>
`;

export const resetSuccessTemplate = () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
  </head>
  <body
    style="
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div style="padding: 10px; text-align: center">
      <h2 style="color: #38bdf8; margin: 0">PASSWORD RESET SUCCESSFUL</h2>
    </div>
    <div style="padding: 20px; border-radius: 0 0 5px 5px">
      <p>Hello,</p>
      <p>
        We're writing to confirm that your password has been successfully reset.
      </p>

      <div style="text-align: center; margin: 20px 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="#38bdf8"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-check"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <p>
        If you did not initiate this password reset, please contact our support
        team immediately.
      </p>
      <p>For security reasons, we recommend that you:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication if available</li>
        <li>Avoid using the same password across multiple sites</li>
      </ul>
      <p>Thank you for helping us keep your account secure.</p>
      <div>
        <span> Best regards </span>
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
          "
        >
          <p style="color: #38bdf8; font-weight: 600">Product Store</p>
        </div>
      </div>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>`;
