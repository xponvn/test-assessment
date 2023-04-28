export const emailHtml = `<!DOCTYPE html>
  <html lang="en">
	  <head>
		  <meta charset="UTF-8" />
		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <link rel="preconnect" href="https://fonts.googleapis.com" />
		  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		  <link
			  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@0;1&amp;display=swap"
			  rel="stylesheet"
		  />
		  <style>
			  body {
				  font-family: 'Helvetica Neue', Helvetica;
				  max-width: 612px;
			  }
  
			  p {
				  font-family: Inter;
				  font-size: 16px;
				  font-weight: 500;
				  line-height: 19px;
				  letter-spacing: 0em;
				  text-align: left;
			  }
  
			  .assignment {
				  display: flex;
				  flex-direction: row;
				  justify-content: center;
				  align-items: center;
			  }
  
			  .btn {
				  padding: 12px 24px;
				  gap: 8px;
				  background: #00d4ff;
				  box-shadow: 5px 5px 0px #983795;
				  text-decoration: none;
				  font-weight: bold;
			  }
  
			  .header-img-container {
				  position: relative;
			  }
  
			  .logo-img {
				  position: absolute;
				  top: 20px;
				  left: 20px;
			  }
  
			  .footer-img-container {
				  position: relative;
			  }
  
			  .footer-icon-container {
				  position: absolute;
				  top: 20px;
				  display: flex;
				  align-self: center;
				  left: 0;
				  right: 0;
				  margin-left: auto;
				  margin-right: auto;
				  width: 200px; /* Need a specific value to work */
			  }
  
			  .footer-icon {
				  margin-left: 5px;
				  margin-right: 5px;
			  }
		   
		  </style>
	  </head>
  
	  <body>
		  <h1 class="title">Welcome to XPON assessment!</h1>
		  <p>Dear <%= candidate %>,</p>
		  <p>Thank you for expressing your interest in our company.</p>
		  <p>
			  Please find the following assessment as a part of our interview
			  process for your position.
		  </p>
		  <div class="assignment">
			  <a class="btn" href="http://localhost:4200/test/1" target="_blank">START ASSESSMENT</a>
		  </div>
		  <p>
			  If you have any other questions about the assessment, please do not
			  hesitate to contact us at hr@xpon.ai.
		  </p>
		  <p>Good luck and we are looking forward to reading your answers.</p>
		  <p>Thank you,</p>
		  <p>XPON recruitment team.</p>
	  </body>
  </html>
`;

export const emailTemplate = {
  subject: 'Invite for Test Assignment',
  text: emailHtml,
  html: emailHtml,
};
